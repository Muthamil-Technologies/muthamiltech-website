export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      {/* subtle geometric motif, not literal Japanese iconography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center md:py-36">
        <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
          Japan-focused technology
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
          Technology for life in Japan.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-ink-soft md:text-xl">
          Learn Japanese. Prepare for your future. Find opportunities. Explore Japan.
        </p>
        <p className="mx-auto mt-4 max-w-lg text-base text-ink-soft">
          Muthamil Tech builds practical digital products designed around the real needs of
          people learning, working, living, and travelling in Japan.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#products"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-deep"
          >
            Explore Our Products
          </a>
          <a
            href="#about"
            className="rounded-full border border-ink px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            About Muthamil Tech
          </a>
        </div>
      </div>
    </section>
  );
}
