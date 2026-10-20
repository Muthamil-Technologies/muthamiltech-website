import { Link } from "react-router-dom";
import { useAuth } from "../../lib/auth";

const apps = [
  {
    to: "/learn/japtutor",
    name: "JapTutor",
    tag: "JLPT N5 daily test",
    body: "Ten JLPT-style questions: kanji, vocabulary, grammar and reading. See your score by section and what to review.",
  },
  {
    to: "/learn/japtalk",
    name: "JapTalk",
    tag: "Speaking lessons",
    body: "Real situations, from introductions to the bank and the office. Say or type your answer in Japanese and get it checked.",
  },
];

export function LearnHome() {
  const { session, profile, enabled } = useAuth();
  const name = profile?.display_name;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Learn on the web</div>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {session ? `Welcome back${name ? `, ${name}` : ""}` : "Practise Japanese in your browser"}
      </h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        The same lessons as the JapTalk and JapTutor apps. Free to use.{" "}
        {session
          ? "Your progress is saved to your account."
          : enabled
            ? "Sign in to save your progress across devices."
            : "Your progress is saved in this browser."}
      </p>

      {!session && enabled && (
        <Link
          to="/login"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-accent-deep"
        >
          Sign in or create an account
        </Link>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {apps.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="group rounded-2xl border border-line bg-surface p-7 transition-shadow hover:shadow-lg"
          >
            <div className="text-xs font-semibold tracking-wide text-accent uppercase">{a.tag}</div>
            <div className="mt-2 text-2xl font-bold text-ink">{a.name}</div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{a.body}</p>
            <div className="mt-5 text-sm font-semibold text-ink group-hover:text-accent">Start &rarr;</div>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-xs text-ink-faint">
        JLPT-style practice; not affiliated with the official JLPT. Content is reviewed regularly; tell us about any
        mistake at hello@muthamiltech.com.
      </p>
    </div>
  );
}
