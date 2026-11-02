import { useState } from "react";
import { Link } from "react-router-dom";
import { Choice } from "../../components/jo/Choice";

// Study tool: an estimate of what studying in Japan costs. Defaults are JASSO figures (first-year
// admission + tuition by school type; 2023 survey of living costs); every number can be changed.
const FEES: { id: string; label: string; yen: number }[] = [
  { id: "language", label: "Japanese language school", yen: 1_000_000 },
  { id: "vocational", label: "Vocational school (専門学校)", yen: 1_300_000 },
  { id: "national", label: "National university", yen: 820_000 },
  { id: "public", label: "Public university", yen: 910_000 },
  { id: "private", label: "Private university", yen: 1_300_000 },
  { id: "junior", label: "Junior college", yen: 900_000 },
];
const FEE_NOTE: Record<string, string> = {
  language: "JASSO gives ¥610,000–¥1,900,000 for the first year; we start at ¥1,000,000. Use your school's fee.",
  junior: "JASSO gives ¥600,000–¥1,200,000 for the first year; we start in the middle. Use your college's fee.",
};
const RENT = { tokyo: 57_000, other: 41_000 };
const OTHER_LIVING = 105_000 - 41_000; // national average total minus national average rent

const yen = (n: number) => `¥${Math.round(n).toLocaleString("en-US")}`;

export function StudyCost() {
  const [type, setType] = useState("language");
  const [fee, setFee] = useState(FEES[0].yen);
  const [years, setYears] = useState(1.5);
  const [area, setArea] = useState<"tokyo" | "other">("tokyo");
  const [rent, setRent] = useState(RENT.tokyo);
  const [other, setOther] = useState(OTHER_LIVING);

  const monthly = rent + other;
  const tuition = fee * years;
  const living = monthly * 12 * years;

  const pickType = (id: string) => { setType(id); setFee(FEES.find((f) => f.id === id)!.yen); };
  const pickArea = (a: "tokyo" | "other") => { setArea(a); setRent(RENT[a]); };

  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6">
      <Link to="/study" className="text-sm font-bold text-[#4a2f99] no-underline">← Study in Japan</Link>
      <h1 className="mb-2 mt-4 text-[34px] font-black leading-tight sm:text-[40px]">Study cost calculator</h1>
      <p className="m-0 text-lg leading-relaxed text-jo-muted">An estimate of tuition and living costs. Start from the official averages, then change any number to match your school and city.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-[3fr_2fr]">
        <form className="flex flex-col gap-6 rounded-[22px] bg-white p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-2 font-bold">School</legend>
            <Choice name="type" value={type} onChange={pickType} options={FEES.map((f) => [f.id, f.label])} />
          </fieldset>
          <Money label="Tuition per year (¥)" value={fee} onChange={setFee} hint={FEE_NOTE[type] ?? "JASSO's average first-year admission + tuition. Use your school's fee."} />
          <label className="flex flex-col gap-2">
            <span className="font-bold">How long (years)</span>
            <input type="number" min={0.5} max={8} step={0.5} value={years} onChange={(e) => setYears(Number(e.target.value) || 0)}
              className="w-32 rounded-xl border border-[#d9dee6] px-3 py-2.5 text-lg text-jo-navy" />
          </label>
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-2 font-bold">Where</legend>
            <Choice name="area" value={area} onChange={(v) => pickArea(v as "tokyo" | "other")} options={[["tokyo", "Tokyo"], ["other", "Elsewhere in Japan"]]} />
          </fieldset>
          <Money label="Rent per month (¥)" value={rent} onChange={setRent} hint="JASSO 2023 survey average: ¥57,000 in Tokyo, ¥41,000 nationally." />
          <Money label="Food, transport, phone, insurance and other per month (¥)" value={other} onChange={setOther} hint="National average living costs (¥105,000) minus average rent (¥41,000)." />
        </form>

        <aside className="flex flex-col gap-3 self-start rounded-[22px] bg-jo-navy p-6 text-white md:sticky md:top-24" aria-live="polite">
          <p className="m-0 text-sm font-bold text-jo-yellow">YOUR ESTIMATE</p>
          <Row label="Living costs per month" value={yen(monthly)} />
          <Row label="Per year (tuition + living)" value={yen(fee + monthly * 12)} />
          <Row label={`Tuition, ${years} year${years === 1 ? "" : "s"}`} value={yen(tuition)} />
          <Row label={`Living, ${years} year${years === 1 ? "" : "s"}`} value={yen(living)} />
          <div className="mt-1 border-t border-white/20 pt-3">
            <p className="m-0 text-sm text-[#d9e1ec]">Total</p>
            <p className="m-0 text-4xl font-black text-jo-yellow">{yen(tuition + living)}</p>
          </div>
          <p className="m-0 text-[13px] leading-relaxed text-[#b9c6d6]">An estimate, not a quote. Fees include admission, which is usually paid only once, so later years may cost less. Costs vary by school, city and lifestyle.</p>
        </aside>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-jo-muted">
        Defaults from Study in Japan (JASSO):{" "}
        <a href="https://www.studyinjapan.go.jp/en/planning/academic-fees/" target="_blank" rel="noreferrer" className="text-[#1f4fa8] underline">academic fees</a> and{" "}
        <a href="https://www.studyinjapan.go.jp/en/life/cost-of-living/" target="_blank" rel="noreferrer" className="text-[#1f4fa8] underline">living costs (2023 Lifestyle Survey of Privately-Financed International Students)</a>, checked Nov 3, 2026.
        Part-time work can help, within the rules. <Link to="/guides/study-part-time" className="font-bold text-[#1f4fa8]">Part-time work rules →</Link>
      </p>
    </div>
  );
}

function Money({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-bold">{label}</span>
      <input type="number" min={0} step={1000} inputMode="numeric" value={value} onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-48 rounded-xl border border-[#d9dee6] px-3 py-2.5 text-lg text-jo-navy" />
      <span className="text-sm text-jo-muted">{hint}</span>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[#d9e1ec]">{label}</span>
      <b className="text-lg">{value}</b>
    </div>
  );
}
