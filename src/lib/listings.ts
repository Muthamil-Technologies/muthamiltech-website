import { supabase } from "./supabase";

// Types and helpers for the shared listing platform (muthamil-platform/supabase/migrations/0002).
export type ProviderKind = "employer" | "tour_agency" | "seller";
export type Product = "job" | "tour" | "item";
export type ListingStatus = "draft" | "submitted" | "published" | "rejected" | "expired" | "removed";

export type Provider = {
  id: string;
  kind: ProviderKind;
  name: string;
  description: string | null;
  country: string;
  prefecture: string | null;
  website: string | null;
  contact_email: string | null;
  phone: string | null;
  corporate_number: string | null;
  status: "pending" | "active" | "suspended";
  verified_at: string | null;
  created_at: string;
};

export type Listing = {
  id: string;
  provider_id: string;
  product: Product;
  title: string;
  summary: string | null;
  default_lang: string;
  languages: string[];
  area: string | null;
  external_url: string | null;
  status: ListingStatus;
  submitted_at: string | null;
  published_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Details = Record<string, unknown>;

export const PRODUCT_OF: Record<ProviderKind, Product> = { employer: "job", tour_agency: "tour", seller: "item" };
export const DETAIL_TABLE: Record<Product, string> = { job: "job_details", tour: "tour_details", item: "item_details" };

export const KIND_LABEL: Record<ProviderKind, string> = {
  employer: "Employer / recruiter",
  tour_agency: "Tour agency",
  seller: "Seller",
};
export const PRODUCT_LABEL: Record<Product, string> = { job: "Job", tour: "Tour package", item: "Product" };

export const STATUS_LABEL: Record<ListingStatus, string> = {
  draft: "Draft",
  submitted: "In review",
  published: "Published",
  rejected: "Changes needed",
  expired: "Expired",
  removed: "Removed",
};
export const STATUS_TONE: Record<ListingStatus, string> = {
  draft: "bg-line text-ink-soft",
  submitted: "bg-amber-100 text-amber-800",
  published: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  expired: "bg-line text-ink-faint",
  removed: "bg-line text-ink-faint",
};

export const LANGS: [string, string][] = [
  ["en", "English"],
  ["ja", "日本語"],
  ["vi", "Tiếng Việt"],
  ["ne", "नेपाली"],
  ["id", "Bahasa Indonesia"],
  ["my", "မြန်မာ"],
  ["tl", "Tagalog"],
  ["zh", "中文"],
  ["ko", "한국어"],
  ["pt", "Português"],
];

/** Field definitions for each product's detail form (stored in its *_details table). */
export type Field = {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "multi" | "bool" | "dates" | "list";
  options?: [string, string][];
  required?: boolean;
  hint?: string;
};

export const DETAIL_FIELDS: Record<Product, Field[]> = {
  job: [
    {
      key: "job_type",
      label: "Type of work",
      type: "select",
      required: true,
      options: [
        ["caregiving", "Caregiving (介護)"],
        ["construction", "Construction"],
        ["food_service", "Restaurant / food service"],
        ["food_manufacturing", "Food manufacturing"],
        ["manufacturing", "Factory / manufacturing"],
        ["agriculture", "Agriculture"],
        ["fishery", "Fishery"],
        ["hotel", "Hotel / accommodation"],
        ["cleaning", "Building cleaning"],
        ["logistics", "Logistics / warehouse"],
        ["retail", "Retail / convenience store"],
        ["other", "Other"],
      ],
    },
    {
      key: "employment_type",
      label: "Employment type",
      type: "select",
      required: true,
      options: [
        ["full_time", "Full-time"],
        ["part_time", "Part-time"],
        ["contract", "Contract"],
        ["temporary", "Temporary"],
      ],
    },
    { key: "salary_min", label: "Pay from (¥)", type: "number", required: true, hint: "Before tax. Must be at least the minimum wage for the prefecture." },
    { key: "salary_max", label: "Pay up to (¥)", type: "number" },
    {
      key: "salary_unit",
      label: "Per",
      type: "select",
      required: true,
      options: [
        ["hour", "hour"],
        ["day", "day"],
        ["month", "month"],
        ["year", "year"],
      ],
    },
    {
      key: "visa_types",
      label: "Who can apply (visa)",
      type: "multi",
      options: [
        ["ssw1", "Specified Skilled Worker (i)"],
        ["ssw2", "Specified Skilled Worker (ii)"],
        ["student", "Student (part-time)"],
        ["dependent", "Dependent"],
        ["spouse", "Spouse / long-term resident"],
        ["pr", "Permanent resident"],
        ["working_holiday", "Working holiday"],
        ["any", "Any valid work status"],
      ],
    },
    {
      key: "jlpt_required",
      label: "Japanese level needed",
      type: "select",
      options: [
        ["none", "None"],
        ["n5", "N5"],
        ["n4", "N4 / JFT-Basic"],
        ["n3", "N3"],
        ["n2", "N2"],
        ["n1", "N1"],
      ],
    },
    { key: "work_hours", label: "Working hours", type: "text", required: true, hint: "e.g. 8:00–17:00, 1 hour break; shifts; usual overtime" },
    { key: "days_off", label: "Days off", type: "text", required: true, hint: "e.g. Sat & Sun, about 105 days a year" },
    { key: "dormitory", label: "Dormitory / housing provided", type: "bool" },
    { key: "transport_paid", label: "Commuting costs paid", type: "bool" },
    {
      key: "apply_method",
      label: "How to apply",
      type: "select",
      required: true,
      options: [
        ["url", "Website / form link"],
        ["email", "Email"],
        ["phone", "Phone"],
      ],
    },
    { key: "apply_target", label: "Application link, email or phone", type: "text", required: true, hint: "Applicants contact you directly." },
  ],
  tour: [
    { key: "duration_days", label: "Duration (days)", type: "number", required: true },
    { key: "price_from_jpy", label: "Price from (¥ per person)", type: "number" },
    { key: "price_note", label: "Price note", type: "text", hint: "e.g. ¥2,000 less for children" },
    { key: "start_dates", label: "Start dates", type: "dates", hint: "Leave empty for 'any day'" },
    { key: "meeting_point", label: "Meeting point", type: "text" },
    { key: "group_size_max", label: "Maximum group size", type: "number" },
    { key: "includes", label: "Included", type: "list", hint: "One per line: guide, lunch, transport…" },
    {
      key: "languages_guided",
      label: "Guide languages",
      type: "multi",
      options: LANGS,
    },
    { key: "booking_url", label: "Booking link (your site)", type: "text", required: true, hint: "Travellers book on your website." },
  ],
  item: [
    { key: "price", label: "Price", type: "number", required: true },
    {
      key: "currency",
      label: "Currency",
      type: "select",
      options: [
        ["JPY", "JPY"],
        ["INR", "INR"],
        ["USD", "USD"],
      ],
    },
    { key: "stock", label: "Stock", type: "number" },
    { key: "ships_to", label: "Ships to (country codes)", type: "list", hint: "One per line, e.g. JP, IN, US" },
    { key: "shipping_note", label: "Shipping note", type: "text" },
    { key: "category", label: "Category", type: "text" },
    { key: "brand", label: "Brand", type: "text" },
    { key: "size", label: "Size", type: "text" },
    { key: "color", label: "Colour", type: "text" },
    { key: "contact_url", label: "Where to buy (shop link or WhatsApp)", type: "text", required: true },
  ],
};

export function db() {
  if (!supabase) throw new Error("Accounts aren't configured on this site.");
  return supabase;
}

export function mediaUrl(path: string) {
  return db().storage.from("listing-media").getPublicUrl(path).data.publicUrl;
}

/** PostgREST returns a one-to-one embed as an object or a 1-item array depending on version. */
export function one<T>(v: T | T[] | null | undefined): T | null {
  if (!v) return null;
  return Array.isArray(v) ? (v[0] ?? null) : v;
}
