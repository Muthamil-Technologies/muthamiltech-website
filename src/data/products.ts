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
    slug: "japtest",
    name: "JapTest",
    category: "JLPT Preparation",
    description:
      "Prepare smarter for the JLPT with focused practice, structured learning, and progress tracking.",
    longDescription:
      "Where JapTalk is about real-world speaking, JapTest is built around the JLPT itself — its actual format, question types, and time pressure — so study time goes toward what the exam asks for, from N5 through N1.",
    status: "in-development",
    features: [
      "JLPT-aligned vocabulary, kanji, and grammar practice",
      "Structured N5 → N1 progression",
      "Progress tracking",
    ],
    journeyStep: "Prepare",
    url: "/#japtest",
  },
  {
    slug: "japjob",
    name: "JapJob",
    category: "Jobs & Careers in Japan",
    description:
      "Discover career opportunities in Japan and make the process of finding the right job simpler.",
    longDescription:
      "JapJob is the practical layer that comes after someone can already speak Japanese and is ready to work there — understanding visa categories, what Japanese hiring actually looks for, and finding roles that sponsor and hire from abroad.",
    status: "in-development",
    features: [
      "Japan job discovery",
      "Foreign-friendly opportunity listings",
      "Japanese-level requirement information",
    ],
    journeyStep: "Work",
    url: "/#japjob",
  },
  {
    slug: "japtour",
    name: "JapTour",
    category: "Japan Travel",
    description:
      "Plan better trips around Japan with smarter itineraries, recommendations, and travel tools.",
    longDescription:
      "JapTour starts with the practical core: building a trip itinerary that actually fits how you want to travel — pace, region, and interests — rather than a generic top-10 list. Guided tours are a natural future direction, but that requires proper licensing, so JapTour begins with planning guidance only.",
    status: "in-development",
    features: [
      "Itinerary planning by trip length and interests",
      "Destination guidance",
    ],
    journeyStep: "Explore",
    url: "/#japtour",
  },
];

export const contact = {
  email: "hello@muthamiltech.com",
  instagram: "https://www.instagram.com/spk_in_japan/",
};
