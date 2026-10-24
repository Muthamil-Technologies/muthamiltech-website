import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { db, KIND_LABEL, type Provider } from "../../lib/listings";
import { PROGRAMS } from "./partnerTypes";

/** "Become a partner": choose JapWork (employers) or JapTour (tour agencies). */
export function PartnersHome() {
  const { session } = useAuth();
  const [mine, setMine] = useState<Provider[] | null>(null);

  useEffect(() => {
    if (!session) return;
    db()
      .from("provider_members")
      .select("providers(*)")
      .eq("user_id", session.user.id)
      .then(({ data }) => setMine(((data ?? []) as unknown as { providers: Provider }[]).map((r) => r.providers).filter(Boolean)));
  }, [session]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase">JapanOne Partners</div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Become a partner</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Reach the people our apps serve. Choose the app that fits your business. Every partner and listing is checked by our team.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {PROGRAMS.map((p) => (
          <Link key={p.slug} to={`/partners/${p.slug}`} className="group rounded-2xl border border-line bg-surface p-7 transition hover:border-ink hover:shadow-md">
            <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase">{p.app}</div>
            <div className="mt-2 text-xl font-semibold text-ink">{p.who}</div>
            <p className="mt-2 text-sm text-ink-soft">{p.cardBody}</p>
            <div className="mt-5 text-sm font-semibold text-ink group-hover:text-accent">Partner with {p.app} &rarr;</div>
          </Link>
        ))}
      </div>

      {mine && mine.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-ink">Your companies</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {mine.map((p) => (
              <Link key={p.id} to={`/partners/p/${p.id}`} className="rounded-xl border border-line bg-surface p-5 hover:shadow-md">
                <div className="flex justify-between gap-3">
                  <span className="font-semibold text-ink">{p.name}</span>
                  <span className="text-xs text-ink-faint">{p.status === "active" ? "Verified" : p.status === "pending" ? "Awaiting verification" : "Suspended"}</span>
                </div>
                <div className="mt-1 text-sm text-ink-soft">{KIND_LABEL[p.kind]}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
