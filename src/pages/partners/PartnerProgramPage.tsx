import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NOUN_JA, PROGRAM_TEXT_JA, UI } from "../../data/partnerJa";
import { useAuth } from "../../lib/auth";
import { LangSwitch, usePartnerLang } from "../../lib/partnerLang";
import { db, type Provider, type ProviderKind } from "../../lib/listings";
import type { PartnerProgram } from "./partnerTypes";

// What each kind of partner is called, and what it lists.
const NOUN: Record<ProviderKind, { one: string; many: string; lists: string }> = {
  employer: { one: "company", many: "companies", lists: "jobs" },
  tour_agency: { one: "agency", many: "agencies", lists: "tours" },
  seller: { one: "shop", many: "shops", lists: "products" },
  school: { one: "school", many: "schools", lists: "courses" },
};

const input = "mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-accent";

/** One partner programme (Study, Work, Travel or Shop): what it offers, then register and manage companies. */
export function PartnerProgramPage({ program }: { program: PartnerProgram }) {
  const { ready, session } = useAuth();
  const [lang, setLang] = usePartnerLang();
  const ja = lang === "ja";
  const t = (x: { en: string; ja: string }) => x[lang];
  const pj = PROGRAM_TEXT_JA[program.slug];
  const text = ja
    ? { headline: pj.headline, intro: pj.intro, steps: pj.steps, note: pj.note, regLabel: pj.registrationLabel, regHint: pj.registrationHint }
    : { headline: program.headline, intro: program.intro, steps: program.steps, note: program.note, regLabel: program.registrationLabel, regHint: program.registrationHint };
  const noun = ja ? { one: NOUN_JA[program.kind].one, many: NOUN_JA[program.kind].one, lists: NOUN_JA[program.kind].lists } : NOUN[program.kind];
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
    ["name", ja ? pj.nameLabel : program.kind === "tour_agency" ? "Agency name" : program.kind === "seller" ? "Shop name" : program.kind === "school" ? "School name" : "Company name", true],
    ["website", t(UI.website), false],
    ["contact_email", t(UI.email), true],
    ["phone", t(UI.phone), false],
    ["prefecture", t(UI.prefecture), false],
    ["corporate_number", text.regLabel, false],
  ];

  return (
    <div lang={lang} className="mx-auto max-w-4xl px-6 py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link to={ja ? "/partners?lang=ja" : "/partners"} className="text-sm font-semibold text-accent">{t(UI.backToPartners)}</Link>
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
      <div className="mt-6 text-sm font-bold text-accent">{program.app} {t(UI.partners)}</div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{text.headline}</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">{text.intro}</p>

      <ol className="mt-6 grid gap-3 text-sm text-ink-soft sm:grid-cols-3">
        {text.steps.map(([title, body], i) => (
          <li key={title} className="rounded-xl border border-line bg-surface p-4">
            <b className="text-ink">{i + 1}. {title}</b> {body}
          </li>
        ))}
      </ol>
      <p className="mt-4 max-w-2xl text-sm text-ink-faint">{text.note}</p>
      <p className="mt-2 text-sm text-ink-soft">
        <Link to={ja ? "/partners?lang=ja#plans" : "/partners#plans"} className="font-semibold text-accent">{t(UI.plans)}</Link>
        {" · "}{t(UI.questions)} <Link to={`/contact?topic=${program.kind}`} className="font-semibold text-accent">{t(UI.contact)}</Link>
      </p>

      {!ready ? null : !session ? (
        <Link to={`/login?next=/partners/${program.slug}`} className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-accent-deep">
          {t(UI.signIn)}
        </Link>
      ) : (
        <>
          {mine && mine.length > 0 && (
            <section className="mt-10">
              <h2 className="text-lg font-semibold text-ink">{ja ? `登録済みの${noun.one}` : `Your ${noun.many}`}</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {mine.map((p) => (
                  <Link key={p.id} to={`/partners/p/${p.id}`} className="rounded-xl border border-line bg-surface p-5 hover:shadow-md">
                    <div className="flex justify-between gap-3">
                      <span className="font-semibold text-ink">{p.name}</span>
                      <span className="text-xs text-ink-faint">{t(p.status === "active" ? UI.verified : p.status === "pending" ? UI.pending : UI.suspended)}</span>
                    </div>
                    <div className="mt-1 text-sm text-ink-soft">{ja ? `${noun.lists}の掲載・管理 →` : `Open to post and manage ${noun.lists} →`}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-10">
            {!showForm ? (
              <button onClick={() => setShowForm(true)} className="rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-accent-deep">
                {ja ? `${mine?.length ? "別の" : ""}${noun.one}を登録` : `${mine?.length ? "Register another" : "Register"} ${noun.one}`}
              </button>
            ) : (
              <form onSubmit={create} className="grid gap-4 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-2">
                <h2 className="text-lg font-semibold text-ink sm:col-span-2">{ja ? `${program.app} に登録` : `Register with ${program.app}`}</h2>
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
                  <p className="text-xs text-ink-faint">{text.regHint}</p>
                  {error && <p className="mt-2 text-sm text-accent">{error}</p>}
                  <button disabled={busy} className="mt-4 rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-accent-deep disabled:opacity-50">
                    {busy ? t(UI.registering) : t(UI.register)}
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
