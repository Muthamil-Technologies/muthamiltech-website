import { useReveal } from "../../hooks/useReveal";

export function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="theme-light scroll-mt-20 bg-paper py-24">
      <div ref={ref} className="reveal mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          About Muthamil Technologies
        </h2>
        <p className="mt-6 text-lg text-ink-soft">
          Muthamil Technologies is an independent technology company focused on building digital
          products connected to Japan.
        </p>
        <p className="mt-4 text-lg text-ink-soft">
          Our goal is simple: identify everyday problems and build useful, focused products
          that people can actually use.
        </p>
      </div>
    </section>
  );
}
