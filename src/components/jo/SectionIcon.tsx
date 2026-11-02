import type { SectionId } from "../../lib/joSections";

// Stroke icons for the six sections (decorative: the label always sits next to them).
const PATHS: Record<SectionId, React.ReactNode> = {
  learn: <><path d="M2 5c3-1.5 6.5-1.5 10 1 3.5-2.5 7-2.5 10-1v14c-3-1.5-6.5-1.5-10 1-3.5-2.5-7-2.5-10-1z" /><path d="M12 6v14" /></>,
  study: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></>,
  work: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5h6v2" /><path d="M3 13h18" /></>,
  travel: <path d="M10.5 13.5L3 11l1.5-1.5 7 1 4-4.5c1-1 3-1.5 3.5-1s0 2.5-1 3.5l-4.5 4 1 7L13 21l-2.5-7.5z" />,
  live: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>,
  shop: <><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 016 0v2" /></>,
};

export function SectionIcon({ id, color, size = 26 }: { id: SectionId; color: string; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {PATHS[id]}
    </svg>
  );
}
