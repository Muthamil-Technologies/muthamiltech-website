export type Exercise = {
  id: number;
  prompt: string;
  context: string | null;
  answer: string;
  accepted: string[];
  tokens: [string, string | null][];
};
export type Lesson = { id: number; title: string; mission: string; description: string; level: string; exercises: Exercise[] };
export type Level = { id: string; name: string; jlpt: string | null; order: number };
export type JapTalkContent = { levels: Level[]; lessons: Lesson[] };
export type LessonProgress = { done: number[]; completed?: boolean };

let cache: Promise<JapTalkContent> | null = null;
export function loadJapTalk() {
  cache ??= fetch("/learn/japtalk.json").then((r) => r.json());
  return cache;
}

/** Katakana → hiragana, full-width → half-width, no spaces or punctuation. */
export function normalize(s: string) {
  return s
    .normalize("NFKC")
    .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .replace(/[\s。、，,.！!？?「」『』・〜~ー-]/g, "")
    .toLowerCase();
}

/** The sentence written all in kana, for people who type without kanji. */
export function kanaOf(ex: Exercise) {
  return ex.tokens.map(([surface, reading]) => reading ?? surface).join("");
}

export function isCorrect(ex: Exercise, input: string) {
  const said = normalize(input);
  if (!said) return false;
  const targets = [...ex.accepted, ex.answer].map(normalize);
  targets.push(normalize(kanaOf(ex)));
  return targets.includes(said);
}
