import { useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  db, DETAIL_FIELDS, DETAIL_TABLE, LANGS, mediaUrl, PRODUCT_LABEL, PRODUCT_OF, STATUS_LABEL, STATUS_TONE,
  type Details, type Field, type Listing, type Product, type Provider,
} from "../../lib/listings";

type Media = { id: string; path: string; sort: number };
type Review = { decision: string; reason: string | null; created_at: string };

const input = "mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-accent disabled:opacity-60";

function FieldInput({ f, value, onChange, disabled }: { f: Field; value: unknown; onChange: (v: unknown) => void; disabled: boolean }) {
  if (f.type === "select")
    return (
      <select disabled={disabled} required={f.required} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value || null)} className={input}>
        <option value="">—</option>
        {f.options!.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    );
  if (f.type === "multi") {
    const set = new Set((value as string[]) ?? []);
    return (
      <div className="mt-1 flex flex-wrap gap-2">
        {f.options!.map(([v, l]) => (
          <label key={v} className={`cursor-pointer rounded-full border px-3 py-1 text-sm ${set.has(v) ? "border-accent bg-red-50 text-ink" : "border-line text-ink-soft"}`}>
            <input type="checkbox" className="hidden" disabled={disabled} checked={set.has(v)}
              onChange={() => { if (set.has(v)) set.delete(v); else set.add(v); onChange([...set]); }} />
            {l}
          </label>
        ))}
      </div>
    );
  }
  if (f.type === "bool")
    return <input type="checkbox" disabled={disabled} checked={!!value} onChange={(e) => onChange(e.target.checked)} className="mt-2 h-5 w-5" />;
  if (f.type === "list" || f.type === "dates")
    return (
      <textarea disabled={disabled} rows={3} value={((value as string[]) ?? []).join("\n")}
        placeholder={f.type === "dates" ? "2026-12-01\n2026-12-15" : ""}
        onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} className={input} />
    );
  return (
    <input disabled={disabled} required={f.required} type={f.type === "number" ? "number" : "text"} value={(value as string | number) ?? ""}
      onChange={(e) => onChange(f.type === "number" ? (e.target.value === "" ? null : Number(e.target.value)) : e.target.value)} className={input} />
  );
}

