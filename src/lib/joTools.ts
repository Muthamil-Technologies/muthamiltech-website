import type { SectionId } from "./joSections";

// Everything people can DO on japanone.app, by section. Section pages and search read this.
export type Tool = { section: SectionId; to: string; title: string; sub: string; keywords?: string };

export const TOOLS: Tool[] = [
  { section: "learn", to: "/learn/level-check", title: "Check your level", sub: "Find where to start in about 2 minutes.", keywords: "test placement" },
  { section: "learn", to: "/learn/speaking", title: "Speaking lessons", sub: "Real conversations at work and in daily life.", keywords: "speak conversation" },
  { section: "learn", to: "/learn/jlpt", title: "JLPT practice test", sub: "N5 · N4 · N3, with answers explained.", keywords: "jlpt exam n5 n4 n3" },
  { section: "learn", to: "/learn/plan", title: "Your JLPT study plan", sub: "From your exam date and daily time to a plan.", keywords: "jlpt schedule" },
  { section: "work", to: "/work/pathway", title: "Find your path", sub: "3 questions: the visa routes and next steps that fit you.", keywords: "visa job ssw engineer" },
  { section: "work", to: "/work/cv", title: "Japanese CV (履歴書)", sub: "Fill in your details, then print or save as PDF.", keywords: "resume rirekisho" },
  { section: "travel", to: "/travel/plan", title: "Plan your trip", sub: "A day-by-day plan with estimated costs.", keywords: "itinerary tokyo kyoto osaka" },
  { section: "travel", to: "/travel/phrases", title: "Travel phrases", sub: "Hear them, or show them to staff.", keywords: "phrase japanese words" },
];
