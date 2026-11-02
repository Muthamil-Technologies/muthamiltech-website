// The six JapanOne sections, in menu order (Shop last). Each page, tile and menu entry reads
// from here so the order, colours and one-line descriptions stay the same everywhere.
export type SectionId = "learn" | "study" | "work" | "travel" | "live" | "shop";

export type Section = {
  id: SectionId;
  label: string;
  line: string;
  /** Icon tile background and icon stroke. */
  tint: string;
  ink: string;
  /** Small uppercase label colour on white (passes 4.5:1). */
  tag: string;
};

export const SECTIONS: Section[] = [
  { id: "learn", label: "Learn", line: "Speaking practice, JLPT N5–N3, daily kanji", tint: "#e3ecfb", ink: "#1f4fa8", tag: "#1f4fa8" },
  { id: "study", label: "Study", line: "Schools, scholarships, student visa", tint: "#ece6fb", ink: "#5b3fb0", tag: "#4a2f99" },
  { id: "work", label: "Work", line: "Visa paths, Japanese CV, your rights", tint: "#dff3ea", ink: "#17714c", tag: "#17714c" },
  { id: "travel", label: "Travel", line: "Trip planner, travel phrases", tint: "#fdeadb", ink: "#b4561a", tag: "#9a4612" },
  { id: "live", label: "Live", line: "City hall, insurance, tax, housing", tint: "#dcf0f5", ink: "#11697d", tag: "#11697d" },
  { id: "shop", label: "Shop", line: "Made in Japan, from local sellers", tint: "#fbe3e6", ink: "#b42a3a", tag: "#9e2232" },
];

export const sectionById = (id: string) => SECTIONS.find((s) => s.id === id);

/** The JapanOne app on the App Store (the former JapTalk listing, same Apple ID). */
export const APP_STORE_URL = "https://apps.apple.com/app/id6807840880";

/** First Sunday of December 2026, 9:00 JST. */
export const JLPT_DATE = new Date("2026-12-06T09:00:00+09:00");
