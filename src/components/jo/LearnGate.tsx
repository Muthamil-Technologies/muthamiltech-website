import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { ANDROID_BETA_URL, APP_STORE_URL } from "../../lib/joSections";

// The Japanese learning tools on the web (sample tests, exam plan, speaking, level check) need a
// signed-in account. Everyone else is sent to sign in or to the app, which needs no account.
export function LearnGate({ children }: { children: ReactNode }) {
  const { ready, enabled, session } = useAuth();
  const { pathname, search } = useLocation();
  if (!ready) return <div className="min-h-[60vh]" />;
  if (enabled && session) return <>{children}</>;

  const next = encodeURIComponent(pathname + search);
  return (
    <div className="mx-auto max-w-[760px] px-4 py-14 sm:px-6">
      <div className="rounded-[28px] bg-white p-7 sm:p-10">
        <h1 className="m-0 text-[32px] font-black leading-tight sm:text-[40px]">Practise Japanese in the app</h1>
        <p className="m-0 mt-3 max-w-[52ch] text-lg leading-relaxed text-jo-muted">
          The Japanese game, sample tests, exam plan and speaking practice are in the JapanOne app, no account needed.
          {enabled && " To use them on the web, sign in first so your results are kept."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={APP_STORE_URL} className="rounded-full bg-jo-navy px-6 py-3.5 font-bold text-white no-underline">Download on the App Store</a>
          <a href={ANDROID_BETA_URL} target="_blank" rel="noopener" className="rounded-full border-2 border-jo-navy px-6 py-3 font-bold text-jo-navy no-underline">Join the Android beta</a>
        </div>
        {enabled && (
          <p className="m-0 mt-6 border-t border-[#eef0f4] pt-5 text-jo-muted">
            On a computer? <Link to={`/login?next=${next}`} className="font-bold text-[#1f4fa8]">Sign in to practise on the web →</Link>
          </p>
        )}
      </div>
      <p className="mt-6 text-jo-muted">
        Guides and tools for studying, working, travelling and living in Japan stay open to everyone. <Link to="/learn" className="font-bold text-[#1f4fa8]">Back to Learn →</Link>
      </p>
    </div>
  );
}
