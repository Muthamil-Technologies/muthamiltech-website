import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { AdLabel } from "../../components/jo/Listings";
import { DETAIL_FIELDS, db, type Product } from "../../lib/listings";
import { actionFor, fetchListing, headline, isFeatured, kicker, optionLabel, type PublicListing } from "../../lib/publicListings";

// /listings/:id: one partner listing (job, tour, course or product), with the partner's own
// channel to apply, book or buy, and a way to report it.

const BACK: Record<Product, { to: string; label: string; color: string }> = {
  job: { to: "/work", label: "Work in Japan", color: "#17714c" },
  tour: { to: "/travel", label: "Travel in Japan", color: "#9a4612" },
  course: { to: "/study", label: "Study in Japan", color: "#4a2f99" },
  item: { to: "/shop", label: "Shop", color: "#9e2232" },
};

const GUIDES: Record<Product, { to: string; label: string }[]> = {
  job: [
    { to: "/work/ssw", label: "Specified Skilled Worker: what you need" },
    { to: "/learn/speaking", label: "Practise Japanese for work" },
    { to: "/work/cv", label: "Make your Japanese CV (履歴書)" },
  ],
  tour: [
    { to: "/travel/phrases", label: "Travel phrases with audio" },
    { to: "/guides/travel-manners", label: "Manners in Japan: the basics" },
  ],
  course: [
    { to: "/study/visa", label: "The student visa, step by step" },
    { to: "/study/cost", label: "What studying in Japan costs" },
    { to: "/study/scholarships", label: "Scholarships you can apply for" },
  ],
  item: [],
};

const NOT_US: Record<Product, string> = {
  job: "JapanOne doesn't take part in hiring and never charges applicants.",
  tour: "JapanOne doesn't take bookings or payments; the agency runs the tour.",
  course: "JapanOne doesn't take applications or fees; the school decides admission.",
  item: "JapanOne doesn't take orders or payments; the shop sells and ships.",
};

function value(product: Product, key: string, v: unknown): string | null {
  if (v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) return null;
  const f = DETAIL_FIELDS[product].find((x) => x.key === key);
  if (!f) return null;
  if (f.type === "bool") return v ? "Yes" : null;
  if (f.type === "number") return key.includes("jpy") || key.startsWith("salary") || key === "price" ? `¥${Number(v).toLocaleString("en-US")}` : String(v);
  if (f.type === "select" || f.type === "multi") return optionLabel(product, key, v);
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}

// Fields already shown elsewhere on the page (the headline, the action button).
const SKIP = new Set(["salary_min", "salary_max", "salary_unit", "apply_method", "apply_target", "booking_url", "apply_url", "contact_url", "price_from_jpy", "tuition_year_jpy", "price", "currency"]);

