import { PhoneFrame } from "./PhoneFrame";

export function JapJobMockup() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col gap-4">
        <div className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
          Illustrative example
        </div>
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="text-sm font-semibold text-ink">Software Engineer</div>
          <div className="mt-1 text-xs text-ink-soft">Tokyo &middot; Hybrid</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-medium text-ink-soft">
              &yen;7M&ndash;&yen;10M
            </span>
            <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-medium text-ink-soft">
              JLPT N2+
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-line bg-surface p-4 opacity-60">
          <div className="h-3 w-2/3 rounded-full bg-line" />
          <div className="mt-2 h-3 w-1/2 rounded-full bg-line" />
        </div>
        <div className="mt-auto text-[11px] text-ink-faint">
          Example only &mdash; not a live listing.
        </div>
      </div>
    </PhoneFrame>
  );
}
