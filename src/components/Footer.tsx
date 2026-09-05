import { Link } from "react-router-dom";
import { contact, products } from "../data/products";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="text-base font-bold tracking-tight text-ink">Muthamil Tech</div>
            <p className="mt-2 text-sm text-ink-soft">Technology for life in Japan.</p>
          </div>

          <FooterColumn title="Products">
            {products.map((p) => (
              <a key={p.slug} href={`/#${p.slug}`} className="block hover:text-ink">
                {p.name}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            <a href="/#vision" className="block hover:text-ink">Vision</a>
            <a href="/#about" className="block hover:text-ink">About</a>
            <a href="/#contact" className="block hover:text-ink">Contact</a>
          </FooterColumn>

          <FooterColumn title="Legal">
            <Link to="/privacy" className="block hover:text-ink">Privacy Policy</Link>
            <Link to="/terms" className="block hover:text-ink">Terms</Link>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="block hover:text-ink"
            >
              Instagram
            </a>
          </FooterColumn>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-xs text-ink-faint">
          &copy; 2026 Muthamil Tech. All rights reserved.
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
