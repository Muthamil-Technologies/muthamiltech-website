import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { loadProgress, saveProgress } from "../../lib/progress";
import { isCorrect, loadJapTalk, type Lesson, type LessonProgress } from "./japtalkData";

// Browser speech recognition (Chrome, Edge, Safari). Not in TypeScript's DOM types yet.
type Recognition = {
  lang: string;
  interimResults: boolean;
  onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
};
const SpeechRecognitionCtor: (new () => Recognition) | undefined =
  (window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition })
    .SpeechRecognition ??
  (window as unknown as { webkitSpeechRecognition?: new () => Recognition }).webkitSpeechRecognition;

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

export function JapTalkLesson() {
  const { id } = useParams();
  const { session } = useAuth();
  const userId = session?.user.id;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<LessonProgress>({ done: [] });
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"right" | "wrong" | "shown" | null>(null);
  const [listening, setListening] = useState(false);
  const rec = useRef<Recognition | null>(null);
  const key = `lesson:${id}`;

  useEffect(() => {
    loadJapTalk().then((c) => setLesson(c.lessons.find((l) => String(l.id) === id) ?? null));
  }, [id]);
  useEffect(() => {
    loadProgress<LessonProgress>("japtalk", key, userId).then((p) => {
      if (!p) return;
      setProgress(p);
    });
  }, [key, userId]);
  useEffect(() => {
    // Resume at the first exercise not done yet.
    if (!lesson) return;
    const first = lesson.exercises.findIndex((e) => !progress.done.includes(e.id));
    setStep(first < 0 ? 0 : first);
    // Only on first load of the lesson.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  if (!lesson) return <div className="mx-auto max-w-2xl px-6 py-14 text-ink-soft">Loading…</div>;
  const ex = lesson.exercises[step];
  const finished = step >= lesson.exercises.length;

  async function markDone(exId: number) {
    const done = [...new Set([...progress.done, exId])];
    const updated = { done, completed: done.length >= lesson!.exercises.length };
    setProgress(updated);
    await saveProgress("japtalk", key, updated, userId);
  }

  function check(text: string) {
    const ok = isCorrect(ex, text);
    setResult(ok ? "right" : "wrong");
    if (ok) {
      speak(ex.answer);
      markDone(ex.id);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    check(input);
  }

  function listen() {
    if (!SpeechRecognitionCtor) return;
    const r = new SpeechRecognitionCtor();
    r.lang = "ja-JP";
    r.interimResults = false;
    r.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput(text);
      check(text);
    };
    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);
    rec.current = r;
    setListening(true);
    r.start();
  }

  function next() {
    setInput("");
    setResult(null);
    setStep(step + 1);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <Link to="/learn/japtalk" className="text-sm font-semibold text-accent">&larr; All lessons</Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink">{lesson.title}</h1>
      <p className="mt-2 text-ink-soft">{lesson.description}</p>

      {!finished ? (
        <div className="mt-8">
          <div className="flex justify-between text-sm text-ink-faint">
            <span>Say it in Japanese</span>
            <span>{step + 1} / {lesson.exercises.length}</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-line">
            <div className="h-1.5 rounded-full bg-accent" style={{ width: `${(step / lesson.exercises.length) * 100}%` }} />
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-surface p-7">
            {ex.context && <div className="mb-3 text-sm text-ink-soft" lang="ja">{ex.context}</div>}
            <div className="text-xl font-semibold text-ink">{ex.prompt}</div>

            <form onSubmit={onSubmit} className="mt-6 flex gap-2">
              <input
                lang="ja"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (result === "wrong") setResult(null);
                }}
                placeholder="日本語で…"
                className="min-w-0 flex-1 rounded-xl border border-line bg-paper px-4 py-3 text-lg text-ink outline-none focus:border-accent"
              />
              <button className="rounded-xl bg-ink px-5 font-semibold text-paper hover:bg-accent-deep">Check</button>
            </form>

            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              {SpeechRecognitionCtor && (
                <button type="button" onClick={listen} disabled={listening} className="font-semibold text-accent disabled:opacity-50">
                  {listening ? "Listening…" : "🎤 Speak instead"}
                </button>
              )}
              <button type="button" onClick={() => setResult("shown")} className="text-ink-faint hover:text-ink">
                Show answer
              </button>
            </div>

            {result && (
              <div className="mt-6 rounded-xl bg-paper p-4">
                <div className={`font-semibold ${result === "right" ? "text-green-700" : result === "wrong" ? "text-accent" : "text-ink"}`}>
                  {result === "right" ? "Correct!" : result === "wrong" ? "Not quite. Try again, or show the answer." : "Answer"}
                </div>
                {result !== "wrong" && (
                  <div className="mt-2 flex items-center gap-3">
                    <span lang="ja" className="text-2xl text-ink">
                      {ex.tokens.map(([s, r], i) =>
                        r ? (
                          <ruby key={i}>
                            {s}
                            <rt className="text-xs text-ink-faint">{r}</rt>
                          </ruby>
                        ) : (
                          <span key={i}>{s}</span>
                        ),
                      )}
                    </span>
                    <button type="button" onClick={() => speak(ex.answer)} className="text-sm font-semibold text-accent">
                      🔊 Listen
                    </button>
                  </div>
                )}
                {result !== "wrong" && (
                  <button onClick={next} className="mt-5 rounded-full bg-ink px-6 py-2.5 font-semibold text-paper hover:bg-accent-deep">
                    {step + 1 < lesson.exercises.length ? "Next" : "Finish lesson"}
                  </button>
                )}
              </div>
            )}
          </div>
          {!session && (
            <p className="mt-4 text-sm text-ink-faint">
              <Link to={`/login?next=/learn/japtalk/${lesson.id}`} className="font-semibold text-accent">Sign in</Link> to
              save this lesson to your account.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-line bg-surface p-7">
          <div className="text-2xl font-bold text-ink">Lesson complete 🎉</div>
          <p className="mt-2 text-ink-soft">
            {progress.done.length} of {lesson.exercises.length} phrases practised. {session ? "Saved to your account." : "Saved in this browser."}
          </p>
          <div className="mt-5 flex gap-3">
            <button onClick={() => { setStep(0); setResult(null); setInput(""); setProgress({ ...progress, completed: false }); }} className="rounded-full border border-line px-5 py-2.5 font-semibold text-ink">
              Practise again
            </button>
            <Link to="/learn/japtalk" className="rounded-full bg-ink px-5 py-2.5 font-semibold text-paper">More lessons</Link>
          </div>
        </div>
      )}
    </div>
  );
}
