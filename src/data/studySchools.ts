// Study in Japan: one entry per type of school. Every line comes from the official page in
// `sources` (checked on `checked`); where a source gives no figure, the page says so instead of
// guessing. Educational explanations only: these are not school listings.

export type Src = { name: string; url: string };
export type SchoolType = {
  id: string;
  name: string;
  ja: string;
  line: string;
  offers: string[];
  who: string[];
  length: string;
  language: string[];
  fees: string;
  starts: string;
  next: { text: string; to?: string }[];
  sources: Src[];
  checked: string;
};

const JASSO = "Study in Japan (JASSO)";
const FEES: Src = { name: `${JASSO}: academic fees`, url: "https://www.studyinjapan.go.jp/en/planning/academic-fees/" };
const SYSTEM: Src = { name: `${JASSO}: Japan's educational system (MEXT School Basic Survey 2025)`, url: "https://www.studyinjapan.go.jp/en/planning/educational-system/" };

export const SCHOOL_TYPES: SchoolType[] = [
  {
    id: "language-school",
    name: "Japanese language school",
    ja: "日本語学校",
    line: "Learn Japanese full-time, often as the first step before college or university.",
    offers: ["General Japanese from the basics", "University preparation courses", "Business Japanese courses"],
    who: [
      "To study on a student visa, the school must be designated by the Minister of Justice (on the Immigration list of approved schools).",
      "Schools usually ask for an application form and résumé, your graduation certificate and transcript, and documents showing you can pay your costs.",
    ],
    length: "Set by each school. Reaching the level needed to follow classes in Japanese takes roughly 600 to 900+ hours of study.",
    language: ["Check each school's starting level."],
    fees: "About ¥610,000 to ¥1,900,000 for the first year (admission and tuition), depending on the course.",
    starts: "April and October; some schools also in January and July.",
    next: [
      { text: "A vocational school: more than 6 months at an approved language school is one way to meet the Japanese requirement.", to: "/study/schools/vocational-school" },
      { text: "A university: most universities ask for EJU scores; take the EJU in June or November.", to: "/study/schools/university" },
    ],
    sources: [{ name: `${JASSO}: Japanese language institutes`, url: "https://www.studyinjapan.go.jp/en/planning/learn-about-schools/japanese-language-schools/" }, FEES],
    checked: "2026-11-03",
  },
  {
    id: "vocational-school",
    name: "Vocational school",
    ja: "専門学校",
    line: "Practical, career-focused courses, taught in Japanese.",
    offers: ["Diploma courses: 2 years or more (62 credits or 1,700 class hours or more)", "Advanced diploma courses: 4 years or more (124 credits or 3,400 class hours or more)"],
    who: ["12 years of schooling in your country (other routes exist if your country has fewer years)."],
    length: "Diploma 2+ years, advanced diploma 4+ years.",
    language: [
      "Classes are in Japanese. You need one of these:",
      "More than 6 months at a Japanese language school designated by the Minister of Justice",
      "JLPT N1 or N2",
      "EJU Japanese as a Foreign Language: 200 or more",
      "BJT Business Japanese Proficiency Test: 400 or more",
      "1 year or more at a Japanese elementary, lower or upper secondary school",
    ],
    fees: "About ¥1,300,000 for the first year (admission and tuition).",
    starts: "April and October.",
    next: [{ text: "See which work routes fit your skills.", to: "/work/pathway" }],
    sources: [{ name: `${JASSO}: specialized training colleges`, url: "https://www.studyinjapan.go.jp/en/planning/learn-about-schools/vocational-schools/" }, FEES, SYSTEM],
    checked: "2026-11-03",
  },
  {
    id: "university",
    name: "University",
    ja: "大学",
    line: "Bachelor's degrees in Japanese, and a growing number taught fully in English.",
    offers: ["Bachelor's degree", "Professional bachelor's degree", "Short-term study: auditing, non-degree courses and exchanges"],
    who: ["12 years of schooling (other routes exist, such as a university preparatory course)."],
    length: "Usually 4 years; 6 years for medicine, dentistry, veterinary science and some pharmacy programs.",
    language: [
      "Japanese-taught programs: a guide is JLPT N1 or N2 plus 250 or more on the EJU Japanese section.",
      "English-taught programs: a guide is TOEFL iBT 71–80 or IELTS 5.5–6.",
      "Many universities ask for EJU scores.",
    ],
    fees: "First year (admission and tuition): about ¥820,000 national, ¥910,000 public, ¥1,300,000 private (about ¥3,800,000 for private medicine, dentistry and pharmacy).",
    starts: "April; some universities also in September or October.",
    next: [{ text: "Graduate school (master's and doctoral degrees).", to: "/study/schools/graduate-school" }],
    sources: [{ name: `${JASSO}: universities and junior colleges`, url: "https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/" }, FEES, SYSTEM],
    checked: "2026-11-03",
  },
  {
    id: "graduate-school",
    name: "Graduate school",
    ja: "大学院",
    line: "Master's and doctoral degrees, and non-degree research student places.",
    offers: ["Master's: usually 2 years", "Doctoral: about 5 years (the master's can be the first 2)", "Research student: short-term research without a degree"],
    who: [
      "16 years of schooling for a master's or the first half of a doctorate (18 years for doctoral medicine, dentistry, pharmacy and veterinary science).",
      "In most cases you find your own supervisor: contact a professor with your past research and plans, ideally with a recommendation letter.",
      "Most graduate schools ask for a research proposal of about 2,000 words: purpose, background, significance, method and references.",
    ],
    length: "Master's about 2 years; doctoral about 5 years in total.",
    language: ["English programs: a guide is TOEFL iBT 75–80 or IELTS 6.", "Some programs let you finish a degree taking classes only in English."],
    fees: "First year (admission and tuition): about ¥820,000 national, ¥900,000 public, ¥1,100,000 private.",
    starts: "Mostly April; many universities also in September or October.",
    next: [{ text: "Scholarships for graduate students, such as MEXT research scholarships.", to: "/guides/study-mext" }],
    sources: [{ name: `${JASSO}: graduate schools`, url: "https://www.studyinjapan.go.jp/en/planning/learn-about-schools/graduate-schools/" }, FEES, SYSTEM],
    checked: "2026-11-03",
  },
  {
    id: "junior-college",
    name: "Junior college",
    ja: "短期大学",
    line: "Shorter degree courses leading to an associate degree.",
    offers: ["Associate degree", "Professional associate degree"],
    who: ["12 years of schooling (other routes exist if your country has fewer years)."],
    length: "2 or 3 years.",
    language: ["Check each college's requirements."],
    fees: "About ¥600,000 to ¥1,200,000 for the first year (admission and tuition).",
    starts: "April; some colleges also in the autumn.",
    next: [{ text: "Compare with a university degree.", to: "/study/schools/university" }],
    sources: [{ name: `${JASSO}: universities and junior colleges`, url: "https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/" }, FEES, SYSTEM],
    checked: "2026-11-03",
  },
  {
    id: "online",
    name: "Online Japanese",
    ja: "オンライン",
    line: "Learn from home before you come, or alongside work.",
    offers: [
      "JF Japanese e-Learning Minato (Japan Foundation): self-study courses and tutor-supported courses with live lessons.",
      "Levels A1 to C2 on the JF Standard, with explanations in many languages, including Vietnamese and Indonesian.",
      "JapanOne: speaking practice, JLPT N5–N3 tests and a daily kanji quiz.",
    ],
    who: ["Anyone, from anywhere."],
    length: "At your own pace.",
    language: ["Courses start from beginner level."],
    fees: "Many Minato courses are free; some are paid.",
    starts: "Any time.",
    next: [
      { text: "Online study does not give you a student visa. For that you need a school designated by the Minister of Justice.", to: "/study/schools/language-school" },
      { text: "Practise with JapanOne now.", to: "/learn" },
    ],
    sources: [{ name: "Japan Foundation: JF Japanese e-Learning Minato", url: "https://minato-jf.jp/" }, { name: `${JASSO}: Japanese language institutes`, url: "https://www.studyinjapan.go.jp/en/planning/learn-about-schools/japanese-language-schools/" }],
    checked: "2026-11-03",
  },
];

