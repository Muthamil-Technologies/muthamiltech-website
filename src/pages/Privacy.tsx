import { Link } from "react-router-dom";
import { contact } from "../data/products";

export function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link to="/" className="text-sm font-semibold text-accent">
        &larr; Back to Muthamil Technologies
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated: September 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-ink-soft">
        <p>
          This page covers the muthamiltech.com website itself. Our individual products —
          JapTalk, JapTest, JapJob, and JapTour — each publish their own privacy policy
          covering how that specific app handles data.
        </p>

        <section>
          <h2 className="text-lg font-semibold text-ink">What this website collects</h2>
          <p className="mt-2">
            This website does not use analytics, advertising, or tracking scripts, and does
            not set cookies. It does not collect any personal information from visitors
            beyond what you choose to send us directly — for example, by emailing{" "}
            <a href={`mailto:${contact.email}`} className="text-accent">
              {contact.email}
            </a>
            . Any information you send us that way is used only to respond to you.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Third-party links</h2>
          <p className="mt-2">
            This site links to our Instagram account and to the individual product pages.
            Those platforms and apps have their own privacy practices, described in their own
            policies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Changes to this policy</h2>
          <p className="mt-2">
            If this changes — for example, if we later add analytics or a mailing list — this
            page will be updated first, with the date above reflecting the change.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Contact</h2>
          <p className="mt-2">
            Questions about this policy can be sent to{" "}
            <a href={`mailto:${contact.email}`} className="text-accent">
              {contact.email}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
