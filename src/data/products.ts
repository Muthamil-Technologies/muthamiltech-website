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
    slug: "japanone",
    name: "JapanOne",
    category: "Japanese Learning & JLPT",
    description:
      "Speak Japanese in real situations and prepare for the JLPT, in one free app.",
    longDescription:
      "JapanOne brings our learning apps together in one place. Speak (formerly JapTalk) is speaking-first: every lesson opens with a real sentence to say or type, in goal-based paths for travel, daily life and work. JLPT (formerly JapTutor) builds a dated study plan to your exam, with N5–N3 lessons, a short JLPT-style test every day and mock exams. Work and Study in Japan sections are being added. Free, offline, with no account.",
    status: "live",
    features: [
      "Speak: speaking-first lessons, typed or spoken",
      "JLPT: a dated N5–N3 plan and a daily test",
      "Work and Study in Japan sections coming",
    ],
    journeyStep: "Learn",
    url: "https://japanone.app",
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
    url: "https://japanone.app/tour/plan",
  },
];

export const contact = {
  email: "hello@muthamiltech.com",
  instagram: "https://www.instagram.com/japanone_app/",
};
