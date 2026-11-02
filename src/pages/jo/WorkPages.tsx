import { Link, Navigate, useParams } from "react-router-dom";
import { GuideCard } from "../../components/jo/GuideCard";
import { SectionIcon } from "../../components/jo/SectionIcon";
import { SSW_FIELDS, STATUSES, WORK_FACTS, statusById } from "../../data/workStatuses";
import { GUIDES, formatChecked } from "../../lib/joContent";
import { sectionById } from "../../lib/joSections";
import { TOOLS } from "../../lib/joTools";
import { PROGRAMS } from "../partners/partnerTypes";
import { Heading } from "./JOHome";
import { Sources } from "./StudySchool";

const GREEN = "#17714c";
const WORK_NOTE = "General information, not visa advice. Immigration rules change: always check the Immigration Services Agency before you apply.";

// /work: the Work in Japan overview: who works here, the statuses that allow work, SSW, your
// rights, preparation tools. Information only: JapanOne is not a recruiter.
export function WorkHome() {
  const s = sectionById("work")!;
  const f = WORK_FACTS;
  const tools = TOOLS.filter((t) => t.section === "work");
  const guides = GUIDES.filter((g) => g.section === "work");
  const program = PROGRAMS.find((p) => p.section === "work")!;

  return (
    <>
      <header style={{ background: s.tint }}>
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-6 px-4 py-12 sm:px-6">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white"><SectionIcon id="work" color={s.ink} size={34} /></span>
          <div className="min-w-0 flex-[999_1_480px]">
            <h1 className="m-0 text-[40px] font-black leading-tight sm:text-5xl">Work in Japan</h1>
            <p className="m-0 mt-2 max-w-2xl text-lg leading-relaxed text-jo-muted">The residence statuses that let you work, what each needs, and your rights at work, from official sources.</p>
          </div>
          <Link to="/work/pathway" className="rounded-full bg-jo-navy px-6 py-3.5 font-bold text-white no-underline">Find your path →</Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6">
        <section className="pt-12">
          <div className="grid gap-3.5 md:grid-cols-3">
            <div className="rounded-[22px] bg-jo-navy p-6 text-white">
              <p className="m-0 text-4xl font-black text-jo-yellow">{f.residents}</p>
              <p className="m-0 mt-2 leading-relaxed">{f.residentsText}</p>
            </div>
            <div className="rounded-[22px] bg-white p-6 md:col-span-2">
              <p className="m-0 text-4xl font-black">{f.ssw1} <span className="text-2xl text-jo-muted">+ {f.ssw2}</span></p>
              <p className="m-0 mt-2 leading-relaxed text-jo-muted">{f.sswText}</p>
            </div>
          </div>
          <p className="m-0 mt-2 text-[13px] text-jo-faint">Source: <a href={f.src.url} target="_blank" rel="noreferrer" className="text-jo-faint underline">{f.src.name}</a></p>
        </section>

        <section className="pt-14">
          <Heading tag="RESIDENCE STATUS" tagColor={GREEN} title="Statuses that let you work" />
          <p className="-mt-3 mb-6 max-w-3xl leading-relaxed text-jo-muted">
            In Japan, your residence status (在留資格) decides what work you may do. The type of job and the status are different things: check that the job fits your status.
          </p>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {STATUSES.map((t) => (
              <Link key={t.id} to={`/work/status/${t.id}`} className="flex flex-col gap-2 rounded-[18px] bg-white p-[22px] text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">
                <strong className="text-lg leading-snug">{t.name}</strong>
                <span lang="ja" className="text-sm font-bold text-jo-muted">{t.ja}</span>
                <span className="leading-relaxed text-jo-muted">{t.line}</span>
                {t.changing && <span className="mt-auto pt-2 text-sm font-bold text-[#9a4612]">Rules changing in 2027</span>}
              </Link>
            ))}
            <Link to="/guides/study-part-time" className="flex flex-col gap-2 rounded-[18px] bg-white p-[22px] text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">
              <strong className="text-lg">Students: part-time work</strong>
              <span lang="ja" className="text-sm font-bold text-jo-muted">資格外活動許可</span>
              <span className="leading-relaxed text-jo-muted">Up to 28 hours a week with permission.</span>
            </Link>
          </div>
        </section>

        <section className="pt-14">
          <Link to="/work/ssw" className="flex flex-wrap items-center gap-6 rounded-3xl bg-white p-8 text-jo-navy no-underline shadow-[0_6px_20px_rgba(18,38,63,0.06)]">
            <div className="min-w-0 flex-[999_1_420px]">
              <p className="m-0 text-sm font-bold tracking-wide" style={{ color: GREEN }}>SPECIFIED SKILLED WORKER (特定技能)</p>
              <h2 className="m-0 mt-1 text-[28px] font-black leading-tight">{SSW_FIELDS.length} fields, two levels, the tests and the 2027 changes</h2>
              <p className="m-0 mt-2 leading-relaxed text-jo-muted">The most common route into skilled jobs in Japan, explained from the Immigration Services Agency's current guide.</p>
            </div>
            <span className="rounded-full bg-jo-navy px-6 py-3.5 font-bold text-white">Open the SSW guide →</span>
          </Link>
        </section>

        <section className="pt-14">
          <Heading title="Prepare" />
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <Link key={t.to} to={t.to} className="flex flex-col gap-2 rounded-[18px] bg-white p-[22px] text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">
                <strong className="text-lg">{t.title}</strong>
                <span className="leading-relaxed text-jo-muted">{t.sub}</span>
                <span className="mt-auto pt-2 font-bold" style={{ color: GREEN }}>Open →</span>
              </Link>
            ))}
            <Link to="/learn/speaking" className="flex flex-col gap-2 rounded-[18px] bg-white p-[22px] text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">
              <strong className="text-lg">Japanese for work</strong>
              <span className="leading-relaxed text-jo-muted">Speaking lessons for real workplace situations.</span>
              <span className="mt-auto pt-2 font-bold" style={{ color: GREEN }}>Open →</span>
            </Link>
          </div>
        </section>

        <section className="pt-14">
          <Heading title="Your rights at work" />
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">{guides.map((g) => <GuideCard key={g.id} guide={g} />)}</div>
        </section>

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

        <p className="mt-10 text-sm text-jo-muted">Checked {formatChecked(f.checked)}. General information, not visa or legal advice. JapanOne does not recruit or place workers.</p>
      </div>
    </>
  );
}

