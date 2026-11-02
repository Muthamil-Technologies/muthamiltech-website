import { Link } from "react-router-dom";
import { DailyKanji } from "../../components/jo/DailyKanji";
import { GuideGrid, PartnerBand, SectionHero, SourceLine, ToolGrid } from "../../components/jo/SectionParts";
import { JLPT_DATE } from "../../lib/joSections";
import { Heading } from "./JOHome";

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
      <SectionHero id="learn" title="Learn Japanese" line="Speak in real situations, prepare for the JLPT and build the Japanese you need to study or work in Japan." cta={{ to: "/learn/level-check", label: "Check your level →" }} />
      <div className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6">
        <section className="pt-12">
          <div className="grid gap-[18px] md:grid-cols-3">
            <DailyKanji />
            <div className="flex flex-col gap-3 rounded-[22px] bg-white p-7 md:col-span-2">
              <span className="text-[13px] font-bold" style={{ color: BLUE }}>JLPT LEVELS</span>
              <h2 className="m-0 text-2xl font-black">{days > 0 ? `Next test: Sunday, December 6 · ${days} days` : "Five levels, N5 to N1"}</h2>
              <ol className="m-0 grid list-none gap-2 p-0 sm:grid-cols-5">
                {LEVELS.map(([l, t]) => (
                  <li key={l} className="rounded-[14px] bg-[#e3ecfb] p-3">
                    <b className="text-xl">{l}</b>
                    <span className="mt-1 block text-sm leading-snug">{t}</span>
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

        <section className="pt-14">
          <Heading tag="YOUR GOAL" tagColor={BLUE} title="How much Japanese do you need?" />
          <div className="grid gap-3.5 sm:grid-cols-2">
            {LEVEL_NEEDS.map(([goal, need, to]) => (
              <Link key={goal} to={to} className="flex flex-col gap-1.5 rounded-[18px] bg-white p-[22px] text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">
                <strong className="text-lg">{goal}</strong>
                <span className="leading-relaxed text-jo-muted">{need}</span>
              </Link>
            ))}
          </div>
          <SourceLine items={[SRC.ssw, SRC.b1, SRC.jft, SRC.jassoVoc, SRC.jassoUni]} />
        </section>

        <ToolGrid id="learn" />
        <GuideGrid id="learn" />
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
      <div className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6">
        <section className="pt-12">
          <div className="grid gap-3.5 md:grid-cols-3">
            <div className="flex flex-col gap-3 rounded-[22px] bg-jo-navy p-7 text-white">
              <span className="text-[13px] font-bold text-jo-yellow">SAVE THESE NUMBERS</span>
              <p className="m-0 text-3xl font-black">110 <span className="text-base font-bold text-[#d9e1ec]">Police</span></p>
              <p className="m-0 text-3xl font-black">119 <span className="text-base font-bold text-[#d9e1ec]">Fire · Ambulance</span></p>
              <p className="m-0 leading-relaxed text-[#d9e1ec]">Japan Visitor Hotline <b className="text-white">050-3816-2787</b>, 24 hours, English, Chinese, Korean.</p>
              <SourceLine items={[SRC.jnto]} />
            </div>
            <div className="rounded-[22px] bg-white p-7 md:col-span-2">
              <span className="text-[13px] font-bold" style={{ color: ORANGE }}>BEFORE YOU GO</span>
              <dl className="m-0 mt-3 grid gap-3 sm:grid-cols-2">
                {BEFORE.map(([k, v]) => (
                  <div key={k} className="rounded-[14px] bg-[#fdeadb] p-4">
                    <dt className="font-extrabold">{k}</dt>
                    <dd className="m-0 mt-1 leading-relaxed">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link to="/guides/travel-before-you-go" className="mt-3 inline-block font-bold" style={{ color: ORANGE }}>Read the full checklist →</Link>
            </div>
          </div>
        </section>
        <ToolGrid id="travel" />
        <GuideGrid id="travel" />
        <PartnerBand id="travel" />
      </div>
    </>
  );
}

const FIRST_WEEKS: [string, string, string][] = [
  ["Register your address", "At your city, ward, town or village office within 14 days of moving in. Bring your residence card.", "/live/address"],
  ["Join health insurance", "Staying 3 months or more? Join National Health Insurance at the same office, unless you are covered at work.", "/guides/live-health-insurance"],
  ["Pension", "Everyone living in Japan aged 20 to 59 is covered by the National Pension; employees join through work.", "/guides/live-pension-refund"],
  ["Carry your residence card", "Always carry your residence card with you.", "/live/address"],
];

export function LiveHome() {
  return (
    <>
      <SectionHero id="live" title="Live in Japan" line="City hall, insurance, pension and where to get help: the everyday rules for foreign residents." cta={{ to: "/live/address", label: "Address checklist →" }} />
      <div className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6">
        <section className="pt-12">
          <Heading tag="AFTER YOU ARRIVE" tagColor={TEAL} title="Your first weeks" />
          <ol className="m-0 grid list-none gap-3.5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {FIRST_WEEKS.map(([t, d, to], i) => (
              <li key={t}>
                <Link to={to} className="flex h-full flex-col gap-1.5 rounded-[18px] bg-white p-[22px] text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">
                  <span aria-hidden="true" className="text-2xl font-black text-[#9aa8ba]">0{i + 1}</span>
                  <strong className="text-lg">{t}</strong>
                  <span className="leading-relaxed text-jo-muted">{d}</span>
                </Link>
              </li>
            ))}
          </ol>
          <SourceLine items={[SRC.mic, SRC.nhi, SRC.pension, SRC.card]} />
        </section>

        <section className="pt-14">
          <div className="grid gap-3.5 md:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-[22px] bg-jo-navy p-7 text-white">
              <span className="text-[13px] font-bold text-jo-yellow">NEED HELP?</span>
              <h2 className="m-0 text-2xl font-black">Foreign Residents Support Center</h2>
              <p className="m-0 leading-relaxed text-[#d9e1ec]">Free help with residence status and immigration procedures, in many languages including Vietnamese, Nepali and Indonesian. Weekdays 9:00–17:00.</p>
              <p className="m-0 text-2xl font-black">0570-011000</p>
              <Link to="/guides/live-help-fresc" className="font-bold text-jo-yellow">More →</Link>
              <SourceLine items={[SRC.fresc]} />
            </div>
            <div className="flex flex-col gap-2 rounded-[22px] bg-white p-7">
              <span className="text-[13px] font-bold" style={{ color: TEAL }}>LEAVING JAPAN</span>
              <h2 className="m-0 text-2xl font-black">Two things before you go</h2>
              <ol className="m-0 flex flex-col gap-2 pl-5 leading-relaxed">
                <li>Report your move-out at your municipal office.</li>
                <li>Claim your pension refund (Lump-sum Withdrawal Payment) within 2 years of leaving.</li>
              </ol>
              <Link to="/guides/live-pension-refund" className="mt-auto font-bold" style={{ color: TEAL }}>Pension refund guide →</Link>
            </div>
          </div>
        </section>

        <ToolGrid id="live" />
        <GuideGrid id="live" />
      </div>
    </>
  );
}
