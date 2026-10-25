import { Link } from "react-router-dom";
import { contact, products } from "../data/products";
import { isJapanOne, SITE_NAME, social } from "../lib/brand";

const JAPANONE_ANCHOR: Record<string, string> = { japtalk: "/#learn", japtutor: "/#learn", japwork: "/#work", japtour: "/#travel" };

export function Footer() {
  return (
    <footer className="theme-dark border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="text-base font-bold tracking-tight text-ink">{SITE_NAME}</div>
            <p className="mt-2 text-sm text-ink-soft">{isJapanOne ? "Gateway to Japan: learn, travel, work." : "The company behind JapanOne."}</p>
          </div>

          <FooterColumn title="Products">
            {products.map((p) => (
              <a key={p.slug} href={isJapanOne ? JAPANONE_ANCHOR[p.slug] ?? "/#apps" : p.url} className="block hover:text-ink">
                {p.name}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {isJapanOne ? (
              <>
                <a href="https://muthamiltech.com" className="block hover:text-ink">About Muthamil Technologies</a>
                <a href={`mailto:${contact.email}`} className="block hover:text-ink">{contact.email}</a>
              </>
            ) : (
              <>
                <a href="/#about" className="block hover:text-ink">About</a>
                <a href="/#contact" className="block hover:text-ink">Contact</a>
              </>
            )}
            <a href={isJapanOne ? "/partners" : "/#contact"} className="block hover:text-ink">Become a partner</a>
          </FooterColumn>

          <FooterColumn title="Legal">
            <Link to="/privacy" className="block hover:text-ink">Privacy Policy</Link>
            <Link to="/terms" className="block hover:text-ink">Terms</Link>
            <a
              href={social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="block hover:text-ink"
            >
              Instagram
            </a>
          </FooterColumn>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-xs text-ink-faint">
          {isJapanOne ? <>&copy; 2026 JapanOne, a product of Muthamil Technologies.</> : <>&copy; 2026 Muthamil Technologies. All rights reserved.</>}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{title}</div>
      <div className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">{children}</div>
    </div>
  );
}
