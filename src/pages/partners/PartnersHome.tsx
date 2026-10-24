import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { db, KIND_LABEL, type Provider, type ProviderKind } from "../../lib/listings";

// Employers first: one marketplace at a time. Tour agencies (JapTour) and sellers (JapMart)
// stay in the database and come back here when those listings open.
const KINDS: { kind: ProviderKind; title: string; body: string }[] = [
  {
    kind: "employer",
    title: "Employers & registered support organisations",
    body: "Post jobs for foreign workers in Japan: caregiving, construction, food, factory, hotel and more. Your listings appear in the JapWork app, where workers contact you directly.",
  },
];

export function PartnersHome() {
  const { ready, session } = useAuth();
  const navigate = useNavigate();
  const [mine, setMine] = useState<Provider[] | null>(null);
  const [creating, setCreating] = useState<ProviderKind | null>(null);
  const [form, setForm] = useState({ name: "", website: "", contact_email: "", phone: "", prefecture: "", corporate_number: "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!session) return;
    db()
      .from("provider_members")
      .select("providers(*)")
      .eq("user_id", session.user.id)
      .then(({ data }) => setMine(((data ?? []) as unknown as { providers: Provider }[]).map((r) => r.providers).filter(Boolean)));
  }, [session]);

  async function create(e: FormEvent) {
    e.preventDefault();
    if (!creating) return;
    setBusy(true);
    setError(null);
    const { data, error } = await db()
      .from("providers")
      .insert({ kind: creating, ...Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim() || null])) })
      .select("id")
      .single();
    setBusy(false);
    if (error) return setError(error.message);
    navigate(`/partners/p/${data.id}`);
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase">JapanOne Partners</div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Reach foreign workers looking for jobs in Japan</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        JapWork helps people preparing for skilled and hands-on jobs in Japan: their visa route, Japanese CV,
        interview practice and rights at work. Post your jobs and reach them there.
      </p>
      <ol className="mt-6 grid max-w-3xl gap-3 text-sm text-ink-soft sm:grid-cols-3">
        <li className="rounded-xl border border-line bg-surface p-4"><b className="text-ink">1. Register your company.</b> We verify it with your corporate number (法人番号) before anything goes live.</li>
        <li className="rounded-xl border border-line bg-surface p-4"><b className="text-ink">2. Post a job</b> with clear pay, hours, days off and who can apply. Our team checks every listing.</li>
        <li className="rounded-xl border border-line bg-surface p-4"><b className="text-ink">3. Workers contact you directly</b> by your link, email or phone. We don't take part in hiring and never charge workers.</li>
      </ol>
      <p className="mt-4 max-w-2xl text-sm text-ink-faint">
        Listings are shown in the JapWork app, in the language you write them in. Listing is free during our launch period.
      </p>

      {!ready ? null : !session ? (
        <>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {KINDS.map((k) => (
              <div key={k.kind} className="rounded-2xl border border-line bg-surface p-6">
                <div className="font-semibold text-ink">{k.title}</div>
                <p className="mt-2 text-sm text-ink-soft">{k.body}</p>
              </div>
            ))}
          </div>
          <Link to="/login?next=/partners" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-accent-deep">
            Sign in to get started
          </Link>
        </>
      ) : (
        <>
          {mine && mine.length > 0 && (
            <section className="mt-10">
              <h2 className="text-lg font-semibold text-ink">Your companies</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {mine.map((p) => (
                  <Link key={p.id} to={`/partners/p/${p.id}`} className="rounded-xl border border-line bg-surface p-5 hover:shadow-md">
                    <div className="flex justify-between gap-3">
                      <span className="font-semibold text-ink">{p.name}</span>
                      <span className="text-xs text-ink-faint">{p.status === "active" ? "Verified" : p.status === "pending" ? "Awaiting verification" : "Suspended"}</span>
                    </div>
                    <div className="mt-1 text-sm text-ink-soft">{KIND_LABEL[p.kind]}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-ink">{mine?.length ? "Add another company" : "Create your company profile"}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {KINDS.map((k) => (
                <button
                  key={k.kind}
                  onClick={() => setCreating(k.kind)}
                  className={`rounded-xl border p-5 text-left ${creating === k.kind ? "border-accent bg-surface" : "border-line bg-surface hover:border-ink"}`}
                >
                  <div className="font-semibold text-ink">{k.title}</div>
                  <div className="mt-1 text-xs text-ink-soft">{k.body}</div>
                </button>
              ))}
            </div>

            {creating && (
              <form onSubmit={create} className="mt-6 grid gap-4 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-2">
                {(
                  [
                    ["name", "Company name", true],
                    ["website", "Website", false],
                    ["contact_email", "Contact email", true],
                    ["phone", "Phone", false],
                    ["prefecture", creating === "seller" ? "Country / city" : "Prefecture", false],
                    ["corporate_number", creating === "tour_agency" ? "Travel agency registration no." : "Corporate number (法人番号)", false],
                  ] as const
                ).map(([key, label, required]) => (
                  <label key={key} className="text-sm">
                    <span className="font-medium text-ink">{label}{required && " *"}</span>
                    <input
                      required={required}
                      type={key === "contact_email" ? "email" : "text"}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-accent"
                    />
                  </label>
                ))}
                <div className="sm:col-span-2">
                  <p className="text-xs text-ink-faint">
                    We verify each company before its listings go live. The registration number speeds this up.
                  </p>
                  {error && <p className="mt-2 text-sm text-accent">{error}</p>}
                  <button disabled={busy} className="mt-4 rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-accent-deep disabled:opacity-50">
                    {busy ? "Creating…" : `Create ${KIND_LABEL[creating].toLowerCase()} profile`}
                  </button>
                </div>
              </form>
            )}
          </section>
        </>
      )}
    </div>
  );
}
