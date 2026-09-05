import { products } from "../data/products";

/**
 * Hub-and-spoke visualization generated entirely from `products` — adding a
 * 5th/6th product to the data file automatically gets a node here, no
 * layout code to touch. Positions are computed on a circle around the
 * center, so it degrades gracefully (nodes just get a bit closer together)
 * as the list grows, rather than needing to hard-code a 4-node layout.
 */
export function EcosystemVisualization() {
  const radius = 36;
  const nodes = products.map((product, i) => {
    const angle = (2 * Math.PI * i) / products.length - Math.PI / 2;
    return {
      product,
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
      delay: i * 0.6,
    };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {nodes.map(({ product, x, y }) => (
          <line
            key={product.slug}
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke="var(--color-accent)"
            strokeOpacity="0.3"
            strokeWidth="0.5"
            strokeDasharray="2 3"
            className="animate-line-flow"
          />
        ))}
        {nodes.map(({ product, x, y, delay }) => (
          <circle
            key={`${product.slug}-particle`}
            r="1.1"
            fill="var(--color-accent)"
            className="animate-node-particle"
            style={{
              offsetPath: `path('M 50 50 L ${x} ${y}')`,
              animationDuration: "4.5s",
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </svg>

      {/* center hub */}
      <div
        className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line bg-surface text-center shadow-lg shadow-black/10"
        style={{ left: "50%", top: "50%" }}
      >
        <span className="text-[10px] font-bold leading-tight text-ink">Muthamil<br />Tech</span>
      </div>

      {/* product nodes */}
      {nodes.map(({ product, x, y }) => (
        <div
          key={product.slug}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-xl border border-line bg-surface px-3 py-2 text-center shadow-md shadow-black/5"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <span className="text-xs font-bold text-ink">{product.name}</span>
        </div>
      ))}
    </div>
  );
}
