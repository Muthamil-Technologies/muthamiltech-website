import { Fragment } from "react";
import { products } from "../../data/products";
import { useReveal } from "../../hooks/useReveal";

export function EcosystemConnection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="border-b border-line bg-surface py-24">
      <div ref={ref} className="reveal mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          From learning Japanese to exploring Japan.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
          Each product is individually focused, but they share one vision: helping people
          build a better life and experience in Japan.
        </p>

        <div className="mt-16 flex flex-col items-center gap-4 md:flex-row md:items-stretch">
          {products.map((product, i) => (
            <Fragment key={product.slug}>
              <div className="flex w-full flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-paper px-4 py-8 md:w-auto">
                <div className="text-xs font-bold tracking-[0.15em] text-accent uppercase">
                  {product.journeyStep}
                </div>
                <div className="text-lg font-bold text-ink">{product.name}</div>
              </div>
              {i < products.length - 1 && (
                <div aria-hidden="true" className="text-xl text-ink-faint">
                  <span className="md:hidden">&darr;</span>
                  <span className="hidden md:inline">&rarr;</span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
