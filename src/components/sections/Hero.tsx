import { AnimatedBackground } from "../AnimatedBackground";
import { useParallax } from "../../hooks/useParallax";

export function Hero() {
  const { ref, offset } = useParallax<HTMLElement>(14);

  return (
    <section
      id="top"
      ref={ref}
      className="theme-dark relative overflow-hidden bg-paper"
    >
      <AnimatedBackground strength="strong" parallax={offset} />

      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center md:py-36">
        <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
          Japan-focused technology
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
          Technology for life in Japan.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-ink-soft md:text-xl">
          Built for every step of your Japan journey.
        </p>
        <p className="mx-auto mt-4 max-w-lg text-base text-ink-soft">
          Muthamil Technologies builds practical digital products designed around the real needs of
          people learning, working, living, and travelling in Japan.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#products"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
          >
            Explore Our Products
          </a>
          <a
            href="#about"
            className="rounded-full border border-ink px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            About Muthamil Technologies
          </a>
        </div>
      </div>
    </section>
  );
}
