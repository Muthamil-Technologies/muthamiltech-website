// Export the JapanOne content the website uses to one JSON file the app bundles, so both show
// the same facts. Run from Website/: node scripts/export_app_content.mjs
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "..", "src");
const out = join(here, "..", "..", "japtalk-mobile", "assets", "data", "japanone_content.json");
const ts = async (p) => import(join(src, p)); // Node strips the TypeScript types

const { SECTIONS, JLPT_DATE } = await ts("lib/joSections.ts");
const { TOOLS } = await ts("lib/joTools.ts");
const { SCHOOL_TYPES, STUDY_FACTS } = await ts("data/studySchools.ts");
const { STATUSES, SSW_FIELDS, WORK_FACTS } = await ts("data/workStatuses.ts");
const { VISA_STEPS, VISA_MISTAKES, STUDY_FAQS, VISA_CHECKED } = await ts("data/studyVisa.ts");
const { SCHOLARSHIPS, COUNTRIES, LEVELS, PAMPHLET } = await ts("data/scholarships.ts");
const json = (p) => JSON.parse(readFileSync(join(src, p), "utf8"));

const content = {
  generated: new Date().toISOString().slice(0, 10),
  jlptDate: JLPT_DATE.toISOString(),
  sections: SECTIONS,
  tools: TOOLS,
  guides: json("data/guides.json"),
  dailyKanji: json("data/dailyKanji.json"),
  study: { schoolTypes: SCHOOL_TYPES, facts: STUDY_FACTS, visaSteps: VISA_STEPS, visaMistakes: VISA_MISTAKES, visaChecked: VISA_CHECKED, faqs: STUDY_FAQS },
  scholarships: { list: SCHOLARSHIPS, countries: COUNTRIES, levels: LEVELS, pamphlet: PAMPHLET },
  work: { statuses: STATUSES, sswFields: SSW_FIELDS, facts: WORK_FACTS },
};
writeFileSync(out, JSON.stringify(content) + "\n");
copyFileSync(join(dirname(out), "..", "..", "..", "Website", "src", "data", "workPay.json"), join(dirname(out), "work_pay.json"));
console.log(`wrote ${out}: ${content.guides.length} guides, ${content.study.schoolTypes.length} school types, ${content.work.statuses.length} statuses, ${content.scholarships.list.length} scholarships`);
