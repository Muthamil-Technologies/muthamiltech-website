import { Link } from "react-router-dom";
import { contact } from "../data/products";

export function Terms() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link to="/" className="text-sm font-semibold text-accent">
        &larr; Back to Muthamil Tech
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink">Terms</h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated: September 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-ink-soft">
        <p>
          These terms cover use of the muthamiltech.com website. Our individual products —
          JapTalk, JapTest, JapJob, and JapTour — each have their own terms where applicable.
        </p>

        <section>
          <h2 className="text-lg font-semibold text-ink">Using this site</h2>
          <p className="mt-2">
            This website is provided as informational content about Muthamil Tech and its
            products. You're welcome to browse it and share links to it. Please don't copy or
            republish its content as your own.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Product information</h2>
          <p className="mt-2">
            Products shown as "in development" are not yet available and their features may
            change before launch. Any example screens or listings shown on this site (for
            instance, on the JapJob section) are illustrative only and do not represent real,
            live data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">No warranty</h2>
          <p className="mt-2">
            This site is provided as-is, without warranties of any kind, to the extent
            permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent to{" "}
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
