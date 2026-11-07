import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Choice } from "../../components/jo/Choice";
import { formatChecked } from "../../lib/joContent";
import {
  estimatePartTime, estimatePay, INCOME_TAX_FROM, INSURANCE_HOURS, PAY_CHECKED, PAY_SOURCES, PREFECTURES,
  RESIDENT_TAX_FROM, STUDENT_HOURS, TOKYO, wageOn, type Prefecture,
} from "../../lib/payCalc";

// Work tools: the same two calculators as the app. For reference only.
const GREEN = "#17714c";
const yen = (n: number) => `¥${Math.round(n).toLocaleString("en-US")}`;
const about = (n: number) => `About ${yen(Math.round(n / 100) * 100)}`;
const field = "w-full rounded-xl border border-[#d5dbe3] bg-white px-4 py-3 text-[17px] text-jo-navy";
const digits = (s: string) => s.replace(/\D/g, "").slice(0, 8);

function Page({ title, line, children }: { title: string; line: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6">
      <Link to="/work" className="text-sm font-bold no-underline" style={{ color: GREEN }}>← Work in Japan</Link>
      <h1 className="mb-2 mt-4 text-[34px] font-black leading-tight sm:text-[40px]">{title}</h1>
      <p className="m-0 text-lg leading-relaxed text-jo-muted">{line} For reference only.</p>
      <div className="mt-8 grid items-start gap-5 md:grid-cols-[3fr_2fr]">{children}</div>
      <p className="t-small mb-2 mt-8 text-jo-muted">
        For reference only, not tax advice. Your payslip and tax bill may differ: check with your employer or tax office.
        Checked {formatChecked(PAY_CHECKED)}.
      </p>
      <ul className="t-small m-0 list-none p-0 text-jo-muted">
        {PAY_SOURCES.map((s) => (
          <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer" className="text-jo-muted">{s.name}</a></li>
        ))}
      </ul>
    </div>
  );
}

function PrefecturePick({ value, onChange }: { value: Prefecture; onChange: (p: Prefecture) => void }) {
  return (
    <label className="flex flex-col gap-2 font-bold">
      Prefecture
      <select className={`${field} font-normal`} value={value.name} onChange={(e) => onChange(PREFECTURES.find((p) => p.name === e.target.value)!)}>
        {PREFECTURES.map((p) => <option key={p.name} value={p.name}>{p.name} {p.ja}</option>)}
      </select>
    </label>
  );
}

function YenInput({ label, hint, value, onChange }: { label: string; hint?: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-2 font-bold">
      {label}
      <input className={`${field} font-normal`} inputMode="numeric" value={value} onChange={(e) => onChange(digits(e.target.value))} />
      {hint && <span className="t-small font-normal text-jo-muted">{hint}</span>}
    </label>
  );
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const button = "h-11 w-11 cursor-pointer rounded-full border border-[#d5dbe3] bg-white text-[22px] font-bold text-jo-navy disabled:opacity-40";
  return (
    <div className="flex items-center gap-3">
      <span className="flex-1 font-bold">{label}</span>
      <button type="button" aria-label={`Less: ${label}`} className={button} disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
      <span aria-live="polite" className="w-10 text-center text-[22px] font-black">{value}</span>
      <button type="button" aria-label={`More: ${label}`} className={button} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}

function Headline({ label, value, line }: { label: string; value: string; line: string }) {
  return (
    <div className="rounded-[22px] bg-jo-navy p-6 text-white">
      <p className="m-0 text-jo-yellow">{label}</p>
      <p className="m-0 mt-1 text-[32px] font-black leading-tight">{value}</p>
      <p className="m-0 mt-1 text-[#d9e1ec]">{line}</p>
    </div>
  );
}

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className={`flex justify-between gap-4 py-1.5 ${bold ? "font-bold" : ""}`}><span>{label}</span><span>{value}</span></div>
);

function Notice({ strong, children }: { strong?: boolean; children: ReactNode }) {
  return <p className={`m-0 rounded-2xl p-4 leading-relaxed ${strong ? "bg-[#fdeadb]" : "bg-white"}`}>{children}</p>;
}

