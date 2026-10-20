import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import {
  db, DETAIL_FIELDS, DETAIL_TABLE, KIND_LABEL, mediaUrl, one, PRODUCT_LABEL, STATUS_LABEL, STATUS_TONE,
  type Details, type Listing, type Provider,
} from "../../lib/listings";

type QueueItem = Listing & { providers: Provider; details: Details | null; media: { path: string }[] };
type Report = { id: number; reason: string; details: string | null; status: string; created_at: string; listings: { id: string; title: string; status: string } | null };
type Tab = "queue" | "companies" | "reports" | "live";

function detailText(l: QueueItem) {
  if (!l.details) return "No details";
  return DETAIL_FIELDS[l.product]
    .map((f) => {
      const v = l.details![f.key];
      if (v === null || v === undefined || v === "" || (Array.isArray(v) && !v.length)) return null;
      const shown = f.options ? (Array.isArray(v) ? v : [v]).map((x) => f.options!.find(([k]) => k === x)?.[1] ?? x).join(", ") : Array.isArray(v) ? v.join(", ") : String(v);
      return `${f.label}: ${shown}`;
    })
    .filter(Boolean)
    .join(" · ");
}

export function Admin() {
  const { ready, session } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("queue");
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [live, setLive] = useState<QueueItem[]>([]);
  const [companies, setCompanies] = useState<Provider[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    db().from("admins").select("user_id").eq("user_id", session.user.id).maybeSingle().then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  const loadListings = useCallback(async (status: string) => {
    const { data } = await db()
      .from("listings")
      .select("*, providers(*), job_details(*), tour_details(*), item_details(*), listing_media(path)")
      .eq("status", status)
      .order(status === "submitted" ? "submitted_at" : "published_at", { ascending: status === "submitted" });
    return ((data ?? []) as Record<string, unknown>[]).map((r) => ({
      ...(r as unknown as Listing),
      providers: r.providers as Provider,
      details: one(r[DETAIL_TABLE[(r as unknown as Listing).product]] as Details | Details[]),
      media: (r.listing_media as { path: string }[]) ?? [],
    }));
  }, []);

  const refresh = useCallback(async () => {
    setQueue(await loadListings("submitted"));
    setLive(await loadListings("published"));
    const { data: p } = await db().from("providers").select("*").order("created_at", { ascending: false });
    setCompanies((p as Provider[]) ?? []);
    const { data: r } = await db().from("reports").select("*, listings(id, title, status)").order("created_at", { ascending: false });
    setReports((r as Report[]) ?? []);
  }, [loadListings]);

  useEffect(() => {
    if (isAdmin) refresh();
  }, [isAdmin, refresh]);

  async function act(fn: () => PromiseLike<{ error: { message: string } | null }>, done: string) {
    setMsg(null);
    const { error } = await fn();
    setMsg(error ? `Error: ${error.message}` : done);
    refresh();
  }

  if (!ready) return null;
  if (!session) return <Navigate to="/login?next=/admin" replace />;
  if (isAdmin === null) return <div className="mx-auto max-w-5xl px-6 py-14 text-ink-soft">Checking access…</div>;
  if (!isAdmin) return <div className="mx-auto max-w-5xl px-6 py-14 text-ink-soft">This page is for JapanOne admins.</div>;

  const openReports = reports.filter((r) => r.status === "open");
  const pendingCompanies = companies.filter((c) => c.status === "pending");
  const tabs: [Tab, string, number][] = [
    ["queue", "Review queue", queue.length],
    ["companies", "Companies", pendingCompanies.length],
    ["reports", "Reports", openReports.length],
    ["live", "Live listings", live.length],
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase">JapanOne admin</div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Listings review</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map(([t, label, n]) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === t ? "bg-ink text-paper" : "border border-line text-ink-soft"}`}>
            {label}{n > 0 && <span className="ml-2 rounded-full bg-accent px-2 text-xs text-white">{n}</span>}
          </button>
        ))}
      </div>
      {msg && <p className="mt-4 text-sm text-ink-soft">{msg}</p>}

      {(tab === "queue" || tab === "live") && (
        <div className="mt-6 space-y-4">
          {(tab === "queue" ? queue : live).length === 0 && <p className="text-sm text-ink-soft">Nothing here.</p>}
          {(tab === "queue" ? queue : live).map((l) => (
            <div key={l.id} className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-ink-faint">
                    {PRODUCT_LABEL[l.product]} · {l.providers.name} ({KIND_LABEL[l.providers.kind]},{" "}
                    <span className={l.providers.status === "active" ? "text-green-700" : "text-amber-700"}>{l.providers.status}</span>)
                  </div>
                  <div className="mt-1 text-lg font-semibold text-ink">{l.title}</div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_TONE[l.status]}`}>{STATUS_LABEL[l.status]}</span>
              </div>
              {l.summary && <p className="mt-3 text-sm whitespace-pre-line text-ink-soft">{l.summary}</p>}
              <p className="mt-3 text-sm text-ink">{detailText(l)}</p>
              {l.area && <p className="mt-1 text-xs text-ink-faint">Area: {l.area}</p>}
              {l.media.length > 0 && (
                <div className="mt-3 flex gap-2">{l.media.map((m) => <img key={m.path} src={mediaUrl(m.path)} alt="" className="h-20 w-20 rounded object-cover" />)}</div>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {tab === "queue" ? (
                  <>
                    <button
                      disabled={l.providers.status !== "active"}
                      title={l.providers.status !== "active" ? "Verify the company first (Companies tab)" : ""}
                      onClick={() => act(() => db().rpc("review_listing", { p_listing: l.id, p_decision: "approved" }), `Published: ${l.title}`)}
                      className="rounded-full bg-green-700 px-5 py-2 text-sm font-semibold text-white disabled:opacity-40"
                    >
                      Approve & publish
                    </button>
                    <input
                      placeholder="Reason (shown to the provider)"
                      value={reasons[l.id] ?? ""}
                      onChange={(e) => setReasons({ ...reasons, [l.id]: e.target.value })}
                      className="min-w-0 flex-1 rounded-full border border-line bg-paper px-4 py-2 text-sm"
                    />
                    <button
                      disabled={!reasons[l.id]}
                      onClick={() => act(() => db().rpc("review_listing", { p_listing: l.id, p_decision: "rejected", p_reason: reasons[l.id] }), `Sent back: ${l.title}`)}
                      className="rounded-full border border-accent px-5 py-2 text-sm font-semibold text-accent disabled:opacity-40"
                    >
                      Request changes
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-ink-faint">Until {l.expires_at ? new Date(l.expires_at).toLocaleDateString() : "—"}</span>
                    <input
                      placeholder="Reason for removal"
                      value={reasons[l.id] ?? ""}
                      onChange={(e) => setReasons({ ...reasons, [l.id]: e.target.value })}
                      className="min-w-0 flex-1 rounded-full border border-line bg-paper px-4 py-2 text-sm"
                    />
                    <button
                      disabled={!reasons[l.id]}
                      onClick={() => act(() => db().rpc("review_listing", { p_listing: l.id, p_decision: "removed", p_reason: reasons[l.id] }), `Removed: ${l.title}`)}
                      className="rounded-full border border-accent px-5 py-2 text-sm font-semibold text-accent disabled:opacity-40"
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "companies" && (
        <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-surface">
          {companies.length === 0 && <li className="p-5 text-sm text-ink-soft">No companies yet.</li>}
          {companies.map((c) => (
            <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <div className="font-semibold text-ink">{c.name} <span className="text-xs font-normal text-ink-faint">· {KIND_LABEL[c.kind]}</span></div>
                <div className="mt-1 text-xs text-ink-soft">
                  {[c.contact_email, c.phone, c.website, c.prefecture, c.corporate_number && `No. ${c.corporate_number}`].filter(Boolean).join(" · ")}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-faint">{c.status}</span>
                {c.status !== "active" && (
                  <button onClick={() => act(() => db().rpc("set_provider_status", { p_provider: c.id, p_status: "active" }), `Verified ${c.name}`)} className="rounded-full bg-green-700 px-4 py-1.5 text-xs font-semibold text-white">
                    Verify
                  </button>
                )}
                {c.status !== "suspended" && (
                  <button onClick={() => act(() => db().rpc("set_provider_status", { p_provider: c.id, p_status: "suspended" }), `Suspended ${c.name}`)} className="rounded-full border border-accent px-4 py-1.5 text-xs font-semibold text-accent">
                    Suspend
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {tab === "reports" && (
        <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-surface">
          {reports.length === 0 && <li className="p-5 text-sm text-ink-soft">No reports.</li>}
          {reports.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <div className="font-semibold text-ink">{r.listings?.title ?? "(deleted listing)"}</div>
                <div className="mt-1 text-xs text-ink-soft">
                  {r.reason}{r.details ? ` — ${r.details}` : ""} · {new Date(r.created_at).toLocaleString()} · {r.status}
                </div>
              </div>
              {r.status === "open" && (
                <div className="flex gap-2">
                  <button onClick={() => act(() => db().from("reports").update({ status: "actioned" }).eq("id", r.id), "Marked as actioned")} className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-ink">
                    Actioned
                  </button>
                  <button onClick={() => act(() => db().from("reports").update({ status: "dismissed" }).eq("id", r.id), "Dismissed")} className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-ink-soft">
                    Dismiss
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
