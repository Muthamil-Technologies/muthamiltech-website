import { Link } from "react-router-dom";
import { formatChecked, type Guide } from "../../lib/joContent";
import { sectionById } from "../../lib/joSections";

export function GuideCard({ guide }: { guide: Guide }) {
  const s = sectionById(guide.section);
  const source = guide.sources[0]?.name.split(":")[0] ?? "";
  return (
    <Link to={`/guides/${guide.id}`} className="flex flex-col gap-2 rounded-[18px] bg-white p-[22px] text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">
      <span className="text-xs font-bold uppercase" style={{ color: s?.tag }}>{s?.label}</span>
      <strong className="text-lg leading-snug">{guide.title}</strong>
      <span className="text-[13px] text-jo-faint">Source: {source} · checked {formatChecked(guide.checked)}</span>
    </Link>
  );
}
