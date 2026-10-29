import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findPaths, LEVELS, PATHWAY_DISCLAIMER, SITUATIONS, type Field, type JapaneseLevel, type PathFit, type Situation } from "../../lib/japwork/pathway";

const FIT: Record<PathFit, [string, string]> = {
  ready: ["You can do this now", "bg-green-100 text-green-800"],
  afterSteps: ["Possible after these steps", "bg-amber-100 text-amber-900"],
  limited: ["Limited", "bg-line text-ink-soft"],
};

/** JapWork's pathway finder in the browser: three questions, then the paths and next steps. */
export function PathwayFinder() {
  const [fields, setFields] = useState<Field[] | null>(null);
  const [step, setStep] = useState(0);
  const [situation, setSituation] = useState<Situation | null>(null);
  const [level, setLevel] = useState<JapaneseLevel | null>(null);
  const [fieldId, setFieldId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/learn/japwork_fields.json").then((r) => r.json()).then((j) => setFields(j.fields as Field[]));
  }, []);

  const field = fields?.find((f) => f.id === fieldId) ?? null;
  const result = situation && level && field ? findPaths(situation, level, field) : null;

  function Option({ label, sub, selected, onPick }: { label: string; sub?: string; selected: boolean; onPick: () => void }) {
    return (
      <button
        onClick={() => {
          onPick();
          setStep((s) => s + 1);
          window.scrollTo({ top: 0 });
        }}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
          selected ? "border-ink bg-surface" : "border-line bg-surface hover:border-ink"
        }`}
      >
        <span>
          <span className="block font-semibold text-ink">{label}</span>
          {sub && <span className="block text-sm text-ink-soft">{sub}</span>}
        </span>
        {selected && <span aria-hidden="true">✓</span>}
      </button>
    );
  }

  const questions = ["Where are you now?", "What is your Japanese level?", "Which kind of work do you want?"];

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link to="/" className="text-sm font-semibold text-accent">&larr; JapanOne</Link>
      <div className="mt-6 text-xs font-bold tracking-[0.2em] text-accent uppercase">Work in Japan · Pathway finder</div>

      {step < 3 ? (
        <>
          <div className="mt-2 flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{questions[step]}</h1>
            <span className="flex-none text-sm text-ink-faint">Step {step + 1} of 3</span>
          </div>
          <div className="mt-6 grid gap-2.5">
            {step === 0 && SITUATIONS.map(([v, l]) => <Option key={v} label={l} selected={situation === v} onPick={() => setSituation(v)} />)}
            {step === 1 && LEVELS.map(([v, l]) => <Option key={v} label={l} selected={level === v} onPick={() => setLevel(v)} />)}
            {step === 2 &&
              (fields ? (
                fields.map((f) => <Option key={f.id} label={f.name} sub={f.ja} selected={fieldId === f.id} onPick={() => setFieldId(f.id)} />)
              ) : (
                <p className="text-ink-soft">Loading…</p>
              ))}
          </div>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="mt-6 text-sm font-semibold text-ink-soft hover:text-ink">
              &larr; Back
            </button>
          )}
        </>
      ) : (
        result && (
          <>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {result.field.name} · {result.field.ja}
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              {SITUATIONS.find(([v]) => v === situation)?.[1]} · {LEVELS.find(([v]) => v === level)?.[1]}
            </p>

            <div className="mt-6 grid gap-4">
              {result.paths.map((p) => (
                <section key={p.title} className="rounded-2xl border border-line bg-surface p-6">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${FIT[p.fit][1]}`}>{FIT[p.fit][0]}</span>
                  <h2 className="mt-3 text-lg font-bold text-ink">{p.title}</h2>
                  <p className="mt-1 text-ink-soft">{p.summary}</p>
                  {p.steps.length > 0 && (
                    <ol className="mt-4 grid gap-3">
                      {p.steps.map((s, i) => (
                        <li key={s.text} className="flex gap-3">
                          <span
                            className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-bold ${
                              s.done ? "bg-green-600 text-white" : "bg-line text-ink"
                            }`}
                          >
                            {s.done ? "✓" : i + 1}
                          </span>
                          <span className={`text-ink ${s.done ? "line-through opacity-60" : ""}`}>
                            {s.text}
                            {s.studyLink && (
                              <Link to="/learn/japtutor" className="mt-1 block text-sm font-semibold text-accent">
                                Practise for the test: free JLPT practice test →
                              </Link>
                            )}
                            {s.text.startsWith("Make a Japanese CV") && (
                              <Link to="/work/cv" className="mt-1 block text-sm font-semibold text-accent">Open the CV builder →</Link>
                            )}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                  {p.notes?.map((n) => (
                    <p key={n} className="mt-3 text-sm text-ink-soft">• {n}</p>
                  ))}
                </section>
              ))}

              {result.warnings.map((w) => (
                <div key={w} className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-950">{w}</div>
              ))}

              <section className="rounded-2xl border border-line bg-surface p-6">
                <h2 className="text-lg font-bold text-ink">About {result.field.name.toLowerCase()} work</h2>
                <p className="mt-2 text-ink-soft">{result.field.work}</p>
                {result.field.japanese_tip && <p className="mt-2 text-ink-soft"><b className="text-ink">Japanese:</b> {result.field.japanese_tip}</p>}
                {result.field.shifts && <p className="mt-2 text-ink-soft"><b className="text-ink">Hours:</b> {result.field.shifts}</p>}
                {result.field.words.length > 0 && (
                  <>
                    <h3 className="mt-4 font-semibold text-ink">First-day words</h3>
                    <ul className="mt-2 grid gap-1.5 sm:grid-cols-2" lang="ja">
                      {result.field.words.map(([w, r, m]) => (
                        <li key={w} className="rounded-lg bg-paper px-3 py-2 text-sm">
                          <b className="text-ink">{w}</b> <span className="text-ink-faint">{r}</span>
                          <span className="block text-ink-soft" lang="en">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </section>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/work/cv" className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-accent-deep">Make your Japanese CV</Link>
              <button onClick={() => setStep(0)} className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink">Start again</button>
            </div>
            <p className="mt-8 text-xs leading-relaxed text-ink-faint">{PATHWAY_DISCLAIMER}</p>
          </>
        )
      )}
    </div>
  );
}
