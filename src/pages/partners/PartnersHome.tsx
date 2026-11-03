import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heading, Steps } from "../../components/jo/SectionParts";
import { SectionIcon } from "../../components/jo/SectionIcon";
import { ASK, FAQ, FOUNDING, HERO, PLANS, PRICE_LATER, PRICE_NOTE, PROGRAM_JA, SHOW_PRICES, STEPS, WE_DO, WE_DONT, yen } from "../../data/partnerPlans";
import { useAuth } from "../../lib/auth";
import { LangSwitch, usePartnerLang, type Lang } from "../../lib/partnerLang";
import { sectionById } from "../../lib/joSections";
import { db, KIND_LABEL, type Provider } from "../../lib/listings";
import { PROGRAMS } from "./partnerTypes";

const L = {
  who: { en: "Choose your partner type", ja: "パートナーの種類を選ぶ" },
  whatWeDo: { en: "What JapanOne does", ja: "JapanOne が行うこと" },
  whatWeDont: { en: "What we don't do", ja: "JapanOne が行わないこと" },
  plans: { en: "Plans", ja: "料金プラン" },
  month: { en: "/ month", ja: "/ 月（税抜）" },
  shops: { en: "Shops", ja: "ショップ" },
  how: { en: "How it works", ja: "ご利用の流れ" },
  faq: { en: "Questions", ja: "よくあるご質問" },
  yours: { en: "Your companies", ja: "登録済みの事業者" },
} as const;

