import { db, DETAIL_FIELDS, DETAIL_TABLE, type Details, type Listing, type Product } from "./listings";
import { supabase } from "./supabase";

// Published listings as visitors see them on japanone.app: only listings from verified partners
// (the database's public policy), Featured ones (featured_until in the future) first.

export type PublicListing = Listing & {
  featured_until?: string | null;
  provider: { id: string; name: string; verified_at: string | null } | null;
  details: Details;
  photos: string[];
  sample?: boolean;
};

export const isFeatured = (l: PublicListing) => !!l.featured_until && new Date(l.featured_until).getTime() > Date.now();

/** Local preview only: /work?sample=listings shows sample listings in development, never in production. */
export const sampleMode = () => import.meta.env.DEV && new URLSearchParams(location.search).get("sample") === "listings";

const one = <T,>(v: T | T[] | null | undefined): T | null => (Array.isArray(v) ? (v[0] ?? null) : (v ?? null));

export async function fetchListings(product: Product, opts: { limit?: number; areas?: string[] } = {}): Promise<PublicListing[]> {
  if (sampleMode()) return SAMPLES.filter((s) => s.product === product && matchesArea(s, opts.areas)).slice(0, opts.limit ?? 12);
  if (!supabase) return [];
  const table = DETAIL_TABLE[product];
  const { data, error } = await db()
    .from("listings")
    .select(`*, provider:providers(id, name, verified_at), ${table}(*), listing_media(path, sort)`)
    .eq("product", product)
    .eq("status", "published")
    .order("featured_until", { ascending: false, nullsFirst: false })
    .order("published_at", { ascending: false })
    .limit(opts.areas ? 50 : (opts.limit ?? 12));
  if (error || !data) return [];
  const rows = (data as unknown as Record<string, unknown>[]).map((r) => toPublic(r, table));
  const now = Date.now();
  rows.sort((a, b) => Number(isFeatured(b)) - Number(isFeatured(a)) || (b.published_at ?? "").localeCompare(a.published_at ?? ""));
  return rows.filter((l) => !l.expires_at || new Date(l.expires_at).getTime() > now).filter((l) => matchesArea(l, opts.areas)).slice(0, opts.limit ?? 12);
}

export async function fetchListing(id: string): Promise<PublicListing | null> {
  if (sampleMode()) return SAMPLES.find((s) => s.id === id) ?? null;
  if (!supabase) return null;
  const { data } = await db().from("listings").select("product").eq("id", id).eq("status", "published").maybeSingle();
  if (!data) return null;
  const table = DETAIL_TABLE[(data as { product: Product }).product];
  const { data: row } = await db()
    .from("listings")
    .select(`*, provider:providers(id, name, verified_at), ${table}(*), listing_media(path, sort)`)
    .eq("id", id)
    .maybeSingle();
  return row ? toPublic(row as unknown as Record<string, unknown>, table) : null;
}

function toPublic(r: Record<string, unknown>, table: string): PublicListing {
  const media = ((r.listing_media as { path: string; sort: number }[] | null) ?? []).sort((a, b) => a.sort - b.sort);
  return {
    ...(r as unknown as Listing),
    featured_until: (r.featured_until as string | null) ?? null,
    provider: one(r.provider as PublicListing["provider"] | PublicListing["provider"][]),
    details: one(r[table] as Details | Details[]) ?? {},
    photos: media.map((m) => db().storage.from("listing-media").getPublicUrl(m.path).data.publicUrl),
  };
}

function matchesArea(l: { area: string | null }, areas?: string[]) {
  if (!areas?.length) return true;
  const a = (l.area ?? "").toLowerCase();
  return areas.some((x) => a.includes(x.toLowerCase()));
}

const yen = (n: unknown) => (typeof n === "number" ? `¥${n.toLocaleString("en-US")}` : null);
const UNIT: Record<string, string> = { hour: "an hour", day: "a day", month: "a month", year: "a year" };

