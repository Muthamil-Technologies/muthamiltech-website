import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  activityIndex, BUDGET_TIERS, DESTINATION_OPTIONS, generate, PREFERENCE_OPTIONS,
  type Catalog, type Itinerary, type TripRequest,
} from "../../lib/japtour/generator";

// JapTour's trip planner in the browser: the same rule-based generator as the app, over the same
// curated destinations. The last plan is kept in this browser only.

const KEY = "japtour-trip-v1";
const yen = (n: number) => `¥${n.toLocaleString()}`;
const range = ([lo, hi]: [number, number]) => `${yen(lo)} – ${yen(hi)}`;
const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const DEFAULT: TripRequest = { destinations: ["Tokyo", "Kyoto"], days: 7, adults: 2, children: 0, infants: 0, budgetTier: "medium", preferences: [] };

function loadSaved(): { req: TripRequest; trip: Itinerary | null } {
  try {
    const s = localStorage.getItem(KEY);
    if (s) return JSON.parse(s);
  } catch { /* ignore */ }
  return { req: DEFAULT, trip: null };
}

function Stepper({ label, value, min, onChange }: { label: string; value: number; min: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-2.5">
      <span className="font-medium text-ink">{label}</span>
      <span className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="h-8 w-8 rounded-full border border-line text-ink" aria-label={`Fewer ${label}`}>−</button>
        <span className="w-5 text-center font-semibold text-ink">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(10, value + 1))} className="h-8 w-8 rounded-full border border-line text-ink" aria-label={`More ${label}`}>+</button>
      </span>
    </div>
  );
}