export const schoolTypeById = (id: string) => SCHOOL_TYPES.find((s) => s.id === id);

/** Overview figures for the Study landing page. */
export const STUDY_FACTS = {
  checked: "2026-11-03",
  glad: { value: "94.1%", text: "of international students are glad they chose Japan", src: { name: `${JASSO}: why study in Japan (2023 Lifestyle Survey of Privately-Financed International Students)`, url: "https://www.studyinjapan.go.jp/en/why/ask/" } },
  reasons: [
    ["61.3%", "were interested in Japanese society and wanted to live in Japan"],
    ["50.2%", "want to work in Japan or for a Japanese company"],
    ["39.4%", "wanted to study Japanese language and culture"],
  ] as [string, string][],
  schools: [
    ["Universities", "812"],
    ["Graduate schools", "669"],
    ["Junior colleges", "292"],
    ["Vocational schools", "2,658"],
  ] as [string, string][],
  schoolsSrc: SYSTEM,
  living: {
    monthly: "¥105,000",
    text: "average monthly living costs for an international student",
    rent: "Rent averages ¥41,000 a month nationally and ¥57,000 in Tokyo.",
    src: { name: `${JASSO}: living costs (2023 Lifestyle Survey of Privately-Financed International Students)`, url: "https://www.studyinjapan.go.jp/en/life/cost-of-living/" },
  },
};