/** The option label for a stored value, from the listing form's own field definitions. */
export function optionLabel(product: Product, key: string, value: unknown): string {
  const f = DETAIL_FIELDS[product].find((x) => x.key === key);
  const label = (v: string) => f?.options?.find(([o]) => o === v)?.[1] ?? v;
  return Array.isArray(value) ? value.map((v) => label(String(v))).join(", ") : label(String(value));
}

/** The big number on a card: pay, price or tuition. */
export function headline(l: PublicListing): string | null {
  const d = l.details;
  if (l.product === "job") {
    const lo = yen(d.salary_min), hi = yen(d.salary_max), unit = UNIT[String(d.salary_unit)] ?? "";
    return lo ? `${lo}${hi && hi !== lo ? ` – ${hi}` : ""} ${unit}`.trim() : null;
  }
  if (l.product === "tour") {
    const parts = [d.duration_days ? `${d.duration_days} day${Number(d.duration_days) > 1 ? "s" : ""}` : null, d.price_from_jpy ? `from ${yen(d.price_from_jpy)} per person` : null];
    return parts.filter(Boolean).join(" · ") || null;
  }
  if (l.product === "course") return d.tuition_year_jpy ? `${yen(d.tuition_year_jpy)} a year` : null;
  return d.price ? `${d.currency && d.currency !== "JPY" ? `${d.currency} ${d.price}` : yen(d.price)}` : null;
}

/** The short line under the headline: who it's for and what's included. */
export function facts(l: PublicListing): string[] {
  const d = l.details;
  const out: string[] = [];
  if (l.product === "job") {
    if (Array.isArray(d.visa_types) && d.visa_types.length) out.push(optionLabel("job", "visa_types", d.visa_types.slice(0, 2)));
    if (d.jlpt_required && d.jlpt_required !== "none") out.push(`Japanese ${optionLabel("job", "jlpt_required", d.jlpt_required)}`);
    if (d.jlpt_required === "none") out.push("No Japanese test");
    if (d.dormitory) out.push("Housing provided");
    if (d.transport_paid) out.push("Commuting paid");
  } else if (l.product === "tour") {
    if (Array.isArray(d.languages_guided) && d.languages_guided.length) out.push(optionLabel("tour", "languages_guided", d.languages_guided));
    if (d.meeting_point) out.push(`Meet: ${d.meeting_point}`);
  } else if (l.product === "course") {
    if (d.course_type) out.push(optionLabel("course", "course_type", d.course_type));
    if (Array.isArray(d.intakes) && d.intakes.length) out.push(`Starts ${optionLabel("course", "intakes", d.intakes)}`);
    if (d.student_visa) out.push("Student visa support");
  }
  return out;
}

/** The label above the title: field, school type or "Tour", with the area. */
export function kicker(l: PublicListing): string {
  const d = l.details;
  const what = l.product === "job" && d.job_type ? optionLabel("job", "job_type", d.job_type)
    : l.product === "course" && d.school_type ? optionLabel("course", "school_type", d.school_type)
    : l.product === "tour" ? "Tour" : "Product";
  return [what.replace(/ \(.*\)$/, ""), l.area].filter(Boolean).join(" · ");
}

/** Where people apply, book or buy: always the partner's own channel. */
export function actionFor(l: PublicListing): { href: string; label: string } | null {
  const d = l.details;
  const target = String(
    (l.product === "job" ? d.apply_target : l.product === "tour" ? d.booking_url : l.product === "course" ? d.apply_url : d.contact_url) ?? l.external_url ?? "",
  ).trim();
  if (!target) return null;
  const href = /^https?:\/\//.test(target) ? target : target.includes("@") ? `mailto:${target}` : /^[+\d][\d\s-]{6,}$/.test(target) ? `tel:${target.replace(/\s/g, "")}` : `https://${target}`;
  const label = l.product === "job" ? "Apply with the employer" : l.product === "tour" ? "Book with the agency" : l.product === "course" ? "Apply to the school" : "Buy from the shop";
  return { href, label };
}

