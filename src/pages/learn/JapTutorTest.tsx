import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { loadProgress, saveProgress, saveTestResult } from "../../lib/progress";

type Item = {
  key: string;
  itemType: string;
  instruction: string;
  stem: string;
  options: string[];
  correctIndex: number;
  explanation: string | null;
  passage: string | null;
  underline: string | null;
};

/** The stem with the tested word underlined, as on the JLPT paper. */
function Stem({ stem, underline }: { stem: string; underline: string | null }) {
  const at = underline ? stem.indexOf(underline) : -1;
  if (!underline || at < 0) return <>{stem}</>;
  return (
    <>
      {stem.slice(0, at)}
      <span className="underline decoration-2 underline-offset-[6px]">{underline}</span>
      {stem.slice(at + underline.length)}
    </>
  );
}

type Summary = { tests: number; best: number; wrong: string[]; lastDate?: string };

const TYPE_LABEL: Record<string, string> = {
  kanjiReading: "Kanji reading",
  orthography: "Writing",
  contextualVocabulary: "Vocabulary",
  paraphrase: "Vocabulary",
  usage: "Vocabulary",
  grammarForm: "Grammar",
  sentenceComposition: "Grammar",
  textGrammar: "Grammar",
  readingComprehension: "Reading",
  informationRetrieval: "Reading",
};

const LEVELS = ["n5", "n4", "n3"] as const;
type Level = (typeof LEVELS)[number];

// The mix of a JLPT paper (language knowledge and reading), scaled to 10 questions.
const MIX: [string[], number][] = [
  [["kanjiReading", "orthography"], 3],
  [["contextualVocabulary", "paraphrase", "usage"], 2],
  [["grammarForm", "sentenceComposition", "textGrammar"], 3],
  [["readingComprehension", "informationRetrieval"], 2],
];

/** Small seeded RNG so everyone gets the same "today's test" for a given date. */
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

function pickTest(bank: Item[], date: string, wrong: string[]) {
  const rand = rng([...date].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0);
  const chosen: Item[] = [];
  for (const [types, n] of MIX) {
    const pool = bank.filter((q) => types.includes(q.itemType));
    // Bring back one question the person got wrong before, if there is one of this kind.
    const retry = pool.find((q) => wrong.includes(q.key));
    if (retry) chosen.push(retry);
    const rest = pool.filter((q) => q !== retry);
    while (chosen.filter((q) => types.includes(q.itemType)).length < n && rest.length) {
      chosen.push(rest.splice(Math.floor(rand() * rest.length), 1)[0]);
    }
  }
  return chosen;
}

