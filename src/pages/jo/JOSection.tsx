import { Link, Navigate, useParams } from "react-router-dom";
import { GuideSection, PartnerBand, SectionHero, ToolPanel } from "../../components/jo/SectionParts";
import { sectionById } from "../../lib/joSections";

// Fallback page for a section without its own overview (today: /shop, which is "coming soon").
export function JOSection() {
  const { section = "" } = useParams();
  const s = sectionById(section);
  if (!s) return <Navigate to="/" replace />;

  if (s.id === "shop") {
    return (
      <>
        <SectionHero id="shop" title="Shop" line="Made in Japan, straight from local sellers: snacks, stationery, kitchen tools and crafts. Coming soon." cta={{ to: "/partners/shop", label: "Japanese sellers: join early →" }} />
        <div className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
          <section className="pt-20">
            <div className="rounded-[28px] bg-white p-7 sm:p-10" data-reveal>
              <h2 className="t-heading m-0">Opening with the first sellers</h2>
              <p className="m-0 mt-3 max-w-[56ch] text-[20px] leading-relaxed">We are inviting small Japanese shops and makers now. Shopping opens once the first sellers are checked and ready.</p>
              <p lang="ja" className="m-0 mt-3 text-jo-muted">出店をご希望の事業者さまは、パートナー登録からご連絡ください。</p>
              <Link to="/partners/shop" className="mt-5 inline-block rounded-full bg-jo-navy px-6 py-3.5 font-bold text-white no-underline">Become a seller →</Link>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <header style={{ background: s.tint }}>
        <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6">
          <h1 className="t-section m-0">{s.label}</h1>
          <p className="m-0 mt-3 text-[20px]">{s.line}</p>
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
        <ToolPanel id={s.id} />
        <GuideSection id={s.id} />
        <PartnerBand id={s.id} />
        <p className="pt-12 text-jo-muted">
          More guides for this section are being checked against official sources. <Link to="/guides">All guides →</Link>
        </p>
      </div>
    </>
  );
}
