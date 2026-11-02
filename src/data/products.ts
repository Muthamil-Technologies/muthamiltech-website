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
    category: "Your gateway to Japan",
    description:
      "Learn Japanese, then study, work, travel and live in Japan, all in one app and website.",
    longDescription:
      "JapanOne brings everything for people coming to Japan into one app and website. Learn: speaking practice in real situations, JLPT N5–N3 lessons with a plan to your exam, and a daily kanji quiz. Study: school types, a study path planner, scholarships, costs and the student visa. Work: the residence statuses that allow work, the Specified Skilled Worker guide, a pathway finder and a Japanese CV builder. Travel: a trip planner and travel phrases with audio. Live: address registration, health insurance, pension and where to get help. Facts come from official sources, with the date we checked them.",
    status: "live",
    features: [
      "Learn: speaking practice, JLPT N5–N3, daily kanji",
      "Study and Work: guides, planners and a Japanese CV builder",
      "Travel and Live: trip planner, phrases, first-weeks checklist",
    ],
    journeyStep: "Learn",
    url: "https://japanone.app",
  },
];

export const contact = {
  email: "hello@muthamiltech.com",
  instagram: "https://www.instagram.com/japanone_app/",
};
