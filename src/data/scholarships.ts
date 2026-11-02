// Scholarships you can apply for before coming to Japan: section V of JASSO's "Scholarships for
// International Students in Japan 2026–2027" (pages 31–35), plus the MEXT scholarship. Amounts,
// ages and periods as printed there; always check the provider's site for this year's rules.

export const PAMPHLET = {
  name: "JASSO: Scholarships for International Students in Japan 2026–2027",
  url: "https://www.studyinjapan.go.jp/en/assets/pdf/scholarship_pamphlet_en.pdf",
  checked: "2026-11-03",
};

export type Level = "lang" | "voc" | "ug" | "grad";
export const LEVELS: [Level, string][] = [["lang", "Japanese language school"], ["voc", "Vocational school"], ["ug", "Bachelor's / junior college"], ["grad", "Master's / PhD / research"]];

/** Country groups used in the pamphlet. */
const ASEAN = ["Vietnam", "Indonesia", "Philippines", "Myanmar", "Thailand", "Malaysia", "Cambodia", "Laos", "Singapore", "Brunei"];
const SOUTH_ASIA = ["India", "Nepal", "Sri Lanka", "Bangladesh", "Pakistan", "Bhutan"];
const EAST_ASIA = ["China", "Mongolia", "Korea", "Taiwan"];
const CENTRAL_ASIA = ["Uzbekistan", "Kazakhstan", "Kyrgyzstan"];
const ASIA = [...ASEAN, ...SOUTH_ASIA, ...EAST_ASIA, ...CENTRAL_ASIA];

export const COUNTRIES = [...ASEAN, ...SOUTH_ASIA, ...EAST_ASIA, ...CENTRAL_ASIA, "Ukraine", "Australia", "USA", "Other"].filter((c, i, a) => a.indexOf(c) === i);

export type Scholarship = {
  name: string;
  by: string;
  levels: Level[];
  /** undefined = any country */
  countries?: string[];
  countriesText?: string;
  ageMax?: number;
  ageText?: string;
  amount: string;
  period: string;
  apply: string;
  notes?: string;
  url: string;
};

