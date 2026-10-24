import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { db, type Provider } from "../../lib/listings";
import type { PartnerProgram } from "./partnerTypes";

const input = "mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-accent";

/** One partner programme (JapWork or JapTour): what it offers, then register and manage companies. */
export function PartnerProgramPage({ program }: { program: PartnerProgram }) {
  const { ready, session } = useAuth();
  const navigate = useNavigate();
  const [mine, setMine] = useState<Provider[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", website: "", contact_email: "", phone: "", prefecture: "", corporate_number: "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!session) return;
    db()
      .from("provider_members")
      .select("providers(*)")
      .eq("user_id", session.user.id)
      .then(({ data }) =>
        setMine(
          ((data ?? []) as unknown as { providers: Provider }[])
            .map((r) => r.providers)
            .filter((p) => p && p.kind === program.kind),
        ),
      );
  }, [session, program.kind]);

  async function create(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { data, error } = await db()
      .from("providers")
      .insert({ kind: program.kind, ...Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim() || null])) })
      .select("id")
      .single();
    setBusy(false);
    if (error) return setError(error.message);
    navigate(`/partners/p/${data.id}`);
  }

  const fields: [keyof typeof form, string, boolean][] = [
    ["name", program.kind === "tour_agency" ? "Agency name" : "Company name", true],
    ["website", "Website", false],
    ["contact_email", "Contact email", true],
    ["phone", "Phone", false],
    ["prefecture", "Prefecture", false],
    ["corporate_number", program.registrationLabel, false],
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <Link to="/partners" className="text-sm font-semibold text-accent">&larr; Become a partner</Link>
      <div className="mt-6 text-xs font-bold tracking-[0.2em] text-accent uppercase">{program.app} Partners</div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{program.headline}</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">{program.intro}</p>

      <ol className="mt-6 grid gap-3 text-sm text-ink-soft sm:grid-cols-3">
        {program.steps.map(([title, body], i) => (
          <li key={title} className="rounded-xl border border-line bg-surface p-4">
            <b className="text-ink">{i + 1}. {title}</b> {body}
          </li>
        ))}
      </ol>
      <p className="mt-4 max-w-2xl text-sm text-ink-faint">{program.note}</p>

      {!ready ? null : !session ? (
        <Link to={`/login?next=/partners/${program.slug}`} className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-accent-deep">
          Sign in to register
        </Link>
      ) : (
        <>
          {mine && mine.length > 0 && (
            <section className="mt-10">
              <h2 className="text-lg font-semibold text-ink">Your {program.kind === "tour_agency" ? "agencies" : "companies"}</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {mine.map((p) => (
                  <Link key={p.id} to={`/partners/p/${p.id}`} className="rounded-xl border border-line bg-surface p-5 hover:shadow-md">
                    <div className="flex justify-between gap-3">
                      <span className="font-semibold text-ink">{p.name}</span>
                      <span className="text-xs text-ink-faint">{p.status === "active" ? "Verified" : p.status === "pending" ? "Awaiting verification" : "Suspended"}</span>
                    </div>
                    <div className="mt-1 text-sm text-ink-soft">Open to post and manage {program.kind === "tour_agency" ? "tours" : "jobs"} &rarr;</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-10">
            {!showForm ? (
              <button onClick={() => setShowForm(true)} className="rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-accent-deep">
                {mine?.length ? "Register another" : "Register"} {program.kind === "tour_agency" ? "agency" : "company"}
              </button>
            ) : (
              <form onSubmit={create} className="grid gap-4 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-2">
                <h2 className="text-lg font-semibold text-ink sm:col-span-2">Register with {program.app}</h2>
                {fields.map(([key, label, required]) => (
                  <label key={key} className="text-sm">
                    <span className="font-medium text-ink">{label}{required && " *"}</span>
                    <input
                      required={required}
                      type={key === "contact_email" ? "email" : "text"}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className={input}
                    />
                  </label>
                ))}
                <div className="sm:col-span-2">
                  <p className="text-xs text-ink-faint">{program.registrationHint}</p>
                  {error && <p className="mt-2 text-sm text-accent">{error}</p>}
                  <button disabled={busy} className="mt-4 rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-accent-deep disabled:opacity-50">
                    {busy ? "Registering…" : "Register"}
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
