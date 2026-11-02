import { useState } from "react";
import { Link } from "react-router-dom";
import { STUDY_FAQS, VISA_CHECKED, VISA_MISTAKES, VISA_STEPS } from "../../data/studyVisa";
import { formatChecked } from "../../lib/joContent";

const PURPLE = "#4a2f99";

// /study/visa: the student visa from status to extension, with common mistakes.
export function StudyVisa() {
  return (
    <article className="mx-auto max-w-[860px] px-4 py-12 sm:px-6">
      <Link to="/study" className="text-sm font-bold no-underline" style={{ color: PURPLE }}>← Study in Japan</Link>
      <h1 className="mb-2 mt-4 text-[36px] font-black leading-tight sm:text-[44px]">Student visa guide</h1>
      <p className="m-0 text-xl leading-relaxed text-jo-muted">From the Certificate of Eligibility to extending your stay: how the Student status (留学) works.</p>

      <ol className="m-0 mt-8 flex list-none flex-col gap-3.5 p-0">
        {VISA_STEPS.map((s) => (
          <li key={s.title} className="rounded-[18px] bg-white p-6">
            <h2 className="m-0 text-xl font-extrabold">{s.title}</h2>
            {s.body.map((b) => <p key={b} className="m-0 mt-2 leading-relaxed">{b}</p>)}
            <p className="m-0 mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-jo-faint">
              {s.src.map((x) => <a key={x.url} href={x.url} target="_blank" rel="noreferrer" className="text-jo-faint underline">{x.name}</a>)}
            </p>
            {s.to && <Link to={s.to.path} className="mt-2 inline-block font-bold" style={{ color: PURPLE }}>{s.to.label} →</Link>}
          </li>
        ))}
      </ol>

      <section className="mt-8 rounded-[18px] bg-[#fbe3e6] p-6">
        <h2 className="m-0 text-xl font-black">Common mistakes</h2>
        <ul className="m-0 mt-3 flex flex-col gap-2 pl-5 leading-relaxed">{VISA_MISTAKES.map((m) => <li key={m}>{m}</li>)}</ul>
      </section>

      <p className="mt-8 text-sm leading-relaxed text-jo-muted">
        Checked {formatChecked(VISA_CHECKED)}. General information, not visa advice: whether you get a visa or an extension is decided by the
        Immigration Services Agency. For your own case, ask your school, the agency (Information Center 0570-013904) or a licensed specialist (行政書士).
      </p>
      <Link to="/study/faq" className="mt-2 inline-block font-bold" style={{ color: PURPLE }}>Study in Japan FAQs →</Link>
    </article>
  );
}

// /study/faq: searchable questions, each answered from an official page.
export function StudyFaq() {
  const [q, setQ] = useState("");
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const list = STUDY_FAQS.filter((f) => words.every((w) => `${f.q} ${f.a}`.toLowerCase().includes(w)));
  return (
    <article className="mx-auto max-w-[860px] px-4 py-12 sm:px-6">
      <Link to="/study" className="text-sm font-bold no-underline" style={{ color: PURPLE }}>← Study in Japan</Link>
      <h1 className="mb-6 mt-4 text-[36px] font-black leading-tight sm:text-[44px]">Study in Japan: questions</h1>
      <label htmlFor="faq-q" className="sr-only">Search questions</label>
      <input id="faq-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: visa, cost, EJU, part-time…"
        className="w-full rounded-xl border border-[#d9dee6] bg-white px-4 py-3.5 text-[17px] text-jo-navy" />
      <div className="mt-6 flex flex-col gap-3">
        {list.map((f) => (
          <details key={f.q} className="group rounded-[18px] bg-white p-5" open={words.length > 0}>
            <summary className="cursor-pointer text-lg font-extrabold">{f.q}</summary>
            <p className="m-0 mt-3 leading-relaxed">{f.a}</p>
            <p className="m-0 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-jo-faint">
              <a href={f.src.url} target="_blank" rel="noreferrer" className="text-jo-faint underline">Source: {f.src.name}</a>
              {f.to && <Link to={f.to.path} className="text-sm font-bold" style={{ color: PURPLE }}>{f.to.label} →</Link>}
            </p>
          </details>
        ))}
        {list.length === 0 && <p className="text-lg text-jo-muted">No question matches “{q}”.</p>}
      </div>
      <p className="mt-8 text-sm text-jo-muted">Checked {formatChecked(VISA_CHECKED)}. General information, not visa advice.</p>
    </article>
  );
}
