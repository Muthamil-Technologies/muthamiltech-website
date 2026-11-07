import { Link, Navigate, useParams } from "react-router-dom";
import { ListingSection } from "../../components/jo/Listings";
import { GuideSection, Heading, PartnerBand, SectionHero, ToolPanel } from "../../components/jo/SectionParts";
import { SSW_FIELDS, STATUSES, WORK_FACTS, statusById } from "../../data/workStatuses";
import { formatChecked } from "../../lib/joContent";
import { Sources } from "./StudySchool";

const GREEN = "#17714c";
const WORK_NOTE = "General information, not visa advice. Immigration rules change: always check the Immigration Services Agency before you apply.";

// /work: the Work in Japan overview: who works here, the statuses that allow work, SSW, your
// rights, preparation tools. Information only: JapanOne is not a recruiter.
export function WorkHome() {
  const f = WORK_FACTS;

  return (
    <>
      <SectionHero id="work" title="Work in Japan" line="The residence statuses that let you work, what each needs, and your rights at work." cta={{ to: "/work/pathway", label: "Find your path →" }} />

      <div className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
        <ListingSection product="job" title="Jobs in Japan" color={GREEN} />

        <section className="pt-20">
          <Heading title="Who works here" />
          <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]" data-reveal>
            <div className="flex flex-col justify-end gap-3 rounded-[28px] bg-jo-navy p-8 text-white sm:p-10">
              <p className="t-figure m-0 text-jo-yellow">{f.residents}</p>
              <p className="m-0 max-w-[30ch] text-[20px] leading-relaxed">{f.residentsText}</p>
            </div>
            <div className="flex flex-col justify-center gap-3 rounded-[28px] bg-white p-8 sm:p-10">
              <p className="m-0 text-[44px] font-black leading-none">{f.ssw1}</p>
              <p className="m-0 text-[24px] font-black text-jo-muted">+ {f.ssw2}</p>
              <p className="m-0 leading-relaxed text-jo-muted">{f.sswText}</p>
            </div>
          </div>
          <p className="t-small m-0 mt-3 text-jo-muted">Source: <a href={f.src.url} target="_blank" rel="noreferrer" className="text-jo-muted underline">{f.src.name}</a></p>
        </section>

        <section className="pt-20">
          <Heading title="Statuses that let you work" />
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col gap-5">
              <p className="m-0 text-[20px] leading-relaxed">
                Your residence status (在留資格) decides what work you may do. The job and the status are different things: check that the job fits your status.
              </p>
            </div>
            <ul className="m-0 flex list-none flex-col gap-1 rounded-[28px] bg-white p-3 sm:p-5" data-reveal>
              {STATUSES.map((t) => (
                <li key={t.id}>
                  <Link to={`/work/status/${t.id}`} className="flex flex-col gap-1 rounded-2xl px-3 py-3.5 text-jo-navy no-underline hover:bg-jo-cream sm:px-4">
                    <span className="t-title">{t.name}</span>
                    <span lang="ja" className="t-small font-bold text-jo-muted">{t.ja}</span>
                    <span className="text-jo-muted">{t.line}</span>
                    {t.changing && <span className="t-small font-bold text-[#9a4612]">Rules changing in 2027</span>}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/guides/study-part-time" className="flex flex-col gap-1 rounded-2xl px-3 py-3.5 text-jo-navy no-underline hover:bg-jo-cream sm:px-4">
                  <span className="t-title">Students: part-time work</span>
                  <span lang="ja" className="t-small font-bold text-jo-muted">資格外活動許可</span>
                  <span className="text-jo-muted">Up to 28 hours a week with permission.</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="pt-20">
          <Link to="/work/ssw" className="block rounded-[28px] text-jo-navy no-underline" style={{ background: "#dff3ea" }}>
            <div className="flex flex-col gap-4 p-7 sm:p-10">
              <h2 className="t-heading m-0">Specified Skilled Worker: {SSW_FIELDS.length} fields</h2>
              <p className="m-0 text-[20px] leading-relaxed">特定技能, the most common route into skilled jobs: both levels, the tests and the 2027 changes, from the Immigration Services Agency's guide.</p>
              <span className="self-start rounded-full bg-jo-navy px-6 py-3.5 font-bold text-white">Open the SSW guide →</span>
            </div>
          </Link>
        </section>

        <ToolPanel id="work" title="Prepare" extra={[{ to: "/learn/speaking", title: "Japanese for work", sub: "Speaking lessons for real workplace situations." }]} />
        <GuideSection id="work" title="Your rights at work" />
        <PartnerBand id="work" />

        <p className="t-small mt-10 text-jo-muted">Checked {formatChecked(f.checked)}. General information, not visa or legal advice. JapanOne does not recruit or place workers.</p>
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
        <b>Changing in 2027:</b> from April 1, 2027, SSW (ii) Certificate of Eligibility applications need Japanese at B1 or higher, the support rules for SSW (i) change, and Employment for Skill Development replaces Technical Intern Training.
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
              <span className="flex flex-wrap gap-1.5 t-small font-bold">
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
