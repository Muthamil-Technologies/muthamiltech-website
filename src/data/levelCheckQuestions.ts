export interface LevelCheckQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

// Real N5-level content, same spirit as JapTalk's own placement check —
// hiragana, katakana, vocabulary, kanji, and basic grammar recognition.
export const levelCheckQuestions: LevelCheckQuestion[] = [
  {
    prompt: "How is あ pronounced?",
    options: ["a", "i", "u", "e"],
    correctIndex: 0,
  },
  {
    prompt: "Which katakana represents \"ka\"?",
    options: ["サ", "カ", "タ", "ナ"],
    correctIndex: 1,
  },
  {
    prompt: "What does 私 mean?",
    options: ["you", "name", "I / me", "school"],
    correctIndex: 2,
  },
  {
    prompt: "What does 学校 mean?",
    options: ["home", "work", "station", "school"],
    correctIndex: 3,
  },
  {
    prompt: "How is 日 read in 今日 (\"today\")?",
    options: ["ひ", "つき", "きょう", "みず"],
    correctIndex: 2,
  },
  {
    prompt: "私 ___ 学生です。 Which particle completes this?",
    options: ["は", "を", "に", "で"],
    correctIndex: 0,
  },
  {
    prompt: "What does 食べます mean?",
    options: ["drink", "eat", "go", "see"],
    correctIndex: 1,
  },
  {
    prompt: "What does the ～たいです ending express?",
    options: ["must do something", "can do something", "want to do something", "already did something"],
    correctIndex: 2,
  },
];

export interface LevelResult {
  label: string;
  blurb: string;
}

export function resultForScore(score: number, total: number): LevelResult {
  const ratio = score / total;
  if (ratio <= 0.25) {
    return {
      label: "Absolute Beginner",
      blurb: "You're just getting started with Japanese — that's exactly where JapTalk begins, from lesson one.",
    };
  }
  if (ratio <= 0.6) {
    return {
      label: "Early N5",
      blurb: "You've picked up some real basics. JapTalk builds speaking confidence directly on top of what you already know.",
    };
  }
  if (ratio < 1) {
    return {
      label: "Solid N5, building toward N4",
      blurb: "You have a strong N5 foundation. JapTalk will keep pushing your speaking further, sentence by sentence.",
    };
  }
  return {
    label: "Strong N5 foundation",
    blurb: "You're ready to speak with real sentences. JapTalk turns that foundation into real conversation confidence.",
  };
}
