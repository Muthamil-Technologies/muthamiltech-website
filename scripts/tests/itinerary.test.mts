// Same cases as japtour-mobile/test/generator/itinerary_generator_test.dart, against the web port.
// Run: node --experimental-strip-types scripts/tests/itinerary.test.mts
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { allocateDays, generate, transportLeg, type Catalog, type TripRequest } from "../../src/lib/japtour/generator.ts";

const catalog: Catalog = JSON.parse(readFileSync(new URL("../../public/learn/japtour_destinations.json", import.meta.url), "utf8"));
const req = (p: Partial<TripRequest> = {}): TripRequest => ({ destinations: ["Tokyo"], days: 3, adults: 2, children: 0, infants: 0, budgetTier: "medium", preferences: [], ...p });
const d = (k: string) => ({ ...catalog.destinations[k], key: k });
let n = 0;
const t = (name: string, fn: () => void) => { fn(); n++; console.log("ok -", name); };

t("zig-zag ordering", () => assert.deepEqual(generate(catalog, req({ destinations: ["Osaka", "Tokyo", "Kyoto"], days: 6 })).destinations, ["Tokyo", "Kyoto", "Osaka"]));
t("Sapporo first, Okinawa last", () => assert.deepEqual(generate(catalog, req({ destinations: ["Okinawa", "Kyoto", "Sapporo", "Tokyo"], days: 8 })).destinations, ["Sapporo", "Tokyo", "Kyoto", "Okinawa"]));
t("day count", () => assert.deepEqual(generate(catalog, req({ days: 7 })).days.map((x) => x.dayNumber), [1, 2, 3, 4, 5, 6, 7]));
t("fewer days than stops", () => {
  const r = generate(catalog, req({ destinations: ["Tokyo", "Kyoto", "Osaka"], days: 2 }));
  assert.deepEqual(r.days.map((x) => x.location), ["Tokyo", "Kyoto"]); assert.deepEqual(r.destinations, ["Tokyo", "Kyoto"]);
});
t("extra days to earlier stops", () => assert.deepEqual(allocateDays(["a", "b"], 5), ["a", "a", "a", "b", "b"]));
t("duplicates/unknown ignored", () => assert.deepEqual(generate(catalog, req({ destinations: ["Kyoto", "kyoto", "Atlantis"], days: 2 })).destinations, ["Kyoto"]));
t("transport only on city change", () => {
  const r = generate(catalog, req({ destinations: ["Tokyo", "Kyoto"], days: 4 }));
  assert.equal(r.days[0].transportation, null); assert.deepEqual(r.days.filter((x) => x.transportation).map((x) => x.dayNumber), [3]);
  assert.match(r.days[2].transportation!, /Tokaido Shinkansen/);
});
t("curated routes both ways", () => {
  assert.match(transportLeg(catalog, d("nara"), d("kyoto"))[0], /approx\. 45min/); assert.deepEqual(transportLeg(catalog, d("kyoto"), d("nara"))[1], [700, 1300]);
});
t("flight fallback", () => { const l = transportLeg(catalog, d("sapporo"), d("hiroshima")); assert.match(l[0], /flight/); assert.ok(l[1][0] < l[1][1]); });
t("fares scale with travellers", () => {
  const fare = (a: number, c: number, i: number) => generate(catalog, req({ destinations: ["Tokyo", "Kyoto"], days: 2, adults: a, children: c, infants: i })).costSummary.transportation[0];
  assert.ok(fare(2, 0, 0) > fare(1, 0, 0)); assert.equal(fare(1, 2, 0), fare(2, 0, 0)); assert.equal(fare(1, 0, 1), fare(1, 0, 0));
});
t("tiers", () => { const lo = generate(catalog, req({ budgetTier: "low" })).costSummary.total, lx = generate(catalog, req({ budgetTier: "luxury" })).costSummary.total; assert.ok(lx[0] > lo[0] && lx[1] > lo[1]); });
t("custom budget", () => { const tot = (c: number | null) => generate(catalog, req({ customBudgetJpy: c })).costSummary.total[0]; assert.ok(tot(30000) < tot(null)); assert.ok(tot(900000) > tot(null)); });
t("ranges add up", () => {
  const s = generate(catalog, req({ destinations: ["Tokyo", "Hakone", "Kyoto"], days: 6 })).costSummary;
  for (const c of Object.values(s)) assert.ok(c[0] <= c[1]);
  assert.equal(s.total[0], s.accommodation[0] + s.transportation[0] + s.food[0] + s.activities[0] + s.other[0]);
});
t("preferences pull forward", () => {
  assert.ok(generate(catalog, req({ days: 1, preferences: ["technology"] })).days[0].morning.some((m) => m.includes("teamLab")));
  assert.ok(!generate(catalog, req({ days: 1 })).days[0].morning.some((m) => m.includes("teamLab")));
});
t("different days differ", () => { const r = generate(catalog, req({ days: 2 })); assert.notDeepEqual(r.days[0].morning, r.days[1].morning); });
t("traveller summary", () => assert.equal(generate(catalog, req({ adults: 2, children: 1, days: 1 })).travelersSummary, "2 Adults + 1 Child"));
console.log(`${n} passed`);
