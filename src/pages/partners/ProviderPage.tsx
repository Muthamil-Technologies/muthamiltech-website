import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db, KIND_LABEL, PRODUCT_LABEL, PRODUCT_OF, STATUS_LABEL, STATUS_TONE, type Listing, type Provider } from "../../lib/listings";

export function ProviderPage() {
  const { id } = useParams();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    db().from("providers").select("*").eq("id", id!).single().then(({ data, error }) => {
      if (error) setError("Company not found, or you're not a member of it.");
      else setProvider(data as Provider);
    });
    db().from("listings").select("*").eq("provider_id", id!).order("updated_at", { ascending: false })
      .then(({ data }) => setListings((data as Listing[]) ?? []));
  }, [id]);

  if (error) return <div className="mx-auto max-w-3xl px-6 py-14 text-ink-soft">{error}</div>;
  if (!provider) return <div className="mx-auto max-w-3xl px-6 py-14 text-ink-soft">Loading…</div>;
  const product = PRODUCT_OF[provider.kind];

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <Link to="/partners" className="text-sm font-semibold text-accent">&larr; Partners</Link>
      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">{provider.name}</h1>
          <div className="mt-1 text-sm text-ink-soft">{KIND_LABEL[provider.kind]}</div>
        </div>
        <Link
          to={`/partners/listing/new?provider=${provider.id}`}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-accent-deep"
        >
          + New {PRODUCT_LABEL[product].toLowerCase()}
        </Link>
      </div>

      {provider.status !== "active" && (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          {provider.status === "pending"
            ? "We're verifying your company. You can prepare and submit listings now; they go live once you're verified and each listing is approved."
            : "This company is suspended, so its listings are hidden. Contact hello@muthamiltech.com."}
        </div>
      )}

      <h2 className="mt-10 text-lg font-semibold text-ink">Listings</h2>
      {listings.length === 0 ? (
        <p className="mt-3 text-sm text-ink-soft">No listings yet.</p>
      ) : (
        <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
          {listings.map((l) => (
            <li key={l.id}>
              <Link to={`/partners/listing/${l.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper">
                <div>
                  <div className="font-medium text-ink">{l.title}</div>
                  <div className="text-xs text-ink-faint">
                    {l.area ?? ""} {l.expires_at && l.status === "published" ? `· until ${new Date(l.expires_at).toLocaleDateString()}` : ""}
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_TONE[l.status]}`}>{STATUS_LABEL[l.status]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
