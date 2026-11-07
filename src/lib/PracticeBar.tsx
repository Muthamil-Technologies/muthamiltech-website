import { useState } from "react";
import { PRACTICE_ADMIN, practiceEmail, practiceReset, practiceSignIn, practiceSignOut } from "./mockSupabase";

// The strip shown in practice mode, so nobody mistakes it for the real site.
export default function PracticeBar() {
  const [, redraw] = useState(0);
  const run = (fn: () => void, go?: string) => { fn(); redraw((n) => n + 1); if (go) location.assign(go); };
  const button = "cursor-pointer rounded-full bg-black/10 px-3 py-1.5 font-bold hover:bg-black/20";
  return (
    <div className="sticky bottom-0 z-50 flex flex-wrap items-center gap-2 bg-jo-yellow px-4 py-2 text-sm text-jo-navy">
      <b>Practice mode: only in this browser.</b>
      <span>Signed in: {practiceEmail() ?? "nobody"}</span>
      <button type="button" className={button} onClick={() => run(() => practiceSignIn("partner@practice.test"), "/partners")}>Partner</button>
      <button type="button" className={button} onClick={() => run(() => practiceSignIn(PRACTICE_ADMIN), "/admin")}>Admin</button>
      <button type="button" className={button} onClick={() => run(practiceSignOut, "/")}>Visitor</button>
      <button type="button" className={button} onClick={() => run(practiceReset, "/")}>Clear all</button>
    </div>
  );
}
