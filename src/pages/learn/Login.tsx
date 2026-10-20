import { useCallback, useState, type FormEvent } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { GoogleButton, googleButtonAvailable } from "../../lib/GoogleButton";

export function Login() {
  const { session, enabled, signInWithGoogle, sendEmailLink } = useAuth();
  const [params] = useSearchParams();
  const next = params.get("next") || "/learn";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onGoogleError = useCallback((message: string) => setError(message), []);

  if (session) return <Navigate to={next} replace />;

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await sendEmailLink(email.trim(), next);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send the link. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setError(null);
    try {
      await signInWithGoogle(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed. Try again.");
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase">JapanOne</div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Sign in to JapanOne</h1>
      <p className="mt-2 text-ink-soft">One JapanOne account for JapTalk and JapTutor on the web. No password needed.</p>

      {!enabled ? (
        <p className="mt-8 rounded-xl border border-line bg-surface p-5 text-sm text-ink-soft">
          Accounts aren't available yet. You can still practise; progress is saved in this browser.{" "}
          <Link to="/learn" className="font-semibold text-accent">Go to Learn</Link>
        </p>
      ) : sent ? (
        <div className="mt-8 rounded-xl border border-line bg-surface p-6">
          <div className="font-semibold text-ink">Check your email</div>
          <p className="mt-2 text-sm text-ink-soft">
            We sent a sign-in link to <span className="font-medium text-ink">{email}</span>. Open it on this device. It
            may take a minute; check spam if you don't see it.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {googleButtonAvailable ? (
            <GoogleButton onError={onGoogleError} />
          ) : (
            <button
              onClick={onGoogle}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-line bg-surface px-6 py-3 font-semibold text-ink hover:shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.3-.4-3.5z" />
              </svg>
              Continue with Google
            </button>
          )}

          <div className="flex items-center gap-3 text-xs text-ink-faint">
            <div className="h-px flex-1 bg-line" />
            or
            <div className="h-px flex-1 bg-line" />
          </div>

          <form onSubmit={onEmail} className="space-y-3">
            <label className="block text-sm font-medium text-ink" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none focus:border-accent"
            />
            <button
              disabled={busy}
              className="w-full rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-accent-deep disabled:opacity-50"
            >
              {busy ? "Sending…" : "Email me a sign-in link"}
            </button>
          </form>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-accent">{error}</p>}

      <p className="mt-10 text-xs text-ink-faint">
        By signing in you agree to our <Link to="/terms" className="underline">Terms</Link> and{" "}
        <Link to="/learn/privacy" className="underline">Learn privacy notice</Link>. We store your email and your
        practice progress, nothing else.
      </p>
    </div>
  );
}
