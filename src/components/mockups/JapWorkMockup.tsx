import { PhoneFrame } from "./PhoneFrame";

const steps: [string, boolean][] = [
  ["Pass the caregiving skills test", false],
  ["Pass JFT-Basic or JLPT N4", true],
  ["Pass the care Japanese test", false],
  ["Find an employer and sign a contract", false],
];

export function JapWorkMockup() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col gap-4">
        <div className="text-xs font-semibold tracking-wide text-ink-faint uppercase">Your path</div>
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="text-sm font-semibold text-ink">Specified Skilled Worker (i)</div>
          <div className="mt-1 text-xs text-ink-soft">Caregiving &middot; 介護</div>
          <div className="mt-3 flex flex-col gap-2">
            {steps.map(([text, done]) => (
              <div key={text} className="flex items-start gap-2 text-[11px] text-ink-soft">
                <span className={`mt-0.5 h-3 w-3 flex-none rounded-full border ${done ? "border-accent bg-accent" : "border-line"}`} />
                <span className={done ? "line-through opacity-60" : ""}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="text-xs font-semibold text-ink">履歴書 (Japanese CV)</div>
          <div className="mt-2 h-3 w-2/3 rounded-full bg-line" />
          <div className="mt-2 h-3 w-1/2 rounded-full bg-line" />
        </div>
        <div className="mt-auto text-[11px] text-ink-faint">Illustrative example.</div>
      </div>
    </PhoneFrame>
  );
}
