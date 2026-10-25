// JapWork pathway finder for the web: a person's situation → the realistic routes into work in
// Japan, with concrete next steps. A line-for-line port of findPaths() in
// japjob-mobile/lib/pathway/pathway.dart (and its tests' rules): change both together.
// General information only — every result carries PATHWAY_DISCLAIMER.

export const PATHWAY_DISCLAIMER =
  "General information only, not immigration advice. Rules change and every case is different: check the " +
  "Immigration Services Agency of Japan or a licensed immigration specialist (行政書士) before you decide anything.";

export const SITUATIONS = [
  ["abroad", "Outside Japan, no Japanese visa"],
  ["technicalIntern", "Technical intern in Japan"],
  ["student", "Student in Japan"],
  ["dependent", "Family (dependent) visa in Japan"],
  ["ssw1", "Already a Specified Skilled Worker (i)"],
  ["spouseOrResident", "Spouse, long-term or permanent resident"],
  ["workingHoliday", "Working holiday"],
] as const;
export type Situation = (typeof SITUATIONS)[number][0];

export const LEVELS = [
  ["none", "I don't speak Japanese yet"],
  ["n5", "Beginner (about N5)"],
  ["n4", "Basic (N4 or JFT-Basic)"],
  ["n3", "Everyday (about N3)"],
  ["n2", "Good (N2 or higher)"],
] as const;
export type JapaneseLevel = (typeof LEVELS)[number][0];
const levelIndex = (l: JapaneseLevel) => LEVELS.findIndex(([v]) => v === l);

export type Field = {
  id: string;
  name: string;
  ja: string;
  work: string;
  skills_test: string;
  extra_language_test?: string | null;
  language_note?: string | null;
  ssw2: boolean;
  ssw2_note?: string | null;
  japanese_tip?: string | null;
  shifts?: string | null;
  words: [string, string, string][];
};

/** Taxi/bus and station work ask for about N3 rather than the usual N4. */
const needsN3 = (f: Field) => !!f.language_note && f.language_note.includes("N3");

export type PathFit = "ready" | "afterSteps" | "limited";
export type PathStep = { text: string; done?: boolean; studyLink?: boolean };
export type WorkPath = { title: string; fit: PathFit; summary: string; steps: PathStep[]; notes?: string[] };
export type PathwayResult = { field: Field; paths: WorkPath[]; warnings: string[] };

const FEE_WARNING =
  "Never pay big fees to a broker or agent to get a job. In Japan, the support organisation for SSW workers may not " +
  "charge you for its support, and your employer must pay at least the same as a Japanese worker doing the same job.";

