// JapTour's offline itinerary generator for the web. A port of DeterministicItineraryGenerator
// (japtour-mobile/lib/features/itinerary/generator/itinerary_generator.dart) over the same
// destinations.json: route ordering, day allocation, preference-biased activities and estimated
// cost ranges. Change both together; parity tests in scripts/tests/itinerary.test.mts.

type Pair = [number, number];

export type Activity = {
  text: string;
  tags: string[];
  place?: string;
  access?: string;
  lat?: number;
  lng?: number;
  indoor?: boolean;
  closed_days?: number[];
  closed_note?: string;
};

export type Destination = {
  key: string;
  display_name: string;
  region: string;
  corridor_km: number;
  access: "rail" | "flight";
  summary: string;
  best_season: string;
  getting_around: string;
  tips: string[];
  morning: Activity[];
  afternoon: Activity[];
  evening: Activity[];
  food: string[];
};

type Route = { from: string; to: string; mode: string; duration: string; fare: Pair };
type Tier = { accommodation: Pair; food: Pair; activities: Pair; local_transport: Pair };
export type Catalog = { destinations: Record<string, Destination>; routes: Route[]; budget_tiers: Record<string, Tier> };

export type BudgetTier = "low" | "medium" | "high" | "luxury";
export const BUDGET_TIERS: [BudgetTier, string, string][] = [
  ["low", "Low", "Budget-conscious travel."],
  ["medium", "Medium", "Comfortable travel with a balance between cost and experience."],
  ["high", "High", "Premium hotels, restaurants and experiences."],
  ["luxury", "Luxury", "Luxury hotels, premium experiences, private transportation and high-end dining."],
];

export const DESTINATION_OPTIONS = ["Tokyo", "Kyoto", "Osaka", "Mount Fuji", "Hakone", "Hiroshima", "Nara", "Sapporo", "Niseko", "Hakuba", "Fukuoka", "Okinawa"];

export const PREFERENCE_OPTIONS: [string, string, string][] = [
  ["🏯", "Culture & History", "culture"],
  ["🍜", "Food", "food"],
  ["🛍️", "Shopping", "shopping"],
  ["🌸", "Nature", "nature"],
  ["🗻", "Scenic Places", "scenic"],
  ["📸", "Photography", "photography"],
  ["👨‍👩‍👧", "Family", "family"],
  ["🌃", "Nightlife", "nightlife"],
  ["♨️", "Onsen", "onsen"],
  ["⛷️", "Snow & Ski", "snow"],
  ["🚄", "Technology", "technology"],
  ["🎌", "Traditional Japan", "history"],
  ["🎨", "Anime & Manga", "anime"],
];

export type TripRequest = {
  destinations: string[];
  days: number;
  adults: number;
  children: number;
  infants: number;
  budgetTier: BudgetTier;
  customBudgetJpy?: number | null;
  preferences: string[];
};

export type ItineraryDay = {
  dayNumber: number;
  location: string;
  title: string;
  morning: string[];
  afternoon: string[];
  evening: string[];
  foodSuggestions: string[];
  transportation: string | null;
  estimatedCost: Pair;
};

export type Itinerary = {
  title: string;
  destinations: string[];
  travelersSummary: string;
  budgetTier: BudgetTier;
  days: ItineraryDay[];
  costSummary: { accommodation: Pair; transportation: Pair; food: Pair; activities: Pair; other: Pair; total: Pair };
};

/** Normalises a wizard choice ("Mount Fuji") or key ("mount_fuji"). */
const keyOf = (name: string) => name.trim().toLowerCase().replace(/[\s-]+/g, "_");
const add = (a: Pair, b: Pair): Pair => [a[0] + b[0], a[1] + b[1]];
const scalePair = (p: Pair, weight: number, scale: number): Pair => [Math.trunc(p[0] * weight * scale), Math.trunc(p[1] * weight * scale)];
const round100 = (v: number) => Math.round(v / 100) * 100;

/** Known destinations, de-duplicated, in north-to-south travel order. */
export function orderDestinations(catalog: Catalog, names: string[]): Destination[] {
  const seen = new Set<string>();
  const out: Destination[] = [];
  for (const n of names) {
    const key = keyOf(n);
    const d = catalog.destinations[key];
    if (d && !seen.has(key)) {
      seen.add(key);
      out.push({ ...d, key });
    }
  }
  return out.sort((a, b) => a.corridor_km - b.corridor_km);
}

/** Spreads days across destinations, earlier stops getting any extra day. */
export function allocateDays<T>(ordered: T[], days: number): T[] {
  if (ordered.length === 0 || days <= 0) return [];
  if (days <= ordered.length) return ordered.slice(0, days);
  const base = Math.floor(days / ordered.length), extra = days % ordered.length;
  return ordered.flatMap((d, i) => Array(base + (i < extra ? 1 : 0)).fill(d));
}

/** Children count as half for food, rooms and fares; infants are free. */
export const travelerWeight = (adults: number, children: number) => adults + children * 0.5;

export function travelerSummary(adults: number, children: number, infants: number) {
  const parts = [`${adults} Adult${adults === 1 ? "" : "s"}`];
  if (children > 0) parts.push(`${children} ${children === 1 ? "Child" : "Children"}`);
  if (infants > 0) parts.push(`${infants} Infant${infants === 1 ? "" : "s"}`);
  return parts.join(" + ");
}

