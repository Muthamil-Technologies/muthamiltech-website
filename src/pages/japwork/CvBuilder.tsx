import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Field } from "../../lib/japwork/pathway";
import { EMPTY_RESUME, LICENSE_SUGGESTIONS, missing, resumeHtml, sortRows, type HistoryRow, type Resume } from "../../lib/japwork/resume";

// JapWork's 履歴書 builder in the browser. The CV is kept only in this browser (localStorage);
// "Make PDF" opens the browser's print dialog, where "Save as PDF" makes the file.

const KEY = "japwork-cv-v1";
type Sentence = { ja: string; en: string };
type Templates = { motivation: Record<string, Sentence[]>; self_pr: Sentence[]; school_events: [string, string][]; work_events: [string, string][] };

const input = "mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-accent";

function load(): Resume {
  try {
    const s = localStorage.getItem(KEY);
    return s ? { ...EMPTY_RESUME, ...(JSON.parse(s) as Partial<Resume>) } : EMPTY_RESUME;
  } catch {
    return EMPTY_RESUME;
  }
}

/** Shrinks a chosen photo to a 600px-wide JPEG so it fits in browser storage. */
function photoToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 600 / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(img.src);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {hint && <p className="mt-1 text-sm text-ink-soft">{hint}</p>}
      <div className="mt-3 grid gap-3">{children}</div>
    </section>
  );
}

function Text({ label, hint, value, onChange, type = "text", rows }: { label: string; hint?: string; value: string; onChange: (v: string) => void; type?: string; rows?: number }) {
  return (
    <label className="text-sm">
      <span className="font-medium text-ink">{label}</span>
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={input} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={input} />
      )}
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </label>
  );
}

/** Year + month + name (+ what happened) → one 学歴/職歴/資格 row. */
function RowAdder({ events, placeholder, suggestions = [], onAdd, label }: { events: [string, string][]; placeholder: string; suggestions?: string[]; onAdd: (r: HistoryRow) => void; label: string }) {
  const now = new Date().getFullYear();
  const [open, setOpen] = useState(false);
  const [y, setY] = useState(now);
  const [m, setM] = useState(4);
  const [name, setName] = useState("");
  const [event, setEvent] = useState(events[0]?.[0] ?? "");
  if (!open) return <button onClick={() => setOpen(true)} className="justify-self-start text-sm font-semibold text-accent">+ {label}</button>;
  return (
    <div className="grid gap-2 rounded-xl bg-paper p-3">
      <div className="grid grid-cols-2 gap-2">
        <select value={y} onChange={(e) => setY(+e.target.value)} className={input} aria-label="Year">
          {Array.from({ length: 42 }, (_, i) => now + 1 - i).map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        <select value={m} onChange={(e) => setM(+e.target.value)} className={input} aria-label="Month">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder={placeholder} className={input} />
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5" lang="ja">
          {suggestions.map((s) => (
            <button key={s} type="button" onClick={() => setName(s)} className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-ink hover:border-ink">{s}</button>
          ))}
        </div>
      )}
      {events.length > 0 && (
        <select value={event} onChange={(e) => setEvent(e.target.value)} className={input} aria-label="What happened">
          {events.map(([ja, en]) => <option key={ja} value={ja}>{ja} · {en}</option>)}
        </select>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!name.trim()) return;
            onAdd({ y, m, t: [name.trim(), event].filter(Boolean).join(" ") });
            setName("");
            setOpen(false);
          }}
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper"
        >
          Add
        </button>
        <button onClick={() => setOpen(false)} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink">Cancel</button>
      </div>
    </div>
  );
}

