import { Link } from "react-router-dom";
import { contact } from "../../data/products";

// Privacy notice for the web practice at /learn (accounts are optional). The apps' own
// pages (/japtalk/legal, /japtutor/legal) still cover the mobile apps, which have no accounts.
export function LearnPrivacy() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link to="/learn" className="text-sm font-semibold text-accent">&larr; Learn</Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink">JapanOne Learn — Privacy</h1>
      <p className="mt-2 text-ink-soft">JapanOne is a brand of Muthamil Technologies, which runs this service.</p>
      <p className="mt-2 text-sm text-ink-faint">Last updated: October 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-ink-soft">
        <section>
          <h2 className="text-lg font-semibold text-ink">Without an account</h2>
          <p className="mt-2">
            You can practise without signing in. Your progress is then kept only in this browser's storage and is never
            sent to us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">With an account</h2>
          <p className="mt-2">
            If you sign in, we store your email address, the name from your Google account (if you use Google sign-in),
            your lesson progress and your daily test scores. We use them only to show you your progress on any device.
            There are no ads, no analytics and no tracking, and we never sell or share your data.
          </p>
          <p className="mt-2">
            Accounts and progress are stored with our database provider, Supabase, on servers in Tokyo, Japan. Sign-in
            emails are sent through Supabase. Google sign-in is handled by Google under{" "}
            <a href="https://policies.google.com/privacy" className="text-accent">Google's privacy policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Speaking practice</h2>
          <p className="mt-2">
            "Speak instead" uses your browser's built-in speech recognition. Your browser's maker (for example Google
            for Chrome, Apple for Safari) may process the audio on its servers. We never receive or store your voice.
            "Listen" uses your device's own Japanese voice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Paid plans</h2>
          <p className="mt-2">
            Everything is free at the moment. If paid plans are added later, this page will be updated first, and
            payments will go through a payment provider; we will never see your card details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Deleting your account</h2>
          <p className="mt-2">
            Email{" "}
            <a href={`mailto:${contact.email}`} className="text-accent">{contact.email}</a> from the address you signed
            in with and we will delete your account and all its progress within 30 days. Signing out removes the
            sign-in from this browser.
          </p>
        </section>
      </div>
    </main>
  );
}
