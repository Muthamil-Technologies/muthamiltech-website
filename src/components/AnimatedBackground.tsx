interface AnimatedBackgroundProps {
  /** Hero gets the strongest treatment; other dark sections stay quieter. */
  strength?: "strong" | "subtle";
  /** Pointer-driven offset in px, hero-only. Ignored (orbs stay put) elsewhere. */
  parallax?: { x: number; y: number };
}

/**
 * Decorative depth for `.theme-dark` sections only — blurred drifting orbs,
 * a few slow-floating particles, and (strong mode) thin flowing lines.
 * Pure CSS animation, so `prefers-reduced-motion` is handled globally by
 * freezing all animation-durations; this component is hidden outright in
 * that case via `motion-reduce:hidden` since a frozen orb/line looks like a
 * stray blur rather than the plain premium background the section should
 * fall back to.
 */
export function AnimatedBackground({ strength = "subtle", parallax }: AnimatedBackgroundProps) {
  const particleCount = strength === "strong" ? 6 : 3;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
    >
      <div
        className="animate-orb-a absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          transform: parallax ? `translate(${parallax.x}px, ${parallax.y}px)` : undefined,
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        className="animate-orb-b absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full opacity-[0.15] blur-3xl"
        style={{
          background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          transform: parallax ? `translate(${-parallax.x * 0.6}px, ${-parallax.y * 0.6}px)` : undefined,
          transition: "transform 0.4s ease-out",
        }}
      />

      {strength === "strong" && (
        <svg className="absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden="true">
          <line x1="5%" y1="20%" x2="45%" y2="55%" stroke="white" strokeWidth="1" strokeDasharray="4 8" className="animate-line-flow" />
          <line x1="60%" y1="15%" x2="95%" y2="40%" stroke="white" strokeWidth="1" strokeDasharray="4 8" className="animate-line-flow" />
          <line x1="20%" y1="80%" x2="70%" y2="60%" stroke="white" strokeWidth="1" strokeDasharray="4 8" className="animate-line-flow" />
        </svg>
      )}

      {Array.from({ length: particleCount }).map((_, i) => (
        <span
          key={i}
          className="animate-particle absolute h-1 w-1 rounded-full bg-white/40"
          style={{
            left: `${12 + i * (76 / particleCount)}%`,
            top: `${30 + ((i * 37) % 50)}%`,
            animationDuration: `${9 + i * 2}s`,
            animationDelay: `${i * 1.3}s`,
          }}
        />
      ))}
    </div>
  );
}
