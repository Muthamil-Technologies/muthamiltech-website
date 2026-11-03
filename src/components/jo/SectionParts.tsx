import { Link } from "react-router-dom";
import { GUIDES, formatChecked, type Guide } from "../../lib/joContent";
import { sectionById, type SectionId } from "../../lib/joSections";
import { TOOLS } from "../../lib/joTools";
import { PROGRAMS } from "../../pages/partners/partnerTypes";

// Building blocks shared by the section pages (/learn, /study, /work, /travel, /live).

/** A section heading, with an optional link on the right. */
export function Heading({ title, link, id }: { title: string; link?: { to: string; label: string }; id?: string }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
      <h2 id={id} className="t-heading m-0 max-w-[22ch]">{title}</h2>
      {link && <Link to={link.to} className="font-bold text-jo-navy no-underline hover:underline">{link.label}</Link>}
    </div>
  );
}

/** The top of a section page: the title at display size, what the section covers, and its main tool. */
export function SectionHero({ id, title, line, cta }: { id: SectionId; title: string; line: string; cta?: { to: string; label: string } }) {
  const s = sectionById(id)!;
  return (
    <header style={{ background: s.tint }}>
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-8 px-4 py-14 sm:px-6 lg:py-20" data-reveal>
        <div className="flex max-w-[760px] flex-col gap-5">
          <h1 className="t-section m-0">{title}</h1>
          <p className="m-0 max-w-[40ch] text-[20px] leading-relaxed">{line}</p>
        </div>
        {cta && <Link to={cta.to} className="rounded-full bg-jo-navy px-6 py-3.5 font-bold text-white no-underline">{cta.label}</Link>}
      </div>
    </header>
  );
}

/** A section's tools as one navy panel of large links: the things you can do here. */
export function ToolPanel({ id, title = "Tools", extra = [] }: { id: SectionId; title?: string; extra?: { to: string; title: string; sub: string }[] }) {
  const tools = [...TOOLS.filter((t) => t.section === id), ...extra];
  if (!tools.length) return null;
  return (
    <section className="pt-20" aria-labelledby={`${id}-tools`}>
      <div className="rounded-[28px] bg-jo-navy p-6 text-white sm:p-10">
        <h2 id={`${id}-tools`} className="t-heading m-0 mb-6 text-white">{title}</h2>
        <ul className="m-0 grid list-none gap-x-10 gap-y-1 p-0 md:grid-cols-2" data-reveal>
          {tools.map((t) => (
            <li key={t.to}>
              <Link to={t.to} className="group flex items-start justify-between gap-4 rounded-2xl px-3 py-4 text-white no-underline hover:bg-white/10 sm:px-4">
                <span className="flex flex-col gap-1">
                  <span className="text-[24px] font-extrabold leading-tight">{t.title}</span>
                  <span className="text-[#d9e1ec]">{t.sub}</span>
                </span>
                <span aria-hidden="true" className="pt-1 text-[24px] font-black text-jo-yellow transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Guides as a list with large titles (not a wall of cards). */
export function GuideList({ guides, showSection = false }: { guides: Guide[]; showSection?: boolean }) {
  return (
    <ul className="m-0 grid list-none gap-x-10 gap-y-1 rounded-[28px] bg-white p-3 sm:p-5 md:grid-cols-2" data-reveal>
      {guides.map((g) => {
        const s = sectionById(g.section);
        const source = g.sources[0]?.name.split(":")[0] ?? "";
        return (
          <li key={g.id}>
            <Link to={`/guides/${g.id}`} className="flex flex-col gap-1 rounded-2xl px-3 py-3.5 text-jo-navy no-underline hover:bg-jo-cream sm:px-4">
              {showSection && <span className="t-small font-bold" style={{ color: s?.tag }}>{s?.label}</span>}
              <span className="t-title">{g.title}</span>
              <span className="t-small text-jo-muted">{source} · checked {formatChecked(g.checked)}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function GuideSection({ id, title = "Good to know" }: { id: SectionId; title?: string }) {
  const guides = GUIDES.filter((g) => g.section === id);
  if (!guides.length) return null;
  return (
    <section className="pt-20">
      <Heading title={title} />
      <GuideList guides={guides} />
    </section>
  );
}

/** Steps in order: a real numbered list, drawn as a timeline. */
export function Steps({ items, color }: { items: { title: string; text: string; to?: string }[]; color: string }) {
  return (
    <ol className="m-0 grid list-none gap-6 p-0 lg:gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${items.length > 4 ? 190 : 230}px), 1fr))` }} data-reveal>
      {items.map((it, i) => {
        const body = (
          <>
            <span className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[18px] font-black text-white" style={{ background: color }}>{i + 1}</span>
              {i < items.length - 1 && <span aria-hidden="true" className="hidden h-1.5 flex-1 rounded-full lg:block" style={{ background: color, opacity: 0.25 }} />}
            </span>
            <span className="t-title mt-3 block">{it.title}</span>
            <span className="mt-1 block">{it.text}</span>
          </>
        );
        return (
          <li key={it.title}>
            {it.to ? <Link to={it.to} className="block text-jo-navy no-underline hover:underline">{body}</Link> : body}
          </li>
        );
      })}
    </ol>
  );
}

/** "Become a partner" for the businesses that serve this section. */
export function PartnerBand({ id }: { id: SectionId }) {
  const program = PROGRAMS.find((p) => p.section === id || p.alsoOn?.includes(id));
  if (!program) return null;
  return (
    <section className="pt-20">
      <div className="rounded-[28px] bg-jo-navy text-white">
        <div className="flex flex-col gap-4 p-7 sm:p-10" data-reveal>
          <h2 className="t-heading m-0 text-white">{program.band}</h2>
          <p className="m-0 max-w-[48ch] leading-relaxed text-[#d9e1ec]">For {program.who.toLowerCase()}: {program.cardBody.charAt(0).toLowerCase() + program.cardBody.slice(1)}</p>
          <Link to={`/partners/${program.slug}`} className="self-start rounded-full bg-jo-yellow px-6 py-3.5 font-bold text-jo-navy no-underline">Become a partner →</Link>
        </div>
      </div>
    </section>
  );
}

export function SourceLine({ items }: { items: { name: string; url: string }[] }) {
  return (
    <p className="t-small m-0 mt-3 text-jo-muted">
      Source{items.length > 1 ? "s" : ""}:{" "}
      {items.map((s, i) => (
        <span key={s.url}>{i > 0 && " · "}<a href={s.url} target="_blank" rel="noreferrer" className="text-jo-muted underline">{s.name}</a></span>
      ))}
    </p>
  );
}
