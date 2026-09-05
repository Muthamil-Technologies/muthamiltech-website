import { EcosystemVisualization } from "../EcosystemVisualization";
import { ProductCard } from "../ProductCard";
import { products } from "../../data/products";
import { useReveal } from "../../hooks/useReveal";

export function Ecosystem() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="products" className="theme-light scroll-mt-20 bg-paper py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
            What we're building
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            One vision. Many products.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            A growing collection of focused digital products, each designed to solve a
            specific problem.
          </p>
        </div>

        <div className="mt-14">
          <EcosystemVisualization />
        </div>

        <div
          className="mt-16 grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
        >
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center text-sm font-medium text-ink-faint">
          + More to come
        </div>
      </div>
    </section>
  );
}
