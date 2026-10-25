import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { social } from "../lib/brand";

// japanone.app as a link-in-bio page while the full JapanOne site is prepared: the apps and
// where to get them, plus the free JLPT practice test the countdown videos point to.
// Update `status`/`href` as each app goes live in a store.

const JLPT = new Date("2026-12-06T09:00:00+09:00");

type App = {
  name: string;
  line: string;
  icon: string;
  round?: boolean;
  links: { label: string; href: string }[];
  status?: string;
};

const APPS: App[] = [
  {
    name: "JapTalk",
    line: "Speak Japanese in real situations",
    icon: "/apps/japtalk.png",
    links: [{ label: "App Store", href: "https://apps.apple.com/app/japtalk/id6807840880" }],
    status: "Android coming soon",
  },
  {
    name: "JapTutor",
    line: "JLPT N5–N3 study plan from your exam date",
    icon: "/apps/japtutor.png",
    links: [],
    status: "Coming soon to the App Store and Google Play",
  },
  {
    name: "JapTour",
    line: "Offline Japan trip planner, ski season included",
    icon: "/apps/japtour.png",
    links: [],
    status: "Coming soon to the App Store and Google Play",
  },
  {
    name: "JapWork",
    line: "Prepare step by step for work in Japan",
    icon: "/characters/kiko.svg",
    round: true,
    links: [],
    status: "In development",
  },
];

function daysToJlpt() {
  return Math.max(0, Math.ceil((JLPT.getTime() - Date.now()) / 86_400_000));
}

export function JapanOneLinks() {
  const [days, setDays] = useState(daysToJlpt);
  useEffect(() => {
    const t = setInterval(() => setDays(daysToJlpt()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#12263f] px-5 pt-12 pb-16 text-white">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <img src="/japanone_logo_180.png" alt="JapanOne" className="mx-auto h-24 w-24 rounded-full ring-4 ring-white/10" />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">JapanOne</h1>
          <p className="mt-1 text-white/70">Free apps for learning Japanese and travelling in Japan</p>
        </div>

        {days > 0 && (
          <Link
            to="/learn/japtutor"
            className="mt-8 flex items-center gap-4 rounded-2xl bg-[#f2c94c] p-4 text-[#12263f] shadow-lg transition hover:-translate-y-0.5"
          >
            <img src="/characters/maru.svg" alt="" className="h-14 w-14 flex-none" />
            <div className="flex-1">
              <div className="text-xs font-bold tracking-wider uppercase">{days} {days === 1 ? "day" : "days"} to the JLPT</div>
              <div className="text-lg font-bold">Free JLPT practice test</div>
              <div className="text-sm opacity-75">N5 questions with answers. No sign-up.</div>
            </div>
            <span className="text-2xl" aria-hidden="true">→</span>
          </Link>
        )}

        <h2 className="mt-10 text-xs font-bold tracking-[0.2em] text-white/50 uppercase">Our apps</h2>
        <ul className="mt-3 space-y-3">
          {APPS.map((a) => (
            <li key={a.name} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-4">
                <img src={a.icon} alt="" className={`h-14 w-14 flex-none ${a.round ? "rounded-full bg-white/10 p-1" : "rounded-2xl"}`} />
                <div className="min-w-0 flex-1">
                  <div className="text-lg font-bold">{a.name}</div>
                  <div className="text-sm text-white/70">{a.line}</div>
                </div>
              </div>
              {(a.links.length > 0 || a.status) && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {a.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#12263f] hover:bg-[#f2c94c]"
                    >
                      Get it on the {l.label}
                    </a>
                  ))}
                  {a.status && <span className="text-xs font-medium text-[#f2c94c]">{a.status}</span>}
                </div>
              )}
            </li>
          ))}
        </ul>

        <Link to="/learn/japtalk" className="mt-6 block rounded-2xl bg-white/5 p-4 text-center font-semibold ring-1 ring-white/10 hover:bg-white/10">
          Try speaking lessons in your browser →
        </Link>

        <div className="mt-10 flex justify-center gap-5 text-sm font-semibold text-white/70">
          <a href={social.instagram} target="_blank" rel="noreferrer noopener" className="hover:text-white">Instagram</a>
          <a href={social.tiktok} target="_blank" rel="noreferrer noopener" className="hover:text-white">TikTok</a>
          <a href={social.youtube} target="_blank" rel="noreferrer noopener" className="hover:text-white">YouTube</a>
        </div>
        <p className="mt-6 text-center text-xs text-white/40">© 2026 JapanOne</p>
      </div>
    </div>
  );
}
