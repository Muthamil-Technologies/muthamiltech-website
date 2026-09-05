import { PhoneFrame } from "./PhoneFrame";

export function JapTalkMockup() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col gap-4">
        <div className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
          Speaking Challenge
        </div>
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="text-xs text-ink-faint">Say "This is cheap."</div>
          <div className="mt-2 h-3 w-3/4 rounded-full bg-line" />
        </div>
        <div className="rounded-xl border border-dashed border-line p-4 text-sm text-ink-soft">
          これは安いです。
        </div>
        <div className="mt-auto flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-paper">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="6" y="1" width="4" height="8" rx="2" fill="currentColor" />
              <path d="M3 7.5C3 10 5 12 8 12s5-2 5-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M8 12v2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="h-2 flex-1 rounded-full bg-line" />
        </div>
      </div>
    </PhoneFrame>
  );
}
