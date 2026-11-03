import { useState } from "react";
import { kanjiForToday } from "../../lib/joContent";

// Today's five-kanji reading quiz: pick the reading, see the answer and meaning, go on.
export function DailyKanji() {
  const day = kanjiForToday();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= day.words.length;
  const w = day.words[Math.min(i, day.words.length - 1)];

  const pick = (k: number) => {
    if (picked !== null) return;
    setPicked(k);
    if (k === w.answer_index) setScore((s) => s + 1);
  };
  const next = () => { setPicked(null); setI((n) => n + 1); };
  const restart = () => { setPicked(null); setI(0); setScore(0); };

  return (
    <article className="flex flex-col gap-4 rounded-[28px] bg-jo-navy p-7 text-white">
      {done ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-6 text-center">
          <p className="t-heading m-0">{score}/{day.words.length}</p>
          <p className="m-0 text-[#d9e1ec]">A new set every day at 17:30.</p>
          <button type="button" onClick={restart} className="cursor-pointer rounded-full bg-jo-yellow px-5 py-3 font-bold text-jo-navy">Try again</button>
        </div>
      ) : (
        <>
          <div lang="ja" className="text-center text-[72px] font-black leading-none">{w.word}</div>
          <p className="m-0 text-center text-[#d9e1ec]" aria-live="polite">
            {picked === null ? "How do you read it?" : picked === w.answer_index ? `Correct! ${w.meaning}` : `It's ${w.reading}: ${w.meaning}`}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {w.options.map((o, k) => {
              const state = picked === null ? "" : k === w.answer_index ? "bg-[#17714c] border-[#17714c]" : k === picked ? "bg-[#9e2232] border-[#9e2232]" : "opacity-60";
              return (
                <button key={o} type="button" lang="ja" onClick={() => pick(k)} disabled={picked !== null}
                  className={`cursor-pointer rounded-xl border border-white/25 bg-white/10 p-3 text-lg text-white disabled:cursor-default ${state}`}>
                  {o}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <button type="button" onClick={next} className="cursor-pointer self-end rounded-full bg-jo-yellow px-5 py-2.5 font-bold text-jo-navy">
              {i + 1 < day.words.length ? "Next →" : "See score"}
            </button>
          )}
        </>
      )}
      <p className="m-0 mt-auto text-[#d9e1ec]">
        Today's kanji quiz · {day.level} · {done ? "done" : `${i + 1} of ${day.words.length}`}
      </p>
    </article>
  );
}
