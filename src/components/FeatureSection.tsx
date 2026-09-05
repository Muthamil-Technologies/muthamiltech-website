import type { ReactNode } from "react";
import type { Product } from "../data/products";
import { useReveal } from "../hooks/useReveal";
import { StatusPill } from "./StatusPill";

interface FeatureSectionProps {
  product: Product;
  heading: string;
  tagline: string;
  mockup: ReactNode;
  reversed?: boolean;
}

export function FeatureSection({
  product,
  heading,
  tagline,
  mockup,
  reversed = false,
}: FeatureSectionProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id={product.slug} className="scroll-mt-20 border-b border-line py-20 md:py-28">
      <div
        ref={ref}
        className={`reveal mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 md:flex-row md:gap-20 ${
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
          <a
            href={`/#${product.slug}`}
            className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Discover {product.name}
          </a>
        </div>
        <div className="flex-1">{mockup}</div>
      </div>
    </section>
  );
}
