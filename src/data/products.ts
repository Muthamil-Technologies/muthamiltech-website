export type ProductStatus = "live" | "launching-soon" | "in-development";

export const statusLabels: Record<ProductStatus, string> = {
  live: "On the App Store",
  "launching-soon": "Launching soon",
  "in-development": "In development",
};

export interface Product {
  /** Stable id, also used for the in-page anchor (#slug) and as a React key. */
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  status: ProductStatus;
  /** Only real (shipped) or genuinely planned features — never invented. */
  features: string[];
  /** Where this product sits in the "Learn -> Prepare -> Work -> Explore" journey, if it fits one. */
  journeyStep?: string;
  url: string;
}

// Add future products to this array — every ecosystem view (grid, network
// visualization, journey diagram, footer links) is generated from it, so
// nothing needs to be hard-coded elsewhere for a 5th, 6th, etc. product.
export const products: Product[] = [
  {
    slug: "japtalk",
    name: "JapTalk",
    category: "Japanese Learning & Communication",
    description:
      "Practice Japanese, improve everyday communication, and build confidence using Japanese in real situations.",
    longDescription:
      "JapTalk is a speaking-first Japanese learning app. Every lesson opens with a real sentence to speak — typed or spoken aloud — instead of a flashcard deck, with grammar and vocabulary available on demand but never gating the practice. Content is organized into five goal-based Learning Paths: Beginner Foundations, Everyday Japan, Everyday Conversation, Business Japanese, and Interview Japanese.",
    status: "live",
    features: [
      "Speaking-first lessons, typed or spoken",
      "Five goal-based Learning Paths",
      "Fully offline, no account required",
    ],
    journeyStep: "Learn",
    url: "/#japtalk",
  },
  {
    slug: "japtutor",
    name: "JapTutor",
    category: "JLPT Preparation",
    description:
      "Tell it your JLPT level and exam date — it builds your daily study plan and keeps you on track.",
    longDescription:
      "Where JapTalk is about real-world speaking, JapTutor is built around the JLPT itself: tell it your level, exam date and daily study time, and it builds a day-by-day plan with lessons, flashcards and mock exams. It covers N5 to N3.",
    status: "launching-soon",
    features: [
      "Personalized daily study plan based on your exam date",
      "Spaced-repetition review for kanji, vocabulary and grammar",
      "Mock exams and on-track / at-risk progress signals",
    ],
    journeyStep: "Prepare",
    url: "/#japtutor",
  },
  {
    slug: "japwork",
    name: "JapWork",
    category: "Work in Japan",
    description:
      "For foreign workers in skilled and hands-on jobs: find your route into work in Japan, step by step.",
    longDescription:
      "JapWork helps people working towards jobs like caregiving, construction, food, factory and hotel work under the Specified Skilled Worker visa. It shows which routes fit your situation and the tests you need, writes your Japanese CV (履歴書), lets you practise interviews with audio, and explains your pay and rights at work.",
    status: "in-development",
    features: [
      "Pathway finder for the 16 Specified Skilled Worker fields",
      "Japanese CV (履歴書) as a PDF, from simple English answers",
      "Interview practice with audio, and a pay and rights checker",
    ],
    journeyStep: "Work",
    url: "/#japwork",
  },
  {
    slug: "japtour",
    name: "JapTour",
    category: "Japan Travel",
    description:
      "Plan better trips around Japan with day-by-day itineraries and travel tools that work offline.",
    longDescription:
      "JapTour builds a trip itinerary that fits how you want to travel — days, places, pace and interests — and keeps it on your phone, offline, with maps, phrases, food and dietary cards, a budget tracker, and ski areas like Niseko and Hakuba. No account needed.",
    status: "launching-soon",
    features: [
      "Day-by-day itineraries by trip length and interests",
      "Works offline: maps hand-off, phrases, dietary cards",
      "Budget estimates and spending tracker",
    ],
    journeyStep: "Explore",
    url: "/#japtour",
  },
];

export const contact = {
  email: "hello@muthamiltech.com",
  instagram: "https://www.instagram.com/spk_in_japan/",
};