function RowList({ rows, onChange }: { rows: HistoryRow[]; onChange: (r: HistoryRow[]) => void }) {
  if (rows.length === 0) return null;
  return (
    <ul className="divide-y divide-line rounded-xl border border-line" lang="ja">
      {rows.map((r, i) => (
        <li key={`${r.y}-${r.m}-${r.t}-${i}`} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
          <span><span className="text-ink-faint">{r.y}/{r.m}</span> <span className="text-ink">{r.t}</span></span>
          <button onClick={() => onChange(rows.filter((_, j) => j !== i))} className="text-ink-faint hover:text-accent" aria-label="Remove">✕</button>
        </li>
      ))}
    </ul>
  );
}

function SentencePicker({ sentences, onUse }: { sentences: Sentence[]; onUse: (s: Sentence) => void }) {
  return (
    <ul className="grid gap-2">
      {sentences.map((s) => (
        <li key={s.ja} className="flex items-start justify-between gap-3 rounded-xl bg-paper p-3">
          <span>
            <span className="block text-ink" lang="ja">{s.ja}</span>
            <span className="block text-xs text-ink-soft">{s.en}</span>
          </span>
          <button onClick={() => onUse(s)} className="flex-none rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink hover:border-ink">Use</button>
        </li>
      ))}
    </ul>
  );
}

