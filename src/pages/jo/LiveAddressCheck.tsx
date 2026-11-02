import { useState } from "react";
import { Link } from "react-router-dom";
import { Choice } from "./StudyHoursCheck";

// Live tool: what to do about address registration in your situation. From the live-address
// guide (Ministry of Internal Affairs and Communications, checked Nov 3, 2026).
type Case = "abroad" | "other-city" | "same-city" | "leaving";

const STEPS: Record<Case, { when: string; steps: string[]; bring: string[] }> = {
  abroad: {
    when: "Within 14 days of moving in",
    steps: ["Go to your city, ward, town or village office.", "Report your new address (move-in notification)."],
    bring: ["Residence card (or your passport if you weren't given one at the airport)", "Family members: proof of relationship, such as a birth or marriage certificate, with a Japanese translation"],
  },
  "other-city": {
    when: "Move-out before you leave; move-in within 14 days of moving in",
    steps: ["At your current municipal office, report your move-out and get a Move-out Certificate.", "At your new municipal office, report your move-in with that certificate."],
    bring: ["Residence card", "Move-out Certificate (for the new office)"],
  },
  "same-city": {
    when: "After you move",
    steps: ["Report the change of address at your municipal office."],
    bring: ["Residence card"],
  },
  leaving: {
    when: "Before you leave Japan",
    steps: ["Report your move-out at your municipal office."],
    bring: ["Residence card"],
  },
};

export function LiveAddressCheck() {
  const [c, setC] = useState<Case>("abroad");
  const info = STEPS[c];
  return (
    <div className="mx-auto max-w-[760px] px-4 py-12 sm:px-6">
      <Link to="/live" className="text-sm font-bold text-[#11697d] no-underline">← Live</Link>
      <h1 className="mb-2 mt-4 text-[34px] font-black leading-tight sm:text-[40px]">Address registration checklist</h1>
      <p className="m-0 text-lg leading-relaxed text-jo-muted">For foreign residents with a residence card. Pick your situation.</p>

      <div className="mt-8 flex flex-col gap-6 rounded-[22px] bg-white p-6 sm:p-8">
        <Choice name="case" value={c} onChange={(v) => setC(v as Case)} options={[
          ["abroad", "Just arrived from abroad"], ["other-city", "Moving to another city"], ["same-city", "Moving in the same city"], ["leaving", "Leaving Japan"]]} />
        <div className="rounded-[18px] bg-[#dcf0f5] p-5">
          <p className="m-0 text-sm font-bold text-[#11697d]">WHEN</p>
          <p className="m-0 mt-1 text-xl font-black">{info.when}</p>
        </div>
        <div>
          <h2 className="m-0 mb-2 text-lg font-extrabold">Steps</h2>
          <ol className="m-0 flex flex-col gap-1.5 pl-5 leading-relaxed">{info.steps.map((s) => <li key={s}>{s}</li>)}</ol>
        </div>
        <div>
          <h2 className="m-0 mb-2 text-lg font-extrabold">Bring</h2>
          <ul className="m-0 flex flex-col gap-1.5 pl-5 leading-relaxed">{info.bring.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-jo-muted">
        Based on the Ministry of Internal Affairs and Communications, checked Nov 3, 2026. General information, not advice.{" "}
        <Link to="/guides/live-address" className="font-bold text-[#1f4fa8]">Read the full guide →</Link>
      </p>
    </div>
  );
}
