import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DailyKanji } from "../../components/jo/DailyKanji";
import { GuideCard } from "../../components/jo/GuideCard";
import { SectionIcon } from "../../components/jo/SectionIcon";
import { GUIDES } from "../../lib/joContent";
import { APP_STORE_URL, JLPT_DATE, SECTIONS } from "../../lib/joSections";

const daysToJlpt = () => Math.ceil((JLPT_DATE.getTime() - Date.now()) / 86400_000);

const POPULAR = [
  { label: "MEXT scholarship", to: "/guides/study-mext" },
  { label: "Part-time work rules", to: "/guides/study-part-time" },
  { label: "Japanese CV", to: "/work/cv" },
  { label: "JLPT N4", to: "/learn/jlpt" },
];

const JOURNEY = [
  { n: "01", title: "Plan", text: "Intake dates, real costs, JLPT and EJU, which visa fits you", to: "/study" },
  { n: "02", title: "Prepare", text: "Certificate of Eligibility, proof of funds, red flags to avoid", to: "/study" },
  { n: "03", title: "Arrive", text: "Your first 14 days: city hall, insurance, pension, bank", to: "/live" },
  { n: "04", title: "Work & stay", text: "Changing jobs, taxes, pension refund, permanent residency", to: "/work" },
];

export function JOHome() {
  const days = daysToJlpt();
  return (
    <>
      <Hero days={days} />

      {/* Six sections */}
      <section className="relative mx-auto -mt-9 max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          {SECTIONS.map((s) => (
            <Link key={s.id} to={`/${s.id}`} className="flex flex-col gap-2.5 rounded-[18px] bg-white px-[18px] py-[22px] text-jo-navy no-underline shadow-[0_6px_20px_rgba(18,38,63,0.08)] hover:shadow-[0_8px_26px_rgba(18,38,63,0.14)]">
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px]" style={{ background: s.tint }}>
                <SectionIcon id={s.id} color={s.ink} size={28} />
              </span>
              <strong className="text-xl font-extrabold">{s.label}</strong>
              <span className="text-sm leading-normal text-jo-muted">{s.line}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Today */}
      <section className="mx-auto max-w-[1200px] px-4 pb-6 pt-[72px] sm:px-6">
        <Heading tag="LEARN · TODAY" tagColor="#1f4fa8" title="Practise for 5 minutes" link={{ to: "/learn", label: "All lessons →" }} />
        <div className="grid gap-[18px] md:grid-cols-3">
          <DailyKanji />
          <article className="flex flex-col gap-3.5 rounded-[22px] bg-white p-7 shadow-[0_6px_20px_rgba(18,38,63,0.06)]">
            <span className="text-[13px] font-bold text-[#1f4fa8]">SPEAKING · AT WORK</span>
            <h3 className="m-0 text-2xl font-extrabold">Asking your manager for a day off</h3>
            <p lang="ja" className="m-0 text-[22px] leading-relaxed">来週の金曜日、<br />休んでもいいですか。</p>
            <p className="m-0 text-jo-muted">May I take next Friday off?</p>
            <Link to="/learn/speaking" className="mt-auto self-start rounded-full bg-[#e3ecfb] px-[18px] py-3 font-bold text-jo-navy no-underline">Practise speaking →</Link>
          </article>
          <article className="flex flex-col gap-3.5 rounded-[22px] bg-jo-yellow p-7">
            <span className="text-[13px] font-bold">JLPT PLAN</span>
            <h3 className="m-0 text-2xl font-extrabold">Take a 2-minute level check</h3>
            <p className="m-0 leading-relaxed">Find your level, then get a day-by-day plan to the exam{days > 0 ? `, ${days} days away` : ""}.</p>
            <div className="mt-auto flex items-end justify-between gap-2">
              <Link to="/learn/level-check" className="rounded-full bg-jo-navy px-[18px] py-3 font-bold text-white no-underline">Start →</Link>
              <img src="/characters/maru-celebrate.svg" alt="" className="h-auto w-[110px]" />
            </div>
          </article>
        </div>
      </section>

      {/* Journey */}
      <section className="mx-auto max-w-[1200px] px-4 pb-6 pt-16 sm:px-6">
        <Heading tag="STUDY & WORK IN JAPAN" tagColor="#4a2f99" title="Step by step, from home to your first day" />
        <ol className="m-0 grid list-none gap-3.5 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((j) => (
            <li key={j.n}>
              <Link to={j.to} className="flex h-full flex-col gap-2 rounded-[18px] bg-white p-[22px] text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">
                <span aria-hidden="true" className="text-[32px] font-black text-[#9aa8ba]">{j.n}</span>
                <strong className="text-xl">{j.title}</strong>
                <span className="leading-relaxed text-jo-muted">{j.text}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Guides */}
      <section className="mx-auto max-w-[1200px] px-4 pb-6 pt-16 sm:px-6">
        <Heading title="Good to know" link={{ to: "/guides", label: "All guides →" }} />
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => <GuideCard key={g.id} guide={g} />)}
        </div>
      </section>

      {/* Travel + Shop */}
      <section className="mx-auto max-w-[1200px] px-4 pb-6 pt-16 sm:px-6">
        <div className="grid gap-[18px] md:grid-cols-2">
          <article className="flex flex-col gap-3 rounded-3xl bg-[#fdeadb] p-8">
            <span className="text-[13px] font-bold text-[#9a4612]">TRAVEL</span>
            <h3 className="m-0 text-[30px] font-black leading-tight">Plan your Japan trip in a minute</h3>
            <p className="m-0 leading-relaxed text-[#4a3a2e]">Pick your days, cities and interests. Get a day-by-day plan with the phrases you will need.</p>
            <Link to="/travel/plan" className="mt-2 self-start rounded-full bg-jo-navy px-5 py-3 font-bold text-white no-underline">Plan a trip →</Link>
          </article>
          <article className="flex flex-col gap-3 rounded-3xl bg-[#fbe3e6] p-8">
            <span className="flex items-center gap-2 text-[13px] font-bold text-[#9e2232]">SHOP <span className="rounded-full bg-white px-2.5 py-0.5 text-[12px]">Coming soon</span></span>
            <h3 className="m-0 text-[30px] font-black leading-tight">Made in Japan, from local sellers</h3>
            <p className="m-0 leading-relaxed text-[#4a2e33]">Snacks, stationery, kitchen tools and crafts from small Japanese shops. Are you a Japanese seller? Join before we open.</p>
            <Link to="/partners/shop" className="mt-2 self-start rounded-full bg-jo-navy px-5 py-3 font-bold text-white no-underline">Sellers: join early →</Link>
          </article>
        </div>
      </section>

      {/* Partners */}
      <section className="mx-auto max-w-[1200px] px-4 pb-6 pt-16 sm:px-6">
        <div className="flex flex-wrap items-center gap-8 rounded-[28px] bg-jo-navy p-8 text-white sm:p-11">
          <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-3.5">
            <span className="text-sm font-bold tracking-wide text-jo-yellow">FOR SCHOOLS, EMPLOYERS, TOUR AGENCIES &amp; SELLERS</span>
            <h2 className="m-0 text-[34px] font-black leading-tight sm:text-[38px]">Reach people who are coming to Japan</h2>
            <p className="m-0 text-[17px] leading-[1.7] text-[#d9e1ec]">Create a partner account, add your school, jobs, tours or products, and we review each listing before it goes live.</p>
          </div>
          <div className="flex flex-[1_1_260px] flex-col gap-2.5">
            <Link to="/partners" className="rounded-[14px] bg-jo-yellow px-[22px] py-4 text-center text-[17px] font-bold text-jo-navy no-underline">Become a partner</Link>
            <span lang="ja" className="text-center text-sm text-[#b9c6d6]">日本語でもご案内しています</span>
          </div>
        </div>
      </section>

      {/* App */}
      <section className="mx-auto max-w-[1200px] px-4 pb-[72px] pt-16 sm:px-6">
        <div className="flex flex-wrap items-center gap-7 rounded-[28px] bg-white p-8 sm:p-10">
          <img src="/japanone_logo_180.png" alt="" className="h-24 w-24 rounded-full" />
          <div className="flex min-w-0 flex-[999_1_380px] flex-col gap-2">
            <h2 className="m-0 text-[32px] font-black">Everything in one app</h2>
            <p className="m-0 leading-relaxed text-jo-muted">Speaking practice, JLPT prep and daily kanji on your iPhone.</p>
          </div>
          <a href={APP_STORE_URL} className="rounded-xl bg-jo-navy px-[22px] py-3.5 font-bold text-white no-underline">Download on the App Store</a>
        </div>
      </section>
    </>
  );
}

