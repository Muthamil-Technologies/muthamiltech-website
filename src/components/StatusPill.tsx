import { statusLabels, type ProductStatus } from "../data/products";

export function StatusPill({ status }: { status: ProductStatus }) {
  const isLive = status === "live";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-semibold tracking-wide text-ink-soft uppercase">
      <span
        className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-accent" : "bg-ink-faint"}`}
        aria-hidden="true"
      />
      {statusLabels[status]}
    </span>
  );
}
