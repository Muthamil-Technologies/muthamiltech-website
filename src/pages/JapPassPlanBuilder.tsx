import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  computeDayOnePreview,
  daysBetween,
  upcomingJlptDates,
} from "../data/japPassPlanData";

const MINUTE_OPTIONS = [15, 30, 45, 60];

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export function JapPassPlanBuilder() {
  const jlptDates = useMemo(() => upcomingJlptDates(4), []);
  const [examDate, setExamDate] = useState<Date>(jlptDates[0]);
  const [dailyMinutes, setDailyMinutes] = useState(30);
  const [revealed, setRevealed] = useState(false);

  const daysRemaining = daysBetween(new Date(), examDate);
  const preview = computeDayOnePreview(dailyMinutes);

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link to="/" className="text-sm font-semibold text-accent">
        &larr; Back to Muthamil Technologies
      </Link>

      <div className="mt-6 text-xs font-bold tracking-[0.2em] text-accent uppercase">
        JapPass Plan Builder
      </div>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Build your JLPT study plan.
      </h1>
      <p className="mt-3 max-w-lg text-ink-soft">
        Pick your exam and your daily time, and see exactly what JapPass would put in front
        of you on day one — the same plan logic the app actually runs.
      </p>

      <div className="mt-10 flex flex-col gap-8 rounded-2xl border border-line bg-surface p-8">
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
            JLPT level
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink">
            N5
            <span className="text-ink-faint">— N4 through N1 coming soon</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
            Exam date
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {jlptDates.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => {
                  setExamDate(date);
                  setRevealed(false);
                }}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  date.getTime() === examDate.getTime()
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink hover:border-ink"
                }`}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Real official JLPT sitting dates — first Sunday of July and December.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
            Daily study time
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {MINUTE_OPTIONS.map((minutes) => (
              <button
                key={minutes}
                onClick={() => {
                  setDailyMinutes(minutes);
                  setRevealed(false);
                }}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  minutes === dailyMinutes
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink hover:border-ink"
                }`}
              >
                {minutes} min
              </button>
            ))}
          </div>
        </div>

        {!revealed && (
          <button
            onClick={() => setRevealed(true)}
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
          >
            Build my plan
          </button>
        )}

        {revealed && (
          <div className="border-t border-line pt-6">
            <p className="text-sm font-semibold text-ink">
              {daysRemaining} days until {formatDate(examDate)}
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Your day one mission at {dailyMinutes} minutes:
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Hiragana / Katakana", count: preview.kana },
                { label: "Kanji", count: preview.kanji },
                { label: "Vocabulary", count: preview.vocabulary },
                { label: "Grammar", count: preview.grammar },
              ]
                .filter((row) => row.count > 0)
                .map((row) => (
                  <div key={row.label} className="rounded-xl border border-line px-3 py-4 text-center">
                    <div className="text-2xl font-bold tabular-nums text-ink">{row.count}</div>
                    <div className="mt-1 text-xs text-ink-faint">{row.label}</div>
                  </div>
                ))}
            </div>
            <p className="mt-4 text-xs text-ink-faint">
              JapPass sequences kana first — the real foundation everything else builds on —
              then layers in kanji, vocabulary, and grammar as you're ready. From tomorrow,
              spaced review of what you've learned joins the mix automatically.
            </p>

            <div className="mt-8 border-t border-line pt-6">
              <p className="text-sm font-semibold text-ink">
                Get this exact plan, kept on track every day.
              </p>
              <span
                className="mt-4 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink-faint"
                aria-disabled="true"
              >
                Coming Soon on the App Store
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
