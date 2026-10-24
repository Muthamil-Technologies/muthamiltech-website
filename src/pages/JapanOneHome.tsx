import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { social } from "../lib/brand";

const JLPT = new Date("2026-12-06T09:00:00+09:00");
const NAVY = "bg-[#12263f]";

type AppStatus = { label: string; live: boolean; href?: string };
const COMING: AppStatus = { label: "Coming soon", live: false };

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const ms = Math.max(0, target.getTime() - now);
  return {
    done: ms === 0,
    days: Math.floor(ms / 86_400_000),
    hrs: Math.floor(ms / 3_600_000) % 24,
    min: Math.floor(ms / 60_000) % 60,
    sec: Math.floor(ms / 1000) % 60,
  };
}

function Wave({ flip, className }: { flip?: boolean; className: string }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={`block h-10 w-full md:h-14 ${className}`} style={flip ? { transform: "scaleY(-1)" } : undefined} aria-hidden="true">
      <path d="M0 60 C 360 0 1080 0 1440 60 L1440 60 L0 60 Z" fill="currentColor" />
    </svg>
  );
}

function Badge({ status }: { status: AppStatus }) {
  const cls = status.live ? "bg-green-100 text-green-800" : "bg-white/10 text-[#f2c94c] ring-1 ring-[#f2c94c]/40";
  return status.href ? (
    <a href={status.href} target="_blank" rel="noreferrer noopener" className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${cls} hover:underline`}>
      {status.label}
    </a>
  ) : (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>{status.label}</span>
  );
}

function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase ${light ? "bg-[#12263f]/5 text-[#12263f]" : "bg-white/10 text-[#ff6b6b]"}`}>
      {children}
    </span>
  );
}

const workTiles: [string, string, string][] = [
  ["🧭", "Pathway finder", "See which visa route fits you for caregiving, construction, food, factory, hotel and more, and the tests you need."],
  ["📄", "Japanese CV (履歴書)", "Answer in simple English; JapWork writes the Japanese CV for you as a PDF."],
  ["🎤", "Interview practice", "Hear real interview questions in Japanese and compare your answer with examples."],
  ["⚖️", "Pay & rights checker", "Check overtime pay against the law, know your rights, and spot warning signs."],
];

const practise: [string, string, string, string][] = [
  ["📝", "JLPT practice test", "JLPT-style N5 questions, with answers explained.", "/learn/japtutor"],
  ["🗣️", "Speaking lessons", "Real conversations from JapTalk to read and say aloud.", "/learn/japtalk"],
  ["📊", "Check your level", "Find where to start in about 2 minutes.", "/japtalk/level-check"],
  ["🗓️", "Build your study plan", "From your exam date to a daily plan.", "/japtutor/plan-builder"],
];

