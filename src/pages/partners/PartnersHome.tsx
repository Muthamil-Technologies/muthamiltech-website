import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SectionIcon } from "../../components/jo/SectionIcon";
import { useAuth } from "../../lib/auth";
import { sectionById } from "../../lib/joSections";
import { db, KIND_LABEL, type Provider } from "../../lib/listings";
import { PROGRAMS } from "./partnerTypes";

/** "Become a partner": employers (Work), tour agencies and guides (Travel), shop owners (Shop). */
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
    <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6">
      <p className="m-0 text-sm font-bold tracking-wide text-[#4a2f99]">JapanOne Partners</p>
      <h1 className="mb-3 mt-2 text-[36px] font-black sm:text-[44px]">Become a partner</h1>
      <p className="m-0 max-w-2xl text-lg leading-relaxed text-jo-muted">
        Reach people who are learning Japanese and coming to Japan to study, work, travel or shop. Choose the section that fits
        your business. Our team checks every partner and every listing.
      </p>
      <p lang="ja" className="mt-2 text-sm text-jo-muted">日本の企業・団体の皆さまへ：掲載のご案内は日本語でも承ります。</p>
      <p className="mt-2 text-jo-muted">Questions first? <Link to="/contact" className="font-bold text-jo-navy">Contact us →</Link></p>

      <div className="mt-10 grid gap-[18px] md:grid-cols-2 xl:grid-cols-4">
        {PROGRAMS.map((p) => {
          const s = sectionById(p.section)!;
          return (
            <Link key={p.slug} to={`/partners/${p.slug}`} className="flex flex-col gap-3 rounded-[22px] bg-white p-7 text-jo-navy no-underline shadow-[0_6px_20px_rgba(18,38,63,0.06)] hover:shadow-[0_8px_26px_rgba(18,38,63,0.14)]">
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px]" style={{ background: s.tint }}>
                <SectionIcon id={s.id} color={s.ink} size={28} />
              </span>
              <span className="text-sm font-bold" style={{ color: s.tag }}>{p.app}</span>
              <strong className="text-xl font-extrabold">{p.who}</strong>
              <span className="leading-relaxed text-jo-muted">{p.cardBody}</span>
              <span className="mt-auto pt-2 font-bold">Partner with {p.app} →</span>
            </Link>
          );
        })}
      </div>

      {mine && mine.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-black">Your companies</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {mine.map((p) => (
              <Link key={p.id} to={`/partners/p/${p.id}`} className="rounded-[18px] bg-white p-5 text-jo-navy no-underline hover:shadow-md">
                <div className="flex justify-between gap-3">
                  <span className="font-bold">{p.name}</span>
                  <span className="text-xs text-jo-faint">{p.status === "active" ? "Verified" : p.status === "pending" ? "Awaiting verification" : "Suspended"}</span>
                </div>
                <div className="mt-1 text-sm text-jo-muted">{KIND_LABEL[p.kind]}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
