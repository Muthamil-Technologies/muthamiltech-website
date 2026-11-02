import { Link, useSearchParams } from "react-router-dom";
import { GuideCard } from "../../components/jo/GuideCard";
import { GUIDES } from "../../lib/joContent";
import { sectionById } from "../../lib/joSections";
import { TOOLS } from "../../lib/joTools";

// Search across tools and guides (partner listings join once they exist).
export function JOSearch() {
  const [params, setParams] = useSearchParams();
  const q = (params.get("q") ?? "").trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  const hit = (text: string) => words.every((w) => text.toLowerCase().includes(w));
  const tools = words.length ? TOOLS.filter((t) => hit(`${t.title} ${t.sub} ${t.keywords ?? ""} ${t.section}`)) : [];
  const guides = words.length ? GUIDES.filter((g) => hit(`${g.title} ${g.section} ${g.slides.map((s) => `${s.title} ${s.body}`).join(" ")}`)) : [];

  return (
    <section className="mx-auto max-w-[1000px] px-4 py-12 sm:px-6">
      <form role="search" onSubmit={(e) => { e.preventDefault(); setParams({ q: String(new FormData(e.currentTarget).get("q") ?? "") }); }} className="flex gap-2">
        <label htmlFor="jo-search" className="sr-only">Search JapanOne</label>
        <input id="jo-search" name="q" type="search" defaultValue={params.get("q") ?? ""} placeholder="Search lessons, guides, tools…"
          className="flex-1 rounded-xl border border-[#d9dee6] bg-white px-4 py-3.5 text-[17px] text-jo-navy" />
        <button type="submit" className="cursor-pointer rounded-xl bg-jo-navy px-6 font-bold text-white">Search</button>
      </form>

      {words.length > 0 && tools.length + guides.length === 0 && (
        <p className="mt-8 text-lg text-jo-muted">Nothing found for “{params.get("q")}”. Try “visa”, “JLPT”, “scholarship” or “trip”.</p>
      )}
      {tools.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-black">Tools</h2>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {tools.map((t) => (
              <Link key={t.to} to={t.to} className="flex flex-col gap-1.5 rounded-[18px] bg-white p-5 text-jo-navy no-underline">
                <span className="text-xs font-bold uppercase" style={{ color: sectionById(t.section)?.tag }}>{sectionById(t.section)?.label}</span>
                <strong className="text-lg">{t.title}</strong>
                <span className="text-jo-muted">{t.sub}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {guides.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-black">Guides</h2>
          <div className="grid gap-3.5 sm:grid-cols-2">{guides.map((g) => <GuideCard key={g.id} guide={g} />)}</div>
        </div>
      )}
    </section>
  );
}
