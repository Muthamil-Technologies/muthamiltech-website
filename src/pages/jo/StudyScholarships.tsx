import { useState } from "react";
import { Link } from "react-router-dom";
import { COUNTRIES, LEVELS, PAMPHLET, SCHOLARSHIPS, matches, type Level } from "../../data/scholarships";
import { formatChecked } from "../../lib/joContent";

const PURPLE = "#4a2f99";

// Study tool: scholarships you can apply for from your home country, filtered by level,
// country and age. Information only: apply to each provider directly.
export function StudyScholarships() {
  const [level, setLevel] = useState<Level | "">("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const ageN = age.trim() ? Number(age) : null;
  const list = SCHOLARSHIPS.filter((s) => matches(s, level, country === "Other" ? "" : country, ageN));
  const select = "rounded-xl border border-[#d9dee6] bg-white px-3 py-2.5 text-[17px] text-jo-navy";

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-12 sm:px-6">
      <Link to="/study" className="text-sm font-bold no-underline" style={{ color: PURPLE }}>← Study in Japan</Link>
      <h1 className="mb-2 mt-4 text-[34px] font-black leading-tight sm:text-[40px]">Scholarship finder</h1>
      <p className="m-0 max-w-3xl text-lg leading-relaxed text-jo-muted">
        Scholarships you can apply for before you come to Japan. Most others are applied for after you enrol, usually through your school.
      </p>

      <form className="mt-8 grid gap-4 rounded-[22px] bg-white p-6 sm:grid-cols-3" onSubmit={(e) => e.preventDefault()}>
        <label className="flex flex-col gap-1.5"><span className="font-bold">I want to study at</span>
          <select value={level} onChange={(e) => setLevel(e.target.value as Level | "")} className={select}>
            <option value="">Any level</option>
            {LEVELS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1.5"><span className="font-bold">My country</span>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className={select}>
            <option value="">Any country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1.5"><span className="font-bold">My age</span>
          <input type="number" min={15} max={60} inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 22" className={select} />
        </label>
      </form>

      <p className="mb-3 mt-6 font-bold" aria-live="polite">{list.length} scholarship{list.length === 1 ? "" : "s"}</p>
      <div className="grid gap-3.5 md:grid-cols-2">
        {list.map((s) => {
          const external = !s.url.startsWith("/");
          return (
            <article key={s.name} className="flex flex-col gap-2 rounded-[18px] bg-white p-6">
              <p className="m-0 text-sm font-bold" style={{ color: PURPLE }}>{s.by}</p>
              <h2 className="m-0 text-xl font-extrabold leading-snug">{s.name}</h2>
              <dl className="m-0 mt-1 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[15px] leading-relaxed">
                <dt className="font-bold">Gives</dt><dd className="m-0">{s.amount}</dd>
                <dt className="font-bold">For</dt><dd className="m-0">{s.levels.map((l) => LEVELS.find((x) => x[0] === l)![1]).join(", ")} · {s.period}</dd>
                <dt className="font-bold">Who</dt><dd className="m-0">{s.countriesText ?? (s.countries ? s.countries.join(", ") : "Any country")}{s.ageText ? ` · ${s.ageText}` : ""}</dd>
                <dt className="font-bold">Apply</dt><dd className="m-0">{s.apply}</dd>
              </dl>
              {s.notes && <p className="m-0 text-[15px] leading-relaxed text-jo-muted">{s.notes}</p>}
              {external
                ? <a href={s.url} target="_blank" rel="noreferrer" className="mt-auto pt-1 font-bold" style={{ color: PURPLE }}>{s.url.startsWith("mailto:") ? "Email the foundation →" : "Official site →"}</a>
                : <Link to={s.url} className="mt-auto pt-1 font-bold" style={{ color: PURPLE }}>Read the guide →</Link>}
            </article>
          );
        })}
      </div>
      {list.length === 0 && <p className="text-lg text-jo-muted">None match. Try "Any level", or apply once you are in Japan: most scholarships open after you enrol.</p>}

      <section className="mt-10 rounded-[18px] bg-[#ece6fb] p-6 leading-relaxed">
        <h2 className="m-0 text-xl font-black">Already in Japan?</h2>
        <p className="m-0 mt-2">More than 100 local governments and private foundations offer scholarships to students already enrolled in Japan, and JASSO runs the Honors Scholarship. Most are applied for through your school.</p>
        <a href={PAMPHLET.url} target="_blank" rel="noreferrer" className="mt-2 inline-block font-bold" style={{ color: PURPLE }}>See the full JASSO list (PDF) →</a>
      </section>

      <p className="mt-6 text-sm leading-relaxed text-jo-muted">
        From <a href={PAMPHLET.url} target="_blank" rel="noreferrer" className="text-[#1f4fa8] underline">{PAMPHLET.name}</a>, checked {formatChecked(PAMPHLET.checked)}.
        Rules, amounts and dates change every year: always check the provider's own site. JapanOne does not take scholarship applications.
      </p>
    </div>
  );
}
