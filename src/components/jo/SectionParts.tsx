import { Link } from "react-router-dom";
import { GUIDES } from "../../lib/joContent";
import { sectionById, type SectionId } from "../../lib/joSections";
import { TOOLS } from "../../lib/joTools";
import { PROGRAMS } from "../../pages/partners/partnerTypes";
import { Heading } from "../../pages/jo/JOHome";
import { GuideCard } from "./GuideCard";
import { SectionIcon } from "./SectionIcon";

// Building blocks shared by the section overview pages (/learn, /travel, /live…).

export function SectionHero({ id, title, line, cta }: { id: SectionId; title: string; line: string; cta?: { to: string; label: string } }) {
  const s = sectionById(id)!;
  return (
    <header style={{ background: s.tint }}>
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-6 px-4 py-12 sm:px-6">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white"><SectionIcon id={id} color={s.ink} size={34} /></span>
        <div className="min-w-0 flex-[999_1_480px]">
          <h1 className="m-0 text-[40px] font-black leading-tight sm:text-5xl">{title}</h1>
          <p className="m-0 mt-2 max-w-2xl text-lg leading-relaxed text-jo-muted">{line}</p>
        </div>
        {cta && <Link to={cta.to} className="rounded-full bg-jo-navy px-6 py-3.5 font-bold text-white no-underline">{cta.label}</Link>}
      </div>
    </header>
  );
}

export function ToolGrid({ id, title = "Tools" }: { id: SectionId; title?: string }) {
  const s = sectionById(id)!;
  const tools = TOOLS.filter((t) => t.section === id);
  if (!tools.length) return null;
  return (
    <section className="pt-14">
      <Heading title={title} />
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="flex flex-col gap-2 rounded-[18px] bg-white p-[22px] text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">
            <strong className="text-lg">{t.title}</strong>
            <span className="leading-relaxed text-jo-muted">{t.sub}</span>
            <span className="mt-auto pt-2 font-bold" style={{ color: s.tag }}>Open →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function GuideGrid({ id, title = "Good to know" }: { id: SectionId; title?: string }) {
  const guides = GUIDES.filter((g) => g.section === id);
  if (!guides.length) return null;
  return (
    <section className="pt-14">
      <Heading title={title} />
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">{guides.map((g) => <GuideCard key={g.id} guide={g} />)}</div>
    </section>
  );
}

export function PartnerBand({ id }: { id: SectionId }) {
  const program = PROGRAMS.find((p) => p.section === id || p.alsoOn?.includes(id));
  if (!program) return null;
  return (
    <section className="pt-14">
      <div className="flex flex-wrap items-center gap-6 rounded-3xl bg-jo-navy p-8 text-white">
        <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-2">
          <span className="text-sm font-bold tracking-wide text-jo-yellow">FOR {program.who.toUpperCase()}</span>
          <h2 className="m-0 text-[28px] font-black leading-tight">{program.headline}</h2>
          <p className="m-0 leading-relaxed text-[#d9e1ec]">{program.cardBody}</p>
        </div>
        <Link to={`/partners/${program.slug}`} className="rounded-[14px] bg-jo-yellow px-6 py-3.5 font-bold text-jo-navy no-underline">Become a partner →</Link>
      </div>
    </section>
  );
}

export function SourceLine({ items }: { items: { name: string; url: string }[] }) {
  return (
    <p className="m-0 mt-3 text-[13px] leading-relaxed text-jo-faint">
      Source{items.length > 1 ? "s" : ""}:{" "}
      {items.map((s, i) => (
        <span key={s.url}>{i > 0 && " · "}<a href={s.url} target="_blank" rel="noreferrer" className="text-jo-faint underline">{s.name}</a></span>
      ))}
    </p>
  );
}
