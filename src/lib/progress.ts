import { supabase } from "./supabase";

// Progress is saved in this browser for everyone, and also to the account when signed in.
// Keys look like "lesson:3" (JapTalk) or "n5" (JapTutor test summary).
export type App = "japtalk" | "japtutor";

const localKey = (app: App, key: string) => `mt-learn:${app}:${key}`;

function readLocal<T>(app: App, key: string): T | null {
  try {
    const raw = localStorage.getItem(localKey(app, key));
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeLocal(app: App, key: string, data: unknown) {
  try {
    localStorage.setItem(localKey(app, key), JSON.stringify(data));
  } catch {
    // Storage full or blocked (private mode): the account copy still works.
  }
}

export async function loadProgress<T>(app: App, key: string, userId?: string): Promise<T | null> {
  if (supabase && userId) {
    const { data } = await supabase.from("progress").select("data").eq("app", app).eq("item_key", key).maybeSingle();
    if (data) return data.data as T;
  }
  return readLocal<T>(app, key);
}

export async function saveProgress(app: App, key: string, data: unknown, userId?: string) {
  writeLocal(app, key, data);
  if (supabase && userId) {
    await supabase.from("progress").upsert({ user_id: userId, app, item_key: key, data, updated_at: new Date().toISOString() });
  }
}

/** All progress rows for one app, keyed by item_key (account first, then this browser). */
export async function loadAll<T>(app: App, userId?: string): Promise<Record<string, T>> {
  const out: Record<string, T> = {};
  try {
    const prefix = `mt-learn:${app}:`;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(prefix)) out[k.slice(prefix.length)] = JSON.parse(localStorage.getItem(k)!) as T;
    }
  } catch {
    // ignore
  }
  if (supabase && userId) {
    const { data } = await supabase.from("progress").select("item_key, data").eq("app", app);
    for (const row of data ?? []) out[row.item_key] = row.data as T;
  }
  return out;
}

/** After sign-in, copy anything practised as a guest up to the account (account wins on conflicts). */
export async function mergeGuestProgress(userId: string) {
  if (!supabase) return;
  for (const app of ["japtalk", "japtutor"] as App[]) {
    const local = await loadAll<unknown>(app);
    const { data } = await supabase.from("progress").select("item_key").eq("app", app);
    const onServer = new Set((data ?? []).map((r) => r.item_key));
    const rows = Object.entries(local)
      .filter(([k]) => !onServer.has(k))
      .map(([item_key, d]) => ({ user_id: userId, app, item_key, data: d }));
    if (rows.length) await supabase.from("progress").upsert(rows);
  }
}

export async function saveTestResult(userId: string | undefined, level: string, score: number, total: number, byType: Record<string, [number, number]>) {
  if (!supabase || !userId) return;
  await supabase.from("test_results").insert({ user_id: userId, level, score, total, by_type: byType });
}
