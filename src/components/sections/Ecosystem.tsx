import { ProductCard } from "../ProductCard";
import { products } from "../../data/products";
import { useReveal } from "../../hooks/useReveal";

export function Ecosystem() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="products" className="theme-light scroll-mt-20 bg-paper py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <img src="/japanone_logo_180.png" alt="JapanOne logo" className="mx-auto h-20 w-20 rounded-full" />
          <div className="mt-5 text-xs font-semibold tracking-wide text-ink-faint uppercase">
            Our products
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">JapanOne</h2>
          <p className="mt-4 text-lg text-ink-soft">
            Our apps are published under one consumer brand, JapanOne. Each app does one job well.
          </p>
        </div>

        <div
          className="mt-14 grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
        >
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://japanone.app"
            className="inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
          >
            Go to japanone.app &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