export function JapTutorTest() {
  const { session, enabled } = useAuth();
  const userId = session?.user.id;
  // ?level=n4 picks the level (links from videos and the home page can point straight at one).
  const [params, setParams] = useSearchParams();
  const level: Level = (LEVELS as readonly string[]).includes(params.get("level") ?? "") ? (params.get("level") as Level) : "n5";
  const [bank, setBank] = useState<Item[] | null>(null);
  const [summary, setSummary] = useState<Summary>({ tests: 0, best: 0, wrong: [] });
  const [stage, setStage] = useState<"intro" | "quiz" | "done">("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    setBank(null);
    setStage("intro");
    fetch(`/learn/japtutor_${level}.json`).then((r) => r.json()).then(setBank);
  }, [level]);
  useEffect(() => {
    setSummary({ tests: 0, best: 0, wrong: [] });
    loadProgress<Summary>("japtutor", level, userId).then((s) => s && setSummary(s));
  }, [userId, level]);

  const test = useMemo(() => (bank ? pickTest(bank, today, summary.wrong) : []), [bank, today, summary.wrong]);
  const q = test[step];

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
  }

  async function next() {
    const all = [...answers, picked!];
    setAnswers(all);
    setPicked(null);
    if (step + 1 < test.length) {
      setStep(step + 1);
      return;
    }
    setStage("done");
    const score = all.filter((a, i) => a === test[i].correctIndex).length;
    const byType: Record<string, [number, number]> = {};
    test.forEach((t, i) => {
      const label = TYPE_LABEL[t.itemType] ?? t.itemType;
      const [c, n] = byType[label] ?? [0, 0];
      byType[label] = [c + (all[i] === t.correctIndex ? 1 : 0), n + 1];
    });
    const nowWrong = test.filter((t, i) => all[i] !== t.correctIndex).map((t) => t.key);
    const nowRight = new Set(test.filter((t, i) => all[i] === t.correctIndex).map((t) => t.key));
    const wrong = [...new Set([...summary.wrong.filter((k) => !nowRight.has(k)), ...nowWrong])].slice(-50);
    const updated = { tests: summary.tests + 1, best: Math.max(summary.best, score), wrong, lastDate: today };
    setSummary(updated);
    await saveProgress("japtutor", level, updated, userId);
    await saveTestResult(userId, level, score, test.length, byType);
  }

  function restart() {
    setStage("quiz");
    setStep(0);
    setAnswers([]);
    setPicked(null);
  }

  const score = answers.filter((a, i) => a === test[i]?.correctIndex).length;

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <Link to="/" className="text-sm font-semibold text-accent">&larr; JapanOne</Link>
      <div className="mt-6 text-xs font-bold tracking-[0.2em] text-accent uppercase">JapanOne · JLPT {level.toUpperCase()}</div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Today's daily test</h1>

      {stage !== "quiz" && (
        <div className="mt-6 inline-flex rounded-full border border-line bg-surface p-1" role="group" aria-label="JLPT level">
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setParams({ level: l }, { replace: true })}
              aria-pressed={l === level}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${l === level ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {!bank && <p className="mt-8 text-ink-soft">Loading questions…</p>}

      {bank && stage === "intro" && (
        <div className="mt-8 rounded-2xl border border-line bg-surface p-7">
          <p className="text-ink-soft">
            10 JLPT-style questions in the {level.toUpperCase()} mix: kanji, vocabulary, grammar and reading. Questions you
            missed before come back for another try.
          </p>
          {summary.tests > 0 && (
            <p className="mt-3 text-sm text-ink-faint">
              Tests taken: {summary.tests} · Best score: {summary.best}/10
            </p>
          )}
          {enabled && !session && (
            <p className="mt-3 text-sm text-ink-faint">
              <Link to={`/login?next=${encodeURIComponent(`/learn/japtutor?level=${level}`)}`} className="font-semibold text-accent">Sign in</Link> to keep your
              scores on every device.
            </p>
          )}
          <button onClick={restart} className="mt-6 rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-accent-deep">
            Start
          </button>
        </div>
      )}

      {stage === "quiz" && q && (
        <div className="mt-8">
          <div className="flex justify-between text-sm text-ink-faint">
            <span>{TYPE_LABEL[q.itemType] ?? q.itemType}</span>
            <span>{step + 1} / {test.length}</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-line">
            <div className="h-1.5 rounded-full bg-accent" style={{ width: `${(step / test.length) * 100}%` }} />
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-surface p-7" lang="ja">
            <div className="text-sm text-ink-soft">{q.instruction}</div>
            {q.passage && <p className="mt-4 rounded-xl bg-paper p-4 leading-loose text-ink">{q.passage}</p>}
            <div className="mt-4 text-2xl font-semibold leading-relaxed text-ink">
              <Stem stem={q.stem} underline={q.underline} />
            </div>
            <div className="mt-6 grid gap-3">
              {q.options.map((o, i) => {
                const state =
                  picked === null
                    ? "border-line hover:border-ink"
                    : i === q.correctIndex
                      ? "border-2 border-green-600 bg-green-50"
                      : i === picked
                        ? "border-2 border-accent bg-red-50"
                        : "border-line opacity-50";
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    className={`rounded-xl border px-4 py-3 text-left text-lg text-ink transition-colors ${state}`}
                  >
                    <span className="mr-3 text-sm text-ink-faint">{i + 1}</span>
                    {o}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="mt-6">
                <div className={`font-semibold ${picked === q.correctIndex ? "text-green-700" : "text-accent"}`}>
                  {picked === q.correctIndex ? "Correct" : `Answer: ${q.options[q.correctIndex]}`}
                </div>
                {q.explanation && <p className="mt-1 text-sm text-ink-soft">{q.explanation}</p>}
                <button onClick={next} className="mt-5 rounded-full bg-ink px-6 py-2.5 font-semibold text-paper hover:bg-accent-deep">
                  {step + 1 < test.length ? "Next" : "See result"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {stage === "done" && (
        <div className="mt-8 rounded-2xl border border-line bg-surface p-7">
          <div className="text-5xl font-bold text-ink">{score}<span className="text-2xl text-ink-faint"> / {test.length}</span></div>
          <ul className="mt-6 space-y-2 text-sm">
            {Object.entries(
              test.reduce<Record<string, [number, number]>>((acc, t, i) => {
                const l = TYPE_LABEL[t.itemType] ?? t.itemType;
                const [c, n] = acc[l] ?? [0, 0];
                acc[l] = [c + (answers[i] === t.correctIndex ? 1 : 0), n + 1];
                return acc;
              }, {}),
            ).map(([label, [c, n]]) => (
              <li key={label} className="flex justify-between">
                <span className="text-ink-soft">{label}</span>
                <span className={c < n ? "font-semibold text-accent" : "font-semibold text-ink"}>{c} / {n}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-soft">
            {session ? "Saved to your account." : "Saved in this browser."} A new test is ready tomorrow; you can retake
            today's anytime.
          </p>
          <div className="mt-5 flex gap-3">
            <button onClick={restart} className="rounded-full border border-line px-5 py-2.5 font-semibold text-ink">Retake</button>
            <Link to="/learn/japtalk" className="rounded-full bg-ink px-5 py-2.5 font-semibold text-paper">Try speaking lessons</Link>
          </div>
        </div>
      )}
    </div>
  );
}
