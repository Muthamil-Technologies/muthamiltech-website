import { Link } from "react-router-dom";

// The japanone.app top bar: logo home, and the three sections of the home page.
export const SECTIONS = [
  { id: "learn", label: "Learn" },
  { id: "travel", label: "Travel" },
  { id: "work", label: "Work" },
] as const;

export function JapanOneHeader() {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 border-b border-white/10 bg-[#12263f]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <img src="/japanone_logo_180.png" alt="" className="h-8 w-8 rounded-full" />
          JapanOne
        </Link>
        <nav className="flex gap-4 text-sm font-semibold text-white/75 sm:gap-6">
          {SECTIONS.map((s) => (
            <Link key={s.id} to={`/#${s.id}`} className="hover:text-white">{s.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
