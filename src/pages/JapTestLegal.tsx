import { Link } from "react-router-dom";
import { contact } from "../data/products";

export function JapTestLegal() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link to="/" className="text-sm font-semibold text-accent">
        &larr; Back to Muthamil Tech
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink">
        JapTest — Privacy &amp; Support
      </h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated: September 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-ink-soft">
        <section id="privacy">
          <h2 className="text-lg font-semibold text-ink">Privacy Policy</h2>
          <p className="mt-2">
            JapTest works fully offline. There is no account, no sign-in, and no server that
            JapTest sends your study data to — your JLPT plan, review history, and progress are
            stored only on your own device.
          </p>
          <p className="mt-2">
            JapTest does not use analytics, advertising, or tracking of any kind. The only data
            it collects is what you enter yourself during setup (your JLPT level, exam date,
            study preferences), and that data never leaves your device.
          </p>
          <p className="mt-2">
            If you enable daily reminders, JapTest schedules local notifications on your device
            using your chosen time. These notifications are generated on-device and are not
            sent from a server.
          </p>
          <p className="mt-2">
            Since no data is transmitted anywhere, there is nothing for us to sell, share, or
            lose in a breach. Deleting the app deletes all of your JapTest data.
          </p>
        </section>

        <section id="support">
          <h2 className="text-lg font-semibold text-ink">Support</h2>
          <p className="mt-2">
            Questions, bug reports, or feedback about JapTest can be sent to{" "}
            <a href={`mailto:${contact.email}`} className="text-accent">
              {contact.email}
            </a>
            . We read every message.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Changes to this policy</h2>
          <p className="mt-2">
            If JapTest's data practices ever change — for example, if a future version adds
            optional cloud sync or accounts — this page will be updated first, with the date
            above reflecting the change, before that feature ships.
          </p>
        </section>
      </div>
    </main>
  );
}
