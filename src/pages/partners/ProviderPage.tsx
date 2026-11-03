import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { programFor } from "./partnerTypes";
import { KIND_JA, PRODUCT_JA, STATUS_JA, UI } from "../../data/partnerJa";
import { LangSwitch, usePartnerLang } from "../../lib/partnerLang";
import { db, KIND_LABEL, PRODUCT_LABEL, PRODUCT_OF, STATUS_LABEL, STATUS_TONE, type Listing, type Provider } from "../../lib/listings";

export function ProviderPage() {
  const { id } = useParams();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = usePartnerLang();
  const ja = lang === "ja";
  const t = (x: { en: string; ja: string }) => x[lang];

  useEffect(() => {
    db().from("providers").select("*").eq("id", id!).single().then(({ data, error }) => {
      if (error) setError("notMember");
      else setProvider(data as Provider);
    });
    db().from("listings").select("*").eq("provider_id", id!).order("updated_at", { ascending: false })
      .then(({ data }) => setListings((data as Listing[]) ?? []));
  }, [id]);

  if (error) return <div className="mx-auto max-w-3xl px-6 py-14 text-ink-soft">{t(UI.notMember)}</div>;
  if (!provider) return <div className="mx-auto max-w-3xl px-6 py-14 text-ink-soft">{t(UI.loading)}</div>;
  const product = PRODUCT_OF[provider.kind];

  return (
    <div lang={lang} className="mx-auto max-w-4xl px-6 py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link to={programFor(provider.kind) ? `/partners/${programFor(provider.kind)!.slug}` : "/partners"} className="text-sm font-semibold text-accent">&larr; {programFor(provider.kind)?.app ?? "JapanOne"} {t(UI.partners)}</Link>
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">{provider.name}</h1>
          <div className="mt-1 text-sm text-ink-soft">{ja ? KIND_JA[provider.kind] : KIND_LABEL[provider.kind]}</div>
        </div>
        <Link
          to={`/partners/listing/new?provider=${provider.id}`}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-accent-deep"
        >
          {ja ? `+ ${PRODUCT_JA[product]}を新規作成` : `+ New ${PRODUCT_LABEL[product].toLowerCase()}`}
        </Link>
      </div>

      {provider.status !== "active" && (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          {provider.status === "pending" ? t(UI.verifying) : t(UI.suspendedMsg)}
        </div>
      )}

      <h2 className="mt-10 text-lg font-semibold text-ink">{t(UI.listings)}</h2>
      {listings.length === 0 ? (
        <p className="mt-3 text-sm text-ink-soft">{t(UI.noListings)}</p>
      ) : (
        <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
          {listings.map((l) => (
            <li key={l.id}>
              <Link to={`/partners/listing/${l.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper">
                <div>
                  <div className="font-medium text-ink">{l.title}</div>
                  <div className="text-xs text-ink-faint">
                    {l.area ?? ""} {l.expires_at && l.status === "published" ? (ja ? `· ${new Date(l.expires_at).toLocaleDateString("ja-JP")}まで` : `· until ${new Date(l.expires_at).toLocaleDateString()}`) : ""}
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_TONE[l.status]}`}>{ja ? STATUS_JA[l.status] : STATUS_LABEL[l.status]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
