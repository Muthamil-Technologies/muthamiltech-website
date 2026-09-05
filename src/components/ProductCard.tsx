import type { Product } from "../data/products";
import { StatusPill } from "./StatusPill";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink-faint hover:shadow-xl hover:shadow-black/5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, var(--color-accent) 0%, transparent 60%)",
          opacity: 0.04,
        }}
      />
      <StatusPill status={product.status} />
      <div>
        <div className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
          {product.category}
        </div>
        <h3 className="mt-1.5 text-xl font-bold tracking-tight text-ink">{product.name}</h3>
      </div>
      <p className="text-sm text-ink-soft">{product.description}</p>
      <a
        href={product.url}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
      >
        Explore {product.name}
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </a>
    </div>
  );
}
