import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { APP_STORE_URL, SECTIONS } from "../../lib/joSections";

// japanone.app top bar. Desktop: logo, the six sections, partners, sign in and the app.
// Phone: one short bar (logo, the app, a menu button); the menu holds everything else.
export function JOHeader() {
  const { session } = useAuth();
  const [open, setOpen] = useState(false);

  const account = { to: session ? "/account" : "/login", label: session ? "Account" : "Sign in" };
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 bg-jo-navy text-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 text-white no-underline">
          <img src="/japanone_logo_180.png" alt="" className="h-9 w-9 rounded-full" />
          <span className="text-[20px] font-black sm:text-[22px]">JapanOne</span>
        </Link>
        <nav aria-label="Main" className="hidden flex-1 gap-1 lg:flex">
          {SECTIONS.map((s) => (
            <NavLink
              key={s.id}
              to={`/${s.id}`}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 font-medium no-underline ${isActive ? "bg-white/10 text-jo-yellow" : "text-white hover:text-jo-yellow"}`
              }
            >
              {s.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/partners" className="hidden px-3 py-2 font-bold text-jo-yellow no-underline lg:block">For partners</Link>
          <Link to={account.to} className="hidden rounded-full bg-white/10 px-4 py-2 font-medium text-white no-underline hover:bg-white/20 lg:block">{account.label}</Link>
          <a href={APP_STORE_URL} className="whitespace-nowrap rounded-full bg-jo-yellow px-4 py-2 font-bold text-jo-navy no-underline">Get the app</a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="jo-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 lg:hidden"
          >
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="jo-menu" aria-label="Menu" onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }} className="max-h-[calc(100svh-64px)] overflow-y-auto bg-jo-navy-deep px-4 pb-6 pt-2 lg:hidden">
          <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <NavLink to={`/${s.id}`} className={({ isActive }) => `block rounded-2xl px-4 py-3.5 text-[20px] font-extrabold no-underline ${isActive ? "bg-white/15 text-jo-yellow" : "bg-white/5 text-white"}`}>
                  {s.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/partners" className="rounded-full bg-jo-yellow/15 px-4 py-2.5 font-bold text-jo-yellow no-underline">For partners</Link>
            <Link to={account.to} className="rounded-full bg-white/10 px-4 py-2.5 font-medium text-white no-underline">{account.label}</Link>
            <Link to="/contact" className="rounded-full bg-white/10 px-4 py-2.5 font-medium text-white no-underline">Contact us</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
