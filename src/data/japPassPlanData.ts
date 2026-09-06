// Mirrors the real logic in japtest-mobile's StudyPlanEngine and content
// counts, so this preview is genuinely accurate — not a fabricated demo.
// If the app's content grows (more kanji lessons, N4, etc.), update the
// constants below to match.

export const TOTAL_KANA = 208; // full hiragana + katakana, all variants
export const TOTAL_KANJI = 50; // 5 curated N5 lessons
export const TOTAL_VOCABULARY = 121; // adapted from JapTalk's vetted N5 seed data
export const TOTAL_GRAMMAR = 18; // N5 patterns

const NEW_LEARN_SECONDS_PER_ITEM = 25;
const GRAMMAR_SECONDS_PER_ITEM = 90;
const GRAMMAR_BUDGET_FRACTION = 0.2;

export interface DayOnePreview {
  kana: number;
  kanji: number;
  vocabulary: number;
  grammar: number;
}

/**
 * Reproduces StudyPlanEngine.generateMission's actual day-one behavior: no
 * reviews are due yet, so the review time budget rolls entirely into new
 * learning, and new items are queued kana-first (kana is lesson 0), then
 * kanji, then vocabulary — the same order a real first-time JapPass user
 * would see.
 */
export function computeDayOnePreview(dailyMinutes: number): DayOnePreview {
  const grammarMinutes = dailyMinutes * GRAMMAR_BUDGET_FRACTION;
  const newLearningMinutes = dailyMinutes - grammarMinutes;

  let remaining = Math.floor((newLearningMinutes * 60) / NEW_LEARN_SECONDS_PER_ITEM);
  const grammar = Math.min(TOTAL_GRAMMAR, Math.floor((grammarMinutes * 60) / GRAMMAR_SECONDS_PER_ITEM));

  const kana = Math.min(TOTAL_KANA, remaining);
  remaining -= kana;
  const kanji = Math.min(TOTAL_KANJI, remaining);
  remaining -= kanji;
  const vocabulary = Math.min(TOTAL_VOCABULARY, remaining);

  return { kana, kanji, vocabulary, grammar };
}

// The JLPT is held twice a year worldwide, on the first Sunday of July and
// the first Sunday of December — the same real, computed (not hardcoded)
// dates used in the app's own onboarding.
function firstSundayOf(year: number, month: number): Date {
  const date = new Date(year, month - 1, 1);
  while (date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

export function upcomingJlptDates(count = 4, from: Date = new Date()): Date[] {
  const candidates: Date[] = [];
  let year = from.getFullYear();
  while (candidates.length < count + 2) {
    candidates.push(firstSundayOf(year, 7), firstSundayOf(year, 12));
    year++;
  }
  candidates.sort((a, b) => a.getTime() - b.getTime());
  return candidates.filter((d) => d.getTime() > from.getTime()).slice(0, count);
}

export function daysBetween(from: Date, to: Date): number {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}
