import { Link, Navigate, useParams } from "react-router-dom";
import { GuideCard } from "../../components/jo/GuideCard";
import { SectionIcon } from "../../components/jo/SectionIcon";
import { GUIDES } from "../../lib/joContent";
import { sectionById, type Section } from "../../lib/joSections";
import { TOOLS, type Tool } from "../../lib/joTools";
import { Heading } from "./JOHome";

// One page per section (/learn, /study, …): header, tools you can use, then guides.
// Partner listings (schools, jobs, tours) slot in between once the first ones are published.
export function JOSection() {
  const { section = "" } = useParams();
  const s = sectionById(section);
  if (!s) return <Navigate to="/" replace />;
  const tools = TOOLS.filter((t) => t.section === s.id);
  const guides = GUIDES.filter((g) => g.section === s.id);

  return (
    <>
      <header style={{ background: s.tint }}>
        <div className="mx-auto flex max-w-[1200px] items-center gap-5 px-4 py-12 sm:px-6">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white">
            <SectionIcon id={s.id} color={s.ink} size={34} />
          </span>
          <div>
            <h1 className="m-0 text-[40px] font-black sm:text-5xl">{s.label}</h1>
            <p className="m-0 mt-1 text-lg text-jo-muted">{s.line}</p>
          </div>
        </div>
      </header>

      {s.id === "shop" ? <ShopSoon /> : (
        <div className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6">
          {tools.length > 0 && (
            <section className="pt-12">
              <Heading title="Tools" />
              <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">{tools.map((t) => <ToolCard key={t.to} tool={t} s={s} />)}</div>
            </section>
          )}
          {guides.length > 0 && (
            <section className="pt-12">
              <Heading title="Good to know" />
              <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">{guides.map((g) => <GuideCard key={g.id} guide={g} />)}</div>
            </section>
          )}
          {tools.length === 0 && guides.length === 0 && (
            <p className="pt-12 text-lg text-jo-muted">Guides for this section are being checked against official sources.</p>
          )}
        </div>
      )}
    </>
  );
}

function ToolCard({ tool, s }: { tool: Tool; s: Section }) {
  return (
    <Link to={tool.to} className="flex flex-col gap-2 rounded-[18px] bg-white p-[22px] text-jo-navy no-underline hover:shadow-[0_6px_20px_rgba(18,38,63,0.1)]">
      <strong className="text-lg">{tool.title}</strong>
      <span className="leading-relaxed text-jo-muted">{tool.sub}</span>
      <span className="mt-auto pt-2 font-bold" style={{ color: s.tag }}>Open →</span>
    </Link>
  );
}

function ShopSoon() {
  return (
    <div className="mx-auto max-w-[820px] px-4 py-16 text-center sm:px-6">
      <span className="rounded-full bg-[#fbe3e6] px-3 py-1 text-sm font-bold text-[#9e2232]">Coming soon</span>
      <h2 className="mb-3 mt-5 text-[32px] font-black">Made in Japan, straight from local sellers</h2>
      <p className="mx-auto mb-8 max-w-[560px] text-lg leading-relaxed text-jo-muted">Snacks, stationery, kitchen tools and crafts from small Japanese shops. We are inviting the first sellers now.</p>
      <Link to="/partners" className="rounded-full bg-jo-navy px-6 py-3.5 font-bold text-white no-underline">Japanese sellers: join early →</Link>
      <p lang="ja" className="mt-5 text-sm text-jo-muted">出店をご希望の事業者さまはこちらからご登録ください。</p>
    </div>
  );
}