export const SCHOLARSHIPS: Scholarship[] = [
  {
    name: "MEXT (Japanese Government) Scholarship", by: "Ministry of Education (MEXT)", levels: ["voc", "ug", "grad"],
    amount: "Tuition, airfare and a monthly allowance (about ¥117,000–¥145,000 in most categories)", period: "Depends on the category",
    apply: "Through the Japanese embassy in your country, or a Japanese university", notes: "Seven categories with their own age limits.", url: "/guides/study-mext",
  },
  {
    name: "Honors Scholarship (reservation for top EJU scores)", by: "JASSO", levels: ["voc", "ug"],
    amount: "¥48,000 a month", period: "6 months or 1 year", apply: "Same period as the EJU application",
    notes: "Chosen by EJU score. You must enrol as a regular student at a university, junior college, college of technology or vocational school.",
    url: "https://www.jasso.go.jp/en/ryugaku/scholarship_j/shoreihi/yoyaku_eju/index.html",
  },
  {
    name: "Okazaki Kaheita International Scholarship", by: "Okazaki Kaheita International Scholarship Foundation", levels: ["grad"],
    countries: ["China", "Thailand", "Indonesia", "Malaysia", "Vietnam", "Myanmar", "Taiwan"], ageMax: 24, ageText: "Under 25",
    amount: "¥110,000 a month (language school year), ¥130,000 (master's), plus fees, travel and housing", period: "Up to 2 years",
    apply: "Around November to March", notes: "Includes one year at a Japanese language school. Not for medicine, dentistry or veterinary science.",
    url: "https://www.okazakizaidan.or.jp/en/en-info/",
  },
  {
    name: "YKK Leaders 21", by: "Yoshida Scholarship Foundation", levels: ["grad"],
    countries: ["India", ...ASEAN, "Pakistan", "Sri Lanka", "Bangladesh", "Nepal", "Bhutan", "Mongolia", ...CENTRAL_ASIA], countriesText: "India, ASEAN, Pakistan, Sri Lanka, Bangladesh, Nepal, Bhutan, Mongolia, West and Central Asia, Africa",
    ageMax: 29, ageText: "Under 30", amount: "Tuition up to ¥2.5 million, ¥200,000 a month, travel", period: "Up to 2 years",
    apply: "Contact the designated universities", notes: "Master's in natural science or engineering at designated universities (University of Tokyo, Kyoto, Osaka and others).",
    url: "https://www.ysf.or.jp/englishpage/",
  },
  {
    name: "FRF Scholarship for Studying in Japan", by: "Fast Retailing Foundation", levels: ["ug"],
    countries: ["Vietnam", "Indonesia", "Philippines"], ageMax: 19, ageText: "19 or under",
    amount: "Up to ¥4.5 million a year", period: "4 to 4.5 years", apply: "July to late August", notes: "Bachelor's at designated schools; about 10 students per country.",
    url: "https://www.fastretailing-foundation.or.jp/eng/",
  },
  {
    name: "Kyoritsu Foundation Scholarship", by: "Kyoritsu International Foundation", levels: ["voc", "ug", "grad"],
    countries: ASIA, countriesText: "Asia", amount: "¥110,000 a month", period: "1 year (from April)", apply: "Early November to January 31",
    notes: "At schools listed on the foundation's site.", url: "mailto:kif-info@dormy.co.jp",
  },
  {
    name: "Kyoritsu Maintenance Scholarship", by: "Kyoritsu International Foundation", levels: ["lang", "voc", "ug"],
    countries: ASIA, countriesText: "Asia", amount: "¥70,000 a month", period: "1 year (from April)", apply: "Early November to January 31",
    notes: "Open to Japanese language school students.", url: "mailto:kif-info@dormy.co.jp",
  },
  {
    name: "Rotary Yoneyama Scholarship (applying from abroad)", by: "Rotary Yoneyama Memorial Foundation", levels: ["ug", "grad"],
    ageMax: 44, ageText: "Under 45", amount: "¥100,000 a month (bachelor's), ¥140,000 (master's/PhD), airfare to Japan", period: "2 years",
    apply: "October 1 to 31", url: "https://www.rotary-yoneyama.or.jp/english/overseas",
  },
  {
    name: "Honjo Scholarship for Foreign Students", by: "Honjo International Scholarship Foundation", levels: ["grad"],
    ageMax: 35, ageText: "Start a master's by 30, a PhD by 35", amount: "¥180,000–¥230,000 a month", period: "1 to 5 years",
    apply: "September to October", notes: "You are expected to work in your home country after graduating.", url: "https://www.hisf.or.jp/en/scholarship/foreigner/",
  },
  {
    name: "Nomura Foundation Scholarship", by: "Nomura Foundation", levels: ["grad"],
    ageMax: 35, ageText: "35 or under", amount: "¥200,000 a month", period: "2 years", apply: "September",
    notes: "Social sciences and humanities at the University of Tokyo, Hitotsubashi, Kyoto, Osaka, Waseda or Keio.", url: "https://www.nomurafoundation.or.jp/en/scholar/",
  },
  {
    name: "INPEX Scholarship", by: "INPEX Scholarship Foundation", levels: ["grad"],
    countries: ["Indonesia", "Australia"], countriesText: "Indonesia, United Arab Emirates, Australia", ageMax: 29, ageText: "Under 30",
    amount: "¥160,000 a month, full tuition, travel, Japanese course fee", period: "Within 2 years", apply: "August 1 to October 31",
    notes: "Indonesia: STEM and healthcare. Graduates of leading universities with a GPA over 3.00.", url: "https://www.inpex-s.com/en/",
  },
  {
    name: "Aichi Scholarship Program", by: "Aichi Prefectural Government", levels: ["grad"],
    ageMax: 34, ageText: "Under 35", amount: "¥150,000 a month, travel, school fees", period: "2.5 years", apply: "Late February to mid May",
    notes: "Most countries. Fields that support Aichi's industry, and you must intend to work for a company linked to Aichi.",
    url: "https://www.pref.aichi.jp/soshiki/kokusai/aichi-scholarship-program.html",
  },
  {
    name: "Akebono Foundation Scholarship", by: "Akebono Foundation", levels: ["ug", "grad"],
    countries: ["Ukraine"], countriesText: "Central and Eastern Europe, the Balkans, Ukraine, Moldova, Georgia, Armenia", ageMax: 30, ageText: "30 or under",
    amount: "¥200,000 a month", period: "2 years", apply: "March, June, September and December", url: "https://akebono-foundation.org/",
  },
  {
    name: "JEES Ishibashi Foundation Scholarship", by: "Japan Educational Exchanges and Services", levels: ["grad"],
    amount: "¥150,000 a month", period: "2 years", apply: "January–April (spring) or June–September (autumn)", notes: "Art history only.", url: "https://www.jees.or.jp/",
  },
  {
    name: "Toka Kyoiku Bunka Koryu Zaidan Scholarship", by: "Toka Kyoiku Bunka Koryu Zaidan", levels: ["ug", "grad"],
    countries: ["China", "Taiwan"], countriesText: "China, Hong Kong, Macau, Taiwan", amount: "¥100,000 a month", period: "Within 2 years", apply: "November 1 to 20",
    url: "https://www.donghua.or.jp/",
  },
  {
    name: "Fulbright Grants", by: "Japan-U.S. Educational Commission", levels: ["grad"],
    countries: ["USA"], countriesText: "U.S. citizens", amount: "¥150,000–¥210,000 a month and allowances", period: "10 to 12 months", apply: "April to early October of the year before",
    url: "https://us.fulbrightonline.org/",
  },
];

export function matches(s: Scholarship, level: Level | "", country: string, age: number | null) {
  if (level && !s.levels.includes(level)) return false;
  if (country && s.countries && !s.countries.includes(country)) return false;
  if (age !== null && s.ageMax !== undefined && age > s.ageMax) return false;
  return true;
}
