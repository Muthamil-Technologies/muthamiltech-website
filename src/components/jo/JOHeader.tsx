import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { ANDROID_BETA_URL, APP_STORE_URL, MENU_SECTIONS } from "../../lib/joSections";

// japanone.app top bar. Desktop: logo, the sections, partners, sign in and the app.
// Phone: one short bar (logo, the app, a menu button); the menu holds everything else.
export function JOHeader() {
  const { session } = useAuth();
  const [open, setOpen] = useState(false);
  const inStudy = useLocation().pathname.startsWith("/study");

  const account = { to: session ? "/account" : "/login", label: session ? "Account" : "Sign in" };
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 bg-jo-navy text-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 text-white no-underline">
          <img src="/japanone_logo_180.png" alt="" className="h-9 w-9 rounded-full" />
          <span className="text-[20px] font-black sm:text-[22px]">JapanOne</span>
        </Link>
        <nav aria-label="Main" className="hidden flex-1 gap-1 lg:flex">
          {MENU_SECTIONS.map((s) => (
            <NavLink
              key={s.id}
              to={`/${s.id}`}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 font-medium no-underline ${isActive || (inStudy && s.id === "learn") ? "bg-white/10 text-jo-yellow" : "text-white hover:text-jo-yellow"}`
              }
            >
              {s.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/partners" className="hidden px-3 py-2 font-bold text-jo-yellow no-underline lg:block">For partners</Link>
          <Link to={account.to} className="hidden rounded-full bg-white/10 px-4 py-2 font-medium text-white no-underline hover:bg-white/20 lg:block">{account.label}</Link>
          <GetTheApp />
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
            {MENU_SECTIONS.map((s) => (
              <li key={s.id}>
                <NavLink to={`/${s.id}`} className={({ isActive }) => `block rounded-2xl px-4 py-3.5 text-[20px] font-extrabold no-underline ${isActive || (inStudy && s.id === "learn") ? "bg-white/15 text-jo-yellow" : "bg-white/5 text-white"}`}>
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

// "Get the app": a small choice between the iPhone app and the Android beta sign-up.
function GetTheApp() {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", esc); };
  }, [open]);
  const item = "flex items-center gap-3 rounded-xl px-3 py-3 text-jo-navy no-underline hover:bg-jo-navy/5";
  return (
    <div ref={box} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="true"
        className="cursor-pointer whitespace-nowrap rounded-full border-0 bg-jo-yellow px-4 py-2 font-bold text-jo-navy">Get the app</button>
      {open && (
        <div role="menu" className="absolute right-0 top-[calc(100%+8px)] w-[260px] rounded-2xl bg-white p-2 shadow-[0_12px_32px_rgba(10,25,47,0.25)]">
          <a role="menuitem" href={APP_STORE_URL} className={item} onClick={() => setOpen(false)}>
            <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 4.9c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.1.1 2.3-.6 3-1.5z"/></svg>
            <span className="flex flex-col leading-tight"><span className="font-bold">iPhone</span><span className="t-small text-jo-muted">Download on the App Store</span></span>
          </a>
          <a role="menuitem" href={ANDROID_BETA_URL} target="_blank" rel="noopener" className={item} onClick={() => setOpen(false)}>
            <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="#3ddc84"><path d="M17.6 9.5l1.8-3.1c.1-.2 0-.4-.1-.5-.2-.1-.4 0-.5.1l-1.8 3.2C15.6 8.5 13.9 8.1 12 8.1s-3.6.4-5 1.1L5.2 6c-.1-.2-.3-.2-.5-.1-.2.1-.2.3-.1.5l1.8 3.1C3.3 11.2 1.3 14.2 1 17.7h22c-.3-3.5-2.3-6.5-5.4-8.2zM7 15c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm10 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/></svg>
            <span className="flex flex-col leading-tight"><span className="font-bold">Android</span><span className="t-small text-jo-muted">Join the beta before launch</span></span>
          </a>
        </div>
      )}
    </div>
  );
}
