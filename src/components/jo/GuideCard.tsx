import { Link } from "react-router-dom";
import { formatChecked, type Guide } from "../../lib/joContent";
import { sectionById } from "../../lib/joSections";

export function GuideCard({ guide }: { guide: Guide }) {
  const s = sectionById(guide.section);
  const source = guide.sources[0]?.name.split(":")[0] ?? "";
  return (
    <Link to={`/guides/${guide.id}`} className="lift flex flex-col gap-1.5 rounded-[22px] bg-white p-[22px] text-jo-navy no-underline">
      <span className="t-small font-bold" style={{ color: s?.tag }}>{s?.label}</span>
      <span className="t-title">{guide.title}</span>
      <span className="t-small text-jo-muted">{source} · checked {formatChecked(guide.checked)}</span>
    </Link>
  );
}
