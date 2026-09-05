import { PhoneFrame } from "./PhoneFrame";

const days = [
  { label: "Day 1", place: "Arrive · Tokyo" },
  { label: "Day 2", place: "Explore · Asakusa" },
  { label: "Day 3", place: "Day trip · Hakone" },
  { label: "Day 4", place: "Depart · Tokyo" },
];

export function JapTourMockup() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col gap-3">
        <div className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
          Your Itinerary
        </div>
        {days.map((day) => (
          <div
            key={day.label}
            className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3"
          >
            <div className="flex h-8 w-14 shrink-0 items-center justify-center rounded-lg bg-ink/5 text-[11px] font-bold text-ink-soft">
              {day.label}
            </div>
            <div className="h-3 w-2/3 rounded-full bg-line" />
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}
