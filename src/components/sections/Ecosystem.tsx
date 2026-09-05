import { ProductCard } from "../ProductCard";
import { products } from "../../data/products";
import { useReveal } from "../../hooks/useReveal";

export function Ecosystem() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="products" className="scroll-mt-20 border-b border-line py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
            What we're building
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            One ecosystem. Four products.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            We're building focused digital products for different parts of the Japan
            experience.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
