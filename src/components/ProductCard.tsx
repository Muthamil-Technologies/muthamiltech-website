import type { Product } from "../data/products";
import { StatusPill } from "./StatusPill";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-line bg-surface p-7 transition-shadow hover:shadow-lg hover:shadow-ink/5">
      <StatusPill status={product.status} />
      <div>
        <div className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
          {product.category}
        </div>
        <h3 className="mt-1.5 text-xl font-bold tracking-tight text-ink">{product.name}</h3>
      </div>
      <p className="text-sm text-ink-soft">{product.description}</p>
      <a
        href={`#${product.slug}`}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors group-hover:text-accent-deep"
      >
        Explore {product.name}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          &rarr;
        </span>
      </a>
    </div>
  );
}
