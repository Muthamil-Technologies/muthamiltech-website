import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { supabase } from "../../lib/supabase";

const PURPLE = "#4a2f99";
const KEY = "jo-study-checklist";

// Study tool: a personal checklist from choosing a school to the first weeks in Japan. Ticks are
// saved to the JapanOne account when signed in (user metadata), otherwise in this browser.
const GROUPS: { title: string; items: { id: string; text: string; to?: string }[] }[] = [
  { title: "Plan", items: [
    { id: "type", text: "Choose the type of school that fits your goal", to: "/study" },
    { id: "reqs", text: "Check the entry requirements and Japanese level", to: "/study/schools/language-school" },
    { id: "plan", text: "Make your month-by-month plan", to: "/study/path" },
    { id: "cost", text: "Estimate your costs", to: "/study/cost" },
    { id: "scholar", text: "Look for scholarships", to: "/study/scholarships" },
  ] },
  { title: "Prepare", items: [
    { id: "passport", text: "Make sure your passport is valid" },
    { id: "docs", text: "Get your graduation certificate and transcripts" },
    { id: "funds", text: "Prepare documents showing you can pay your costs", to: "/study/visa" },
    { id: "translate", text: "Get Japanese translations of documents in other languages", to: "/study/visa" },
  ] },
  { title: "Apply", items: [
    { id: "apply", text: "Send your application to the school" },
    { id: "admit", text: "Receive your admission letter and pay tuition" },
    { id: "coe", text: "Receive your Certificate of Eligibility (COE)", to: "/study/visa" },
    { id: "visa", text: "Get your student visa at the Japanese embassy or consulate", to: "/study/visa" },
    { id: "travel", text: "Book your flight and housing" },
  ] },
  { title: "Arrive", items: [
    { id: "address", text: "Register your address within 14 days", to: "/live/address" },
    { id: "insurance", text: "Join National Health Insurance", to: "/guides/live-health-insurance" },
    { id: "work", text: "Get permission before any part-time work", to: "/guides/study-part-time" },
  ] },
];
const TOTAL = GROUPS.reduce((n, g) => n + g.items.length, 0);

function readLocal(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}
function writeLocal(ids: string[]) {
  try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* private mode: keep in memory */ }
}

export function StudyChecklist() {
  const { session } = useAuth();
  const [done, setDone] = useState<string[]>(readLocal);

  useEffect(() => {
    const saved = session?.user.user_metadata?.study_checklist;
    if (Array.isArray(saved)) setDone((local) => Array.from(new Set([...saved, ...local])));
  }, [session]);

  function toggle(id: string) {
    const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
    setDone(next);
    writeLocal(next);
    if (session && supabase) supabase.auth.updateUser({ data: { study_checklist: next } });
  }

  const pct = Math.round((done.length / TOTAL) * 100);
  return (
    <div className="mx-auto max-w-[860px] px-4 py-12 sm:px-6">
      <Link to="/study" className="text-sm font-bold no-underline" style={{ color: PURPLE }}>← Study in Japan</Link>
      <h1 className="mb-2 mt-4 text-[34px] font-black leading-tight sm:text-[40px]">Your study checklist</h1>
      <p className="m-0 text-lg leading-relaxed text-jo-muted">
        Every step from choosing a school to your first weeks in Japan.{" "}
        {session ? "Your ticks are saved to your account." : <>Ticks are saved in this browser. <Link to="/login?next=/study/checklist" className="font-bold text-[#1f4fa8]">Sign in</Link> to keep them on every device.</>}
      </p>

      <div className="mt-6 rounded-[18px] bg-white p-5" aria-live="polite">
        <div className="flex justify-between font-bold"><span>{done.length} of {TOTAL} done</span><span>{pct}%</span></div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#ece6fb]"><div className="h-full rounded-full bg-[#5b3fb0]" style={{ width: `${pct}%` }} /></div>
      </div>

      {GROUPS.map((g) => (
        <section key={g.title} className="mt-6">
          <h2 className="m-0 mb-2 text-xl font-black">{g.title}</h2>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {g.items.map((it) => {
              const on = done.includes(it.id);
              return (
                <li key={it.id} className="flex items-center gap-3 rounded-[14px] bg-white p-4">
                  <input id={`c-${it.id}`} type="checkbox" checked={on} onChange={() => toggle(it.id)} className="h-6 w-6 shrink-0 cursor-pointer accent-[#5b3fb0]" />
                  <label htmlFor={`c-${it.id}`} className={`flex-1 cursor-pointer leading-snug ${on ? "text-jo-faint line-through" : ""}`}>{it.text}</label>
                  {it.to && <Link to={it.to} className="shrink-0 text-sm font-bold" style={{ color: PURPLE }}>How →</Link>}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
