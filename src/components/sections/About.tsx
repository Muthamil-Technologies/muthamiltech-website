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
          JapanOne for people coming to Japan from abroad: to learn the language, study, work,
          travel and settle in.
        </p>
        <p className="mt-4 text-lg text-ink-soft">
          JapanOne works without an account, keeps its tools on your device, and links to official
          sources wherever rules and procedures are involved.
        </p>
      </div>
    </section>
  );
}