// ---- Sample listings for the local preview (?sample=listings). Never shown on the live site.
const base = { provider_id: "sample", default_lang: "en", languages: ["en"], external_url: null, status: "published" as const, submitted_at: null, expires_at: null, created_at: "2026-11-03", updated_at: "2026-11-03", photos: [], sample: true };
const soon = new Date(Date.now() + 30 * 86400_000).toISOString();
const SAMPLES: PublicListing[] = [
  { ...base, id: "sample-job-1", product: "job", title: "Care worker at a day-care centre", summary: "Help older people with meals, bathing and moving around at our day-care centre, with a team that includes staff from Indonesia and Vietnam. We support your preparation for the care skills test and the care Japanese test.", area: "Saitama", published_at: "2026-11-03", featured_until: soon,
    provider: { id: "s1", name: "[Sample] Sakura Care Co., Ltd.", verified_at: "2026-11-01" },
    details: { job_type: "caregiving", employment_type: "full_time", salary_min: 215000, salary_max: 240000, salary_unit: "month", visa_types: ["ssw1"], jlpt_required: "n4", work_hours: "Shifts 7:00–16:00 or 9:00–18:00, 1-hour break", days_off: "8 days every 4 weeks, about 105 a year", dormitory: true, transport_paid: true, apply_method: "url", apply_target: "https://example.com/apply" } },
  { ...base, id: "sample-job-2", product: "job", title: "Kitchen and hall staff at a ramen restaurant", summary: "Prepare toppings, serve customers and keep the shop clean. Training in English and Japanese.", area: "Tokyo", published_at: "2026-11-02", featured_until: null,
    provider: { id: "s2", name: "[Sample] Menya Hoshi", verified_at: "2026-11-01" },
    details: { job_type: "food_service", employment_type: "part_time", salary_min: 1250, salary_max: 1400, salary_unit: "hour", visa_types: ["student", "any"], jlpt_required: "none", work_hours: "Evening shifts, 17:00–22:00", days_off: "Choose 2–4 days a week", transport_paid: true, apply_method: "url", apply_target: "https://example.com/jobs" } },
  { ...base, id: "sample-job-3", product: "job", title: "Scaffolding worker, training provided", summary: "Set up and take down scaffolding at housing sites in Osaka. Safety training and equipment provided.", area: "Osaka", published_at: "2026-11-01", featured_until: null,
    provider: { id: "s3", name: "[Sample] Naniwa Kensetsu", verified_at: "2026-11-01" },
    details: { job_type: "construction", employment_type: "full_time", salary_min: 12000, salary_max: 15000, salary_unit: "day", visa_types: ["ssw1", "ssw2"], jlpt_required: "n4", work_hours: "8:00–17:00", days_off: "Sundays and public holidays", transport_paid: true, apply_method: "phone", apply_target: "+81 6-0000-0000" } },
  { ...base, id: "sample-tour-1", product: "tour", title: "Fushimi Inari at sunrise and a Gion walk, with a local guide", summary: "Beat the crowds at Fushimi Inari, then walk the old streets of Gion with a licensed guide.", area: "Kyoto", published_at: "2026-11-03", featured_until: soon,
    provider: { id: "s4", name: "[Sample] Kyoto Machi Guides", verified_at: "2026-11-01" },
    details: { duration_days: 1, price_from_jpy: 8500, price_note: "4 hours", meeting_point: "Inari Station", languages_guided: ["en", "id"], includes: ["Licensed guide", "Green tea"], booking_url: "https://example.com/book" } },
  { ...base, id: "sample-course-1", product: "course", title: "Two-year course for university entrance", summary: "Daily Japanese classes and EJU preparation for students aiming at Japanese universities.", area: "Tokyo", published_at: "2026-11-03", featured_until: null,
    provider: { id: "s5", name: "[Sample] Asahi Japanese Language School", verified_at: "2026-11-01" },
    details: { school_type: "language_school", course_type: "university_prep", duration_months: 24, intakes: ["april", "october"], tuition_year_jpy: 780000, student_visa: true, entry_level: "none", apply_url: "https://example.com/apply" } },
];
