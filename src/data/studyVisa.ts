// Student visa guide and Study FAQs. Every answer comes from the official page it cites.

export type Src = { name: string; url: string };

const S = {
  jassoImm: { name: "Study in Japan (JASSO): immigration procedures", url: "https://www.studyinjapan.go.jp/en/planning/immigration-procedures/" },
  isaStudent: { name: "Immigration Services Agency: Student (留学)", url: "https://www.moj.go.jp/isa/applications/status/student.html" },
  isaExtend: { name: "Immigration Services Agency: extension of period of stay", url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html" },
  isaNotify: { name: "Immigration Services Agency: notification about your school (活動機関に関する届出)", url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00014.html" },
  isaWork: { name: "Immigration Services Agency: permission for students to work", url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html" },
  jassoLang: { name: "Study in Japan (JASSO): Japanese language institutes", url: "https://www.studyinjapan.go.jp/en/planning/learn-about-schools/japanese-language-schools/" },
  jassoUni: { name: "Study in Japan (JASSO): universities", url: "https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/" },
  jassoVoc: { name: "Study in Japan (JASSO): vocational schools", url: "https://www.studyinjapan.go.jp/en/planning/learn-about-schools/vocational-schools/" },
  jassoFees: { name: "Study in Japan (JASSO): academic fees", url: "https://www.studyinjapan.go.jp/en/planning/academic-fees/" },
  jassoExam: { name: "Study in Japan (JASSO): exams", url: "https://www.studyinjapan.go.jp/en/planning/examination/" },
  jassoSchedule: { name: "Study in Japan (JASSO): time schedule", url: "https://www.studyinjapan.go.jp/en/planning/flow-chart/schedule.html" },
  jassoScholar: { name: "JASSO: Scholarships for International Students in Japan 2026–2027", url: "https://www.studyinjapan.go.jp/en/assets/pdf/scholarship_pamphlet_en.pdf" },
};

export const VISA_CHECKED = "2026-11-03";

export const VISA_STEPS: { title: string; body: string[]; src: Src[]; to?: { label: string; path: string } }[] = [
  {
    title: "1. The Student status (留学)",
    body: [
      "Covers studying at universities, junior colleges, vocational schools (専修学校), high schools and similar institutions in Japan.",
      "The period of stay is set for each person by the Minister of Justice, up to 4 years and 3 months at a time.",
      "If you stop doing the activity your status is for (studying), your status can be revoked.",
    ],
    src: [S.isaStudent],
  },
  {
    title: "2. Certificate of Eligibility (COE)",
    body: [
      "After you are accepted, the COE is applied for at a regional immigration office in Japan, usually by your school on your behalf.",
      "Some forms must be prepared by your school, not by you. Certificates issued in Japan must be less than 3 months old, and documents in other languages need a Japanese translation.",
    ],
    src: [S.jassoImm, S.isaStudent],
  },
  {
    title: "3. Student visa",
    body: ["With the COE, apply at the Japanese embassy or consulate in your country: passport, application form, photo and a copy of the COE."],
    src: [S.jassoImm],
  },
  {
    title: "4. Arrival and residence card",
    body: [
      "At New Chitose, Narita, Haneda, Chubu, Kansai, Kobe, Hiroshima and Fukuoka airports you get your residence card on arrival. At other airports it is issued later through your city office.",
      "Register your address at your municipal office within 14 days, and carry your residence card at all times.",
    ],
    src: [S.jassoImm],
    to: { label: "Address checklist", path: "/live/address" },
  },
  {
    title: "5. Part-time work",
    body: ["Get permission (資格外活動許可) before any paid work. Then up to 28 hours a week during term, up to 8 hours a day in your school's long vacations, never in nightlife businesses."],
    src: [S.isaWork],
    to: { label: "Part-time work guide", path: "/guides/study-part-time" },
  },
  {
    title: "6. Changing or leaving your school",
    body: ["If you leave your school, graduate or move to another school, notify the Immigration Services Agency within 14 days. You can do it online, 24 hours a day."],
    src: [S.isaNotify],
  },
  {
    title: "7. Extending your stay",
    body: [
      "Apply at your regional immigration office on or before the day your period of stay ends; for periods of 6 months or more, from 3 months before.",
      "Processing usually takes 2 weeks to 1 month. From October 1, 2026 the fee depends on the length granted, for example ¥33,000 for 1 year.",
    ],
    src: [S.isaExtend],
  },
];

export const VISA_MISTAKES = [
  "Working before you have permission, or more than 28 hours a week during term.",
  "Not telling immigration within 14 days when you leave or change school.",
  "Missing class for a long time: not studying can cost you your status.",
  "Applying for an extension after your period of stay has ended.",
  "Submitting old certificates (more than 3 months) or documents without a Japanese translation.",
];

export type Faq = { q: string; a: string; to?: { label: string; path: string }; src: Src };

export const STUDY_FAQS: Faq[] = [
  { q: "Can I study in Japan without knowing Japanese?", a: "Yes. Japanese language schools teach from the basics, and a growing number of university degree programs are taught entirely in English.", to: { label: "Types of school", path: "/study" }, src: S.jassoUni },
  { q: "How much does a Japanese language school cost?", a: "About ¥610,000 to ¥1,900,000 for the first year (admission and tuition), depending on the course. Living costs are extra: about ¥105,000 a month on average.", to: { label: "Language schools", path: "/study/schools/language-school" }, src: S.jassoFees },
  { q: "How long can I stay on a student visa?", a: "The period of stay is set for each person, up to 4 years and 3 months at a time. You can apply to extend it before it ends.", to: { label: "Student visa guide", path: "/study/visa" }, src: S.isaStudent },
  { q: "What is the EJU?", a: "The Examination for Japanese University Admission for International Students. It is held in June and November, and many universities ask for its scores.", to: { label: "Universities", path: "/study/schools/university" }, src: S.jassoExam },
  { q: "What is the difference between a university and a vocational school?", a: "Universities give bachelor's degrees, usually in 4 years. Vocational schools (専門学校) teach practical skills: a diploma takes 2+ years. Vocational schools need a set level of Japanese, such as JLPT N2 or 6+ months at an approved language school.", to: { label: "Compare school types", path: "/study" }, src: S.jassoVoc },
  { q: "Can international students work part-time?", a: "Yes, with permission (資格外活動許可): up to 28 hours a week during term and up to 8 hours a day in long vacations.", to: { label: "Part-time work guide", path: "/guides/study-part-time" }, src: S.isaWork },
  { q: "What is the COE?", a: "The Certificate of Eligibility. After you are accepted, it is applied for at immigration in Japan, usually by your school. You then use it to apply for your visa at the Japanese embassy or consulate.", to: { label: "Student visa guide", path: "/study/visa" }, src: S.jassoImm },
  { q: "What scholarships are there?", a: "The Japanese government (MEXT), JASSO, local governments and private foundations. Most are applied for after you enrol in Japan, usually through your school; a few accept applications from abroad.", to: { label: "MEXT scholarship", path: "/guides/study-mext" }, src: S.jassoScholar },
  { q: "Can I go on to university after language school?", a: "Yes. A common path is a Japanese language school first, then applying to a vocational school or university, with the EJU and other tests along the way.", to: { label: "Study path planner", path: "/study/path" }, src: S.jassoSchedule },
  { q: "What if I change school?", a: "Notify the Immigration Services Agency within 14 days of leaving or moving school. You can do it online.", to: { label: "Student visa guide", path: "/study/visa" }, src: S.isaNotify },
  { q: "When should I apply?", a: "For a Japanese language school, about 5 to 7 months before you start; for a vocational school or university, about 6 to 8 months before.", to: { label: "Study path planner", path: "/study/path" }, src: S.jassoSchedule },
  { q: "Is studying online enough for a student visa?", a: "No. A student visa needs a school in Japan, such as a language school designated by the Minister of Justice.", to: { label: "Online Japanese", path: "/study/schools/online" }, src: S.jassoLang },
];
