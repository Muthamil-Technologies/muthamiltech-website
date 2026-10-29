import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { JapanOneHeader } from "../components/JapanOneHeader";
import { social } from "../lib/brand";

// japanone.app home: the JapanOne app (Speak + JLPT), then every free tool, grouped by what you
// want to do (learn, travel, work). The tools work in any browser with no sign-up. Update `APPS`
// as each app goes live in a store.

/** The JapanOne app on the App Store (the former JapTalk listing, same Apple ID). */
export const JAPANONE_APP_STORE = "https://apps.apple.com/app/id6807840880";

const JLPT = new Date("2026-12-06T09:00:00+09:00");

type Tool = { to: string; title: string; sub: string; app: string; character: string; countdown?: boolean };
type Section = { id: string; title: string; line: string; tools: Tool[] };

const MARU = "/characters/maru.svg";
const MUSUBI = "/characters/musubi.svg";
const KIKO = "/characters/kiko.svg";

const SECTIONS: Section[] = [
  {
    id: "learn",
    title: "Learn Japanese",
    line: "Speak in real situations and prepare for the JLPT.",
    tools: [
      { to: "/learn/japtutor", title: "JLPT practice test", sub: "N5 · N4 · N3, with answers explained.", app: "JapanOne · JLPT", character: MARU, countdown: true },
      { to: "/japtutor/plan-builder", title: "Your JLPT study plan", sub: "From your exam date and daily time to a plan.", app: "JapanOne · JLPT", character: MARU },
      { to: "/learn/japtalk", title: "Speaking lessons", sub: "Real conversations to read and say aloud.", app: "JapanOne · Speak", character: MARU },
      { to: "/japtalk/level-check", title: "Check your level", sub: "Find where to start in about 2 minutes.", app: "JapanOne · Speak", character: MARU },
    ],
  },
  {
    id: "travel",
    title: "Travel in Japan",
    line: "Plan your days and get by with simple Japanese.",
    tools: [
      { to: "/tour/plan", title: "Plan your trip", sub: "A day-by-day plan with estimated costs.", app: "JapTour", character: MUSUBI },
      { to: "/tour/phrases", title: "Travel phrases", sub: "Hear them, or show them to staff.", app: "JapTour", character: MUSUBI },
    ],
  },
  {
    id: "work",
    title: "Prepare for work",
    line: "Understand the steps and get your documents ready.",
    tools: [
      { to: "/work/pathway", title: "Find your path", sub: "3 questions: the routes, tests and next steps that fit you.", app: "Work in Japan", character: KIKO },
      { to: "/work/cv", title: "Japanese CV (履歴書)", sub: "Fill in your details, then print or save as PDF.", app: "Work in Japan", character: KIKO },
    ],
  },
];

const APPS: { name: string; icon: string; round?: boolean; status: string; href?: string }[] = [
  { name: "JapanOne", icon: "/apps/japanone.png", status: "App Store", href: JAPANONE_APP_STORE },
  { name: "JapTour", icon: "/apps/japtour.png", status: "Coming soon" },
  { name: "JapMart", icon: "🛍️", status: "Coming soon" },
];

function daysToJlpt() {
  return Math.max(0, Math.ceil((JLPT.getTime() - Date.now()) / 86_400_000));
}

