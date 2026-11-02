import { Link, Navigate, useParams } from "react-router-dom";
import { GuideCard } from "../../components/jo/GuideCard";
import { GUIDES, formatChecked, guideById } from "../../lib/joContent";
import { sectionById } from "../../lib/joSections";
import { Heading } from "./JOHome";

// One guide (the same facts as the social carousel), with its official sources.
export function JOGuide() {
  const { id = "" } = useParams();
  const guide = guideById(id);
  if (!guide) return <Navigate to="/guides" replace />;
  const s = sectionById(guide.section);
  const cover = guide.slides.find((sl) => sl.kind === "cover");
  const facts = guide.slides.filter((sl) => sl.kind === "fact");
  const more = GUIDES.filter((g) => g.section === guide.section && g.id !== guide.id);

  return (
    <article className="mx-auto max-w-[820px] px-4 py-12 sm:px-6">
      <Link to={`/${guide.section}`} className="text-sm font-bold no-underline" style={{ color: s?.tag }}>← {s?.label}</Link>
      <h1 className="mb-3 mt-4 text-[34px] font-black leading-tight sm:text-[44px]">{guide.title}</h1>
      {cover && <p className="m-0 text-xl leading-relaxed text-jo-muted">{cover.body}</p>}

      <ol className="m-0 mt-8 flex list-none flex-col gap-3.5 p-0">
        {facts.map((f) => (
          <li key={f.n} className="flex gap-4 rounded-[18px] bg-white p-6">
            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-jo-navy font-black text-jo-yellow">{f.n}</span>
            <div className="flex flex-col gap-2">
              <h2 className="m-0 text-xl font-extrabold">{f.title}</h2>
              <p className="m-0 whitespace-pre-line leading-relaxed">{f.body}</p>
              {f.note && <p className="m-0 text-[15px] leading-relaxed text-jo-muted">{f.note}</p>}
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-8 rounded-[18px] border border-[#d9dee6] bg-white/60 p-6">
        <h2 className="m-0 text-base font-extrabold">Sources · checked {formatChecked(guide.checked)}</h2>
        <ul className="mb-3 mt-3 flex flex-col gap-1.5 pl-5">
          {guide.sources.map((src) => (
            <li key={src.url}><a href={src.url} className="text-[#1f4fa8] underline" target="_blank" rel="noreferrer">{src.name}</a></li>
          ))}
        </ul>
        <p className="m-0 text-sm text-jo-muted">General information, not legal or visa advice. Rules change: check the official page or ask your school, employer or a licensed specialist.</p>
      </section>

      {more.length > 0 && (
        <section className="mt-14">
          <Heading title={`More in ${s?.label}`} />
          <div className="grid gap-3.5 sm:grid-cols-2">{more.map((g) => <GuideCard key={g.id} guide={g} />)}</div>
        </section>
      )}
    </article>
  );
}

export function JOGuides() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <Heading title="Good to know" />
      <p className="-mt-3 mb-8 max-w-[640px] leading-relaxed text-jo-muted">Short guides to studying, working and living in Japan. Every fact comes from an official source, with the date we checked it.</p>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">{GUIDES.map((g) => <GuideCard key={g.id} guide={g} />)}</div>
    </section>
  );
}