export function TripPlanner() {
  const saved = useMemo(loadSaved, []);
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [req, setReq] = useState<TripRequest>(saved.req);
  const [trip, setTrip] = useState<Itinerary | null>(saved.trip);
  const [custom, setCustom] = useState(saved.req.customBudgetJpy ? String(saved.req.customBudgetJpy) : "");

  useEffect(() => {
    fetch("/learn/japtour_destinations.json").then((r) => r.json()).then(setCatalog);
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ req, trip })); } catch { /* ignore */ }
  }, [req, trip]);

  const acts = useMemo(() => (catalog ? activityIndex(catalog) : new Map()), [catalog]);
  const set = (patch: Partial<TripRequest>) => setReq((r) => ({ ...r, ...patch }));
  const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  function plan() {
    if (!catalog || req.destinations.length === 0) return;
    const c = Number(custom.replace(/[^\d]/g, ""));
    const full = { ...req, customBudgetJpy: c > 0 ? c : null };
    setReq(full);
    setTrip(generate(catalog, full));
    setTimeout(() => document.getElementById("trip")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function Stop({ text }: { text: string }) {
    const a = acts.get(text);
    return (
      <li className="text-ink">
        {text}
        {a?.access && <span className="block text-xs text-ink-faint">{a.access}</span>}
        {a?.place && (
          <a href={mapsUrl(a.place)} target="_blank" rel="noreferrer noopener" className="text-xs font-semibold text-accent">Open in Maps ↗</a>
        )}
      </li>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/" className="text-sm font-semibold text-accent print:hidden">&larr; JapanOne</Link>
      <div className="mt-6 text-xs font-bold tracking-[0.2em] text-accent uppercase print:hidden">JapTour · Trip planner</div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink print:hidden">Plan your Japan trip</h1>
      <p className="mt-2 text-ink-soft print:hidden">Pick places, days, travellers, budget and interests. You get a day-by-day plan with estimated costs.</p>

      <div className="mt-8 grid gap-6 print:hidden">
        <section>
          <h2 className="font-semibold text-ink">Where do you want to go?</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {DESTINATION_OPTIONS.map((d) => (
              <button key={d} onClick={() => set({ destinations: toggle(req.destinations, d) })}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${req.destinations.includes(d) ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink hover:border-ink"}`}>
                {d}
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-ink-faint">The route is put in a sensible travel order for you.</p>
        </section>

        <section>
          <h2 className="font-semibold text-ink">How many days?</h2>
          <div className="mt-2 flex items-center gap-3">
            <input type="range" min={1} max={21} value={req.days} onChange={(e) => set({ days: +e.target.value })} className="flex-1" aria-label="Days" />
            <span className="w-16 text-right font-semibold text-ink">{req.days} {req.days === 1 ? "day" : "days"}</span>
          </div>
        </section>

        <section className="grid gap-2 sm:grid-cols-3">
          <Stepper label="Adults" value={req.adults} min={1} onChange={(v) => set({ adults: v })} />
          <Stepper label="Children" value={req.children} min={0} onChange={(v) => set({ children: v })} />
          <Stepper label="Infants" value={req.infants} min={0} onChange={(v) => set({ infants: v })} />
        </section>

        <section>
          <h2 className="font-semibold text-ink">Budget</h2>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {BUDGET_TIERS.map(([v, label, desc]) => (
              <button key={v} onClick={() => set({ budgetTier: v })}
                className={`rounded-xl border p-3 text-left ${req.budgetTier === v ? "border-ink bg-surface" : "border-line bg-surface hover:border-ink"}`}>
                <span className="block font-semibold text-ink">{label}{req.budgetTier === v && " ✓"}</span>
                <span className="block text-xs text-ink-soft">{desc}</span>
              </button>
            ))}
          </div>
          <label className="mt-3 block text-sm">
            <span className="font-medium text-ink">Or your total budget in yen (optional)</span>
            <input inputMode="numeric" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="e.g. 300000"
              className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-accent sm:w-60" />
          </label>
        </section>

        <section>
          <h2 className="font-semibold text-ink">What do you enjoy?</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {PREFERENCE_OPTIONS.map(([emoji, label, tag]) => (
              <button key={tag} onClick={() => set({ preferences: toggle(req.preferences, tag) })}
                className={`rounded-full border px-3 py-1.5 text-sm ${req.preferences.includes(tag) ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink hover:border-ink"}`}>
                {emoji} {label}
              </button>
            ))}
          </div>
        </section>

        <button onClick={plan} disabled={!catalog || req.destinations.length === 0}
          className="justify-self-start rounded-full bg-ink px-7 py-3.5 font-semibold text-paper hover:bg-accent-deep disabled:opacity-50">
          {trip ? "Plan again" : "Plan my trip"}
        </button>
      </div>

      {trip && (
        <section id="trip" className="mt-12 scroll-mt-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-ink">{trip.title}</h2>
              <p className="text-sm text-ink-soft">{trip.destinations.join(" → ")} · {trip.travelersSummary}</p>
            </div>
            <button onClick={() => window.print()} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink print:hidden">Print / Save PDF</button>
          </div>

          <div className="mt-6 grid gap-4">
            {trip.days.map((d) => (
              <article key={d.dayNumber} className="break-inside-avoid rounded-2xl border border-line bg-surface p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-bold text-ink">Day {d.dayNumber} · {d.title}</h3>
                  <span className="flex-none text-xs text-ink-faint">{range(d.estimatedCost)}</span>
                </div>
                {d.transportation && <p className="mt-2 rounded-lg bg-paper px-3 py-2 text-sm text-ink">🚄 {d.transportation}</p>}
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {([["Morning", d.morning], ["Afternoon", d.afternoon], ["Evening", d.evening]] as const).map(([label, list]) => (
                    <div key={label}>
                      <div className="text-xs font-bold tracking-wide text-ink-faint uppercase">{label}</div>
                      <ul className="mt-1 grid gap-2 text-sm">{list.map((x) => <Stop key={x} text={x} />)}</ul>
                    </div>
                  ))}
                </div>
                {d.foodSuggestions.length > 0 && <p className="mt-3 text-sm text-ink-soft">🍜 Try: {d.foodSuggestions.join(" · ")}</p>}
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
            <h3 className="font-bold text-ink">Estimated costs (whole group)</h3>
            <dl className="mt-3 grid gap-1.5 text-sm">
              {([["Accommodation", trip.costSummary.accommodation], ["Transport", trip.costSummary.transportation], ["Food", trip.costSummary.food], ["Activities", trip.costSummary.activities], ["Other", trip.costSummary.other]] as const).map(([k, v]) => (
                <div key={k} className="flex justify-between"><dt className="text-ink-soft">{k}</dt><dd className="text-ink">{range(v)}</dd></div>
              ))}
              <div className="mt-1 flex justify-between border-t border-line pt-2 font-bold"><dt className="text-ink">Total</dt><dd className="text-ink">{range(trip.costSummary.total)}</dd></div>
            </dl>
            <p className="mt-3 text-xs text-ink-faint">Estimates only, not prices. Check opening days and costs before you go.</p>
          </div>

          <p className="mt-6 text-sm text-ink-soft print:hidden">
            The JapTour app adds offline maps, phrases with audio, dietary cards, a budget tracker and more.{" "}
            <Link to="/tour/phrases" className="font-semibold text-accent">Try the travel phrases →</Link>
          </p>
        </section>
      )}
    </div>
  );
}
