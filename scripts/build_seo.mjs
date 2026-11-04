// Builds netlify/seo/pages.ts: the title, description and readable text of each public japanone.app
// page, served in the first HTML response so search engines don't depend on running the app.
// Text comes from the same data as the pages. Run after changing guides, schools or work statuses:
//   node scripts/build_seo.mjs
import fs from "node:fs";
import { SCHOOL_TYPES } from "../src/data/studySchools.ts";
import { STATUSES } from "../src/data/workStatuses.ts";

const guides = JSON.parse(fs.readFileSync(new URL("../src/data/guides.json", import.meta.url)));
const SECTION = { study: "Study in Japan", work: "Work in Japan", travel: "Travel Japan", live: "Live in Japan", learn: "Learn Japanese" };

const fixed = [
  ["/", "JapanOne | Learn Japanese, plan your trip, work in Japan", "Practise Japanese, prepare for the JLPT, and find checked guides for studying, working, travelling and living in Japan.", "Your gateway to Japan"],
  ["/learn", "Learn Japanese: speaking practice and JLPT tests | JapanOne", "Speak in real situations, prepare for the JLPT with practice tests, check your level and build a study plan.", "Learn Japanese"],
  ["/learn/speaking", "Japanese speaking lessons for real situations | JapanOne", "Practise speaking Japanese for everyday life and work, one short situation at a time.", "Japanese speaking lessons"],
  ["/learn/jlpt", "JLPT practice test N5, N4, N3 | JapanOne", "JLPT-style practice questions for N5, N4 and N3. Not affiliated with the official JLPT.", "JLPT practice test"],
  ["/learn/level-check", "Japanese level check | JapanOne", "Answer a few questions to find a good starting level for your Japanese.", "Japanese level check"],
  ["/learn/plan", "JLPT study plan builder | JapanOne", "Build a dated JLPT study plan that fits the time you have before the test.", "JLPT study plan builder"],
  ["/study", "Study in Japan: schools, costs and visas | JapanOne", "Types of school, costs, scholarships and the student visa, from official sources.", "Study in Japan"],
  ["/study/cost", "Cost of studying in Japan | JapanOne", "What studying in Japan costs, from official sources.", "Cost of studying in Japan"],
  ["/study/scholarships", "Scholarships to study in Japan | JapanOne", "Scholarships for international students in Japan, from official sources.", "Scholarships for Japan"],
  ["/study/visa", "Japan student visa explained | JapanOne", "How the student residence status works, from official sources.", "Japan student visa"],
  ["/study/faq", "Study in Japan FAQ | JapanOne", "Common questions about studying in Japan, answered from official sources.", "Study in Japan FAQ"],
  ["/study/checklist", "Study in Japan checklist | JapanOne", "A checklist of what to prepare before you study in Japan.", "Study in Japan checklist"],
  ["/study/path", "Study in Japan planner | JapanOne", "Make a dated plan from application to arrival.", "Your dated plan to study in Japan"],
  ["/work", "Work in Japan: visas, SSW and CV help | JapanOne", "Residence statuses that allow work, the Specified Skilled Worker system and tools for your job search, from official sources.", "Work in Japan"],
  ["/work/ssw", "Specified Skilled Worker (SSW) in Japan explained | JapanOne", "How the Specified Skilled Worker system works, from official sources.", "Specified Skilled Worker (SSW)"],
  ["/work/pathway", "Find your work pathway to Japan | JapanOne", "Answer a few questions to see which work routes to Japan may fit you.", "Find your work pathway"],
  ["/work/cv", "Japanese CV (rirekisho) builder | JapanOne", "Build a Japanese-style CV (履歴書) step by step.", "Japanese CV builder"],
  ["/travel", "Travel Japan: plan your trip | JapanOne", "Plan your Japan trip and learn the phrases you will need.", "Travel Japan"],
  ["/travel/plan", "Japan trip planner | JapanOne", "Plan a Japan trip by places and days.", "Japan trip planner"],
  ["/travel/phrases", "Japanese travel phrases | JapanOne", "Useful Japanese phrases for your trip.", "Japanese travel phrases"],
  ["/live", "Living in Japan guides | JapanOne", "Practical guides for daily life in Japan, from official sources.", "Live in Japan"],
  ["/live/address", "Check your address registration in Japan | JapanOne", "Check what you need to do about registering your address in Japan.", "Address registration check"],
  ["/guides", "Guides to life in Japan | JapanOne", "Short guides to studying, working, travelling and living in Japan, each checked against official sources.", "Guides"],
  ["/partners", "Partner with JapanOne | JapanOne", "List your school, jobs, tours or shop on JapanOne.", "Partner with JapanOne"],
];

const pages = {};
for (const [path, title, description, h1] of fixed) pages[path] = { title, description, h1, text: [description] };

pages["/guides"].links = guides.map((g) => [`/guides/${g.id}`, g.title]);
pages["/study"].links = SCHOOL_TYPES.map((s) => [`/study/schools/${s.id}`, s.name]);
pages["/work"].links = STATUSES.map((s) => [`/work/status/${s.id}`, s.name]);

const clip = (s, n = 155) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, "")}…`);

for (const g of guides) {
  const text = g.slides.flatMap((s) => [s.title, s.body, ...(s.items ?? [])]).filter((x) => typeof x === "string" && x).map((x) => x.replace(/\*/g, ""));
  pages[`/guides/${g.id}`] = {
    title: `${g.title} | JapanOne`,
    description: clip(`${SECTION[g.section]}: ${g.slides[0]?.body ?? g.title}`),
    h1: g.title, text, checked: g.checked, sources: g.sources,
  };
}
for (const s of SCHOOL_TYPES) {
  pages[`/study/schools/${s.id}`] = {
    title: `${s.name} (${s.ja}) in Japan | JapanOne`, description: clip(s.line), h1: `${s.name} (${s.ja})`,
    text: [s.line, ...s.offers, ...s.who, s.length, ...s.language, s.fees, s.starts], checked: s.checked, sources: s.sources,
  };
}
for (const s of STATUSES) {
  pages[`/work/status/${s.id}`] = {
    title: `${s.name} (${s.ja}): work status in Japan | JapanOne`, description: clip(s.line), h1: `${s.name} (${s.ja})`,
    text: [s.line, ...(s.changing ? [s.changing] : []), ...s.facts.map(([k, v]) => `${k}: ${v}`), ...s.points], checked: s.checked, sources: s.sources,
  };
}

fs.writeFileSync(new URL("../netlify/seo/pages.ts", import.meta.url),
  `// Generated by scripts/build_seo.mjs. Do not edit by hand.\nexport type SeoPage = { title: string; description: string; h1: string; text: string[]; links?: [string, string][]; checked?: string; sources?: { name: string; url: string }[] };\nexport const PAGES: Record<string, SeoPage> = ${JSON.stringify(pages, null, 1)};\n`);
console.log(Object.keys(pages).length, "pages");
