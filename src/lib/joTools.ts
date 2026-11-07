import type { SectionId } from "./joSections";

// Everything people can DO on japanone.app, by section. Section pages and search read this.
export type Tool = { section: SectionId; to: string; title: string; sub: string; keywords?: string };

export const TOOLS: Tool[] = [
  { section: "learn", to: "/learn/level-check", title: "Check your level", sub: "Find where to start in about 2 minutes.", keywords: "test placement" },
  { section: "learn", to: "/learn/speaking", title: "Speaking practice", sub: "Real conversations at work and in daily life.", keywords: "speak conversation" },
  { section: "learn", to: "/learn/jlpt", title: "Take sample test", sub: "N5 · N4 · N3, with answers explained.", keywords: "jlpt exam n5 n4 n3" },
  { section: "learn", to: "/learn/plan", title: "Prepare for exam", sub: "From your exam date and daily time to a plan.", keywords: "jlpt schedule" },
  { section: "study", to: "/study/path", title: "Study path planner", sub: "Your month-by-month plan from today to your first day of school.", keywords: "language school university vocational intake apply coe visa timeline" },
  { section: "study", to: "/study/scholarships", title: "Scholarship finder", sub: "Scholarships you can apply for from your country, by level and age.", keywords: "scholarship mext jasso funding money foundation" },
  { section: "study", to: "/study/checklist", title: "Your study checklist", sub: "Every step from choosing a school to your first weeks, saved to your account.", keywords: "checklist steps prepare documents" },
  { section: "study", to: "/study/cost", title: "Study cost calculator", sub: "Tuition and living costs, from official averages you can change.", keywords: "cost tuition fee rent budget money expenses" },
  { section: "work", to: "/work/pathway", title: "Find your path", sub: "3 questions: the visa routes and next steps that fit you.", keywords: "visa job ssw engineer" },
  { section: "work", to: "/work/cv", title: "Japanese CV (履歴書)", sub: "Fill in your details, then print or save as PDF.", keywords: "resume rirekisho" },
  { section: "work", to: "/work/salary", title: "Take-home pay", sub: "Your salary after insurance and tax, by prefecture.", keywords: "salary tax net pay income calculator" },
  { section: "work", to: "/work/part-time", title: "Part-time pay", sub: "Pay from your hours, with the minimum wage for each prefecture.", keywords: "arubaito baito student hourly minimum wage calculator" },
  { section: "travel", to: "/travel/plan", title: "Plan your trip", sub: "A day-by-day plan with estimated costs.", keywords: "itinerary tokyo kyoto osaka" },
  { section: "travel", to: "/travel/phrases", title: "Travel phrases", sub: "Hear them, or show them to staff.", keywords: "phrase japanese words" },
  { section: "live", to: "/live/address", title: "Address registration checklist", sub: "When to register, where to go and what to bring.", keywords: "city hall move in juminhyo residence card" },
];
