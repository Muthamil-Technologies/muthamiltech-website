import { useState } from "react";
import { Link } from "react-router-dom";
import { levelCheckQuestions, resultForScore } from "../data/levelCheckQuestions";

type Stage = "intro" | "quiz" | "result";

export function JapTalkLevelCheck() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const total = levelCheckQuestions.length;
  const question = levelCheckQuestions[step];

  function start() {
    setStage("quiz");
    setStep(0);
    setScore(0);
    setPicked(null);
  }

  function choose(index: number) {
    if (picked !== null) return;
    setPicked(index);
    const correct = index === question.correctIndex;
    setTimeout(() => {
      const nextScore = correct ? score + 1 : score;
      setScore(nextScore);
      if (step + 1 < total) {
        setStep(step + 1);
        setPicked(null);
      } else {
        setStage("result");
      }
    }, 550);
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link to="/" className="text-sm font-semibold text-accent">
        &larr; Back to Muthamil Technologies
      </Link>

      <div className="mt-6 text-xs font-bold tracking-[0.2em] text-accent uppercase">
        JapTalk Level Check
      </div>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        How much Japanese do you already know?
      </h1>
      <p className="mt-3 max-w-lg text-ink-soft">
        {total} quick questions — hiragana, katakana, vocabulary, and basic grammar. No
        account, no email, just a straight answer.
      </p>

      {stage === "intro" && (
        <div className="mt-10 rounded-2xl border border-line bg-surface p-8">
          <p className="text-ink-soft">
            Answer honestly. There's no wrong place to start — JapTalk meets you wherever
            you land and builds speaking confidence from there.
          </p>
          <button
            onClick={start}
            className="mt-6 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
          >
            Start the Level Check
          </button>
        </div>
      )}

      {stage === "quiz" && (
        <div className="mt-10">
          <div className="flex items-center justify-between text-xs font-semibold tracking-wide text-ink-faint uppercase">
            <span>
              Question {step + 1} of {total}
            </span>
            <span>{Math.round(((step + (picked !== null ? 1 : 0)) / total) * 100)}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{ width: `${((step + (picked !== null ? 1 : 0)) / total) * 100}%` }}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-surface p-8">
            <p className="text-xl font-semibold text-ink">{question.prompt}</p>
            <div className="mt-6 flex flex-col gap-3">
              {question.options.map((option, index) => {
                const isCorrect = index === question.correctIndex;
                const isPicked = index === picked;
                const revealed = picked !== null;
                let stateClasses = "border-line hover:border-ink";
                if (revealed && isCorrect) {
                  stateClasses = "border-accent bg-accent/10 text-ink";
                } else if (revealed && isPicked && !isCorrect) {
                  stateClasses = "border-ink-faint bg-ink-faint/10 text-ink-soft";
                }
                return (
                  <button
                    key={option}
                    onClick={() => choose(index)}
                    disabled={revealed}
                    className={`rounded-xl border px-5 py-3.5 text-left font-medium text-ink transition-colors ${stateClasses}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {stage === "result" && (
        <div className="mt-10 rounded-2xl border border-line bg-surface p-8">
          <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
            {score} / {total} correct
          </div>
          <p className="mt-3 text-2xl font-bold tracking-tight text-ink">
            {resultForScore(score, total).label}
          </p>
          <p className="mt-3 text-ink-soft">{resultForScore(score, total).blurb}</p>

          <div className="mt-8 border-t border-line pt-6">
            <p className="text-sm font-semibold text-ink">
              Get your full placement and start speaking in JapTalk.
            </p>
            <span
              className="mt-4 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink-faint"
              aria-disabled="true"
            >
              Coming Soon on the App Store
            </span>
            <button
              onClick={start}
              className="mt-4 block text-sm font-semibold text-accent"
            >
              Retake the check
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