export function findPaths(situation: Situation, level: JapaneseLevel, field: Field): PathwayResult {
  const paths: WorkPath[] = [];
  const warnings = [FEE_WARNING];
  const hasN4 = levelIndex(level) >= levelIndex("n4");
  const hasN3 = levelIndex(level) >= levelIndex("n3");
  const name = field.name.toLowerCase();

  // ── No restriction on work ──
  if (situation === "spouseOrResident") {
    paths.push({
      title: "You can work in any job",
      fit: "ready",
      summary: `Spouse, long-term resident and permanent resident statuses have no limit on the kind of work or the hours. You can apply to ${name} jobs directly.`,
      steps: [
        { text: "Make a Japanese CV (履歴書) — use the CV builder" },
        { text: `Practise the interview for ${name}` },
        ...(!hasN4 ? [{ text: "Improve your Japanese to about N4 — it opens many more jobs", studyLink: true }] : []),
        { text: "Search Hello Work or job sites, or ask employers directly" },
      ],
    });
    return { field, paths, warnings };
  }

  // ── Part-time while on another status ──
  if (situation === "student" || situation === "dependent") {
    paths.push({
      title: "Part-time work now (up to 28 hours a week)",
      fit: "ready",
      summary:
        situation === "student"
          ? "With permission to work outside your status (資格外活動許可) you can work up to 28 hours a week, and up to 40 hours a week during your school's long holidays."
          : "With permission to work outside your status (資格外活動許可) you can work up to 28 hours a week.",
      steps: [
        { text: "Get 資格外活動許可 — at the airport on arrival or later at the immigration office" },
        { text: "Keep to the hour limit across all jobs together" },
        { text: "No work in adult entertainment businesses (bars with hostesses, pachinko, etc.)" },
      ],
      notes: ["Going over 28 hours can put your visa renewal at risk."],
    });
  }

  if (situation === "workingHoliday") {
    paths.push({
      title: "Working holiday jobs",
      fit: "ready",
      summary: "Most jobs are allowed during a working holiday, except adult entertainment. The exact rules depend on your country's agreement with Japan.",
      steps: [{ text: "Check your country's working holiday agreement" }, { text: "Make a Japanese CV (履歴書)" }],
    });
  }

  // ── Specified Skilled Worker (i) ──
  if (situation === "ssw1") {
    paths.push({
      title: `Change employer within ${field.name}`,
      fit: "ready",
      summary: "As an SSW (i) worker you can move to another employer in the same field. You need to apply to change your status of residence for the new job before you start.",
      steps: [
        { text: "Find the new employer and sign the contract" },
        { text: "Apply for the change at the immigration office before starting the new job" },
        { text: "SSW (i) lasts up to 5 years in total — plan ahead" },
      ],
    });
    paths.push(
      field.ssw2
        ? {
            title: `Move up to SSW (ii) in ${field.name}`,
            fit: "afterSteps",
            summary: "SSW (ii) has no total time limit and lets you bring your family. It needs the higher skills test and work experience, often as a team leader.",
            steps: [
              { text: `Pass the SSW (ii) skills test for ${name}` },
              { text: "Gain the required work experience (often leading a team)" },
              { text: "Apply to change your status to SSW (ii)" },
            ],
          }
        : { title: `Long-term route in ${field.name}`, fit: "limited", summary: field.ssw2_note ?? "SSW (ii) is not available in this field.", steps: [] },
    );
    return { field, paths, warnings };
  }

  // ── Into SSW (i): abroad, students/dependents after their studies, working holiday, interns ──
  const fromIntern = situation === "technicalIntern";
  const n3 = needsN3(field);
  const languageOk = n3 ? hasN3 : hasN4;
  const steps: PathStep[] = fromIntern
    ? [
        // Never pre-ticked: the waivers depend on finishing (ii) with good results and on the intern job
        // matching the field, which the wizard doesn't ask.
        { text: "Complete Technical Intern Training (ii) with good results (技能実習2号を良好に修了)" },
        { text: `Skills test: waived only if your intern job matches ${name}. If it doesn't, pass ${field.skills_test}` },
        {
          text: n3
            ? `Japanese test at about N3 level (${field.language_note}): check whether your training counts — many people still need to pass it`
            : "Japanese test: waived after completing (ii) with good results. Otherwise pass JFT-Basic or JLPT N4",
          done: languageOk,
          studyLink: !languageOk,
        },
        ...(field.extra_language_test
          ? [{ text: `${field.extra_language_test}: may be waived only if your intern job was in this field; otherwise pass it` }]
          : []),
      ]
    : [
        { text: `Pass the skills test: ${field.skills_test}` },
        {
          text: n3 ? `Pass a Japanese test at about N3 level (${field.language_note})` : "Pass JFT-Basic or JLPT N4",
          done: languageOk,
          studyLink: !languageOk,
        },
        ...(field.extra_language_test ? [{ text: `Pass the ${field.extra_language_test}` }] : []),
      ];
  if (field.id === "auto_transport") steps.push({ text: "Get the right Japanese driving licence (second class for taxi or bus)" });
  steps.push({ text: "Find an employer and sign an employment contract (pay at least the same as Japanese staff)" });
  steps.push({
    text:
      situation === "abroad"
        ? "Your employer or its support organisation applies for a Certificate of Eligibility; then you get the visa at the Japanese embassy"
        : "Apply at the immigration office to change your status of residence to SSW (i)",
  });
  paths.push({
    title: `Specified Skilled Worker (i) — ${field.name}`,
    fit: "afterSteps",
    summary: `The main visa for skilled work in ${name} (特定技能1号 · ${field.ja}). Up to 5 years in total; family members can't join you on this status.`,
    steps,
    notes: [
      ...(fromIntern
        ? [`Ask your supervising organisation (監理団体) or employer for your training records, and check with immigration whether your intern job counts as related to ${name}.`]
        : []),
      ...(!languageOk && !fromIntern ? [`Your Japanese is below ${n3 ? "N3" : "N4"} for now — that is the first thing to work on.`] : []),
      ...(field.ssw2
        ? ["Later you can move up to SSW (ii): no time limit, and your family can join you."]
        : field.ssw2_note
          ? [field.ssw2_note]
          : []),
    ],
  });

  if (situation === "student") {
    paths.push({
      title: "After graduation: office and specialist jobs",
      fit: "limited",
      summary: "Graduates of a Japanese university or vocational school may qualify for the Engineer/Specialist in Humanities/International Services visa, if the job matches what they studied.",
      steps: [{ text: "Check that the job matches your field of study" }, { text: "Talk to your school's career office early" }],
    });
  }

  if (field.id === "caregiving") {
    warnings.push(
      "In nursing care, the long-term goal is the Certified Care Worker exam (介護福祉士), which leads to the Care Worker visa with no time limit.",
    );
  }
  return { field, paths, warnings };
}
