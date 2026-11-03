import { Link } from "react-router-dom";
import { ListingSection } from "../../components/jo/Listings";
import { GuideSection, Heading, PartnerBand, SectionHero, Steps, ToolPanel } from "../../components/jo/SectionParts";
import { SCHOOL_TYPES, STUDY_FACTS } from "../../data/studySchools";
import { formatChecked } from "../../lib/joContent";
import { sectionById } from "../../lib/joSections";

const STEPS = [
  { title: "Choose your school", text: "Language school first, or straight to college or university if your Japanese is ready." },
  { title: "Apply", text: "5 to 8 months before you start, depending on the school." },
  { title: "Certificate of Eligibility", text: "Your school applies for it at immigration in Japan after you are accepted." },
  { title: "Student visa", text: "With the certificate, apply at the Japanese embassy or consulate in your country." },
  { title: "Arrive", text: "Get your residence card and register your address within 14 days." },
];

// /study: the Study in Japan overview (why Japan, school types, the steps, costs, tools, guides).
export function StudyHome() {
  const s = sectionById("study")!;
  const f = STUDY_FACTS;

  return (
    <>
      <SectionHero id="study" title="Study in Japan" line="Schools, costs, scholarships and the student visa, from official sources." cta={{ to: "/study/path", label: "Plan your path →" }} />

      <div className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
        {/* Why Japan: one big figure, the rest as a list */}
        <section className="pt-20">
          <Heading title="Students who came are glad they did" />
          <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]" data-reveal>
            <div className="flex flex-col justify-end gap-3 rounded-[28px] bg-jo-navy p-8 text-white sm:p-10">
              <p className="t-figure m-0 text-jo-yellow">{f.glad.value}</p>
              <p className="m-0 max-w-[30ch] text-[20px] leading-relaxed">{f.glad.text}</p>
            </div>
            <ul className="m-0 flex list-none flex-col justify-center gap-6 rounded-[28px] bg-white p-8 sm:p-10">
              {f.reasons.map(([v, t]) => (
                <li key={t}>
                  <span className="text-[44px] font-black leading-none">{v}</span>
                  <span className="mt-1 block text-jo-muted">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <Src name={f.glad.src.name} url={f.glad.src.url} />
        </section>

        {/* School types beside a photo */}
        <section className="pt-20">
          <Heading title="Types of school" />
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col gap-5">
              <p className="m-0 text-[20px] leading-relaxed">
                Higher education in Japan starts after 12 years of schooling. The school year usually runs from April to March; most schools take students in April, some also in autumn.
              </p>
              <dl className="t-small m-0 grid grid-cols-2 gap-x-6 gap-y-2 text-jo-muted">
                {f.schools.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className="m-0 text-[20px] font-black text-jo-navy">{v}</dd></div>)}
              </dl>
              <Src name={f.schoolsSrc.name} url={f.schoolsSrc.url} />
            </div>
            <ul className="m-0 flex list-none flex-col gap-1 rounded-[28px] bg-white p-3 sm:p-5" data-reveal>
              {SCHOOL_TYPES.map((t) => (
                <li key={t.id}>
                  <Link to={`/study/schools/${t.id}`} className="flex flex-col gap-1 rounded-2xl px-3 py-3.5 text-jo-navy no-underline hover:bg-jo-cream sm:px-4">
                    <span className="t-title">{t.name} <span lang="ja" className="t-small font-bold text-jo-muted">{t.ja}</span></span>
                    <span className="text-jo-muted">{t.line}</span>
                    <span className="t-small"><b>Length:</b> {t.length.split(";")[0].replace(/\.$/, "")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ListingSection product="course" title="Courses from schools" color={s.tag} />

        {/* Steps */}
        <section className="pt-20">
          <Heading title="From application to arrival" link={{ to: "/study/path", label: "Your dated plan →" }} />
          <Steps items={STEPS} color={s.ink} />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/study/visa" className="rounded-full bg-jo-navy px-5 py-3 font-bold text-white no-underline">Student visa guide →</Link>
            <Link to="/study/faq" className="rounded-full bg-white px-5 py-3 font-bold text-jo-navy no-underline">Questions &amp; answers →</Link>
          </div>
        </section>

        {/* Costs: one big figure, fees as a list */}
        <section className="pt-20">
          <Heading title="What it costs" />
          <div className="grid gap-4 md:grid-cols-[1fr_1.2fr]" data-reveal>
            <div className="flex flex-col gap-3 rounded-[28px] bg-jo-yellow p-8 sm:p-10">
              <p className="t-figure m-0">{f.living.monthly}</p>
              <p className="m-0 text-[20px] font-bold">{f.living.text.charAt(0).toUpperCase() + f.living.text.slice(1)}</p>
              <p className="m-0 leading-relaxed">{f.living.rent}</p>
            </div>
            <div className="rounded-[28px] bg-white p-8 sm:p-10">
              <h3 className="t-title m-0">First-year fees (admission and tuition)</h3>
              <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
                {SCHOOL_TYPES.filter((t) => t.id !== "online").map((t) => (
                  <li key={t.id} className="flex flex-col">
                    <b>{t.name}</b>
                    <span className="text-jo-muted">{t.fees.replace(/ for the first year \(admission and tuition\)\.?|First year \(admission and tuition\): /g, "")}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Src name="Study in Japan (JASSO): academic fees" url="https://www.studyinjapan.go.jp/en/planning/academic-fees/" />
          <Src name={f.living.src.name} url={f.living.src.url} />
        </section>

        <ToolPanel id="study" />
        <GuideSection id="study" />
        <PartnerBand id="study" />

        <p className="t-small mt-10 text-jo-muted">Figures checked {formatChecked(f.checked)}. General information, not visa advice.</p>
      </div>
    </>
  );
}

function Src({ name, url }: { name: string; url: string }) {
  return <p className="t-small m-0 mt-3 text-jo-muted">Source: <a href={url} target="_blank" rel="noreferrer" className="text-jo-muted underline">{name}</a></p>;
}
