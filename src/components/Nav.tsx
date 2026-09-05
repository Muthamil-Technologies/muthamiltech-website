import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const links = [
  { label: "Home", href: "#top" },
  { label: "Products", href: "#products" },
  { label: "Vision", href: "#vision" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  function goToSection(href: string) {
    setOpen(false);
    if (onHome) {
      if (href === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/" + href);
    }
  }

  return (
    <header className="theme-dark sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-base font-bold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          Muthamil Tech
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => goToSection(link.href)}
              className="transition-colors hover:text-ink focus-visible:text-ink focus-visible:outline-none"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => goToSection("#products")}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Explore Products
          </button>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M1 4H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M1 9H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M1 14H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line bg-paper px-6 py-4 md:hidden">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => goToSection(link.href)}
              className="rounded-lg px-3 py-3 text-left text-base font-medium text-ink-soft hover:bg-surface hover:text-ink"
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
