import { Link } from "react-router-dom";
import { DailyKanji } from "../../components/jo/DailyKanji";
import { GuideSection, Heading, PartnerBand, SectionHero, SourceLine, Steps, ToolPanel } from "../../components/jo/SectionParts";
import { JLPT_DATE, sectionById } from "../../lib/joSections";

// Overview pages for Learn, Travel and Live. Every fact here repeats a guide or an official page
// already cited elsewhere on the site, with its source under the block.

const BLUE = "#1f4fa8";
const ORANGE = "#9a4612";
const TEAL = "#11697d";

const SRC = {
  jlpt: { name: "JLPT: levels and pass marks", url: "https://www.jlpt.jp/e/about/levelsummary.html" },
  jassoVoc: { name: "JASSO: vocational schools", url: "https://www.studyinjapan.go.jp/en/planning/learn-about-schools/vocational-schools/" },
  jassoUni: { name: "JASSO: universities", url: "https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/" },
  ssw: { name: "ISA: Specified Skilled Worker guide (Oct 23, 2026)", url: "https://www.moj.go.jp/isa/content/930004452.pdf" },
  b1: { name: "ISA: B1 requirement from April 2027", url: "https://www.moj.go.jp/isa/03_00198.html" },
  jft: { name: "Japan Foundation: JFT-Basic", url: "https://www.jpf.go.jp/jft-basic/e/about/index.html" },
  jnto: { name: "JNTO: Japan Visitor Hotline", url: "https://www.japan.travel/en/plan/hotline/" },
  mic: { name: "MIC: move in / move out", url: "https://www.soumu.go.jp/main_sosiki/jichi_gyousei/c-gyousei/zairyu/english/move-in_move-out.html" },
  nhi: { name: "JASSO: insurance", url: "https://www.studyinjapan.go.jp/en/life/insurance/" },
  card: { name: "JASSO: immigration procedures", url: "https://www.studyinjapan.go.jp/en/planning/immigration-procedures/" },
  pension: { name: "Japan Pension Service", url: "https://www.nenkin.go.jp/international/english/index.html" },
  fresc: { name: "ISA: FRESC", url: "https://www.moj.go.jp/isa/support/fresc/fresc_2.1.html" },
};

const LEVEL_NEEDS: [string, string, string][] = [
  ["Specified Skilled Worker (i)", "A2.2 or higher (for example JFT-Basic 200+)", "/work/status/ssw-1"],
  ["Specified Skilled Worker (ii)", "B1 or higher, for applications from April 1, 2027", "/work/status/ssw-2"],
  ["Vocational school (専門学校)", "JLPT N2 or N1, or 6+ months at an approved language school, or other routes", "/study/schools/vocational-school"],
  ["University, taught in Japanese", "A guide: JLPT N1 or N2 plus EJU Japanese 250+", "/study/schools/university"],
];

const LEVELS: [string, string][] = [
  ["N5", "Some basic Japanese"],
  ["N4", "Basic Japanese"],
  ["N3", "Everyday Japanese, to a certain degree"],
  ["N2", "Everyday Japanese, and more situations to a certain degree"],
  ["N1", "Japanese in a wide variety of situations"],
];

