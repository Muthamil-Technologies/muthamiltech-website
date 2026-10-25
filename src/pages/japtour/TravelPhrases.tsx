import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// JapTour's travel phrases in the browser: recorded audio (the app's Polly files) and a
// full-screen "show to staff" view for each phrase.

type Phrase = { id: string; en: string; ja: string; romaji: string };
type Group = { title: string; emoji?: string; phrases: Phrase[] };

export function TravelPhrases() {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [shown, setShown] = useState<Phrase | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/learn/japtour_phrases.json").then((r) => r.json()).then((j) => setGroups(j.groups));
  }, []);

  function play(id: string) {
    audio.current?.pause();
    audio.current = new Audio(`/tour/phrases/${id}.mp3`);
    void audio.current.play().catch(() => undefined);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/" className="text-sm font-semibold text-accent">&larr; JapanOne</Link>
      <div className="mt-6 text-xs font-bold tracking-[0.2em] text-accent uppercase">JapTour · Travel phrases</div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Japanese for your trip</h1>
      <p className="mt-2 text-ink-soft">Tap ▶ to hear it, or "Show" to hold your phone up for staff to read.</p>

      {!groups && <p className="mt-8 text-ink-soft">Loading…</p>}
      {groups?.map((g) => (
        <section key={g.title} className="mt-8">
          <h2 className="text-lg font-bold text-ink">{g.emoji} {g.title}</h2>
          <ul className="mt-3 grid gap-2">
            {g.phrases.map((p) => (
              <li key={p.id} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
                <button onClick={() => play(p.id)} className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ink text-paper" aria-label={`Play: ${p.en}`}>▶</button>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-ink-soft">{p.en}</div>
                  <div className="text-lg font-semibold text-ink" lang="ja">{p.ja}</div>
                  <div className="text-xs text-ink-faint">{p.romaji}</div>
                </div>
                <button onClick={() => setShown(p)} className="flex-none rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-ink">Show</button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {shown && (
        <button onClick={() => setShown(null)} className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white p-8 text-center" aria-label="Close">
          <span className="text-5xl leading-tight font-bold text-[#12263f] sm:text-6xl" lang="ja">{shown.ja}</span>
          <span className="text-lg text-[#12263f]/60">{shown.en}</span>
          <span className="text-sm text-[#12263f]/40">Tap anywhere to close</span>
        </button>
      )}

      <p className="mt-10 text-sm text-ink-soft">
        Plan where to go next: <Link to="/tour/plan" className="font-semibold text-accent">JapTour trip planner →</Link>
      </p>
    </div>
  );
}