/** Description and per-adult fare between two stops: a curated route when known, else an estimate. */
export function transportLeg(catalog: Catalog, from: Destination, to: Destination): [string, Pair] {
  const known = catalog.routes.find((r) => (r.from === from.key && r.to === to.key) || (r.from === to.key && r.to === from.key));
  if (known) return [`${from.display_name} → ${to.display_name}: ${known.mode}, ${known.duration}`, known.fare];
  const distance = Math.max(30, Math.abs(to.corridor_km - from.corridor_km));
  let mode: string, hours: number, fare: Pair;
  if (from.access === "flight" || to.access === "flight") {
    mode = "Domestic flight (plus airport transfers)";
    hours = distance / 700 + 0.75;
    fare = [Math.max(7000, round100(distance * 10)), Math.max(20000, round100(distance * 25))];
  } else if (distance > 150) {
    mode = "Shinkansen (bullet train)";
    hours = distance / 180;
    fare = [round100(distance * 26 * 0.9), round100(distance * 26 * 1.15)];
  } else {
    mode = "Local or limited express train";
    hours = distance / 45;
    fare = [Math.max(500, round100(distance * 16 * 0.9)), Math.max(600, round100(distance * 16 * 1.15))];
  }
  const minutes = Math.round((hours * 60) / 5) * 5;
  const h = Math.floor(minutes / 60), m = minutes % 60;
  const duration = h === 0 ? `approx. ${m}min` : m === 0 ? `approx. ${h}h` : `approx. ${h}h ${m}min`;
  return [`${from.display_name} → ${to.display_name}: ${mode}, ${duration}`, fare];
}

/** Activities matching any preference first, keeping curated order. */
function byPreference(pool: Activity[], prefs: string[]) {
  if (prefs.length === 0) return pool;
  const p = new Set(prefs.map((e) => e.toLowerCase()));
  const hit = (a: Activity) => a.tags.some((t) => p.has(t));
  return [...pool.filter(hit), ...pool.filter((a) => !hit(a))];
}

/** A different window of the pool for each day in the same city. */
function sliceText(pool: string[], dayIndex: number, count: number) {
  if (pool.length === 0) return [];
  const n = pool.length, start = (dayIndex * count) % n;
  return Array.from({ length: Math.min(count, n) }, (_, i) => pool[(start + i) % n]);
}

export function generate(catalog: Catalog, req: TripRequest): Itinerary {
  const ordered = orderDestinations(catalog, req.destinations);
  const dayPlan = allocateDays(ordered, req.days);
  const weight = travelerWeight(req.adults, req.children);
  const tier = catalog.budget_tiers[req.budgetTier] ?? catalog.budget_tiers.medium;

  let scale = 1;
  if (req.customBudgetJpy != null) {
    const t = catalog.budget_tiers.medium;
    const mid = (p: Pair) => (p[0] + p[1]) / 2;
    const expected = (mid(t.accommodation) + mid(t.food) + mid(t.activities) + mid(t.local_transport)) * weight * dayPlan.length;
    if (expected > 0) scale = Math.min(3, Math.max(0.4, req.customBudgetJpy / expected));
  }

  const days: ItineraryDay[] = [];
  let acc: Pair = [0, 0], food: Pair = [0, 0], act: Pair = [0, 0], transport: Pair = [0, 0];
  let prev: string | null = null;
  const dayIndexInCity: Record<string, number> = {};

  dayPlan.forEach((dest, i) => {
    const idx = dayIndexInCity[dest.key] ?? 0;
    dayIndexInCity[dest.key] = idx + 1;
    let note: string | null = null;
    let dayTransport: Pair;
    if (prev !== null && prev !== dest.key) {
      const leg = transportLeg(catalog, { ...catalog.destinations[prev], key: prev }, dest);
      note = leg[0];
      dayTransport = scalePair(leg[1], weight, scale);
    } else {
      dayTransport = scalePair(tier.local_transport, weight, scale);
    }
    prev = dest.key;
    const dayAcc = scalePair(tier.accommodation, weight, scale);
    const dayFood = scalePair(tier.food, weight, scale);
    const dayAct = scalePair(tier.activities, weight, scale);
    acc = add(acc, dayAcc);
    food = add(food, dayFood);
    act = add(act, dayAct);
    transport = add(transport, dayTransport);
    const texts = (pool: Activity[]) => byPreference(pool, req.preferences).map((a) => a.text);
    days.push({
      dayNumber: i + 1,
      location: dest.display_name,
      title: i === 0 ? `${dest.display_name} Arrival` : idx === 0 ? `Exploring ${dest.display_name}` : `More of ${dest.display_name}`,
      morning: sliceText(texts(dest.morning), idx, 2),
      afternoon: sliceText(texts(dest.afternoon), idx, 2),
      evening: sliceText(texts(dest.evening), idx, 2),
      foodSuggestions: sliceText(dest.food, idx, 2),
      transportation: note,
      estimatedCost: add(add(dayAcc, dayFood), add(dayAct, dayTransport)),
    });
  });

  const subtotal = add(add(acc, food), add(act, transport));
  const other: Pair = [Math.trunc(subtotal[0] * 0.05), Math.trunc(subtotal[1] * 0.05)];
  return {
    title: `${dayPlan.length}-Day Japan Trip`,
    // Only stops that got days: a short trip may not reach every selected destination.
    destinations: ordered.filter((d) => dayPlan.includes(d)).map((d) => d.display_name),
    travelersSummary: travelerSummary(req.adults, req.children, req.infants),
    budgetTier: req.budgetTier,
    days,
    costSummary: { accommodation: acc, transportation: transport, food, activities: act, other, total: add(subtotal, other) },
  };
}

/** The catalog activity for an itinerary line (for maps links and "getting there" notes). */
export function activityIndex(catalog: Catalog): Map<string, Activity> {
  const m = new Map<string, Activity>();
  for (const d of Object.values(catalog.destinations)) for (const a of [...d.morning, ...d.afternoon, ...d.evening]) m.set(a.text, a);
  return m;
}
