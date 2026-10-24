import type { ProviderKind } from "../../lib/listings";

/** One partner programme per app. JapMart sellers stay hidden while JapMart is on hold. */
export type PartnerProgram = {
  slug: "work" | "tour";
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
    slug: "work",
    kind: "employer",
    app: "JapWork",
    who: "Employers & registered support organisations",
    cardBody: "Post jobs for foreign workers in Japan: caregiving, construction, food, factory, hotel and more.",
    headline: "Reach foreign workers looking for jobs in Japan",
    intro:
      "JapWork helps people preparing for skilled and hands-on jobs in Japan: their visa route, Japanese CV, interview practice and rights at work. Post your jobs and reach them there.",
    steps: [
      ["Register your company.", "We verify it with your corporate number (法人番号) before anything goes live."],
      ["Post a job", "with clear pay, hours, days off and who can apply. Our team checks every listing."],
      ["Workers contact you directly", "by your link, email or phone. We don't take part in hiring and never charge workers."],
    ],
    note: "Jobs are shown in the JapWork app, in the language you write them in. Listing is free during our launch period.",
    registrationLabel: "Corporate number (法人番号)",
    registrationHint: "We verify each company before its jobs go live. The corporate number speeds this up.",
  },
  {
    slug: "tour",
    kind: "tour_agency",
    app: "JapTour",
    who: "Tour agencies & local guides",
    cardBody: "List your Japan tours and day trips for travellers planning their trip in JapTour.",
    headline: "Reach travellers planning their Japan trip",
    intro:
      "JapTour builds day-by-day itineraries for visitors to Japan. List your tours and experiences so travellers find them while they plan.",
    steps: [
      ["Register your agency.", "We check your travel agency registration (旅行業登録) or guide licence before anything goes live."],
      ["List a tour", "with duration, price, meeting point, what's included and guide languages. Our team checks every listing."],
      ["Travellers book on your website.", "JapTour links to your booking page; we don't take bookings or payments."],
    ],
    note: "Tours are shown in the JapTour app, in the language you write them in. Listing is free during our launch period.",
    registrationLabel: "Travel agency registration no. (旅行業登録番号)",
    registrationHint: "We verify each agency before its tours go live. The registration number speeds this up.",
  },
];

export const programFor = (kind: ProviderKind) => PROGRAMS.find((p) => p.kind === kind);
