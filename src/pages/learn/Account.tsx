import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { SUBSCRIPTIONS_ENABLED } from "../../lib/plan";
import { supabase } from "../../lib/supabase";

type Result = { level: string; score: number; total: number; taken_at: string };

export function Account() {
  const { ready, session, profile, signOut } = useAuth();
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    if (!supabase || !session) return;
    supabase
      .from("test_results")
      .select("level, score, total, taken_at")
      .order("taken_at", { ascending: false })
      .limit(10)
      .then(({ data }) => setResults((data as Result[]) ?? []));
  }, [session]);

  if (!ready) return null;
  if (!session) return <Navigate to="/login?next=/learn/account" replace />;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link to="/learn" className="text-sm font-semibold text-accent">&larr; Learn</Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink">Your account</h1>

      <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
        <div className="text-sm text-ink-faint">Signed in as</div>
        <div className="mt-1 font-semibold text-ink">{session.user.email}</div>
        <div className="mt-5 text-sm text-ink-faint">Plan</div>
        <div className="mt-1 font-semibold text-ink">
          {profile?.plan === "pro" ? "Pro" : "Free"}
          {!SUBSCRIPTIONS_ENABLED && <span className="ml-2 text-sm font-normal text-ink-soft">— every lesson is free right now</span>}
        </div>
      </div>

      <h2 className="mt-10 text-lg font-semibold text-ink">Recent JapTutor tests</h2>
      {results.length === 0 ? (
        <p className="mt-3 text-sm text-ink-soft">
          No tests yet. <Link to="/learn/japtutor" className="font-semibold text-accent">Take today's test</Link>
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
          {results.map((r) => (
            <li key={r.taken_at} className="flex justify-between px-5 py-3 text-sm">
              <span className="text-ink-soft">{new Date(r.taken_at).toLocaleDateString()} · {r.level.toUpperCase()}</span>
              <span className="font-semibold text-ink">{r.score} / {r.total}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 flex flex-wrap gap-4 text-sm">
        <button onClick={signOut} className="rounded-full border border-line px-5 py-2.5 font-semibold text-ink hover:bg-surface">
          Sign out
        </button>
        <span className="self-center text-ink-faint">
          To delete your account and data, email hello@muthamiltech.com from this address.
        </span>
      </div>
    </div>
  );
}