export function JapanOneHome() {
  const c = useCountdown(JLPT);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="font-sans">
      {/* Hero */}
      <section id="top" className={`${NAVY} text-white`}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-10 md:grid-cols-2 md:pt-24">
          <div>
            <Eyebrow>Gateway to Japan</Eyebrow>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              Learn. Travel. Work.
              <span className="mt-2 block text-[#f2c94c]">All of Japan, in one place.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/80">
              JapanOne is a family of free apps that help you speak Japanese, plan your trip, and find your path to working in Japan.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/learn" className="rounded-full bg-[#e63946] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#e63946]/30 hover:bg-[#c1121f]">
                Start learning free
              </Link>
              <a href="#learn" className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white hover:text-[#12263f]">
                See the apps
              </a>
            </div>
          </div>
          <div className="flex items-end justify-center gap-3 sm:gap-6">
            <img src="/characters/maru.svg" alt="Maru, the lucky cat" className="w-32 sm:w-44" />
            <img src="/characters/musubi.svg" alt="Musubi, the rice ball" className="w-24 sm:w-32" />
            <img src="/characters/kiko.svg" alt="Kiko, the Shiba" className="w-28 sm:w-40" />
          </div>
        </div>
      </section>

      {/* JLPT countdown */}
      {!c.done && (
        <section className="bg-[#f2c94c] text-[#12263f]">
          <Wave flip className="text-[#12263f]" />
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 py-6">
            <div className="flex items-center gap-4">
              <img src="/characters/maru-celebrate.svg" alt="" className="w-16" />
              <div>
                <div className="text-xs font-bold tracking-[0.18em] uppercase opacity-70">Days to the JLPT</div>
                <div className="font-bold">Sunday, 6 December 2026</div>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-5" aria-label={`${c.days} days to the JLPT`}>
              {(
                [
                  [c.days, "days"],
                  [pad(c.hrs), "hrs"],
                  [pad(c.min), "min"],
                  [pad(c.sec), "sec"],
                ] as const
              ).map(([v, l], i) => (
                <div key={l} className="flex items-start gap-3 sm:gap-5">
                  {i > 0 && <span className="pt-2 text-2xl font-bold opacity-40">:</span>}
                  <div className="text-center">
                    <div className="text-4xl font-extrabold tabular-nums sm:text-5xl">{v}</div>
                    <div className="text-[11px] font-bold tracking-widest uppercase opacity-60">{l}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/learn/japtutor" className="rounded-full bg-[#12263f] px-6 py-3 text-sm font-semibold text-white hover:bg-black">
              Try a free practice test
            </Link>
          </div>
          <Wave className="text-[#12263f]" />
        </section>
      )}

      {/* Learn */}
      <section id="learn" className={`${NAVY} text-white`}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Learn Japanese</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">Speak, study, and pass the JLPT.</h2>
            <p className="mt-4 max-w-xl text-white/75">Whether you're starting from zero or aiming for N3, learn with Maru, for free.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="text-lg font-bold">JapTalk</div>
                <p className="mt-2 text-sm text-white/75">Speaking-first lessons for real situations in Japan. Type or say each sentence aloud. Works offline.</p>
                <div className="mt-4">
                  <Badge status={{ label: "On the App Store", live: true, href: "https://apps.apple.com/app/japtalk/id6807840880" }} />
                </div>
              </div>
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="text-lg font-bold">JapTutor</div>
                <p className="mt-2 text-sm text-white/75">A JLPT N5–N3 study plan built from your exam date, with lessons, flashcards and mock exams.</p>
                <div className="mt-4"><Badge status={COMING} /></div>
              </div>
            </div>
            <Link to="/learn" className="mt-8 inline-block text-sm font-semibold text-[#ff6b6b] hover:underline">
              Practise free in your browser &rarr;
            </Link>
          </div>
          <img src="/characters/maru.svg" alt="" className="mx-auto hidden w-56 md:block" />
        </div>
      </section>

      {/* Travel */}
      <section id="travel" className="bg-white text-[#12263f]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-[auto_1fr]">
          <img src="/characters/musubi.svg" alt="" className="mx-auto hidden w-48 md:block" />
          <div>
            <Eyebrow light>Travel Japan</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">Plan your Japan trip.</h2>
            <p className="mt-4 max-w-xl text-[#12263f]/70">
              Day-by-day itineraries that work offline, from cherry blossom walks in Kyoto to powder snow in Niseko and Hakuba. Plan with Musubi.
            </p>
            <div className="mt-8 rounded-2xl border border-[#12263f]/10 p-6 shadow-sm">
              <div className="text-lg font-bold">JapTour</div>
              <p className="mt-2 text-sm text-[#12263f]/70">
                An offline trip planner: itineraries by days and interests, maps hand-off, phrases, food and dietary cards, budget and spending tracker. No account needed.
              </p>
              <div className="mt-4">
                <span className="inline-block rounded-full bg-[#f2c94c]/30 px-3 py-1 text-xs font-semibold text-[#12263f]">Coming soon</span>
              </div>
            </div>
            <Link to="/partners/tour" className="mt-6 inline-block text-sm font-semibold text-[#e63946] hover:underline">
              Tour agency? Partner with JapTour &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className={`${NAVY} text-white`}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Work in Japan</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">Find your path to working in Japan.</h2>
            <p className="mt-4 max-w-xl text-white/75">
              JapWork helps people preparing for skilled and hands-on jobs in Japan: the right visa route, the tests, the Japanese CV, the interview, and your rights at work. With Kiko.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {workTiles.map(([icon, t, b]) => (
                <div key={t} className="flex gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#e63946]/20 text-xl">{icon}</div>
                  <div>
                    <div className="font-semibold">{t}</div>
                    <p className="mt-1 text-sm text-white/70">{b}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <Badge status={COMING} />
              <Link to="/partners/work" className="text-sm font-semibold text-[#ff6b6b] hover:underline">
                Employer? Partner with JapWork &rarr;
              </Link>
            </div>
          </div>
          <img src="/characters/kiko.svg" alt="" className="mx-auto hidden w-52 md:block" />
        </div>
      </section>

      {/* Practise now */}
      <section className="bg-[#f7f7f5] text-[#12263f]">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Practise now — no download needed.</h2>
          <p className="mt-3 text-[#12263f]/65">Free in your browser, no sign-up needed. Sign in only if you want your progress on every device.</p>
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            {practise.map(([icon, t, b, to]) => (
              <Link key={to} to={to} className="rounded-2xl border border-[#12263f]/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e63946]/10 text-xl">{icon}</div>
                <div className="mt-4 font-semibold">{t}</div>
                <p className="mt-1 text-sm text-[#12263f]/65">{b}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Follow */}
      <section className={`${NAVY} text-white`}>
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <img src="/characters/maru.svg" alt="" className="mx-auto w-20" />
          <h2 className="mt-4 text-2xl font-bold md:text-3xl">Follow @japanone_app for a daily Japanese challenge.</h2>
          <p className="mt-2 text-white/70">A new question every day. Can you answer before the countdown ends?</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {(
              [
                ["TikTok", social.tiktok],
                ["YouTube", social.youtube],
                ["Instagram", social.instagram],
              ] as const
            ).map(([n, href]) => (
              <a key={n} href={href} target="_blank" rel="noreferrer noopener" className="rounded-full bg-white/5 px-5 py-2.5 text-sm ring-1 ring-white/15 hover:bg-white hover:text-[#12263f]">
                <span className="font-semibold">{n}</span> <span className="opacity-60">@japanone_app</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-[#f2c94c] text-[#12263f]">
        <Wave flip className="text-[#12263f]" />
        <div className="mx-auto max-w-5xl px-6 py-14 text-center">
          <span className="inline-block rounded-full bg-[#12263f]/10 px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase">Free during launch</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Become a partner.</h2>
          <p className="mx-auto mt-3 max-w-xl text-[#12263f]/75">Reach foreign workers and travellers in our apps. Every partner and listing is checked by our team.</p>
          <div className="mt-10 grid gap-5 text-left sm:grid-cols-2">
            <Link to="/partners/work" className="rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-lg font-bold">Employers</div>
              <p className="mt-2 text-sm text-[#12263f]/70">Post jobs for foreign workers in caregiving, construction, food service, factory and hotel work. Shown in JapWork.</p>
              <div className="mt-4 text-sm font-semibold text-[#e63946]">Partner with JapWork &rarr;</div>
            </Link>
            <Link to="/partners/tour" className="rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-lg font-bold">Tour agencies</div>
              <p className="mt-2 text-sm text-[#12263f]/70">List your Japan tours and day trips for travellers planning their trip. Shown in JapTour.</p>
              <div className="mt-4 text-sm font-semibold text-[#e63946]">Partner with JapTour &rarr;</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