export function CvBuilder() {
  const [r, setR] = useState<Resume>(load);
  const [templates, setTemplates] = useState<Templates | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldId, setFieldId] = useState("");
  const [saveError, setSaveError] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);

  // Fit the A4 preview (794px wide at 96dpi) to the space available, on phones too.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(0.7, el.clientWidth / 794)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    fetch("/learn/japwork_cv.json").then((x) => x.json()).then(setTemplates);
    fetch("/learn/japwork_fields.json").then((x) => x.json()).then((j) => setFields(j.fields));
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(r));
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }, [r]);

  const set = (patch: Partial<Resume>) => setR((prev) => ({ ...prev, ...patch }));
  const html = useMemo(() => resumeHtml(r), [r]);
  const todo = missing(r);

  function makePdf() {
    const w = frame.current?.contentWindow;
    if (w) {
      w.focus();
      w.print();
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link to="/" className="text-sm font-semibold text-accent">&larr; JapanOne</Link>
      <div className="mt-6 text-xs font-bold tracking-[0.2em] text-accent uppercase">JapWork · CV builder</div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Japanese CV (履歴書)</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Fill in each part in simple English or Japanese. It becomes a standard Japanese CV (履歴書) you can save as a PDF and print.
        Everything stays in this browser; nothing is sent to us.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(0,560px)]">
        <div className="grid content-start gap-4">
          {todo.length > 0 && <p className="text-sm text-amber-800">Still needed: {todo.join(", ")}</p>}

          <Section title="About you">
            <Text label="Full name (as in your passport)" hint="Family name first is usual in Japan, e.g. NGUYEN VAN AN." value={r.name} onChange={(v) => set({ name: v })} />
            <Text label="Name in katakana" hint="How your name is read in Japanese, e.g. グエン ヴァン アン. Ask your teacher if you're not sure." value={r.nameKana} onChange={(v) => set({ nameKana: v })} />
            <Text label="Date of birth" type="date" value={r.birthDate ?? ""} onChange={(v) => set({ birthDate: v || null })} />
            <Text label="Nationality" value={r.nationality} onChange={(v) => set({ nationality: v })} />
          </Section>

          <Section title="Contact">
            <Text label="Postcode (〒)" value={r.postcode} onChange={(v) => set({ postcode: v })} />
            <Text label="Address" rows={2} value={r.address} onChange={(v) => set({ address: v })} />
            <Text label="Address in hiragana (optional)" value={r.addressKana} onChange={(v) => set({ addressKana: v })} />
            <Text label="Phone" type="tel" value={r.phone} onChange={(v) => set({ phone: v })} />
            <Text label="Email" type="email" value={r.email} onChange={(v) => set({ email: v })} />
          </Section>

          <Section title="Photo" hint="A recent photo from the chest up, facing forward, plain light background, neat clothes. Portrait (3:4).">
            <div className="flex items-center gap-4">
              {r.photo && <img src={r.photo} alt="" className="h-28 w-20 rounded-md object-cover" />}
              <label className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-ink">
                Choose photo
                <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) set({ photo: await photoToDataUrl(f) }); }} />
              </label>
              {r.photo && <button onClick={() => set({ photo: null })} className="text-sm text-ink-faint hover:text-accent">Remove</button>}
            </div>
          </Section>

          <Section title="Education (学歴)" hint="Usually from secondary or high school onwards. Write school names in English or Japanese.">
            <RowList rows={r.education} onChange={(rows) => set({ education: rows })} />
            <RowAdder label="Add a school" placeholder="School name" events={templates?.school_events ?? []} onAdd={(row) => set({ education: sortRows([...r.education, row]) })} />
          </Section>

          <Section title="Work history (職歴)" hint="Every job, including in your home country. If you have none, the CV says なし (none).">
            <RowList rows={r.work} onChange={(rows) => set({ work: rows })} />
            <RowAdder label="Add a job" placeholder="Company name" events={templates?.work_events ?? []} onAdd={(row) => set({ work: sortRows([...r.work, row]) })} />
            <label className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={r.stillWorking} onChange={(e) => set({ stillWorking: e.target.checked })} /> I still work at my last job
            </label>
          </Section>

          <Section title="Licences and tests (免許・資格)">
            <RowList rows={r.licenses} onChange={(rows) => set({ licenses: rows })} />
            <RowAdder label="Add a licence or test" placeholder="Licence or test" events={[]} suggestions={LICENSE_SUGGESTIONS} onAdd={(row) => set({ licenses: [...r.licenses, row] })} />
          </Section>

          <Section title="Why you want this job (志望動機)" hint="Pick a job field to see example sentences, then edit to make it your own.">
            <select value={fieldId} onChange={(e) => setFieldId(e.target.value)} className={input} aria-label="Job field">
              <option value="">Any job</option>
              {fields.map((f) => <option key={f.id} value={f.id}>{f.name} · {f.ja}</option>)}
            </select>
            {templates && (
              <SentencePicker sentences={[...(templates.motivation[fieldId] ?? []), ...(templates.motivation._any ?? [])]} onUse={(s) => set({ motivation: s.ja })} />
            )}
            <Text label="Text on your CV" rows={3} value={r.motivation} onChange={(v) => set({ motivation: v })} />
          </Section>

          <Section title="Your strengths (自己PR)" hint="Tap Use to add sentences; you can add more than one.">
            {templates && <SentencePicker sentences={templates.self_pr} onUse={(s) => set({ selfPr: r.selfPr + s.ja })} />}
            <Text label="Text on your CV" rows={3} value={r.selfPr} onChange={(v) => set({ selfPr: v })} />
          </Section>

          <Section title="Your requests (本人希望記入欄)" hint="Most people keep the standard phrase. Add a real need here, like a start date.">
            <Text label="Text on your CV" rows={2} value={r.request} onChange={(v) => set({ request: v })} />
          </Section>

          {saveError && <p className="text-sm text-accent">This browser couldn't save your CV (storage is full or blocked). Make the PDF before you leave the page.</p>}
          <p className="text-xs text-ink-faint">Example sentences are written to be simple and polite; check them with a Japanese teacher if you can.</p>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-ink">Preview</h2>
            <button onClick={makePdf} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-accent-deep">Make PDF</button>
          </div>
          <div ref={box} className="mt-3 overflow-hidden rounded-xl border border-line bg-white" style={{ height: 1000 * scale }}>
            <iframe ref={frame} title="履歴書 preview" srcDoc={html} className="origin-top-left" style={{ width: 794, height: 2246, transform: `scale(${scale})`, border: 0 }} />
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            "Make PDF" opens your browser's print screen: choose "Save as PDF". If nothing opens (for example inside Instagram or TikTok),
            open this page in Safari or Chrome.
          </p>
        </div>
      </div>
    </div>
  );
}
