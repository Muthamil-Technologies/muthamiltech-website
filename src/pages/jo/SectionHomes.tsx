import { Link } from "react-router-dom";
import { ListingSection } from "../../components/jo/Listings";
import { GuideSection, Heading, PartnerBand, SectionHero, SourceLine, Steps, ToolPanel } from "../../components/jo/SectionParts";
import { APP_STORE_URL, sectionById } from "../../lib/joSections";

// Overview pages for Learn, Travel and Live. Every fact here repeats a guide or an official page
// already cited elsewhere on the site, with its source under the block.

const ORANGE = "#9a4612";
const TEAL = "#11697d";

const SRC = {
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
  ["Specified Skilled Worker (ii)", "B1 or higher, for Certificate of Eligibility applications from April 1, 2027", "/work/status/ssw-2"],
  ["Vocational school (専門学校)", "JLPT N2 or N1, or 6+ months at an approved language school, or other routes", "/study/schools/vocational-school"],
  ["University, taught in Japanese", "A guide: JLPT N1 or N2 plus EJU Japanese 250+", "/study/schools/university"],
];

/** How much Japanese each goal needs, shown under Study in Japan like the app. */
export function JapaneseYouNeed() {
  return (
    <section className="pt-20" id="japanese-you-need">
      <Heading title="Japanese you need" />
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
  );
}

const LEARN_BLOCKS = [
  { to: "/learn/plan", title: "Prepare for exam", sub: "A dated JLPT study plan, from your exam date and daily time." },
  { to: "/learn/jlpt", title: "Take sample test", sub: "N5 · N4 · N3, with answers explained." },
  { to: "/learn/speaking", title: "Speaking practice", sub: "Real conversations at work and in daily life." },
  { to: "/study", title: "Study in Japan", sub: "Schools, scholarships, costs and the student visa." },
];

// /learn: the same five blocks, in the same order, as the app's Learn tab.
export function LearnHome() {
  return (
    <>
      <SectionHero id="learn" title="Learn" line="Practise Japanese and plan your study." />
      <div className="mx-auto max-w-[900px] px-4 pb-24 pt-12 sm:px-6">
        <a href={APP_STORE_URL} className="lift flex items-center justify-between gap-6 rounded-[28px] bg-jo-navy p-7 text-white no-underline sm:p-9">
          <span className="flex flex-col gap-2">
            <span className="t-small font-extrabold text-jo-yellow">Best way to practise</span>
            <span className="text-[32px] font-black leading-tight">Learn with game</span>
            <span className="text-[#d9e1ec]">Clear stages, earn stars and beat your best score.</span>
            <span className="mt-2 self-start rounded-full bg-jo-yellow px-5 py-2.5 font-bold text-jo-navy">Play in the app</span>
          </span>
        </a>
        <ul className="m-0 mt-3 grid list-none gap-3 p-0 sm:grid-cols-2" data-reveal>
          {LEARN_BLOCKS.map((b) => (
            <li key={b.to}>
              <Link to={b.to} className="lift flex h-full flex-col gap-1 rounded-[24px] bg-white p-6 text-jo-navy no-underline">
                <span className="text-[24px] font-black leading-tight">{b.title}</span>
                <span className="text-jo-muted">{b.sub}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/learn/level-check" className="mt-3 flex items-center justify-between rounded-[24px] bg-white p-6 font-bold text-jo-navy no-underline">
          Check your level <span aria-hidden="true">→</span>
        </Link>
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
        <ListingSection product="tour" title="Tours and experiences" color={ORANGE} />
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
