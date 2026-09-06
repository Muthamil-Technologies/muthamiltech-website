import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { useReveal } from "../hooks/useReveal";
import { AnimatedBackground } from "./AnimatedBackground";
import { StatusPill } from "./StatusPill";

interface FeatureSectionProps {
  product: Product;
  heading: string;
  tagline: string;
  mockup: ReactNode;
  tone?: "dark" | "light";
  reversed?: boolean;
  /** Optional link to a lightweight interactive teaser page for this product. */
  tryLink?: { to: string; label: string };
}

export function FeatureSection({
  product,
  heading,
  tagline,
  mockup,
  tone = "light",
  reversed = false,
  tryLink,
}: FeatureSectionProps) {
  const ref = useReveal<HTMLDivElement>();
  const isDark = tone === "dark";

  return (
    <section
      id={product.slug}
      className={`relative scroll-mt-20 overflow-hidden bg-paper py-20 md:py-28 ${
        isDark ? "theme-dark" : "theme-light"
      }`}
    >
      {isDark && <AnimatedBackground strength="subtle" />}
      <div
        ref={ref}
        className={`reveal relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 md:flex-row md:gap-20 ${
          reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="flex-1">
          <StatusPill status={product.status} />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-ink-soft">{tagline}</p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={product.url}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Discover {product.name}
            </a>
            {tryLink && (
              <Link to={tryLink.to} className="text-sm font-semibold text-accent">
                {tryLink.label} &rarr;
              </Link>
            )}
          </div>
        </div>
        <div className="flex-1">{mockup}</div>
      </div>
    </section>
  );
}
