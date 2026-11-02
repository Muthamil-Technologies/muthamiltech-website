import { Link, Navigate, useParams } from "react-router-dom";
import { SCHOOL_TYPES, schoolTypeById, type Src } from "../../data/studySchools";
import { formatChecked } from "../../lib/joContent";

// One type of school (language school, vocational school, university…): what it is, who can
// apply, length, language, fees and where it leads. Explanations, not school listings.
export function StudySchool() {
  const { id = "" } = useParams();
  const t = schoolTypeById(id);
  if (!t) return <Navigate to="/study" replace />;
  const others = SCHOOL_TYPES.filter((s) => s.id !== t.id);

  return (
    <article className="mx-auto max-w-[860px] px-4 py-12 sm:px-6">
      <Link to="/study" className="text-sm font-bold text-[#4a2f99] no-underline">← Study in Japan</Link>
      <h1 className="mb-2 mt-4 text-[36px] font-black leading-tight sm:text-[44px]">
        {t.name} <span lang="ja" className="text-[0.6em] font-bold text-jo-muted">{t.ja}</span>
      </h1>
      <p className="m-0 text-xl leading-relaxed text-jo-muted">{t.line}</p>

      <dl className="mt-8 grid gap-3 sm:grid-cols-3">
        {[["Length", t.length], ["Starts", t.starts], ["First-year fees", t.fees]].map(([k, v]) => (
          <div key={k} className="rounded-[18px] bg-white p-5">
            <dt className="text-sm font-bold text-[#4a2f99]">{k}</dt>
            <dd className="m-0 mt-1 leading-relaxed">{v}</dd>
          </div>
        ))}
      </dl>

      <Block title="What it offers" items={t.offers} />
      <Block title="Who can apply" items={t.who} />
      <Block title="Japanese and English" items={t.language} />

      <section className="mt-8">
        <h2 className="m-0 mb-3 text-2xl font-black">Where it can lead</h2>
        <div className="flex flex-col gap-2.5">
          {t.next.map((n) => n.to ? (
            <Link key={n.text} to={n.to} className="rounded-[18px] bg-white p-5 leading-relaxed text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">{n.text} <b className="text-[#4a2f99]">→</b></Link>
          ) : <p key={n.text} className="m-0 rounded-[18px] bg-white p-5">{n.text}</p>)}
        </div>
      </section>

      <Link to="/study/path" className="mt-8 flex items-center justify-between gap-4 rounded-[22px] bg-jo-navy p-6 text-white no-underline">
        <span><b className="block text-xl">Plan your path</b><span className="text-[#d9e1ec]">Month by month, from today to your first day.</span></span>
        <span className="rounded-full bg-jo-yellow px-5 py-2.5 font-bold text-jo-navy">Open planner →</span>
      </Link>

      <Sources sources={t.sources} checked={t.checked} />

      <section className="mt-12">
        <h2 className="m-0 mb-3 text-2xl font-black">Other types of school</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {others.map((o) => (
            <Link key={o.id} to={`/study/schools/${o.id}`} className="rounded-[18px] bg-white p-5 text-jo-navy no-underline">
              <b>{o.name}</b> <span lang="ja" className="text-sm text-jo-muted">{o.ja}</span>
              <span className="mt-1 block text-[15px] text-jo-muted">{o.line}</span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  const [lead, ...rest] = items;
  const list = items.length > 2 && lead.endsWith(":") ? rest : items;
  return (
    <section className="mt-8">
      <h2 className="m-0 mb-3 text-2xl font-black">{title}</h2>
      {list !== items && <p className="m-0 mb-2 leading-relaxed">{lead}</p>}
      <ul className="m-0 flex flex-col gap-2 rounded-[18px] bg-white p-5 pl-10 leading-relaxed">
        {list.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </section>
  );
}

export function Sources({ sources, checked, note = "General information, not advice. Fees and rules vary by school and change over time: always check with the school." }: { sources: Src[]; checked: string; note?: string }) {
  return (
    <section className="mt-8 rounded-[18px] border border-[#d9dee6] bg-white/60 p-6">
      <h2 className="m-0 text-base font-extrabold">Sources · checked {formatChecked(checked)}</h2>
      <ul className="mb-3 mt-3 flex flex-col gap-1.5 pl-5">
        {sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer" className="text-[#1f4fa8] underline">{s.name}</a></li>)}
      </ul>
      <p className="m-0 text-sm text-jo-muted">{note}</p>
    </section>
  );
}