export function JOListing() {
  const { id = "" } = useParams();
  const [l, setL] = useState<PublicListing | null | undefined>(undefined);
  useEffect(() => {
    let live = true;
    fetchListing(id).then((r) => live && setL(r));
    return () => { live = false; };
  }, [id]);

  if (l === undefined) return <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">Loading…</div>;
  if (l === null)
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
        <h1 className="t-heading m-0">This listing isn't available</h1>
        <p className="mt-3 text-[20px]">It may have ended or been removed. <Link to="/">Back to JapanOne →</Link></p>
      </div>
    );

  const back = BACK[l.product];
  const big = headline(l);
  const act = actionFor(l);
  const rows = DETAIL_FIELDS[l.product]
    .filter((f) => !SKIP.has(f.key))
    .map((f) => [f.label, value(l.product, f.key, l.details[f.key])] as const)
    .filter(([, v]) => v);

  return (
    <article className="mx-auto max-w-[1200px] px-4 pb-24 pt-10 sm:px-6">
      <Link to={back.to} className="font-bold no-underline" style={{ color: back.color }}>← {back.label}</Link>
      <div className="mt-5 grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-5">
          {isFeatured(l) && <AdLabel />}
          <p className="t-small m-0 font-bold" style={{ color: back.color }}>{kicker(l)}</p>
          <h1 className="t-heading m-0">{l.title}</h1>
          <p className="m-0 text-[20px]">{l.provider?.name}</p>
          {big && <p className="m-0 text-[32px] font-black leading-tight">{big}</p>}

          {l.photos.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {l.photos.slice(0, 6).map((src) => <img key={src} src={src} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />)}
            </div>
          )}

          {rows.length > 0 && (
            <dl className="m-0 grid gap-x-8 gap-y-4 rounded-[28px] bg-white p-7 sm:grid-cols-2 sm:p-9">
              {rows.map(([k, v]) => (
                <div key={k}>
                  <dt className="t-small font-bold" style={{ color: back.color }}>{k}</dt>
                  <dd className="m-0 mt-0.5">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {l.summary && (
            <section className="rounded-[28px] bg-white p-7 sm:p-9">
              <h2 className="t-title m-0">About</h2>
              <p className="m-0 mt-2 whitespace-pre-line">{l.summary}</p>
            </section>
          )}

          {GUIDES[l.product].length > 0 && (
            <section className="flex flex-col gap-2 rounded-[28px] bg-[#e3ecfb] p-7 sm:p-9">
              <h2 className="t-title m-0">Prepare with JapanOne</h2>
              {GUIDES[l.product].map((g) => <Link key={g.to} to={g.to} className="font-bold text-jo-navy">{g.label} →</Link>)}
            </section>
          )}
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
          <div className="flex flex-col gap-4 rounded-[28px] bg-jo-navy p-7 text-white">
            <p className="m-0 text-[#d9e1ec]">{NOT_US[l.product]}</p>
            {act ? (
              <a href={act.href} target="_blank" rel="noopener noreferrer nofollow" className="rounded-full bg-jo-yellow px-6 py-3.5 text-center font-extrabold text-jo-navy no-underline">{act.label} ↗</a>
            ) : (
              <p className="m-0 font-bold">Contact details are on the partner's own website.</p>
            )}
          </div>
          <div className="flex flex-col gap-1 rounded-[28px] bg-white p-6">
            <strong className="t-title">{l.provider?.name}</strong>
            <span className="font-bold text-[#17714c]">✓ Verified partner</span>
            <span className="t-small text-jo-muted">Checked by JapanOne before this listing went live.</span>
          </div>
          <p className="t-small m-0 text-jo-muted">
            {isFeatured(l) ? "Paid placement (広告). " : ""}
            {l.published_at ? `Listed ${new Date(l.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}. ` : ""}
            Check every detail with the partner before you decide.
          </p>
          <Report id={l.id} sample={!!l.sample} />
        </aside>
      </div>
    </article>
  );
}

const REASONS: [string, string][] = [
  ["scam", "Scam or asks for money"],
  ["misleading", "Wrong or misleading"],
  ["illegal", "Breaks the law"],
  ["offensive", "Offensive"],
  ["expired", "No longer available"],
  ["other", "Something else"],
];

function Report({ id, sample }: { id: string; sample: boolean }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("misleading");
  const [details, setDetails] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function send(e: FormEvent) {
    e.preventDefault();
    if (sample) return setState("sent");
    setState("sending");
    const { error } = await db().from("reports").insert({ listing_id: id, reason, details: details.trim() || null });
    setState(error ? "error" : "sent");
  }

  if (state === "sent") return <p className="t-small m-0 font-bold">Thank you. We'll check this listing.</p>;
  if (!open) return <button type="button" onClick={() => setOpen(true)} className="t-small cursor-pointer self-start border-0 bg-transparent p-0 font-bold text-jo-muted underline">Report this listing</button>;
  return (
    <form onSubmit={send} className="flex flex-col gap-3 rounded-[22px] bg-white p-5">
      <label className="flex flex-col gap-1 font-semibold">
        What's wrong?
        <select value={reason} onChange={(e) => setReason(e.target.value)} className="rounded-xl border border-[#d9dee6] bg-white px-3 py-2.5 font-normal">
          {REASONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1 font-semibold">
        Details (optional)
        <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={3} maxLength={2000} className="rounded-xl border border-[#d9dee6] px-3 py-2 font-normal" />
      </label>
      {state === "error" && <p role="alert" className="t-small m-0 text-[#9a4612]">Couldn't send the report. Please try again.</p>}
      <button type="submit" disabled={state === "sending"} className="self-start rounded-full bg-jo-navy px-5 py-2.5 font-bold text-white">{state === "sending" ? "Sending…" : "Send report"}</button>
    </form>
  );
}
