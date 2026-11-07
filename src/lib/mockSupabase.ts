// Practice database for `npm run mock`: a stand-in for Supabase that lives only in this browser,
// so sign-in, partner sign-up, posting and admin review can be tried with no real account or data.
// It follows the rules in muthamil-platform/supabase/migrations. Never included in a live build.
if (!import.meta.env.DEV) throw new Error("The practice database is for local use only.");

type Row = Record<string, any>;
type User = { id: string; email: string; user_metadata: Row };
type Session = { user: User; access_token: string };
type Result = { data: any; error: { message: string } | null; count?: number };

const KEY = "jo-mock-db";
const ADMIN = { id: "mock-admin", email: "admin@practice.test" };
const DETAILS = ["job_details", "tour_details", "item_details", "course_details"];
const PRODUCT_OF: Row = { employer: "job", tour_agency: "tour", seller: "item", school: "course" };

const seed = () => ({ tables: { admins: [{ user_id: ADMIN.id }] } as Record<string, Row[]>, session: null as Session | null, media: {} as Record<string, string> });
type Db = ReturnType<typeof seed>;

function read(): Db {
  try { return { ...seed(), ...JSON.parse(localStorage.getItem(KEY) ?? "{}") }; } catch { return seed(); }
}
let db = read();
const save = () => localStorage.setItem(KEY, JSON.stringify(db));
const rows = (t: string) => (db.tables[t] ??= []);
const uid = () => crypto.randomUUID();
const now = () => new Date().toISOString();
const me = () => db.session?.user.id ?? null;
const isAdmin = () => rows("admins").some((a) => a.user_id === me());
const isMember = (provider: string) => rows("provider_members").some((m) => m.provider_id === provider && m.user_id === me());
const fail = (message: string): Result => ({ data: null, error: { message } });
const listeners = new Set<(event: string, s: Session | null) => void>();

/** The database's read rules (row level security), in short. */
function visible(table: string, r: Row) {
  if (isAdmin()) return true;
  if (table === "providers") return r.status === "active" || r.created_by === me() || isMember(r.id);
  if (table === "listings") {
    const p = rows("providers").find((x) => x.id === r.provider_id);
    return (r.status === "published" && p?.status === "active") || isMember(r.provider_id);
  }
  if (table === "provider_members") return r.user_id === me();
  if (table === "reports") return false;
  return true;
}