export function SalaryCalculator() {
  const [monthly, setMonthly] = useState("250000");
  const [bonus, setBonus] = useState("0");
  const [prefecture, setPrefecture] = useState(TOKYO);
  const [age, setAge] = useState("under");
  const [dependents, setDependents] = useState(0);
  const e = estimatePay({ monthly: +monthly, prefecture, bonus: +bonus, aged40To64: age === "40-64", dependents });
  return (
    <Page title="Take-home pay calculator" line="Your salary in Japan after insurance and tax, by prefecture.">
      <form className="flex flex-col gap-5 rounded-[22px] bg-white p-6 sm:p-8" onSubmit={(ev) => ev.preventDefault()}>
        <YenInput label="Monthly salary before deductions (¥)" value={monthly} onChange={setMonthly} />
        <YenInput label="Bonus per year (¥)" hint="Taken as two equal payments." value={bonus} onChange={setBonus} />
        <PrefecturePick value={prefecture} onChange={setPrefecture} />
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 font-bold">Your age</legend>
          <Choice name="age" value={age} onChange={setAge} options={[["under", "Under 40"], ["40-64", "40 to 64"]]} />
        </fieldset>
        <Stepper label="Dependents aged 16 or over" value={dependents} min={0} max={6} onChange={setDependents} />
      </form>
      <div className="flex flex-col gap-3">
        {+monthly === 0 ? <Notice>Enter your monthly salary to see an estimate.</Notice> : (
          <>
            <Headline label="Estimated take-home a month" value={about(e.monthlyTakeHome)} line={`${about(e.takeHome)} a year, with any bonus`} />
            <div className="rounded-[22px] bg-white p-5">
              <Row label="Pay before deductions" value={yen(e.gross)} />
              <Row label="Health insurance" value={`-${yen(e.health)}`} />
              <Row label="Pension" value={`-${yen(e.pension)}`} />
              <Row label="Employment insurance" value={`-${yen(e.employment)}`} />
              <Row label="Income tax" value={`-${yen(e.incomeTax)}`} />
              <Row label="Resident tax" value={`-${yen(e.residentTax)}`} />
              <hr className="my-2 border-[#e5e9ef]" />
              <Row label="Take-home" value={yen(e.takeHome)} bold />
            </div>
            <Notice>Resident tax is billed the year after you earn. In your first year in Japan you may pay none, then it starts in your second year, so take-home can drop.</Notice>
            <Notice>Health insurance uses Japan Health Insurance Association (Kyokai Kenpo) rates. Some companies have their own plan, with a different rate.</Notice>
          </>
        )}
      </div>
    </Page>
  );
}

export function PartTimeCalculator() {
  const today = new Date();
  const [prefecture, setPrefecture] = useState(TOKYO);
  const [hourly, setHourly] = useState(String(wageOn(TOKYO, today)));
  const [hours, setHours] = useState(20);
  const [visa, setVisa] = useState("student");
  const student = visa === "student";
  const minimum = wageOn(prefecture, today);
  const from = new Date(`${prefecture.wageFrom}T00:00:00+09:00`);
  const date = from.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "Asia/Tokyo" });
  const e = estimatePartTime(+hourly, hours);
  const pick = (p: Prefecture) => { setPrefecture(p); setHourly(String(wageOn(p, today))); };
  return (
    <Page title="Part-time pay calculator" line="Pay and tax from your hours, with the minimum wage for each prefecture.">
      <form className="flex flex-col gap-5 rounded-[22px] bg-white p-6 sm:p-8" onSubmit={(ev) => ev.preventDefault()}>
        <PrefecturePick value={prefecture} onChange={pick} />
        <p className="m-0 rounded-2xl bg-jo-cream p-4 leading-relaxed">
          {today < from
            ? `Minimum wage in ${prefecture.name}: ${yen(minimum)} an hour, rising to ${yen(prefecture.wage)} on ${date}.`
            : `Minimum wage in ${prefecture.name}: ${yen(minimum)} an hour, since ${date}.`}
        </p>
        <YenInput label="Hourly pay (¥)" value={hourly} onChange={setHourly} />
        <Stepper label="Hours a week" value={hours} min={1} max={40} onChange={setHours} />
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 font-bold">Your visa</legend>
          <Choice name="visa" value={visa} onChange={setVisa} options={[["student", "Student visa"], ["other", "Other"]]} />
        </fieldset>
      </form>
      <div className="flex flex-col gap-3">
        {+hourly > 0 && +hourly < minimum && (
          <Notice strong>This is below the minimum wage for {prefecture.name}. Employers must pay at least {yen(minimum)} an hour. Some industries have a higher minimum.</Notice>
        )}
        {student && hours > STUDENT_HOURS && (
          <Notice strong>Over the limit. With a work permission on a Student visa, you can work up to 28 hours a week, or up to 8 hours a day in the long school holidays. Going over can affect renewing your visa.</Notice>
        )}
        {+hourly === 0 ? <Notice>Enter your hourly pay to see an estimate.</Notice> : (
          <>
            <Headline label="Estimated pay a month" value={about(e.monthly)} line={`${about(e.yearly)} a year, before deductions`} />
            <div className="rounded-[22px] bg-white p-5">
              <Row label="Income tax a year" value={yen(e.incomeTax)} />
              <Row label="Resident tax a year" value={yen(e.residentTax)} />
            </div>
            <Notice>With this as your only income and no dependents, income tax for 2026 starts above {yen(INCOME_TAX_FROM)} a year. Resident tax usually starts above about {yen(RESIDENT_TAX_FROM)}, and this can vary by city.</Notice>
            {hours >= INSURANCE_HOURS && (
              <Notice>{student
                ? "At 20 hours or more, most full-time students stay outside workplace social insurance. Ask your employer if you are unsure."
                : "At 20 hours or more, you may join workplace social insurance, depending on your employer and contract. That lowers your take-home pay."}</Notice>
            )}
          </>
        )}
      </div>
    </Page>
  );
}
