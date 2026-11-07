// Work in Japan: residence statuses that allow work, and the SSW fields. Every line comes from the
// official page in `sources` (checked on `checked`). Kept as data so it can be re-checked and
// updated in one place when the rules change (SSW changes on April 1, 2027).

export type Src = { name: string; url: string };
export type WorkStatus = {
  id: string;
  name: string;
  ja: string;
  line: string;
  /** Rules that are changing: shown as a notice at the top. */
  changing?: string;
  facts: [string, string][];
  points: string[];
  sources: Src[];
  checked: string;
};

const SSW_DOC: Src = { name: "Immigration Services Agency: Specified Skilled Worker system explained (English, revised Oct 23, 2026)", url: "https://www.moj.go.jp/isa/content/930004452.pdf" };
const SSW_HOME: Src = { name: "Immigration Services Agency: Specified Skilled Worker (特定技能制度)", url: "https://www.moj.go.jp/isa/applications/ssw/index.html" };
const B1_NOTICE: Src = { name: "Immigration Services Agency: when the B1 Japanese requirement starts", url: "https://www.moj.go.jp/isa/03_00198.html" };

export const STATUSES: WorkStatus[] = [
  {
    id: "ssw-1",
    name: "Specified Skilled Worker (i)",
    ja: "特定技能1号",
    line: "For work-ready people with skills in one of the specified fields, such as care, construction, food service or agriculture.",
    changing: "Some rules change from April 1, 2027 (support arrangements; Japanese level B1 for bus, taxi and train jobs). Check the Immigration Services Agency before you apply.",
    facts: [
      ["Stay", "Up to 3 years at a time, 5 years in total (6 with reasonable grounds)"],
      ["Skills", "Confirmed by a skills test for your field"],
      ["Japanese", "A2.2 level or higher, confirmed by a test"],
      ["Family", "Basically not allowed to join you"],
    ],
    points: [
      "Work must belong to one of the 19 specified fields.",
      "People who completed Technical Intern Training (ii) are exempt from the skills and Japanese tests.",
      "Extra requirements apply in nursing care, bus and taxi driving, and train operation.",
      "Your employer or a registered support organisation must support you (help with daily life, procedures and Japanese).",
      "Worker dispatch is allowed only in agriculture and fisheries.",
    ],
    sources: [SSW_DOC, SSW_HOME, B1_NOTICE],
    checked: "2026-11-03",
  },
  {
    id: "ssw-2",
    name: "Specified Skilled Worker (ii)",
    ja: "特定技能2号",
    line: "For people with proficient skills: a long-term status, with family allowed.",
    changing: "From April 1, 2027, Certificate of Eligibility applications need Japanese at B1 level or higher. Rules for changes and extensions will be announced later.",
    facts: [
      ["Stay", "Renewed every 3 years, 2 years, 1 year or 6 months, with no limit on renewals"],
      ["Skills", "Confirmed by a skills test"],
      ["Japanese", "B1 or higher for Certificate of Eligibility applications from April 1, 2027"],
      ["Family", "Spouse and children can join if requirements are met"],
    ],
    points: [
      "Available in 11 of the specified fields.",
      "In industrial product manufacturing, only machining and metal processing, electric and electronic equipment assembly, and metal surface treatment.",
      "Support from a registered support organisation is not part of this status.",
    ],
    sources: [SSW_DOC, B1_NOTICE],
    checked: "2026-11-03",
  },
  {
    id: "engineer-humanities",
    name: "Engineer / Specialist in Humanities / International Services",
    ja: "技術・人文知識・国際業務",
    line: "Professional work using knowledge from science, engineering or the humanities, or skills rooted in a foreign culture.",
    facts: [
      ["Stay", "5 years, 3 years, 1 year or 3 months"],
      ["Contract", "With a public or private organisation in Japan"],
      ["Examples", "Engineers, interpreters, designers, language teachers at companies, marketing staff"],
      ["Proof", "A university degree or equivalent; or 3+ years of experience for work based on foreign culture (such as translation)"],
    ],
    points: [
      "Covers work needing knowledge of natural sciences (such as engineering) or humanities (such as law, economics, sociology).",
      "Also covers work that needs thinking or sensibility rooted in a foreign culture.",
      "Does not cover activities that have their own status, such as professor, business manager or intra-company transferee.",
    ],
    sources: [{ name: "Immigration Services Agency: Engineer / Specialist in Humanities / International Services", url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html" }],
    checked: "2026-11-03",
  },
  {
    id: "highly-skilled",
    name: "Highly Skilled Professional",
    ja: "高度専門職",
    line: "For researchers, engineers and managers who score enough points for education, career, salary and achievements.",
    facts: [
      ["Types", "Academic research · Specialised and technical work · Business management"],
      ["Points for", "Education, career, annual salary, research achievements and more"],
      ["Stay", "5 years, renewable"],
      ["Permanent residency", "After 3 years (1 year with 80 points or more), instead of the usual 10"],
    ],
    points: [
      "You can combine activities, such as research plus a related business.",
      "Your spouse can work in some professional statuses without the usual education or work history requirements.",
      "Under conditions, a parent can come to help with a child under 7, and a domestic worker can accompany you.",
      "Applications are processed with priority.",
      "The points rules were revised in March 2026: use the Immigration Services Agency's current points table.",
    ],
    sources: [
      { name: "Immigration Services Agency: preferential treatment for Highly Skilled Professionals", url: "https://www.moj.go.jp/isa/applications/resources/newimmiact_3_preferential_index.html" },
      { name: "Immigration Services Agency: how the points are evaluated", url: "https://www.moj.go.jp/isa/applications/resources/newimmiact_3_evaluate_index.html" },
    ],
    checked: "2026-11-03",
  },
  {
    id: "skill-development",
    name: "Technical Intern Training → Employment for Skill Development",
    ja: "技能実習 → 育成就労",
    line: "Technical Intern Training is being replaced by a new program that trains people up to the Specified Skilled Worker (i) level.",
    changing: "The new Employment for Skill Development program starts on April 1, 2027.",
    facts: [
      ["Starts", "April 1, 2027"],
      ["Goal", "At the end, the same skills and Japanese level as Specified Skilled Worker (i)"],
      ["Fields", "The specified fields, except automobile transportation and aviation"],
      ["Dispatch", "Allowed only in agriculture and fisheries"],
    ],
    points: [
      "Until then, Technical Intern Training continues under its current rules.",
      "People who completed Technical Intern Training (ii) are exempt from the SSW (i) skills and Japanese tests.",
    ],
    sources: [SSW_DOC],
    checked: "2026-11-03",
  },
];

export const statusById = (id: string) => STATUSES.find((s) => s.id === id);

/** SSW fields, from the official explanation (revised Oct 23, 2026). `ii`: also open to SSW (ii).
 *  `soon`: added in January 2026; accepting starts once preparations are completed. */
export const SSW_FIELDS: { en: string; ja: string; ii?: boolean; soon?: boolean }[] = [
  { en: "Long-term care", ja: "介護" },
  { en: "Building cleaning", ja: "ビルクリーニング", ii: true },
  { en: "Linen supply", ja: "リネンサプライ" },
  { en: "Industrial product manufacturing", ja: "工業製品製造業", ii: true },
  { en: "Construction", ja: "建設", ii: true },
  { en: "Shipbuilding and ship machinery", ja: "造船・舶用工業", ii: true },
  { en: "Automobile repair and maintenance", ja: "自動車整備", ii: true },
  { en: "Aviation", ja: "航空", ii: true },
  { en: "Accommodation", ja: "宿泊", ii: true },
  { en: "Automobile transportation", ja: "自動車運送業" },
  { en: "Railway", ja: "鉄道" },
  { en: "Warehousing", ja: "物流倉庫", soon: true },
  { en: "Agriculture", ja: "農業", ii: true },
  { en: "Fishery", ja: "漁業", ii: true },
  { en: "Food and beverage manufacturing", ja: "飲食料品製造業", ii: true },
  { en: "Food service", ja: "外食業", ii: true },
  { en: "Forestry", ja: "林業" },
  { en: "Wood industry", ja: "木材産業" },
  { en: "Resource circulation", ja: "資源循環", soon: true },
];

export const WORK_FACTS = {
  checked: "2026-11-03",
  residents: "4,125,395",
  residentsText: "foreign residents in Japan (end of 2025)",
  ssw1: "425,961",
  ssw2: "18,295",
  sswText: "people on Specified Skilled Worker (i) and (ii) (end of June 2026, preliminary)",
  src: SSW_DOC,
  fieldsSrc: { name: "Immigration Services Agency: field information (分野別情報)", url: "https://www.moj.go.jp/isa/policies/ssw/sswfield.html" },
};
