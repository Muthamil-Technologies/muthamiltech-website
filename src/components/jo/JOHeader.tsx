import { Link, NavLink } from "react-router-dom";
import { APP_STORE_URL, SECTIONS } from "../../lib/joSections";

// japanone.app top bar: logo, the six sections, partners, sign in and the app.
export function JOHeader() {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 bg-jo-navy text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 text-white no-underline">
          <img src="/japanone_logo_180.png" alt="" className="h-10 w-10 rounded-full" />
          <span className="text-[22px] font-black">JapanOne</span>
        </Link>
        <nav aria-label="Main" className="order-3 -mx-1 flex w-full gap-1 overflow-x-auto lg:order-none lg:w-auto lg:flex-1">
          {SECTIONS.map((s) => (
            <NavLink
              key={s.id}
              to={`/${s.id}`}
              className={({ isActive }) =>
                `shrink-0 rounded-full px-3 py-2 text-[15px] font-medium no-underline ${isActive ? "bg-white/10 text-jo-yellow" : "text-white hover:text-jo-yellow"}`
              }
            >
              {s.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/partners" className="hidden px-3 py-2 text-[15px] font-bold text-jo-yellow no-underline sm:block">For partners</Link>
          <Link to="/login" className="rounded-full border border-white/50 px-4 py-2 text-[15px] font-medium text-white no-underline">Sign in</Link>
          <a href={APP_STORE_URL} className="rounded-full bg-jo-yellow px-4 py-2 text-[15px] font-bold text-jo-navy no-underline">Get the app</a>
        </div>
      </div>
    </header>
  );
}
