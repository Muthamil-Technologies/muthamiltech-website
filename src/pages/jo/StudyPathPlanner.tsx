import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Choice } from "../../components/jo/Choice";

// Study tool: a dated plan from today to the first day of school. Timings are JASSO's
// "Time Schedule" (Study in Japan, checked Nov 3, 2026), counted back from the start month.
type Goal = "language" | "vocational" | "university";
type Level = "none" | "n5" | "n4" | "n3" | "n2";

const INTAKES: Record<Goal, number[]> = { language: [0, 3, 6, 9], vocational: [3, 9], university: [3, 9] }; // months, 0 = January
const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** `after`: JASSO gives no month for this step; it follows the one before. */
type Step = { from: number; to?: number; after?: string; title: string; text: string };

// Months before the start (from = earliest, to = latest).
const PLAN_LANGUAGE: Step[] = [
  { from: 12, to: 10, title: "Research schools", text: "Request materials from Japanese language schools. Choose one on the Immigration list of approved schools." },
  { from: 7, title: "Choose your school", text: "Decide on your school and gather your documents, including proof you can pay your study and living costs." },
  { from: 7, to: 5, title: "Apply", text: "Send your application to the school." },
  { from: 3, title: "Admission letter", text: "Receive your admission letter and pay tuition. The school applies for your Certificate of Eligibility (COE) at immigration in Japan." },
  { from: 3, after: "After your admission letter", title: "Student visa", text: "When your COE arrives, apply for your student visa at the Japanese embassy or consulate in your country." },
  { from: 1, title: "Book your travel", text: "Arrange your flight and where you will live." },
];
const PLAN_COLLEGE: Step[] = [
  { from: 12, to: 11, title: "Research schools", text: "Request materials and check each school's entry requirements." },
  { from: 10, title: "Choose your schools", text: "Decide where to apply." },
  { from: 9, title: "Take your tests", text: "EJU and any other tests the school asks for." },
  { from: 8, to: 6, title: "Apply", text: "Send your applications." },
  { from: 5, to: 2, title: "Entrance exams", text: "Exams or interviews at each school." },
  { from: 3, title: "Admission letter", text: "Receive your admission letter. The school helps with your Certificate of Eligibility (COE)." },
  { from: 3, after: "After your admission letter", title: "Student visa", text: "When your COE arrives, apply for your student visa at the Japanese embassy or consulate." },
  { from: 1, title: "Book your travel", text: "Arrange your flight and housing." },
];

function monthLabel(base: Date, monthsBefore: number) {
  const d = new Date(base.getFullYear(), base.getMonth() - monthsBefore, 1);
  return `${MONTH[d.getMonth()]} ${d.getFullYear()}`;
}

function nextIntakes(goal: Goal, now: Date, count = 6) {
  const out: Date[] = [];
  for (let y = now.getFullYear(); out.length < count; y++)
    for (const m of INTAKES[goal]) {
      const d = new Date(y, m, 1);
      if (d > now && out.length < count) out.push(d);
    }
  return out;
}

