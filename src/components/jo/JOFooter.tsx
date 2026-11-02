import { Link } from "react-router-dom";
import { social } from "../../lib/brand";
import { SECTIONS } from "../../lib/joSections";
import { JOHeader } from "./JOHeader";

export function JOFooter() {
  return (
    <footer className="bg-jo-navy-deep text-[#b9c6d6]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-9 px-4 py-11 sm:px-6">
        <div className="flex max-w-sm flex-col gap-2.5">
          <strong className="text-[22px] font-black text-white">JapanOne</strong>
          <p className="m-0 text-sm leading-relaxed">
            © Muthamil Technologies. No copying or scraping: see the Terms of Use. General information only, not legal or visa advice. Facts come from official sources such as ISA, MEXT, JASSO and MHLW,
            and show the date we checked them.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-9 text-sm">
          <div className="flex flex-col gap-2">
            <strong className="text-white">Explore</strong>
            {SECTIONS.map((s) => (
              <Link key={s.id} to={`/${s.id}`} className="text-[#b9c6d6] hover:text-white">{s.label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <strong className="text-white">Company</strong>
            <Link to="/partners" className="text-[#b9c6d6] hover:text-white">For partners</Link>
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
      <div className="mx-auto max-w-[1200px] px-4 pb-7 text-[13px] sm:px-6">© 2026 Muthamil Technologies</div>
    </footer>
  );
}

export function JOLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="jo flex min-h-screen flex-col">
      <JOHeader />
      <main className="flex-1">{children}</main>
      <JOFooter />
    </div>
  );
}
