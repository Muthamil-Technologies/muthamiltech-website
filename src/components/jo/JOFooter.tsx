import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { social } from "../../lib/brand";
import { MENU_SECTIONS } from "../../lib/joSections";
import { JOHeader } from "./JOHeader";

export function JOFooter() {
  return (
    <footer className="bg-jo-navy-deep text-[#b9c6d6]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-9 px-4 py-11 sm:px-6">
        <div className="flex max-w-sm flex-col gap-2.5">
          <strong className="text-[22px] font-black text-white">JapanOne</strong>
          <p className="m-0 leading-relaxed">
            © Muthamil Technologies. No copying or scraping: see the Terms of Use. General information only, not legal or visa advice. Facts come from official sources such as ISA, MEXT, JASSO and MHLW,
            and show the date we checked them.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-9">
          <div className="flex flex-col gap-2">
            <strong className="text-white">Explore</strong>
            {MENU_SECTIONS.map((s) => (
              <Link key={s.id} to={`/${s.id}`} className="text-[#b9c6d6] hover:text-white">{s.label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <strong className="text-white">Company</strong>
            <Link to="/partners" className="text-[#b9c6d6] hover:text-white">For partners</Link>
            <Link to="/contact" className="text-[#b9c6d6] hover:text-white">Contact us</Link>
            <Link to="/japanone/legal" className="text-[#b9c6d6] hover:text-white">Privacy &amp; support</Link>
            <Link to="/terms" className="text-[#b9c6d6] hover:text-white">Terms of Use</Link>
          </div>
          <div className="flex flex-col gap-2">
            <strong className="text-white">Follow</strong>
            <a href={social.tiktok} className="text-[#b9c6d6] hover:text-white">TikTok</a>
            <a href={social.instagram} className="text-[#b9c6d6] hover:text-white">Instagram</a>
            <a href={social.youtube} className="text-[#b9c6d6] hover:text-white">YouTube</a>
            <a href={social.facebook} className="text-[#b9c6d6] hover:text-white">Facebook</a>
          </div>
        </nav>
      </div>
      <div className="mx-auto max-w-[1200px] px-4 pb-7 text-sm sm:px-6">© 2026 Muthamil Technologies</div>
    </footer>
  );
}

// Section entrances (see index.css): each [data-reveal] block's parts rise in as it scrolls into view.
function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const blocks = [...document.querySelectorAll<HTMLElement>(".jo [data-reveal]")];
    blocks.forEach((b) => [...b.children].forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(Math.min(i, 8)))));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -8% 0px" });
    blocks.forEach((b) => io.observe(b));
    document.documentElement.setAttribute("data-reveal-ready", "");
    return () => io.disconnect();
  }, [pathname]);
}

// A new page starts at the top (links to a #part of a page scroll there instead).
function useScrollTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export function JOLayout({ children }: { children: React.ReactNode }) {
  useScrollTop();
  useReveal();
  return (
    <div className="jo flex min-h-svh flex-col">
      <JOHeader />
      <main className="flex-1">{children}</main>
      <JOFooter />
    </div>
  );
}