/** "Become a partner": the program, plans and prices, in English or Japanese (?lang=ja). */
export function PartnersHome() {
  const { session } = useAuth();
  const [lang, setLang] = usePartnerLang();
  const t = (x: Record<Lang, string>) => x[lang];
  const [mine, setMine] = useState<Provider[] | null>(null);

  useEffect(() => {
    if (!session) return;
    db()
      .from("provider_members")
      .select("providers(*)")
      .eq("user_id", session.user.id)
      .then(({ data }) => setMine(((data ?? []) as unknown as { providers: Provider }[]).map((r) => r.providers).filter(Boolean)));
  }, [session]);

  // Links to /partners#plans from other pages: scroll to that part once it has rendered.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <div lang={lang}>
      <header className="bg-jo-navy text-white">
        <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:pb-20" data-reveal>
          <div className="mb-8 flex justify-end">
            <LangSwitch lang={lang} setLang={setLang} dark />
          </div>
          <h1 className="t-section m-0 max-w-[16ch]">{t(HERO.title)}</h1>
          <p className="m-0 mt-5 max-w-[46ch] text-[20px] leading-relaxed text-[#d9e1ec]">{t(HERO.line)}</p>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <a href="#types" className="rounded-full bg-jo-yellow px-6 py-3.5 font-bold text-jo-navy no-underline">{t(HERO.cta)} →</a>
            <Link to="/contact?topic=other" className="font-bold text-white">{t(ASK)} →</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
        {/* Founding offer */}
        <section className="pt-16">
          <div className="grid gap-6 rounded-[28px] bg-jo-yellow p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr]" data-reveal>
            <h2 className="t-heading m-0">{t(FOUNDING.title)}</h2>
            <div>
              <ul className="m-0 flex flex-col gap-2.5 pl-6 text-[20px] leading-snug">
                {FOUNDING.points.map((p) => <li key={p.en}>{t(p)}</li>)}
              </ul>
              <p className="m-0 mt-5 leading-relaxed">{t(FOUNDING.note)}</p>
            </div>
          </div>
        </section>

        {/* Partner types */}
        <section className="scroll-mt-20 pt-20" id="types">
          <Heading title={t(L.who)} />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-reveal>
            {PROGRAMS.map((p) => {
              const s = sectionById(p.section)!;
              const ja = PROGRAM_JA[p.slug];
              return (
                <Link key={p.slug} to={`/partners/${p.slug}`} className="lift flex flex-col gap-3 rounded-[28px] bg-white p-7 text-jo-navy no-underline">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: s.tint }}>
                    <SectionIcon id={s.id} color={s.ink} size={30} />
                  </span>
                  <span className="t-title">{lang === "ja" ? ja.who : p.who}</span>
                  <span className="leading-relaxed text-jo-muted">{lang === "ja" ? ja.cardBody : p.cardBody}</span>
                  <span className="mt-auto pt-2 font-bold" style={{ color: s.tag }}>{lang === "ja" ? ja.cta : `Partner with ${p.app}`} →</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* What we do / don't */}
        <section className="pt-20">
          <div className="grid gap-4 md:grid-cols-[1.3fr_1fr]" data-reveal>
            <div className="rounded-[28px] bg-white p-7 sm:p-10">
              <h2 className="t-heading m-0">{t(L.whatWeDo)}</h2>
              <ul className="m-0 mt-5 flex flex-col gap-3 pl-6 text-[20px] leading-snug">
                {WE_DO.map((x) => <li key={x.en}>{t(x)}</li>)}
              </ul>
            </div>
            <div className="rounded-[28px] bg-jo-navy p-7 text-white sm:p-10">
              <h2 className="t-heading m-0 text-white">{t(L.whatWeDont)}</h2>
              <ul className="m-0 mt-5 flex flex-col gap-3 pl-6 text-[20px] leading-snug text-[#d9e1ec]">
                {WE_DONT.map((x) => <li key={x.en}>{t(x)}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="pt-20">
          <Heading id="plans" title={t(L.plans)} />
          <div className="grid gap-4 lg:grid-cols-3" data-reveal>
            {PLANS.map((p) => {
              const featured = p.id === "featured";
              const soft = featured ? "text-[#d9e1ec]" : "text-jo-muted";
              return (
                <article key={p.id} className={`flex flex-col gap-4 rounded-[28px] p-7 sm:p-9 ${featured ? "bg-jo-navy text-white" : "bg-white"}`}>
                  <h3 className="t-title m-0">{t(p.name)}</h3>
                  <p className={`m-0 ${soft}`}>{t(p.line)}</p>
                  {p.price === 0 || SHOW_PRICES ? (
                    <>
                      <p className="m-0">
                        <span className={`text-[44px] font-black leading-none ${featured ? "text-jo-yellow" : ""}`}>{yen(p.price, lang)}</span>
                        {p.price > 0 && <span className={`ml-1 ${soft}`}>{t(L.month)}</span>}
                      </p>
                      {p.price > 0 && <p className={`m-0 font-bold ${soft}`}>{t(L.shops)}: {yen(p.shopPrice, lang)} {t(L.month)}</p>}
                    </>
                  ) : (
                    <p className={`m-0 text-[20px] font-bold leading-snug ${soft}`}>{t(PRICE_LATER)}</p>
                  )}
                  <ul className="m-0 mt-2 flex flex-col gap-2 pl-6 leading-snug">
                    {p.features.map((f) => <li key={f.en}>{t(f)}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>
          <p className="t-small m-0 mt-4 max-w-[80ch] text-jo-muted">{t(PRICE_NOTE)}</p>
        </section>

        {/* How it works */}
        <section className="pt-20">
          <Heading title={t(L.how)} />
          <Steps items={STEPS.map((s) => ({ title: t(s.title), text: t(s.text) }))} color="#12263f" />
        </section>

        {/* FAQ */}
        <section className="pt-20">
          <Heading title={t(L.faq)} />
          <dl className="m-0 grid gap-x-10 gap-y-6 rounded-[28px] bg-white p-7 sm:p-10 md:grid-cols-2" data-reveal>
            {FAQ.map((f) => (
              <div key={f.q.en}>
                <dt className="t-title">{t(f.q)}</dt>
                <dd className="m-0 mt-2 leading-relaxed">{t(f.a)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6">
            <Link to="/contact?topic=other" className="font-bold text-jo-navy">{t(ASK)} →</Link>
          </p>
        </section>

        {mine && mine.length > 0 && (
          <section className="pt-16">
            <Heading title={t(L.yours)} />
            <div className="grid gap-3 sm:grid-cols-2">
              {mine.map((p) => (
                <Link key={p.id} to={`/partners/p/${p.id}`} className="lift rounded-[22px] bg-white p-5 text-jo-navy no-underline">
                  <div className="flex justify-between gap-3">
                    <span className="font-bold">{p.name}</span>
                    <span className="t-small text-jo-muted">{p.status === "active" ? "Verified" : p.status === "pending" ? "Awaiting verification" : "Suspended"}</span>
                  </div>
                  <div className="t-small mt-1 text-jo-muted">{KIND_LABEL[p.kind]}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
