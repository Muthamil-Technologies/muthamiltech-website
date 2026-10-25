import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { social } from "../lib/brand";

// japanone.app as a link-in-bio page while the full JapanOne site is prepared: the apps and
// where to get them, a few features, and what can be tried now in the browser (the free JLPT
// practice test the countdown videos point to sits under JapTutor).
// Update `status`/`href` as each app goes live in a store.

const JLPT = new Date("2026-12-06T09:00:00+09:00");

type App = {
  name: string;
  line: string;
  /** Image path, or an emoji for apps without an icon yet. */
  icon: string;
  round?: boolean;
  links: { label: string; href: string }[];
  status?: string;
  /** A few real features, shown as chips. */
  features?: string[];
  /** Something to try right now in the browser. `highlight` = the JLPT countdown card. */
  tryIt?: { to: string; title: string; sub: string; highlight?: boolean };
};

const APPS: App[] = [
  {
    name: "JapTalk",
    line: "Speak Japanese in real situations",
    icon: "/apps/japtalk.png",
    links: [{ label: "App Store", href: "https://apps.apple.com/app/japtalk/id6807840880" }],
    status: "Android coming soon",
    features: ["Type or say each sentence", "Real-life conversations", "Paths for travel, daily life and work", "Grammar help when stuck", "Works offline"],
    tryIt: { to: "/learn/japtalk", title: "Try speaking lessons in your browser", sub: "Real conversations to read and say aloud." },
  },
  {
    name: "JapTutor",
    line: "JLPT N5–N3 study plan from your exam date",
    icon: "/apps/japtutor.png",
    links: [],
    status: "Coming soon to the App Store and Google Play",
    features: ["Study plan to your exam date", "Kanji, vocabulary & grammar", "Reading & listening with audio", "Timed mock exams", "Daily tests", "Reminders"],
    tryIt: { to: "/learn/japtutor", title: "Free JLPT practice test", sub: "N5 · N4 · N3, with answers explained. No sign-up.", highlight: true },
  },
  {
    name: "JapTour",
    line: "Offline Japan trip planner, ski season included",
    icon: "/apps/japtour.png",
    links: [],
    status: "Coming soon to the App Store and Google Play",
    features: ["Day-by-day itineraries", "Works offline", "Phrases with audio", "Food & dietary cards", "Ski: Niseko, Hakuba", "Budget tracker"],
  },
  {
    name: "JapWork",
    line: "Prepare step by step for work in Japan",
    icon: "/characters/kiko.svg",
    round: true,
    links: [],
    status: "In development",
    features: ["Work pathway finder", "Japanese CV (履歴書) maker", "Interview practice", "Pay & rights checker"],
  },
  {
    name: "JapMart",
    line: "Japanese products, shipping all over the world",
    icon: "🛍️",
    links: [],
    status: "In development",
    features: ["Products from shops in Japan", "Worldwide shipping"],
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
          <p className="mx-auto mt-2 max-w-sm text-white/70">Discover Japan through language, travel, work and useful digital tools. From learning Japanese to planning your next step in Japan — your gateway starts here.</p>
        </div>

        <h2 className="mt-8 text-xs font-bold tracking-[0.2em] text-white/50 uppercase">Our apps</h2>
        <ul className="mt-3 space-y-3">
          {APPS.map((a) => (
            <li key={a.name} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-4">
                {a.icon.startsWith("/") ? (
                  <img src={a.icon} alt="" className={`h-14 w-14 flex-none ${a.round ? "rounded-full bg-white/10 p-1" : "rounded-2xl"}`} />
                ) : (
                  <span aria-hidden="true" className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-[#e63946] text-3xl">{a.icon}</span>
                )}
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
              {a.features && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {a.features.map((f) => (
                    <li key={f} className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80">{f}</li>
                  ))}
                </ul>
              )}
              {a.tryIt && (
                <Link
                  to={a.tryIt.to}
                  className={`mt-3 flex items-center gap-3 rounded-xl p-3 transition hover:-translate-y-0.5 ${
                    a.tryIt.highlight ? "bg-[#f2c94c] text-[#12263f]" : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  {a.tryIt.highlight && <img src="/characters/maru.svg" alt="" className="h-11 w-11 flex-none" />}
                  <div className="flex-1">
                    {a.tryIt.highlight && days > 0 && (
                      <div className="text-[11px] font-bold tracking-wider uppercase">{days} {days === 1 ? "day" : "days"} to the JLPT</div>
                    )}
                    <div className="font-bold">{a.tryIt.title}</div>
                    <div className={`text-xs ${a.tryIt.highlight ? "opacity-75" : "text-white/70"}`}>{a.tryIt.sub}</div>
                  </div>
                  <span className="text-xl" aria-hidden="true">→</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center gap-5 text-sm font-semibold text-white/70">
          <a href={social.instagram} target="_blank" rel="noreferrer noopener" className="hover:text-white">Instagram</a>
          <a href={social.tiktok} target="_blank" rel="noreferrer noopener" className="hover:text-white">TikTok</a>
          <a href={social.youtube} target="_blank" rel="noreferrer noopener" className="hover:text-white">YouTube</a>
          <a href={social.facebook} target="_blank" rel="noreferrer noopener" className="hover:text-white">Facebook</a>
        </div>
        <p className="mt-6 text-center text-xs text-white/40">© 2026 JapanOne</p>
      </div>
    </div>
  );
}
