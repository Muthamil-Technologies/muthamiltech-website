import { contact } from "../../data/products";
import { useReveal } from "../../hooks/useReveal";
import { AnimatedBackground } from "../AnimatedBackground";

export function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="theme-dark relative overflow-hidden bg-paper py-24">
      <AnimatedBackground strength="subtle" />
      <div ref={ref} className="reveal relative mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Let's build something useful.
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Have an idea, feedback, partnership opportunity, or want to learn more about our
          products?
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:${contact.email}`}
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
          >
            {contact.email}
          </a>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-ink px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
