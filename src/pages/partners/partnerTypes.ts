import type { ProviderKind } from "../../lib/listings";
import type { SectionId } from "../../lib/joSections";

/** One partner programme per JapanOne section that takes listings (Study, Work, Travel, Shop). */
export type PartnerProgram = {
  slug: "study" | "work" | "travel" | "shop";
  section: SectionId;
  /** Other section pages that also invite this kind of partner. */
  alsoOn?: SectionId[];
  kind: ProviderKind;
  app: string;
  who: string;
  cardBody: string;
  headline: string;
  intro: string;
  steps: [string, string][];
  note: string;
  registrationLabel: string;
  registrationHint: string;
};

export const PROGRAMS: PartnerProgram[] = [
  {
    slug: "study",
    section: "study",
    alsoOn: ["learn"],
    kind: "school",
    app: "JapanOne Study",
    who: "Language schools & educational institutes",
    cardBody: "Introduce your Japanese courses and programmes to learners who want to study in Japan.",
    headline: "Reach learners who want to study in Japan",
    intro:
      "JapanOne helps people learn Japanese and plan their studies in Japan: JLPT practice, school types, scholarships and student visa rules. List your courses so they find you while they plan.",
    steps: [
      ["Register your school.", "We check it against the official lists (MEXT accreditation or the Immigration list of approved schools) before anything goes live."],
      ["List a course", "with length, intakes, tuition and the Japanese level needed. Our team checks every listing."],
      ["Students apply on your website.", "JapanOne links to your application page; we don't take applications or fees."],
    ],
    note: "Courses are shown in JapanOne (app and website), in the language you write them in. There is no charge to list during our launch period.",
    registrationLabel: "Corporate number (法人番号) or school code",
    registrationHint: "We verify each school before its courses go live. Your accreditation or approval details speed this up.",
  },
  {
    slug: "work",
    section: "work",
    kind: "employer",
    app: "JapanOne Work",
    who: "Employers & registered support organisations",
    cardBody: "Post jobs for foreign workers in Japan: caregiving, construction, food, factory, hotel and more.",
    headline: "Reach foreign workers looking for jobs in Japan",
    intro:
      "JapanOne helps people preparing for skilled and hands-on jobs in Japan: their visa route, Japanese CV, interview practice and rights at work. Post your jobs and reach them there.",
    steps: [
      ["Register your company.", "We verify it with your corporate number (法人番号) before anything goes live."],
      ["Post a job", "with clear pay, hours, days off and who can apply. Our team checks every listing."],
      ["Workers contact you directly", "by your link, email or phone. We don't take part in hiring and never charge workers."],
    ],
    note: "Jobs are shown in JapanOne (app and website), in the language you write them in. There is no charge to list during our launch period.",
    registrationLabel: "Corporate number (法人番号)",
    registrationHint: "We verify each company before its jobs go live. The corporate number speeds this up.",
  },
  {
    slug: "travel",
    section: "travel",
    kind: "tour_agency",
    app: "JapanOne Travel",
    who: "Tour agencies & local guides",
    cardBody: "List your Japan tours and day trips for travellers planning their trip in JapanOne.",
    headline: "Reach travellers planning their Japan trip",
    intro:
      "JapanOne builds day-by-day itineraries for visitors to Japan. List your tours and experiences so travellers find them while they plan.",
    steps: [
      ["Register your agency.", "We check your travel agency registration (旅行業登録) or guide licence before anything goes live."],
      ["List a tour", "with duration, price, meeting point, what's included and guide languages. Our team checks every listing."],
      ["Travellers book on your website.", "JapanOne links to your booking page; we don't take bookings or payments."],
    ],
    note: "Tours are shown in JapanOne (app and website), in the language you write them in. There is no charge to list during our launch period.",
    registrationLabel: "Travel agency registration no. (旅行業登録番号)",
    registrationHint: "We verify each agency before its tours go live. The registration number speeds this up.",
  },
  {
    slug: "shop",
    section: "shop",
    kind: "seller",
    app: "JapanOne Shop",
    who: "Shop owners & makers in Japan",
    cardBody: "Sell Made-in-Japan products to people around the world who love Japan.",
    headline: "Sell Made in Japan to people who love Japan",
    intro:
      "JapanOne Shop will show products from small Japanese shops and makers to learners, students and travellers around the world. Register now and your shop is ready when Shop opens.",
    steps: [
      ["Register your shop.", "Tell us who you are and what you sell. We check every shop before it goes live."],
      ["Add your products", "with photos, price, where you ship and how to buy. Our team checks every listing."],
      ["Buyers order from you directly", "through your own shop page or contact link. We don't take orders or payments."],
    ],
    note: "Shop opens in JapanOne after our launch. There is no charge to register.",
    registrationLabel: "Corporate number (法人番号), if you have one",
    registrationHint: "Sole traders are welcome. We may ask for your business details before your products go live.",
  },
];

export const programFor = (kind: ProviderKind) => PROGRAMS.find((p) => p.kind === kind);
