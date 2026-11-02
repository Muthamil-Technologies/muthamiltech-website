import { useState } from "react";
import { Link } from "react-router-dom";

// Study tool: are a student's part-time hours inside the rules? The limits come from the
// study-part-time guide (Immigration Services Agency, checked Nov 1, 2026).
const TERM_LIMIT_WEEK = 28;
const VACATION_LIMIT_DAY = 8;

export function StudyHoursCheck() {
  const [period, setPeriod] = useState<"term" | "vacation">("term");
  const [permission, setPermission] = useState<"yes" | "no">("yes");
  const [jobs, setJobs] = useState<number[]>([0]);
  const total = jobs.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
  const limit = period === "term" ? TERM_LIMIT_WEEK : VACATION_LIMIT_DAY;
  const unit = period === "term" ? "hours a week" : "hours a day";
  const ok = permission === "yes" && total <= limit;

  return (
    <div className="mx-auto max-w-[760px] px-4 py-12 sm:px-6">
      <Link to="/study" className="text-sm font-bold text-[#4a2f99] no-underline">← Study</Link>
      <h1 className="mb-2 mt-4 text-[34px] font-black leading-tight sm:text-[40px]">Part-time hours check</h1>
      <p className="m-0 text-lg leading-relaxed text-jo-muted">On a student visa (留学), are your work hours inside the limit? Count every job together.</p>

      <form className="mt-8 flex flex-col gap-6 rounded-[22px] bg-white p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 font-bold">Do you have permission to work (資格外活動許可)?</legend>
          <Choice name="perm" value={permission} options={[["yes", "Yes"], ["no", "Not yet"]]} onChange={(v) => setPermission(v as "yes" | "no")} />
        </fieldset>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 font-bold">When?</legend>
          <Choice name="period" value={period} options={[["term", "During the school term"], ["vacation", "In my school's long vacation"]]} onChange={(v) => setPeriod(v as "term" | "vacation")} />
        </fieldset>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 font-bold">Hours at each job ({unit})</legend>
          <div className="flex flex-col gap-2">
            {jobs.map((h, i) => (
              <label key={i} className="flex items-center gap-3">
                <span className="w-16 text-jo-muted">Job {i + 1}</span>
                <input type="number" min={0} max={80} inputMode="decimal" value={h || ""} placeholder="0"
                  onChange={(e) => setJobs(jobs.map((x, k) => (k === i ? Number(e.target.value) : x)))}
                  className="w-28 rounded-xl border border-[#d9dee6] px-3 py-2.5 text-lg text-jo-navy" />
              </label>
            ))}
            {jobs.length < 5 && (
              <button type="button" onClick={() => setJobs([...jobs, 0])} className="cursor-pointer self-start rounded-full border border-[#d9dee6] bg-transparent px-4 py-2 font-bold text-jo-navy">+ Add a job</button>
            )}
          </div>
        </fieldset>

        <div role="status" className={`rounded-[18px] p-5 ${ok ? "bg-[#dff3ea]" : "bg-[#fbe3e6]"}`}>
          {permission === "no" ? (
            <p className="m-0 font-bold">Get permission before any paid work. Apply at your regional immigration office (no fee).</p>
          ) : (
            <>
              <p className="m-0 text-2xl font-black">{total} of {limit} {unit}</p>
              <p className="m-0 mt-1 font-bold">{ok ? "Inside the limit." : `Over the limit by ${+(total - limit).toFixed(1)} ${unit}.`}</p>
            </>
          )}
          <p className="m-0 mt-2 text-[15px] text-jo-muted">No work at adult entertainment or nightlife businesses, in any role.</p>
        </div>
      </form>

      <p className="mt-6 text-sm leading-relaxed text-jo-muted">
        Based on the Immigration Services Agency rules, checked Nov 1, 2026. General information, not visa advice.{" "}
        <Link to="/guides/study-part-time" className="font-bold text-[#1f4fa8]">Read the full guide →</Link>
      </p>
    </div>
  );
}

export function Choice({ name, value, options, onChange }: { name: string; value: string; options: [string, string][]; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([v, label]) => (
        <label key={v} className={`cursor-pointer rounded-full border px-4 py-2.5 font-medium ${value === v ? "border-jo-navy bg-jo-navy text-white" : "border-[#d9dee6] bg-white text-jo-navy"}`}>
          <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} className="sr-only" />
          {label}
        </label>
      ))}
    </div>
  );
}
