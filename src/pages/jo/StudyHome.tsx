import { Link } from "react-router-dom";
import { GuideCard } from "../../components/jo/GuideCard";
import { SectionIcon } from "../../components/jo/SectionIcon";
import { SCHOOL_TYPES, STUDY_FACTS } from "../../data/studySchools";
import { GUIDES, formatChecked } from "../../lib/joContent";
import { sectionById } from "../../lib/joSections";
import { TOOLS } from "../../lib/joTools";
import { PROGRAMS } from "../partners/partnerTypes";
import { Heading } from "./JOHome";

const STEPS = [
  ["Choose your school", "Language school first, or straight to college or university if your Japanese is ready."],
  ["Apply", "5 to 8 months before you start, depending on the school."],
  ["Certificate of Eligibility", "Your school applies for it at immigration in Japan after you are accepted."],
  ["Student visa", "With the certificate, apply at the Japanese embassy or consulate in your country."],
  ["Arrive", "Get your residence card and register your address within 14 days."],
];

// /study: the Study in Japan overview (why Japan, the system, school types, the steps, costs).
export function StudyHome() {
  const s = sectionById("study")!;
  const f = STUDY_FACTS;
  const tools = TOOLS.filter((t) => t.section === "study");
  const guides = GUIDES.filter((g) => g.section === "study");
  const program = PROGRAMS.find((p) => p.section === "study")!;

  return (
    <>
      <header style={{ background: s.tint }}>
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-6 px-4 py-12 sm:px-6">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white"><SectionIcon id="study" color={s.ink} size={34} /></span>
          <div className="min-w-0 flex-[999_1_480px]">
            <h1 className="m-0 text-[40px] font-black leading-tight sm:text-5xl">Study in Japan</h1>
            <p className="m-0 mt-2 max-w-2xl text-lg leading-relaxed text-jo-muted">Schools, costs, scholarships and the student visa: what you need to know, from official sources.</p>
          </div>
          <Link to="/study/path" className="rounded-full bg-jo-navy px-6 py-3.5 font-bold text-white no-underline">Plan your path →</Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6">
        {/* Why Japan */}
        <section className="pt-12">
          <Heading tag="WHY JAPAN" tagColor={s.tag} title="Students who came are glad they did" />
          <div className="grid gap-3.5 md:grid-cols-4">
            <div className="rounded-[22px] bg-jo-navy p-6 text-white">
              <p className="m-0 text-5xl font-black text-jo-yellow">{f.glad.value}</p>
              <p className="m-0 mt-2 leading-relaxed">{f.glad.text}</p>
            </div>
            {f.reasons.map(([v, t]) => (
              <div key={t} className="rounded-[22px] bg-white p-6">
                <p className="m-0 text-4xl font-black">{v}</p>
                <p className="m-0 mt-2 leading-relaxed text-jo-muted">{t}</p>
              </div>
            ))}
          </div>
          <Src name={f.glad.src.name} url={f.glad.src.url} />
        </section>

        {/* School types */}
        <section className="pt-14">
          <Heading tag="WHERE TO STUDY" tagColor={s.tag} title="Types of school" />
          <p className="-mt-3 mb-6 max-w-3xl leading-relaxed text-jo-muted">
            Higher education in Japan starts after 12 years of schooling. The school year usually runs from April to March, and most schools take students in April; some also in autumn.
          </p>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {SCHOOL_TYPES.map((t) => (
              <Link key={t.id} to={`/study/schools/${t.id}`} className="flex flex-col gap-2 rounded-[18px] bg-white p-[22px] text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">
                <strong className="text-xl">{t.name} <span lang="ja" className="text-sm font-bold text-jo-muted">{t.ja}</span></strong>
                <span className="leading-relaxed text-jo-muted">{t.line}</span>
                <span className="mt-auto pt-1 text-sm"><b>Length:</b> {t.length.split(";")[0].replace(/\.$/, "")}</span>
              </Link>
            ))}
          </div>
          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-jo-muted">
            {f.schools.map(([k, v]) => <div key={k} className="flex gap-1.5"><dt>{k}:</dt><dd className="m-0 font-bold text-jo-navy">{v}</dd></div>)}
          </dl>
          <Src name={f.schoolsSrc.name} url={f.schoolsSrc.url} />
        </section>

        {/* Steps */}
        <section className="pt-14">
          <Heading tag="HOW IT WORKS" tagColor={s.tag} title="From application to arrival" link={{ to: "/study/path", label: "Your dated plan →" }} />
          <ol className="m-0 grid list-none gap-3.5 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="rounded-[18px] bg-white p-5">
                <span aria-hidden="true" className="text-2xl font-black text-[#9aa8ba]">0{i + 1}</span>
                <p className="m-0 mt-1 text-lg font-extrabold">{t}</p>
                <p className="m-0 mt-1 leading-relaxed text-jo-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Costs */}
        <section className="pt-14">
          <Heading tag="COSTS" tagColor={s.tag} title="What it costs" />
          <div className="grid gap-3.5 md:grid-cols-2">
            <div className="rounded-[22px] bg-white p-6">
              <p className="m-0 text-sm font-bold text-[#4a2f99]">FIRST-YEAR FEES (ADMISSION + TUITION)</p>
              <ul className="m-0 mt-3 flex flex-col gap-1.5 pl-5 leading-relaxed">
                {SCHOOL_TYPES.filter((t) => t.id !== "online").map((t) => <li key={t.id}><b>{t.name}:</b> {t.fees.replace(/ for the first year \(admission and tuition\)\.?|First year \(admission and tuition\): /g, "")}</li>)}
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-[22px] bg-jo-yellow p-6">
              <p className="m-0 text-sm font-bold">LIVING COSTS</p>
              <p className="m-0 text-5xl font-black">{f.living.monthly}</p>
              <p className="m-0 leading-relaxed">{f.living.text}. {f.living.rent}</p>
            </div>
          </div>
          <Src name="Study in Japan (JASSO): academic fees" url="https://www.studyinjapan.go.jp/en/planning/academic-fees/" />
          <Src name={f.living.src.name} url={f.living.src.url} />
        </section>

        {tools.length > 0 && (
          <section className="pt-14">
            <Heading title="Tools" />
            <div className="grid gap-3.5 sm:grid-cols-2">
              {tools.map((t) => (
                <Link key={t.to} to={t.to} className="flex flex-col gap-2 rounded-[18px] bg-white p-[22px] text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">
                  <strong className="text-lg">{t.title}</strong>
                  <span className="leading-relaxed text-jo-muted">{t.sub}</span>
                  <span className="mt-auto pt-2 font-bold" style={{ color: s.tag }}>Open →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="pt-14">
          <Heading title="Good to know" />
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

        <p className="mt-10 text-sm text-jo-muted">Figures checked {formatChecked(f.checked)}. General information, not visa advice.</p>
      </div>
    </>
  );
}

function Src({ name, url }: { name: string; url: string }) {
  return <p className="m-0 mt-2 text-[13px] text-jo-faint">Source: <a href={url} target="_blank" rel="noreferrer" className="text-jo-faint underline">{name}</a></p>;
}