export function StudyPathPlanner() {
  const now = useMemo(() => new Date(), []);
  const [goal, setGoal] = useState<Goal>("language");
  const [level, setLevel] = useState<Level>("none");
  const intakes = nextIntakes(goal, now);
  const [startKey, setStartKey] = useState("");
  const start = intakes.find((d) => d.toISOString() === startKey) ?? intakes.find((d) => monthsUntil(now, d) >= 7) ?? intakes[0];

  const college = goal !== "language";
  const needsLanguageFirst = college && level !== "n2";
  const steps = college ? PLAN_COLLEGE : PLAN_LANGUAGE;
  const left = monthsUntil(now, start);
  const applyBy = college ? 6 : 5;
  const tooSoon = left < applyBy;

  return (
    <div className="mx-auto max-w-[860px] px-4 py-12 sm:px-6">
      <Link to="/study" className="text-sm font-bold text-[#4a2f99] no-underline">← Study</Link>
      <h1 className="mb-2 mt-4 text-[34px] font-black leading-tight sm:text-[40px]">Study path planner</h1>
      <p className="m-0 text-lg leading-relaxed text-jo-muted">Your plan from today to your first day of school in Japan, month by month.</p>

      <div className="mt-8 flex flex-col gap-6 rounded-[22px] bg-white p-6 sm:p-8">
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 font-bold">What do you want to study?</legend>
          <Choice name="goal" value={goal} onChange={(v) => { setGoal(v as Goal); setStartKey(""); }} options={[
            ["language", "Japanese at a language school"], ["vocational", "A skill at a vocational school (専門学校)"], ["university", "A degree at a university"]]} />
        </fieldset>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 font-bold">Your Japanese now</legend>
          <Choice name="level" value={level} onChange={(v) => setLevel(v as Level)} options={[
            ["none", "Just starting"], ["n5", "About N5"], ["n4", "About N4"], ["n3", "About N3"], ["n2", "N2 or above"]]} />
        </fieldset>
        <label className="flex flex-col gap-2">
          <span className="font-bold">When do you want to start?</span>
          <select value={start.toISOString()} onChange={(e) => setStartKey(e.target.value)}
            className="max-w-xs rounded-xl border border-[#d9dee6] bg-white px-3 py-2.5 text-lg text-jo-navy">
            {intakes.map((d) => <option key={d.toISOString()} value={d.toISOString()}>{MONTH[d.getMonth()]} {d.getFullYear()}</option>)}
          </select>
          <span className="text-sm text-jo-muted">{college ? "Vocational schools and universities usually start in April or in September/October." : "Language schools start in April and October; some also in January and July."}</span>
        </label>
      </div>

      {needsLanguageFirst && (
        <div className="mt-6 rounded-[18px] bg-[#fdeadb] p-5 leading-relaxed">
          <p className="m-0 font-bold">Most people start at a language school first.</p>
          <p className="m-0 mt-1">
            {goal === "vocational"
              ? "To enter a vocational school you need, for example, more than 6 months at an approved Japanese language school, or JLPT N2 or above."
              : "Classes at universities are in Japanese, and many universities ask for EJU scores. Plan time at a language school first, and take the EJU in June or November."}
            {" "}Plan your language school start with this planner, then apply from Japan.
          </p>
        </div>
      )}

      <section className="mt-8">
        <h2 className="m-0 mb-1 text-2xl font-black">Your plan to {MONTH[start.getMonth()]} {start.getFullYear()}</h2>
        {tooSoon && (
          <p className="m-0 mb-3 rounded-xl bg-[#fbe3e6] p-3 font-medium">This start is {left} month{left === 1 ? "" : "s"} away. Applications usually close {applyBy} months before, so check with the school or pick a later start.</p>
        )}
        <ol className="m-0 mt-4 flex list-none flex-col p-0">
          {steps.map((s) => {
            const past = monthsUntil(now, new Date(start.getFullYear(), start.getMonth() - (s.to ?? s.from), 1)) < 0;
            return (
              <li key={s.title} className="relative flex gap-4 pb-5 pl-1">
                <span aria-hidden="true" className={`mt-1 h-4 w-4 shrink-0 rounded-full border-4 ${past && !s.after ? "border-[#b42a3a] bg-[#b42a3a]" : "border-jo-navy bg-jo-yellow"}`} />
                <div>
                  <p className={`m-0 text-sm font-bold ${past && !s.after ? "text-[#9e2232]" : "text-[#4a2f99]"}`}>{s.after ?? (s.to ? `${monthLabel(start, s.from)} – ${monthLabel(start, s.to)}` : `By ${monthLabel(start, s.from)}`)}{past && !s.after ? " · late: do this now" : ""}</p>
                  <p className="m-0 text-lg font-extrabold">{s.title}</p>
                  <p className="m-0 leading-relaxed text-jo-muted">{s.title === "Take your tests" ? `${s.text} The EJU is held in June and November: the ${lastEju(start, s.from)} one fits this plan.` : s.text}</p>
                </div>
              </li>
            );
          })}
          <li className="flex gap-4 pl-1">
            <span aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 rounded-full border-4 border-[#17714c] bg-[#17714c]" />
            <div>
              <p className="m-0 text-sm font-bold text-[#17714c]">{MONTH[start.getMonth()]} {start.getFullYear()}</p>
              <p className="m-0 text-lg font-extrabold">Arrive and start school</p>
              <p className="m-0 leading-relaxed text-jo-muted">Register your address at the city office within 14 days. <Link to="/live/address" className="font-bold text-[#1f4fa8]">Checklist →</Link></p>
            </div>
          </li>
        </ol>
      </section>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link to="/guides/study-school-types" className="rounded-[18px] bg-white p-5 font-bold text-jo-navy no-underline">Which school is right for you? →</Link>
        <Link to="/guides/study-mext" className="rounded-[18px] bg-white p-5 font-bold text-jo-navy no-underline">MEXT scholarship →</Link>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-jo-muted">
        Timings from JASSO's Study in Japan time schedule and entry requirements, checked Nov 3, 2026. Each school sets its own
        deadlines: always confirm with the school. General information, not visa advice.{" "}
        <a href="https://www.studyinjapan.go.jp/en/planning/flow-chart/schedule.html" target="_blank" rel="noreferrer" className="font-bold text-[#1f4fa8]">Official schedule →</a>
      </p>
    </div>
  );
}

function monthsUntil(now: Date, d: Date) {
  return (d.getFullYear() - now.getFullYear()) * 12 + d.getMonth() - now.getMonth();
}

/** The last EJU sitting (June or November) on or before the given month. */
function lastEju(start: Date, monthsBefore: number) {
  const d = new Date(start.getFullYear(), start.getMonth() - monthsBefore, 1);
  while (d.getMonth() !== 5 && d.getMonth() !== 10) d.setMonth(d.getMonth() - 1);
  return `${MONTH[d.getMonth()]} ${d.getFullYear()}`;
}
