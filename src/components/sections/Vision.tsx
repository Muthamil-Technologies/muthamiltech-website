import { useReveal } from "../../hooks/useReveal";

export function Vision() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="vision" className="theme-light scroll-mt-20 bg-paper py-24">
      <div ref={ref} className="reveal mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Built from experience. Designed for real life.
        </h2>
        <p className="mt-6 text-lg text-ink-soft">
          Japan is an incredible place to learn, work, live, and explore — but navigating it
          can sometimes be complicated. Muthamil Technologies focuses on practical digital products
          that solve specific problems and make the Japan experience simpler.
        </p>
      </div>
    </section>
  );
}