export function JapanOneHub() {
  const [days, setDays] = useState(daysToJlpt);
  const { hash } = useLocation();

  useEffect(() => {
    const t = setInterval(() => setDays(daysToJlpt()), 60_000);
    return () => clearInterval(t);
  }, []);
  // The header links are "/#learn" etc.: scroll there on arrival and on each click.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <div className="min-h-screen bg-[#12263f] text-white">
      <JapanOneHeader />
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="pt-10 text-center sm:pt-14">
          <img src="/japanone_logo_180.png" alt="" className="mx-auto h-20 w-20 rounded-full ring-4 ring-white/10" />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">JapanOne</h1>
          <p className="mx-auto mt-2 max-w-xl text-white/70 sm:text-lg">
            Discover Japan through language, travel, work and useful digital tools. From learning Japanese to planning your next step in Japan — your gateway starts here.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#f2c94c]">Free in your browser · No sign-up</p>
        </div>

        <a
          href={JAPANONE_APP_STORE}
          target="_blank"
          rel="noreferrer noopener"
          className="mx-auto mt-8 flex max-w-xl items-center gap-4 rounded-2xl bg-white p-4 text-[#12263f] shadow-lg transition hover:-translate-y-0.5"
        >
          <img src="/apps/japanone.png" alt="" className="h-16 w-16 flex-none rounded-2xl" />
          <div className="min-w-0 flex-1">
            <div className="font-bold">The JapanOne app</div>
            <div className="text-sm opacity-75">Speak Japanese and pass the JLPT, in one free app. No account, no ads.</div>
          </div>
          <span className="flex-none rounded-full bg-[#12263f] px-4 py-2 text-sm font-semibold text-white">App Store</span>
        </a>

        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="mt-12 scroll-mt-20">
            <h2 className="text-2xl font-bold">{s.title}</h2>
            <p className="mt-1 text-white/60">{s.line}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {s.tools.map((t) => (
                <li key={t.to}>
                  <Link to={t.to} className="flex h-full items-center gap-3 rounded-xl bg-[#f2c94c] p-4 text-[#12263f] transition hover:-translate-y-0.5">
                    <img src={t.character} alt="" className="h-11 w-11 flex-none" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold tracking-wider uppercase opacity-70">
                        {t.app}
                        {t.countdown && days > 0 && ` · ${days} ${days === 1 ? "day" : "days"} to the JLPT`}
                      </div>
                      <div className="font-bold leading-snug">{t.title}</div>
                      <div className="text-xs opacity-75">{t.sub}</div>
                    </div>
                    <span className="text-xl" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section id="shop" className="mt-12 scroll-mt-20">
          <h2 className="text-2xl font-bold">Shop from Japan</h2>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-white/25 p-4 sm:max-w-md">
            <span aria-hidden="true" className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#e63946] text-2xl">🛍️</span>
            <div>
              <div className="font-bold">JapMart</div>
              <div className="text-sm text-white/70">Japanese products, shipping all over the world. Coming soon.</div>
            </div>
          </div>
        </section>

        <section id="apps" className="mt-14 scroll-mt-20 border-t border-white/10 pt-10">
          <h2 className="text-xs font-bold tracking-[0.2em] text-white/50 uppercase">Get the apps</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {APPS.map((a) => {
              const body = (
                <>
                  {a.icon.startsWith("/") ? (
                    <img src={a.icon} alt="" className={`h-10 w-10 flex-none ${a.round ? "rounded-full bg-white/10 p-1" : "rounded-xl"}`} />
                  ) : (
                    <span aria-hidden="true" className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#e63946] text-xl">{a.icon}</span>
                  )}
                  <div className="min-w-0">
                    <div className="font-semibold">{a.name}</div>
                    <div className={`text-xs ${a.href ? "text-white" : "text-[#f2c94c]"}`}>{a.href ? `Get it on the ${a.status}` : a.status}</div>
                  </div>
                </>
              );
              return (
                <li key={a.name}>
                  {a.href ? (
                    <a href={a.href} target="_blank" rel="noreferrer noopener" className="flex h-full items-center gap-3 rounded-xl bg-white/10 p-3 ring-1 ring-white/20 hover:bg-white/15">{body}</a>
                  ) : (
                    <div className="flex h-full items-center gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <div className="mt-12 flex justify-center gap-5 text-sm font-semibold text-white/70">
          <a href={social.instagram} target="_blank" rel="noreferrer noopener" className="hover:text-white">Instagram</a>
          <a href={social.tiktok} target="_blank" rel="noreferrer noopener" className="hover:text-white">TikTok</a>
          <a href={social.youtube} target="_blank" rel="noreferrer noopener" className="hover:text-white">YouTube</a>
          <a href={social.facebook} target="_blank" rel="noreferrer noopener" className="hover:text-white">Facebook</a>
        </div>
        <p className="mt-6 text-center text-xs text-white/40">© 2026 Muthamil Technologies</p>
      </div>
    </div>
  );
}
