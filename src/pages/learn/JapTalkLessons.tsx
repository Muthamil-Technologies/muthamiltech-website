import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { japTalkLessonNeedsPro } from "../../lib/plan";
import { loadAll } from "../../lib/progress";
import { loadJapTalk, type JapTalkContent, type LessonProgress } from "./japtalkData";

export function JapTalkLessons() {
  const { session, profile } = useAuth();
  const [content, setContent] = useState<JapTalkContent | null>(null);
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});

  useEffect(() => {
    loadJapTalk().then(setContent);
  }, []);
  useEffect(() => {
    loadAll<LessonProgress>("japtalk", session?.user.id).then(setProgress);
  }, [session]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <Link to="/" className="text-sm font-semibold text-accent">&larr; JapanOne</Link>
      <div className="mt-6 text-xs font-bold tracking-[0.2em] text-accent uppercase">JapanOne · Speak</div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Speaking lessons</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Each lesson is a real situation. Read the prompt, then say or type what you'd say in Japanese.
      </p>

      {!content && <p className="mt-8 text-ink-soft">Loading lessons…</p>}

      {content?.levels.map((level) => {
        const lessons = content.lessons.filter((l) => l.level === level.id);
        if (!lessons.length) return null;
        return (
          <section key={level.id} className="mt-10">
            <h2 className="text-lg font-semibold text-ink">
              {level.name}
              {level.jlpt && <span className="ml-2 text-sm font-normal text-ink-faint">≈ JLPT {level.jlpt}</span>}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {lessons.map((l) => {
                const p = progress[`lesson:${l.id}`];
                const done = p?.done.length ?? 0;
                const locked = japTalkLessonNeedsPro(l.level, profile?.plan);
                return (
                  <Link
                    key={l.id}
                    to={locked ? "/learn/account" : `/learn/japtalk/${l.id}`}
                    className="rounded-xl border border-line bg-surface p-5 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold text-ink">{l.title}</div>
                      {p?.completed ? (
                        <span className="text-xs font-semibold text-green-700">Done ✓</span>
                      ) : locked ? (
                        <span className="text-xs font-semibold text-accent">Pro</span>
                      ) : null}
                    </div>
                    <div className="mt-1 text-sm text-ink-soft">{l.mission}</div>
                    <div className="mt-3 h-1 rounded-full bg-line">
                      <div className="h-1 rounded-full bg-accent" style={{ width: `${(done / l.exercises.length) * 100}%` }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
