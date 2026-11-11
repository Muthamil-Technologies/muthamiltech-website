import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GuideList, Heading } from "../../components/jo/SectionParts";
import { SectionIcon } from "../../components/jo/SectionIcon";
import { GUIDES } from "../../lib/joContent";
import { ANDROID_BETA_URL, APP_STORE_URL, JLPT_DATE, MENU_SECTIONS, SHOW_PARTNERS } from "../../lib/joSections";

const daysToJlpt = () => Math.ceil((JLPT_DATE.getTime() - Date.now()) / 86400_000);

const POPULAR = [
  { label: "MEXT scholarship", to: "/guides/study-mext" },
  { label: "Part-time work rules", to: "/guides/study-part-time" },
  { label: "Japanese CV", to: "/work/cv" },
  { label: "Take-home pay", to: "/work/salary" },
];

export function JOHome() {
  const days = daysToJlpt();
  return (
    <>
      <Hero days={days} />

      {/* Sections */}
      <section className="relative mx-auto -mt-10 max-w-[1200px] px-4 sm:px-6" aria-label="Sections">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" data-reveal>
          {MENU_SECTIONS.map((s) => (
            <Link key={s.id} to={`/${s.id}`} className="lift flex flex-col gap-3 rounded-[24px] bg-white px-5 py-6 text-jo-navy no-underline">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: s.tint }}>
                <SectionIcon id={s.id} color={s.ink} size={30} />
              </span>
              <span className="text-[24px] font-black leading-none">{s.label}</span>
              <span className="leading-snug text-jo-muted">{s.line}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
        {/* Guides */}
        <section className="pt-24">
          <Heading title="Guides" link={{ to: "/guides", label: `All ${GUIDES.length} guides →` }} />
          <GuideList guides={GUIDES.slice(0, 6)} showSection />
        </section>

        {/* Partners */}
        {SHOW_PARTNERS && <section className="pt-24">
          <div className="rounded-[28px] bg-jo-navy text-white">
            <div className="flex flex-col gap-4 p-7 sm:p-11" data-reveal>
              <h2 className="t-heading m-0 text-white">Reach people coming to Japan</h2>
              <p className="m-0 max-w-[48ch] leading-relaxed text-[#d9e1ec]">Schools, employers, tour agencies and sellers: create a partner account and add your school, jobs, tours or products. We review each listing before it goes live.</p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/partners" className="rounded-full bg-jo-yellow px-6 py-3.5 font-bold text-jo-navy no-underline">Become a partner →</Link>
                <span lang="ja" className="t-small text-[#b9c6d6]">日本語でもご案内しています</span>
              </div>
            </div>
          </div>
        </section>}

        {/* App */}
        <section className="pt-24">
          <div className="flex flex-wrap items-center gap-7 rounded-[28px] bg-white p-8 sm:p-10" data-reveal>
            <img src="/japanone_logo_180.png" alt="" className="h-24 w-24 rounded-full" />
            <div className="flex min-w-0 flex-[999_1_380px] flex-col gap-2">
              <h2 className="t-heading m-0">Get the JapanOne app</h2>
              <p className="m-0 leading-relaxed text-jo-muted">The Japanese game, sample tests, speaking practice and pay calculators on your phone, no account needed. On Android? Try the beta before launch.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={APP_STORE_URL} className="rounded-full bg-jo-navy px-6 py-3.5 font-bold text-white no-underline">Download on the App Store</a>
              <a href={ANDROID_BETA_URL} target="_blank" rel="noopener" className="rounded-full border-2 border-jo-navy px-6 py-3 font-bold text-jo-navy no-underline">Join the Android beta</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function Hero({ days }: { days: number }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <section className="overflow-hidden bg-jo-navy text-white">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[2fr_1fr] lg:pt-16" data-reveal>
        <div className="flex min-w-0 flex-col gap-6">
          <h1 className="m-0 text-[clamp(48px,5.6vw,84px)] font-black leading-[0.98] tracking-[-0.03em]">Your gateway <br className="hidden sm:block" />to <span className="text-jo-yellow">Japan</span></h1>
          <p className="m-0 max-w-[40ch] text-[20px] leading-relaxed text-[#d9e1ec]">Learn Japanese and get ready to study, work, travel and live in Japan, all in one app.</p>
          <form role="search" onSubmit={(e) => { e.preventDefault(); navigate(`/search?q=${encodeURIComponent(q.trim())}`); }}
            className="flex max-w-[640px] gap-2 rounded-2xl bg-white p-2">
            <label htmlFor="jo-q" className="sr-only">Search JapanOne</label>
            <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3">
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5a6b80" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
              <input id="jo-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search guides, tools…"
                className="w-full min-w-0 border-0 bg-transparent py-3 text-[17px] text-jo-navy outline-none" />
            </div>
            <button type="submit" className="shrink-0 cursor-pointer rounded-xl bg-jo-navy px-5 py-3.5 font-bold text-white sm:px-7">Search</button>
          </form>
          <div className="flex flex-wrap items-center gap-2">
            <span className="t-small text-[#b9c6d6]">Popular:</span>
            {POPULAR.map((p) => (
              <Link key={p.label} to={p.to} className="t-small rounded-full bg-white/10 px-3.5 py-1.5 text-white no-underline hover:bg-white/20">{p.label}</Link>
            ))}
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-[260px] justify-center sm:max-w-[360px]">
          <div className="relative flex aspect-square w-[78%] items-end justify-center rounded-full bg-jo-red lg:w-full">
            <img src="/characters/maru.svg" alt="Maru, the JapanOne mascot" className="relative -mb-2 h-auto w-[86%]" />
          </div>
          {days > 0 && (
            <div className="absolute bottom-3 left-0 flex flex-col rounded-2xl bg-white px-4 py-3 text-jo-navy">
              <span className="t-small font-bold text-jo-muted">JLPT · Dec 6</span>
              <span className="text-[24px] font-black leading-tight">{days} days left</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { Heading };
