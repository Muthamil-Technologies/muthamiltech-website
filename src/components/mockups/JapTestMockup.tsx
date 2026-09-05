import { PhoneFrame } from "./PhoneFrame";

const levels = ["N5", "N4", "N3", "N2", "N1"];

export function JapTestMockup() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col gap-6">
        <div className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
          Your JLPT Path
        </div>
        <div className="flex items-center justify-between">
          {levels.map((level, i) => (
            <div key={level} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                  i === 0
                    ? "bg-accent text-paper"
                    : "border border-line text-ink-faint"
                }`}
              >
                {level}
              </div>
              {i < levels.length - 1 && <div className="hidden h-px w-6 bg-line sm:block" />}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="text-xs text-ink-faint">Today's practice</div>
          <div className="mt-2 h-3 w-2/3 rounded-full bg-line" />
          <div className="mt-2 h-3 w-1/2 rounded-full bg-line" />
        </div>
        <div className="mt-auto rounded-xl bg-ink/5 p-3 text-center text-xs font-semibold text-ink-soft">
          12 questions today
        </div>
      </div>
    </PhoneFrame>
  );
}
