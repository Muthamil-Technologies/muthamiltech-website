import { useReveal } from "../../hooks/useReveal";

export function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="theme-light scroll-mt-20 bg-surface py-24">
      <div ref={ref} className="reveal mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          About Muthamil Technologies
        </h2>
        <p className="mt-6 text-lg text-ink-soft">
          Muthamil Technologies is an independent software company based in Japan. We build
          practical apps for people coming to Japan from abroad: to learn the language, plan a
          trip, or find their path to work.
        </p>
        <p className="mt-4 text-lg text-ink-soft">
          Our apps work offline, need no account, and link to official sources wherever rules
          and procedures are involved.
        </p>
      </div>
    </section>
  );
}
