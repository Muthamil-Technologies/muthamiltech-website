import guidesJson from "../data/guides.json";
import kanjiJson from "../data/dailyKanji.json";

// Content shared with the social posts (copied in by scripts/sync_content.py).

export type Slide = { kind: "cover" | "fact" | "source"; n?: string; tag?: string; title: string; body: string; note?: string; swipe?: string; style?: string };
export type Guide = { id: string; section: "study" | "work" | "live"; title: string; checked: string; sources: { name: string; url: string }[]; slides: Slide[] };

export const GUIDES = guidesJson as Guide[];
export const guideById = (id: string) => GUIDES.find((g) => g.id === id);

export type KanjiWord = { word: string; reading: string; meaning: string; options: string[]; answer_index: number };
export type KanjiDay = { date: string; level: string; words: KanjiWord[] };

const KANJI = kanjiJson as KanjiDay[];

/** Today's set in Japan time (the same five words as that day's 17:30 video). Outside the
 *  scheduled range it cycles through the sets so the quiz never runs dry. */
export function kanjiForToday(now = new Date()): KanjiDay {
  const jst = new Date(now.getTime() + 9 * 3600_000).toISOString().slice(0, 10);
  const exact = KANJI.find((d) => d.date === jst);
  if (exact) return exact;
  const dayNo = Math.floor(now.getTime() / 86400_000);
  return KANJI[dayNo % KANJI.length];
}

/** "Nov 1, 2026" from "2026-11-01". */
export const formatChecked = (iso: string) =>
  new Date(`${iso}T00:00:00+09:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "Asia/Tokyo" });