// /work/status/:id
export function WorkStatusPage() {
  const { id = "" } = useParams();
  const t = statusById(id);
  if (!t) return <Navigate to="/work" replace />;
  return (
    <article className="mx-auto max-w-[860px] px-4 py-12 sm:px-6">
      <Link to="/work" className="text-sm font-bold no-underline" style={{ color: GREEN }}>← Work in Japan</Link>
      <h1 className="mb-1 mt-4 text-[34px] font-black leading-tight sm:text-[42px]">{t.name}</h1>
      <p lang="ja" className="m-0 text-lg font-bold text-jo-muted">{t.ja}</p>
      <p className="m-0 mt-3 text-xl leading-relaxed text-jo-muted">{t.line}</p>
      {t.changing && <p className="m-0 mt-5 rounded-[18px] bg-[#fdeadb] p-5 font-medium leading-relaxed"><b>Changing:</b> {t.changing}</p>}
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {t.facts.map(([k, v]) => (
          <div key={k} className="rounded-[18px] bg-white p-5">
            <dt className="text-sm font-bold" style={{ color: GREEN }}>{k}</dt>
            <dd className="m-0 mt-1 leading-relaxed">{v}</dd>
          </div>
        ))}
      </dl>
      <section className="mt-8">
        <h2 className="m-0 mb-3 text-2xl font-black">Good to know</h2>
        <ul className="m-0 flex flex-col gap-2 rounded-[18px] bg-white p-5 pl-10 leading-relaxed">{t.points.map((p) => <li key={p}>{p}</li>)}</ul>
      </section>
      {t.id.startsWith("ssw") && <Link to="/work/ssw" className="mt-6 inline-block font-bold" style={{ color: GREEN }}>See all SSW fields and tests →</Link>}
      <Sources sources={t.sources} checked={t.checked} note={WORK_NOTE} />
      <p className="mt-3 text-sm text-jo-muted">Whether you qualify is decided by the Immigration Services Agency. For your own case, ask the agency or a licensed specialist (行政書士).</p>
    </article>
  );
}