/** Joined tables named in a select, such as `provider:providers(...)` or `job_details(*)`. */
function withEmbeds(table: string, r: Row, select: string) {
  const out = { ...r };
  for (const m of select.matchAll(/(?:(\w+):)?(\w+)\(/g)) {
    const [, alias, name] = m;
    const key = alias ?? name;
    if (name === "providers") out[key] = rows("providers").find((p) => p.id === r.provider_id) ?? null;
    else if (name === "listings") out[key] = rows("listings").find((l) => l.id === r.listing_id) ?? null;
    else if (DETAILS.includes(name)) out[key] = rows(name).find((d) => d.listing_id === r.id) ?? null;
    else if (name === "listing_media") out[key] = rows(name).filter((d) => d.listing_id === r.id);
  }
  return table ? out : r;
}

function defaults(table: string, r: Row): Row {
  const base = { id: uid(), created_at: now(), ...r };
  if (table === "providers") {
    if (!me()) return fail("Sign in first.");
    return { country: "JP", ...base, created_by: me(), status: "pending", verified_at: null };
  }
  if (table === "listings") {
    const p = rows("providers").find((x) => x.id === r.provider_id);
    if (!p || !isMember(p.id)) return fail("You are not a member of this partner.");
    if (PRODUCT_OF[p.kind] !== r.product) return fail(`A ${p.kind} can't list a ${r.product}.`);
    return { default_lang: "en", languages: ["en"], ...base, status: "draft", updated_at: now(), submitted_at: null, published_at: null, expires_at: null };
  }
  return base;
}

class Query implements PromiseLike<Result> {
  private filters: ((r: Row) => boolean)[] = [];
  private sorts: { col: string; asc: boolean; nullsFirst: boolean }[] = [];
  private max = Infinity;
  private mode: "many" | "single" | "maybe" = "many";
  private op: "select" | "insert" | "update" | "upsert" | "delete" = "select";
  private payload: Row[] = [];
  private cols = "*";

  private table: string;

  constructor(table: string) { this.table = table; }
  select(cols = "*") { this.cols = cols; return this; }
  insert(v: Row | Row[]) { this.op = "insert"; this.payload = [v].flat(); return this; }
  upsert(v: Row | Row[]) { this.op = "upsert"; this.payload = [v].flat(); return this; }
  update(v: Row) { this.op = "update"; this.payload = [v]; return this; }
  delete() { this.op = "delete"; return this; }
  eq(col: string, v: unknown) { this.filters.push((r) => r[col] === v); return this; }
  neq(col: string, v: unknown) { this.filters.push((r) => r[col] !== v); return this; }
  in(col: string, v: unknown[]) { this.filters.push((r) => v.includes(r[col])); return this; }
  order(col: string, o: { ascending?: boolean; nullsFirst?: boolean } = {}) {
    this.sorts.push({ col, asc: o.ascending ?? true, nullsFirst: o.nullsFirst ?? !(o.ascending ?? true) });
    return this;
  }
  limit(n: number) { this.max = n; return this; }
  single() { this.mode = "single"; return this; }
  maybeSingle() { this.mode = "maybe"; return this; }

  private matched() {
    return rows(this.table).filter((r) => visible(this.table, r) && this.filters.every((f) => f(r)));
  }

  private run(): Result {
    let found: Row[];
    if (this.op === "insert" || this.op === "upsert") {
      found = [];
      for (const v of this.payload) {
        const key = this.table === "progress" ? (r: Row) => r.user_id === v.user_id && r.app === v.app && r.item_key === v.item_key : (r: Row) => DETAILS.includes(this.table) ? r.listing_id === v.listing_id : r.id === v.id;
        const old = this.op === "upsert" ? rows(this.table).find(key) : undefined;
        if (old) { Object.assign(old, v); found.push(old); continue; }
        const row = defaults(this.table, v);
        if (row.error) return row as Result;
        rows(this.table).push(row);
        found.push(row);
        if (this.table === "providers") rows("provider_members").push({ provider_id: row.id, user_id: me(), role: "owner", created_at: now() });
      }
      save();
    } else if (this.op === "update") {
      found = this.matched();
      found.forEach((r) => Object.assign(r, this.payload[0], this.table === "listings" ? { updated_at: now() } : {}));
      save();
    } else if (this.op === "delete") {
      found = this.matched();
      db.tables[this.table] = rows(this.table).filter((r) => !found.includes(r));
      save();
    } else {
      found = this.matched();
    }
    const sorted = [...found].sort((a, b) => {
      for (const s of this.sorts) {
        const x = a[s.col] ?? null, y = b[s.col] ?? null;
        if (x === y) continue;
        if (x === null) return s.nullsFirst ? -1 : 1;
        if (y === null) return s.nullsFirst ? 1 : -1;
        return (x < y ? -1 : 1) * (s.asc ? 1 : -1);
      }
      return 0;
    }).slice(0, this.max);
    const data = sorted.map((r) => withEmbeds(this.table, r, this.cols));
    if (this.mode === "many") return { data, error: null };
    if (!data[0] && this.mode === "single") return fail("Row not found");
    return { data: data[0] ?? null, error: null };
  }

  then<A, B>(ok?: ((v: Result) => A | PromiseLike<A>) | null, bad?: ((e: unknown) => B | PromiseLike<B>) | null) {
    return Promise.resolve().then(() => this.run()).then(ok, bad);
  }
}

function rpc(name: string, a: Row): Result {
  const l = rows("listings").find((x) => x.id === a.p_listing);
  if (name === "submit_listing") {
    if (!l || !isMember(l.provider_id)) return fail("Listing not found");
    if (!["draft", "rejected"].includes(l.status)) return fail("Only drafts can be submitted");
    if (!DETAILS.some((t) => rows(t).some((d) => d.listing_id === l.id))) return fail(`Add the ${l.product} details before submitting`);
    Object.assign(l, { status: "submitted", submitted_at: now() });
  } else if (name === "withdraw_listing") {
    if (!l || !isMember(l.provider_id)) return fail("Listing not found");
    if (!["submitted", "published"].includes(l.status)) return fail("Nothing to withdraw");
    Object.assign(l, { status: "draft", published_at: null });
  } else if (name === "review_listing") {
    if (!isAdmin()) return fail("Admins only");
    if (!l) return fail("Listing not found");
    const p = rows("providers").find((x) => x.id === l.provider_id);
    if (a.p_decision === "approved") {
      if (l.status !== "submitted") return fail("Only submitted listings can be approved");
      if (p?.status !== "active") return fail("Verify the provider before approving its listings");
      const days = l.product === "job" ? 30 : l.product === "item" ? 90 : 180;
      Object.assign(l, { status: "published", published_at: now(), expires_at: l.expires_at ?? new Date(Date.now() + days * 86400_000).toISOString() });
    } else if (a.p_decision === "rejected") {
      if (l.status !== "submitted") return fail("Only submitted listings can be rejected");
      l.status = "rejected";
    } else if (a.p_decision === "removed") {
      Object.assign(l, { status: "removed", published_at: null });
    } else return fail("Decision must be approved, rejected or removed");
    rows("listing_reviews").push({ id: uid(), listing_id: l.id, reviewer_id: me(), decision: a.p_decision, reason: a.p_reason ?? null, created_at: now() });
  } else if (name === "set_provider_status") {
    if (!isAdmin()) return fail("Admins only");
    const p = rows("providers").find((x) => x.id === a.p_provider);
    if (!p) return fail("Provider not found");
    Object.assign(p, { status: a.p_status, verified_at: a.p_status === "active" ? (p.verified_at ?? now()) : p.verified_at });
  } else if (name === "delete_my_account") {
    const id = me();
    db.tables.provider_members = rows("provider_members").filter((m) => m.user_id !== id);
    db.session = null;
    listeners.forEach((f) => f("SIGNED_OUT", null));
  } else return fail(`Practice database has no ${name}`);
  save();
  return { data: null, error: null };
}

export function practiceSignIn(email: string) {
  const known = rows("profiles").find((p) => p.email === email);
  const id = email === ADMIN.email ? ADMIN.id : (known?.id ?? uid());
  if (!known) rows("profiles").push({ id, email, display_name: email.split("@")[0], plan: "free", plan_expires_at: null });
  db.session = { user: { id, email, user_metadata: {} }, access_token: "practice" };
  save();
  listeners.forEach((f) => f("SIGNED_IN", db.session));
}

export function practiceSignOut() {
  db.session = null;
  save();
  listeners.forEach((f) => f("SIGNED_OUT", null));
}

export function practiceReset() {
  localStorage.removeItem(KEY);
  db = seed();
  listeners.forEach((f) => f("SIGNED_OUT", null));
}

export const PRACTICE_ADMIN = ADMIN.email;
export const practiceEmail = () => db.session?.user.email ?? null;

/** Photos are shrunk so they fit in the browser's storage. */
async function shrink(file: Blob) {
  const image = await createImageBitmap(file);
  const scale = Math.min(1, 640 / image.width);
  const canvas = document.createElement("canvas");
  canvas.width = image.width * scale;
  canvas.height = image.height * scale;
  canvas.getContext("2d")!.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.7);
}