export function ListingEditor() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [provider, setProvider] = useState<Provider | null>(null);
  const [listing, setListing] = useState<Partial<Listing>>({ title: "", summary: "", default_lang: "en", languages: ["en"], area: "", external_url: "" });
  const [details, setDetails] = useState<Details>({});
  const [media, setMedia] = useState<Media[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [msg, setMsg] = useState<{ tone: "ok" | "err"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const product: Product | null = provider ? PRODUCT_OF[provider.kind] : null;
  const editable = isNew || listing.status === "draft" || listing.status === "rejected";

  useEffect(() => {
    (async () => {
      let providerId = params.get("provider");
      if (!isNew) {
        const { data: l } = await db().from("listings").select("*").eq("id", id!).single();
        if (!l) return setMsg({ tone: "err", text: "Listing not found." });
        setListing(l as Listing);
        providerId = (l as Listing).provider_id;
        const { data: d } = await db().from(DETAIL_TABLE[(l as Listing).product]).select("*").eq("listing_id", id!).maybeSingle();
        setDetails((d as Details) ?? {});
        const { data: m } = await db().from("listing_media").select("*").eq("listing_id", id!).order("sort");
        setMedia((m as Media[]) ?? []);
        const { data: r } = await db().from("listing_reviews").select("decision, reason, created_at").eq("listing_id", id!).order("created_at", { ascending: false });
        setReviews((r as Review[]) ?? []);
      }
      const { data: p } = await db().from("providers").select("*").eq("id", providerId!).single();
      setProvider(p as Provider);
    })();
  }, [id, isNew, params]);

  async function save(): Promise<string | null> {
    if (!product || !provider) return null;
    setBusy(true);
    setMsg(null);
    try {
      const fields = { title: listing.title, summary: listing.summary || null, default_lang: listing.default_lang, languages: listing.languages, area: listing.area || null, external_url: listing.external_url || null };
      let listingId = listing.id ?? null;
      if (!listingId) {
        const { data, error } = await db().from("listings").insert({ ...fields, provider_id: provider.id, product }).select("id").single();
        if (error) throw error;
        listingId = data.id as string;
      } else {
        const { error } = await db().from("listings").update({ ...fields, status: "draft" }).eq("id", listingId);
        if (error) throw error;
      }
      const missing = DETAIL_FIELDS[product].filter((f) => f.required && (details[f.key] === undefined || details[f.key] === null || details[f.key] === ""));
      if (missing.length === 0) {
        const { listing_id: _ignored, ...rest } = details;
        const { error } = await db().from(DETAIL_TABLE[product]).upsert({ ...rest, listing_id: listingId });
        if (error) throw error;
      }
      setMsg({ tone: "ok", text: missing.length ? `Saved as draft. Still needed before submitting: ${missing.map((f) => f.label).join(", ")}.` : "Saved." });
      if (isNew) navigate(`/partners/listing/${listingId}`, { replace: true });
      else setListing((l) => ({ ...l, status: "draft" }));
      return listingId;
    } catch (e) {
      setMsg({ tone: "err", text: e instanceof Error ? e.message : String(e) });
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    const listingId = await save();
    if (!listingId) return;
    const { error } = await db().rpc("submit_listing", { p_listing: listingId });
    if (error) return setMsg({ tone: "err", text: error.message });
    setListing((l) => ({ ...l, status: "submitted" }));
    setMsg({ tone: "ok", text: "Sent for review. We usually check listings within 1–2 working days." });
  }

  async function withdraw() {
    const { error } = await db().rpc("withdraw_listing", { p_listing: listing.id });
    if (error) return setMsg({ tone: "err", text: error.message });
    setListing((l) => ({ ...l, status: "draft" }));
    setMsg({ tone: "ok", text: "Back to draft. Edit it and submit again; it will be reviewed again." });
  }

  async function upload(e: ChangeEvent<HTMLInputElement>) {
    const files = [...(e.target.files ?? [])];
    if (!listing.id || !provider) return;
    for (const [i, file] of files.entries()) {
      const path = `${provider.id}/${listing.id}/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
      const up = await db().storage.from("listing-media").upload(path, file, { contentType: file.type });
      if (up.error) return setMsg({ tone: "err", text: up.error.message });
      const { data, error } = await db().from("listing_media").insert({ listing_id: listing.id, path, sort: media.length + i }).select("*").single();
      if (error) return setMsg({ tone: "err", text: error.message });
      setMedia((m) => [...m, data as Media]);
    }
  }

  async function removePhoto(m: Media) {
    await db().storage.from("listing-media").remove([m.path]);
    await db().from("listing_media").delete().eq("id", m.id);
    setMedia((all) => all.filter((x) => x.id !== m.id));
  }

  if (!provider || !product) return <div className="mx-auto max-w-3xl px-6 py-14 text-ink-soft">{msg?.text ?? "Loading…"}</div>;
  const status = listing.status;

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Link to={`/partners/p/${provider.id}`} className="text-sm font-semibold text-accent">&larr; {provider.name}</Link>
      <div className="mt-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink">{isNew ? `New ${PRODUCT_LABEL[product].toLowerCase()}` : listing.title}</h1>
        {status && <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_TONE[status]}`}>{STATUS_LABEL[status]}</span>}
      </div>

      {reviews[0] && reviews[0].decision === "rejected" && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <div className="font-semibold">Changes needed</div>
          <div className="mt-1">{reviews[0].reason ?? "Please check the listing and submit it again."}</div>
        </div>
      )}
      {!editable && (
        <div className="mt-6 rounded-xl border border-line bg-surface p-4 text-sm text-ink-soft">
          {status === "submitted" ? "This listing is being reviewed." : status === "published" ? "This listing is live." : "This listing can't be edited."}{" "}
          {(status === "submitted" || status === "published") && (
            <button onClick={withdraw} className="font-semibold text-accent">Withdraw to edit</button>
          )}
        </div>
      )}

      <section className="mt-8 grid gap-4 rounded-2xl border border-line bg-surface p-6">
        <label className="text-sm">
          <span className="font-medium text-ink">Title *</span>
          <input disabled={!editable} required value={listing.title ?? ""} onChange={(e) => setListing({ ...listing, title: e.target.value })} className={input} />
        </label>
        <label className="text-sm">
          <span className="font-medium text-ink">Description</span>
          <textarea disabled={!editable} rows={5} value={listing.summary ?? ""} onChange={(e) => setListing({ ...listing, summary: e.target.value })} className={input} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="font-medium text-ink">{product === "item" ? "Ships from (country)" : "Area (prefecture / city)"}</span>
            <input disabled={!editable} value={listing.area ?? ""} onChange={(e) => setListing({ ...listing, area: e.target.value })} className={input} />
          </label>
          <label className="text-sm">
            <span className="font-medium text-ink">Written in</span>
            <select disabled={!editable} value={listing.default_lang} onChange={(e) => setListing({ ...listing, default_lang: e.target.value, languages: [e.target.value] })} className={input}>
              {LANGS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="mt-6 grid gap-4 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-2">
        <h2 className="text-lg font-semibold text-ink sm:col-span-2">{PRODUCT_LABEL[product]} details</h2>
        {DETAIL_FIELDS[product].map((f) => (
          <label key={f.key} className={`text-sm ${f.type === "multi" || f.type === "list" || f.type === "dates" || f.key === "apply_target" || f.key.endsWith("_url") ? "sm:col-span-2" : ""}`}>
            <span className="font-medium text-ink">{f.label}{f.required && " *"}</span>
            <FieldInput f={f} value={details[f.key]} disabled={!editable} onChange={(v) => setDetails({ ...details, [f.key]: v })} />
            {f.hint && <span className="mt-1 block text-xs text-ink-faint">{f.hint}</span>}
          </label>
        ))}
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-surface p-6">
        <h2 className="text-lg font-semibold text-ink">Photos</h2>
        {!listing.id ? (
          <p className="mt-2 text-sm text-ink-soft">Save the listing first, then add photos.</p>
        ) : (
          <>
            <div className="mt-3 flex flex-wrap gap-3">
              {media.map((m) => (
                <div key={m.id} className="relative">
                  <img src={mediaUrl(m.path)} alt="" className="h-28 w-28 rounded-lg object-cover" />
                  {editable && <button onClick={() => removePhoto(m)} className="absolute top-1 right-1 rounded-full bg-ink/80 px-2 text-xs text-paper">✕</button>}
                </div>
              ))}
            </div>
            {editable && <input type="file" accept="image/*" multiple onChange={upload} className="mt-4 text-sm" />}
          </>
        )}
      </section>

      {msg && <p className={`mt-6 text-sm ${msg.tone === "ok" ? "text-green-700" : "text-accent"}`}>{msg.text}</p>}
      {editable && (
        <div className="mt-6 flex flex-wrap gap-3">
          <button disabled={busy || !listing.title} onClick={save} className="rounded-full border border-line px-6 py-3 font-semibold text-ink disabled:opacity-50">
            Save draft
          </button>
          <button disabled={busy || !listing.title} onClick={submit} className="rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-accent-deep disabled:opacity-50">
            Submit for review
          </button>
        </div>
      )}
      <p className="mt-8 text-xs text-ink-faint">
        Listings must be accurate and legal. {product === "job" ? "Never charge applicants any fee. " : ""}We may remove any listing that breaks our rules.
      </p>
    </div>
  );
}