function Hero({ days }: { days: number }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <section className="overflow-hidden bg-jo-navy text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-10 px-4 pb-[72px] pt-14 sm:px-6">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-[22px]">
          <h1 className="m-0 text-[44px] font-black leading-[1.08] sm:text-[64px]">Your gateway<br />to <span className="text-jo-yellow">Japan</span></h1>
          <p className="m-0 max-w-[560px] text-xl leading-relaxed text-[#d9e1ec]">Learn Japanese, find a school or a job, plan your trip and shop Made in Japan. All in one app, with one account.</p>
          <form role="search" onSubmit={(e) => { e.preventDefault(); navigate(`/search?q=${encodeURIComponent(q.trim())}`); }}
            className="flex max-w-[640px] flex-wrap gap-2 rounded-2xl bg-white p-2">
            <label htmlFor="jo-q" className="sr-only">Search JapanOne</label>
            <div className="flex flex-[1_1_240px] items-center gap-2.5 px-3">
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5a6b80" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
              <input id="jo-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search lessons, guides, tools…"
                className="w-full border-0 bg-transparent py-3 text-[17px] text-jo-navy outline-none" />
            </div>
            <button type="submit" className="cursor-pointer rounded-xl bg-jo-navy px-[26px] py-3.5 text-base font-bold text-white">Search</button>
          </form>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="py-1.5 text-[#b9c6d6]">Popular:</span>
            {POPULAR.map((p) => (
              <Link key={p.label} to={p.to} className="rounded-full border border-white/30 px-3.5 py-1.5 text-white no-underline hover:border-white">{p.label}</Link>
            ))}
          </div>
        </div>
        <div className="relative flex flex-[1_1_300px] justify-center">
          <div className="flex h-[300px] w-[300px] items-end justify-center rounded-full sm:h-[340px] sm:w-[340px]"
            style={{ background: "radial-gradient(circle at 50% 45%, #e63946 0 46%, transparent 47%)" }}>
            <img src="/characters/maru.svg" alt="Maru, the JapanOne mascot" className="h-auto w-[240px] sm:w-[280px]" />
          </div>
          {days > 0 && (
            <div className="absolute bottom-[18px] left-0 flex flex-col gap-0.5 rounded-[14px] bg-white px-4 py-3 text-jo-navy shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <span className="text-xs font-bold text-jo-faint">JLPT · Dec 6</span>
              <span className="text-[26px] font-black">{days} days left</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Heading({ tag, tagColor, title, link }: { tag?: string; tagColor?: string; title: string; link?: { to: string; label: string } }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        {tag && <p className="m-0 mb-1.5 text-sm font-bold tracking-wide" style={{ color: tagColor }}>{tag}</p>}
        <h2 className="m-0 text-[30px] font-black sm:text-[38px]">{title}</h2>
      </div>
      {link && <Link to={link.to} className="font-bold text-jo-navy no-underline">{link.label}</Link>}
    </div>
  );
}