export const mockSupabase = {
  from: (table: string) => new Query(table),
  rpc: async (name: string, args: Row = {}) => rpc(name, args),
  auth: {
    getSession: async () => ({ data: { session: db.session } }),
    onAuthStateChange(cb: (event: string, s: Session | null) => void) {
      listeners.add(cb);
      return { data: { subscription: { unsubscribe: () => listeners.delete(cb) } } };
    },
    async signInWithOtp({ email, options }: { email: string; options?: { emailRedirectTo?: string } }) {
      practiceSignIn(email);
      if (options?.emailRedirectTo) location.assign(options.emailRedirectTo);
      return { error: null };
    },
    async signInWithOAuth({ options }: { options?: { redirectTo?: string } }) {
      practiceSignIn("partner@practice.test");
      if (options?.redirectTo) location.assign(options.redirectTo);
      return { error: null };
    },
    async signInWithIdToken() { return { error: { message: "Not used in practice mode" } }; },
    async updateUser({ data }: { data: Row }) {
      if (db.session) { Object.assign(db.session.user.user_metadata, data); save(); }
      return { error: null };
    },
    async signOut() { practiceSignOut(); },
  },
  storage: {
    from: () => ({
      async upload(path: string, file: Blob) {
        try { db.media[path] = await shrink(file); save(); return { error: null }; }
        catch { return { error: { message: "That photo is too large for practice mode." } }; }
      },
      async remove(paths: string[]) { paths.forEach((p) => delete db.media[p]); save(); return { error: null }; },
      getPublicUrl: (path: string) => ({ data: { publicUrl: db.media[path] ?? "" } }),
    }),
  },
};