export function LearnHome() {
  const days = Math.ceil((JLPT_DATE.getTime() - Date.now()) / 86400_000);
  return (
    <>
      <SectionHero id="learn" title="Learn Japanese" line="Speak in real situations, prepare for the JLPT and build the Japanese you need for study or work." cta={{ to: "/learn/level-check", label: "Check your level →" }} />
      <div className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
        <section className="pt-20">
          <div className="grid gap-4 md:grid-cols-3" data-reveal>
            <DailyKanji />
            <div className="flex flex-col gap-4 rounded-[28px] bg-white p-7 sm:p-9 md:col-span-2">
              <h2 className="t-heading m-0">{days > 0 ? `JLPT: Sunday, December 6` : "JLPT: five levels"}</h2>
              {days > 0 && <p className="m-0 text-[20px] font-bold" style={{ color: BLUE }}>{days} days to go</p>}
              <ol className="m-0 grid list-none gap-2 p-0 sm:grid-cols-5">
                {LEVELS.map(([l, t]) => (
                  <li key={l} className="rounded-2xl bg-[#e3ecfb] p-3">
                    <b className="text-[24px] font-black">{l}</b>
                    <span className="mt-1 block leading-snug">{t}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-auto flex flex-wrap gap-4 pt-2 font-bold">
                <Link to="/learn/jlpt" style={{ color: BLUE }}>Practice test →</Link>
                <Link to="/learn/plan" style={{ color: BLUE }}>Study plan →</Link>
                <Link to="/guides/learn-jlpt-levels" style={{ color: BLUE }}>Pass marks →</Link>
              </div>
              <SourceLine items={[SRC.jlpt]} />
            </div>
          </div>
        </section>

        <section className="pt-20">
          <Heading title="How much Japanese do you need?" />
          <ul className="m-0 grid list-none gap-x-10 gap-y-1 rounded-[28px] bg-white p-3 sm:p-5 md:grid-cols-2" data-reveal>
            {LEVEL_NEEDS.map(([goal, need, to]) => (
              <li key={goal}>
                <Link to={to} className="flex flex-col gap-1 rounded-2xl px-3 py-3.5 text-jo-navy no-underline hover:bg-jo-cream sm:px-4">
                  <span className="t-title">{goal}</span>
                  <span className="text-jo-muted">{need}</span>
                </Link>
              </li>
            ))}
          </ul>
          <SourceLine items={[SRC.ssw, SRC.b1, SRC.jft, SRC.jassoVoc, SRC.jassoUni]} />
        </section>

        <ToolPanel id="learn" />
        <GuideSection id="learn" />
        <PartnerBand id="learn" />
      </div>
    </>
  );
}

const BEFORE = [
  ["Visa", "Some countries need no visa for tourism stays of 90 days or less. Ask the Japanese embassy in your country."],
  ["Visit Japan Web", "Optional, but registering early makes procedures like tax-free shopping easier."],
  ["IC card", "Welcome Suica or PASMO for trains, buses and many shops nationwide."],
  ["Tax-free", "From November 1, 2026, tax is refunded after Customs checks your items at departure."],
];

export function TravelHome() {
  return (
    <>
      <SectionHero id="travel" title="Travel in Japan" line="Plan your days, get by with simple Japanese, and know what to do if something goes wrong." cta={{ to: "/travel/plan", label: "Plan a trip →" }} />
      <div className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
        <section className="pt-20">
          <div className="grid gap-4 md:grid-cols-[1fr_2fr]" data-reveal>
            <div className="flex flex-col gap-3 rounded-[28px] bg-jo-navy p-7 text-white sm:p-9">
              <h2 className="t-title m-0 text-jo-yellow">Save these numbers</h2>
              <dl className="m-0 flex flex-col gap-3">
                <div className="flex items-baseline gap-3"><dt className="order-2 text-[20px] font-bold text-[#d9e1ec]">Police</dt><dd className="m-0 text-[44px] font-black leading-none">110</dd></div>
                <div className="flex items-baseline gap-3"><dt className="order-2 text-[20px] font-bold text-[#d9e1ec]">Fire, ambulance</dt><dd className="m-0 text-[44px] font-black leading-none">119</dd></div>
              </dl>
              <p className="m-0 leading-relaxed text-[#d9e1ec]">Japan Visitor Hotline <b className="text-white">050-3816-2787</b>, 24 hours, English, Chinese, Korean.</p>
            </div>
            <div className="rounded-[28px] bg-white p-7 sm:p-9">
              <h2 className="t-heading m-0">Before you go</h2>
              <dl className="m-0 mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {BEFORE.map(([k, v]) => (
                  <div key={k}>
                    <dt className="t-title">{k}</dt>
                    <dd className="m-0 mt-1 text-jo-muted">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link to="/guides/travel-before-you-go" className="mt-5 inline-block font-bold" style={{ color: ORANGE }}>Read the full checklist →</Link>
            </div>
          </div>
          <SourceLine items={[SRC.jnto]} />
        </section>
        <ToolPanel id="travel" />
        <GuideSection id="travel" />
        <PartnerBand id="travel" />
      </div>
    </>
  );
}

const FIRST_WEEKS = [
  { title: "Register your address", text: "At your city, ward, town or village office within 14 days of moving in. Bring your residence card.", to: "/live/address" },
  { title: "Join health insurance", text: "Staying 3 months or more? Join National Health Insurance at the same office, unless you are covered at work.", to: "/guides/live-health-insurance" },
  { title: "Pension", text: "Everyone living in Japan aged 20 to 59 is covered by the National Pension; employees join through work.", to: "/guides/live-pension-refund" },
  { title: "Carry your residence card", text: "Always carry your residence card with you.", to: "/live/address" },
];

export function LiveHome() {
  const s = sectionById("live")!;
  return (
    <>
      <SectionHero id="live" title="Live in Japan" line="City hall, insurance, pension and where to get help: the everyday rules for foreign residents." cta={{ to: "/live/address", label: "Address checklist →" }} />
      <div className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
        <section className="pt-20">
          <Heading title="Your first weeks" />
          <Steps items={FIRST_WEEKS} color={s.ink} />
          <SourceLine items={[SRC.mic, SRC.nhi, SRC.pension, SRC.card]} />
        </section>

        <section className="pt-20">
          <div className="grid gap-4 md:grid-cols-2" data-reveal>
            <div className="flex flex-col gap-3 rounded-[28px] bg-jo-navy p-7 text-white sm:p-9">
              <h2 className="t-heading m-0 text-white">Need help?</h2>
              <p className="m-0 leading-relaxed text-[#d9e1ec]">The Foreign Residents Support Center helps with residence status and immigration procedures, free, in many languages including Vietnamese, Nepali and Indonesian. Weekdays 9:00–17:00.</p>
              <p className="m-0 text-[44px] font-black leading-none text-jo-yellow">0570-011000</p>
              <Link to="/guides/live-help-fresc" className="font-bold text-jo-yellow">More →</Link>
              <p className="t-small m-0 mt-auto text-[#b9c6d6]">Source: <a href={SRC.fresc.url} target="_blank" rel="noreferrer" className="text-[#b9c6d6] underline">{SRC.fresc.name}</a></p>
            </div>
            <div className="rounded-[28px] bg-white p-7 sm:p-9">
            <h2 className="t-heading m-0">Leaving Japan?</h2>
            <p className="m-0 mt-2 text-[20px]">Two things to do before you go.</p>
            <ol className="m-0 mt-4 flex flex-col gap-2 pl-6 text-[20px] leading-relaxed">
              <li>Report your move-out at your municipal office.</li>
              <li>Claim your pension refund (Lump-sum Withdrawal Payment) within 2 years of leaving.</li>
            </ol>
            <Link to="/guides/live-pension-refund" className="mt-4 inline-block font-bold" style={{ color: TEAL }}>Pension refund guide →</Link>
            </div>
          </div>
        </section>

        <ToolPanel id="live" />
        <GuideSection id="live" />
      </div>
    </>
  );
}
