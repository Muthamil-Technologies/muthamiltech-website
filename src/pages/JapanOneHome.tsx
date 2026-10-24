import { Link } from "react-router-dom";
import { social } from "../lib/brand";

const JLPT = new Date("2026-12-06T09:00:00+09:00");

function daysToJlpt() {
  return Math.ceil((JLPT.getTime() - Date.now()) / 86_400_000);
}

const pillars = [
  {
    id: "learn",
    character: "/characters/maru.svg",
    name: "Maru",
    title: "Learn Japanese",
    body: "Speak real Japanese from day one, and pass the JLPT with a daily plan built from your exam date.",
    apps: [
      { name: "JapTalk", what: "Speaking practice", status: "On the App Store", href: "https://apps.apple.com/app/japtalk/id6807840880" },
      { name: "JapTutor", what: "JLPT N5–N3 study plan", status: "Coming soon", href: "/learn/japtutor" },
    ],
    cta: { label: "Practise free in your browser", to: "/learn" },
  },
  {
    id: "travel",
    character: "/characters/musubi.svg",
    name: "Musubi",
    title: "Travel Japan",
    body: "Day-by-day trip plans that work offline: maps, phrases, food and dietary cards, budget, and ski trips to Niseko and Hakuba.",
    apps: [{ name: "JapTour", what: "Offline trip planner", status: "Coming soon", href: "/#travel" }],
    cta: { label: "Tour agency? Partner with JapTour", to: "/partners/tour" },
  },
  {
    id: "work",
    character: "/characters/kiko.svg",
    name: "Kiko",
    title: "Work in Japan",
    body: "Find your route into a skilled job, write your Japanese CV (履歴書), practise interviews, and know your pay and rights.",
    apps: [{ name: "JapWork", what: "Your path to work in Japan", status: "Coming soon", href: "/#work" }],
    cta: { label: "Employer? Partner with JapWork", to: "/partners/work" },
  },
];

export function JapanOneHome() {
  const days = daysToJlpt();
  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-[#12263f] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <img src="/japanone_logo_512.png" alt="JapanOne — Gateway to Japan" className="h-24 w-24 rounded-full md:h-28 md:w-28" />
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
              Learn. Travel. Work.<br />
              <span className="text-[#f2c94c]">All of Japan, in one place.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/80">
              Free apps that help you learn Japanese, plan your trip and find your way into work in Japan. Made in Japan, for everyone coming here.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/learn" className="rounded-full bg-[#e63946] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#c1121f]">
                Start learning free
              </Link>
              <a href="#apps" className="rounded-full border border-white/60 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white hover:text-[#12263f]">
                See the apps
              </a>
            </div>
          </div>
          <div className="flex items-end justify-center gap-2 sm:gap-4">
            <img src="/characters/musubi.svg" alt="Musubi" className="w-28 sm:w-40" />
            <img src="/characters/maru.svg" alt="Maru" className="w-36 sm:w-52" />
            <img src="/characters/kiko.svg" alt="Kiko" className="w-28 sm:w-40" />
          </div>
        </div>
      </section>

      {/* JLPT countdown */}
      {days > 0 && (
        <section className="bg-[#f2c94c]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
            <div className="flex items-center gap-4">
              <img src="/characters/maru-celebrate.svg" alt="" className="w-14" />
              <div className="text-[#12263f]">
                <div className="text-lg font-extrabold">{days} days to the JLPT</div>
                <div className="text-sm">Sunday, December 6, 2026. Practise a little every day.</div>
              </div>
            </div>
            <Link to="/learn/japtutor" className="rounded-full bg-[#12263f] px-6 py-3 text-sm font-semibold text-white hover:bg-black">
              Try a free JLPT practice test
            </Link>
          </div>
        </section>
      )}

      {/* Three pillars */}
      <section id="apps" className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-ink md:text-4xl">Wherever you are on your Japan journey</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.id} id={p.id} className="flex flex-col rounded-3xl border border-line bg-surface p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#12263f]">
                    <img src={p.character} alt={p.name} className="h-16" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-ink">{p.title}</h3>
                    <div className="text-xs text-ink-faint">with {p.name}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink-soft">{p.body}</p>
                <div className="mt-5 flex flex-col gap-2">
                  {p.apps.map((a) => (
                    <a key={a.name} href={a.href} className="flex items-center justify-between rounded-xl border border-line px-4 py-3 hover:border-ink">
                      <span>
                        <span className="font-semibold text-ink">{a.name}</span>
                        <span className="ml-2 text-sm text-ink-soft">{a.what}</span>
                      </span>
                      <span className={`text-xs font-semibold ${a.status === "On the App Store" ? "text-green-700" : "text-ink-faint"}`}>{a.status}</span>
                    </a>
                  ))}
                </div>
                <Link to={p.cta.to} className="mt-auto pt-6 text-sm font-semibold text-accent hover:underline">
                  {p.cta.label} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practise now */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Practise right now, no download</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["JLPT practice test", "N5 questions with answers explained", "/learn/japtutor"],
              ["Speaking lessons", "Real conversations from JapTalk", "/learn/japtalk"],
              ["Check your level", "Find where to start in 2 minutes", "/japtalk/level-check"],
              ["Build your study plan", "From your exam date to a daily plan", "/japtutor/plan-builder"],
            ].map(([t, b, to]) => (
              <Link key={to} to={to} className="rounded-2xl border border-line bg-paper p-5 hover:shadow-md">
                <div className="font-semibold text-ink">{t}</div>
                <div className="mt-1 text-sm text-ink-soft">{b}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Follow */}
      <section className="bg-[#12263f] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-14">
          <div className="flex items-center gap-5">
            <img src="/characters/maru.svg" alt="" className="w-20" />
            <div>
              <div className="text-2xl font-bold">A new Japanese challenge every day</div>
              <div className="mt-1 text-white/75">Follow @japanone_app. Can you answer before the countdown ends?</div>
            </div>
          </div>
          <div className="flex gap-3">
            {[
              ["TikTok", social.tiktok],
              ["YouTube", social.youtube],
              ["Instagram", social.instagram],
            ].map(([n, href]) => (
              <a key={n} href={href} target="_blank" rel="noreferrer noopener" className="rounded-full border border-white/50 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#12263f]">
                {n}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-14">
          <div>
            <div className="text-xl font-bold text-ink">Employers and tour agencies</div>
            <div className="mt-1 text-ink-soft">Reach foreign workers and travellers in JapWork and JapTour. Free during our launch period.</div>
          </div>
          <Link to="/partners" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-accent-deep">
            Become a partner
          </Link>
        </div>
      </section>
    </>
  );
}