// /work/ssw: the Specified Skilled Worker hub.
export function SswHub() {
  const i = statusById("ssw-1")!;
  const ii = statusById("ssw-2")!;
  const f = WORK_FACTS;
  return (
    <article className="mx-auto max-w-[1000px] px-4 py-12 sm:px-6">
      <Link to="/work" className="text-sm font-bold no-underline" style={{ color: GREEN }}>← Work in Japan</Link>
      <h1 className="mb-1 mt-4 text-[34px] font-black leading-tight sm:text-[44px]">Specified Skilled Worker</h1>
      <p lang="ja" className="m-0 text-lg font-bold text-jo-muted">特定技能</p>
      <p className="m-0 mt-3 max-w-3xl text-xl leading-relaxed text-jo-muted">
        Created in April 2019 so that work-ready foreign workers with skills can fill jobs in fields that are short of people.
      </p>
      <p className="m-0 mt-5 rounded-[18px] bg-[#fdeadb] p-5 font-medium leading-relaxed">
        <b>Changing in 2027:</b> from April 1, 2027, SSW (ii) applications need Japanese at B1 or higher, the support rules for SSW (i) change, and Employment for Skill Development replaces Technical Intern Training.
      </p>

      <section className="mt-10">
        <h2 className="m-0 mb-4 text-2xl font-black">SSW (i) and SSW (ii)</h2>
        <div className="overflow-x-auto rounded-[18px] bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead><tr className="border-b border-[#e3e7ee]"><th className="p-4" scope="col"></th><th className="p-4" scope="col">SSW (i) 1号</th><th className="p-4" scope="col">SSW (ii) 2号</th></tr></thead>
            <tbody>
              {i.facts.map(([k], n) => (
                <tr key={k} className="border-b border-[#e3e7ee] last:border-0 align-top">
                  <th scope="row" className="p-4 font-bold" style={{ color: GREEN }}>{k}</th>
                  <td className="p-4 leading-relaxed">{i.facts[n][1]}</td>
                  <td className="p-4 leading-relaxed">{ii.facts[n][1]}</td>
                </tr>
              ))}
              <tr className="align-top"><th scope="row" className="p-4 font-bold" style={{ color: GREEN }}>Support</th><td className="p-4">From your employer or a registered support organisation</td><td className="p-4">Not part of this status</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 font-bold">
          <Link to="/work/status/ssw-1" style={{ color: GREEN }}>SSW (i) in detail →</Link>
          <Link to="/work/status/ssw-2" style={{ color: GREEN }}>SSW (ii) in detail →</Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="m-0 mb-1 text-2xl font-black">The {SSW_FIELDS.length} fields</h2>
        <p className="m-0 mb-4 text-jo-muted">{SSW_FIELDS.filter((x) => x.ii).length} of them are also open to SSW (ii).</p>
        <ul className="m-0 grid list-none gap-2.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {SSW_FIELDS.map((x) => (
            <li key={x.ja} className="flex flex-col gap-1 rounded-[14px] bg-white p-4">
              <b>{x.en}</b>
              <span lang="ja" className="text-sm text-jo-muted">{x.ja}</span>
              <span className="flex flex-wrap gap-1.5 text-xs font-bold">
                <span className="rounded-full bg-[#dff3ea] px-2 py-0.5 text-[#17714c]">SSW (i)</span>
                {x.ii && <span className="rounded-full bg-jo-navy px-2 py-0.5 text-white">SSW (ii)</span>}
                {x.soon && <span className="rounded-full bg-[#fdeadb] px-2 py-0.5 text-[#9a4612]">New: starts when ready</span>}
              </span>
            </li>
          ))}
        </ul>
        <p className="m-0 mt-3 text-sm text-jo-muted">Each field has its own skills test and rules. <a href={f.fieldsSrc.url} target="_blank" rel="noreferrer" className="font-bold text-[#1f4fa8]">Field information (ISA) →</a></p>
      </section>

      <section className="mt-10 grid gap-3.5 md:grid-cols-2">
        <div className="rounded-[18px] bg-white p-6">
          <h2 className="m-0 mb-2 text-xl font-black">The tests</h2>
          <ul className="m-0 flex flex-col gap-2 pl-5 leading-relaxed">
            <li>A skills test for your field.</li>
            <li>A Japanese test: A2.2 level or higher for SSW (i). The Immigration Services Agency suggests the JFT-Basic if you were planning to take JLPT N4 or N5.</li>
            <li>Completed Technical Intern Training (ii)? You are exempt from both.</li>
          </ul>
          <Link to="/learn" className="mt-3 inline-block font-bold" style={{ color: GREEN }}>Practise Japanese →</Link>
        </div>
        <div className="rounded-[18px] bg-white p-6">
          <h2 className="m-0 mb-2 text-xl font-black">Support for SSW (i)</h2>
          <p className="m-0 leading-relaxed">Your employer must support you in daily life and at work, directly or through a registered support organisation (登録支援機関). These rules change on April 1, 2027.</p>
        </div>
      </section>

      <Sources sources={[...i.sources, f.fieldsSrc]} checked={i.checked} note={WORK_NOTE} />
      <p className="mt-3 text-sm text-jo-muted">Whether you qualify is decided by the Immigration Services Agency. JapanOne does not recruit, place or support workers under the SSW system.</p>
    </article>
  );
}
