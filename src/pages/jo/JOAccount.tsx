import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { KIND_LABEL, type Provider } from "../../lib/listings";
import { supabase } from "../../lib/supabase";
import { SHOW_PARTNERS } from "../../lib/joSections";

type Result = { level: string; score: number; total: number; taken_at: string };

// /account: who you're signed in as, your test results, your partner organisations, sign out
// and delete account (Apple 5.1.1(v): deletion must be available where the account is used).
export function JOAccount() {
  const { ready, session, signOut } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);
  const [orgs, setOrgs] = useState<Provider[]>([]);
  const [confirm, setConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase || !session) return;
    supabase.from("test_results").select("level, score, total, taken_at").order("taken_at", { ascending: false }).limit(5)
      .then(({ data }) => setResults((data as Result[]) ?? []));
    supabase.from("provider_members").select("providers(*)").eq("user_id", session.user.id)
      .then(({ data }) => setOrgs(((data ?? []) as unknown as { providers: Provider }[]).map((r) => r.providers).filter(Boolean)));
  }, [session]);

  if (!ready) return null;
  if (!session) return <Navigate to="/login?next=/account" replace />;

  async function deleteAccount() {
    if (!supabase) return;
    setDeleting(true);
    setError(null);
    const { error } = await supabase.rpc("delete_my_account");
    if (error) {
      setDeleting(false);
      return setError("We couldn't delete your account. Please try again, or write to us from the Contact page.");
    }
    await signOut();
    navigate("/?deleted=1", { replace: true });
  }

  return (
    <div className="mx-auto max-w-[760px] px-4 py-12 sm:px-6">
      <h1 className="m-0 text-[36px] font-black">Your account</h1>

      <section className="mt-6 rounded-[22px] bg-white p-6">
        <p className="m-0 text-sm font-bold text-jo-faint">Signed in as</p>
        <p className="m-0 mt-1 text-lg font-bold">{session.user.email}</p>
        <button type="button" onClick={signOut} className="mt-4 cursor-pointer rounded-full border border-[#d9dee6] bg-transparent px-5 py-2.5 font-bold text-jo-navy">Sign out</button>
      </section>

      <section className="mt-6 rounded-[22px] bg-white p-6">
        <h2 className="m-0 text-xl font-black">JLPT practice tests</h2>
        {results.length === 0 ? (
          <p className="m-0 mt-2 text-jo-muted">No tests yet. <Link to="/learn/jlpt" className="font-bold text-[#1f4fa8]">Take a test →</Link></p>
        ) : (
          <ul className="m-0 mt-3 flex list-none flex-col p-0">
            {results.map((r) => (
              <li key={r.taken_at} className="flex justify-between border-b border-[#eef0f4] py-2.5 last:border-0">
                <span className="text-jo-muted">{new Date(r.taken_at).toLocaleDateString()} · {r.level.toUpperCase()}</span>
                <b>{r.score} / {r.total}</b>
              </li>
            ))}
          </ul>
        )}
      </section>

      {SHOW_PARTNERS && <section className="mt-6 rounded-[22px] bg-white p-6">
        <h2 className="m-0 text-xl font-black">Partner organisations</h2>
        {orgs.length === 0 ? (
          <p className="m-0 mt-2 text-jo-muted">You haven't registered a school, company, agency or shop. <Link to="/partners" className="font-bold text-[#1f4fa8]">Become a partner →</Link></p>
        ) : (
          <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
            {orgs.map((o) => (
              <li key={o.id}><Link to={`/partners/p/${o.id}`} className="flex justify-between rounded-[14px] bg-jo-cream p-4 text-jo-navy no-underline"><b>{o.name}</b><span className="text-sm text-jo-muted">{KIND_LABEL[o.kind]}</span></Link></li>
            ))}
          </ul>
        )}
      </section>}

      <section className="mt-6 rounded-[22px] border-2 border-[#f3c7cd] bg-white p-6">
        <h2 className="m-0 text-xl font-black text-[#9e2232]">Delete your account</h2>
        <p className="m-0 mt-2 leading-relaxed text-jo-muted">
          This deletes your account, progress and test results now. It can't be undone.{SHOW_PARTNERS && " Organisations you registered stay for their other members."}
        </p>
        <label className="mt-4 block">
          <span className="font-bold">Type DELETE to confirm</span>
          <input value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-2 block w-full max-w-xs rounded-xl border border-[#d9dee6] px-3 py-2.5 text-lg" autoComplete="off" />
        </label>
        <button type="button" disabled={confirm !== "DELETE" || deleting} onClick={deleteAccount}
          className="mt-4 cursor-pointer rounded-full bg-[#9e2232] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">
          {deleting ? "Deleting…" : "Delete my account"}
        </button>
        {error && <p className="m-0 mt-3 font-bold text-[#9e2232]" role="alert">{error}</p>}
      </section>

      <p className="mt-6 text-sm text-jo-muted"><Link to="/japanone/legal#accounts" className="text-[#1f4fa8]">How we handle your data →</Link></p>
    </div>
  );
}
