import { Link } from "react-router-dom";
import { contact } from "../data/products";

// Privacy & support page for the JapTour iOS app (japtour-mobile links here
// from its Profile tab). Keep in step with what the app actually does.
export function JapTourLegal() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link to="/" className="text-sm font-semibold text-accent">
        &larr; Back to Muthamil Technologies
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink">
        JapTour — Privacy &amp; Support
      </h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated: October 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-ink-soft">
        <section id="privacy">
          <h2 className="text-lg font-semibold text-ink">Privacy Policy</h2>
          <p className="mt-2">
            The JapTour app does not collect personal data. It works offline and everything you
            create stays on your device; nothing is sent to us. There are no accounts, no sign-in,
            no analytics, no advertising and no tracking. If you email us for support, see
            &ldquo;Contacting support&rdquo; below.
          </p>
          <p className="mt-2">
            The app stores the following only on your device: your saved trips and edits, travel
            dates, notes, your travel profile (default travellers, budget and interests), your
            home currency and the exchange rate you type in, spending entries, checklist ticks,
            saved places and dishes, bookings you add (such as hotel names, addresses and
            confirmation numbers), your own phrase cards, and your trip journal.
          </p>
        </section>

        <section id="permissions">
          <h2 className="text-lg font-semibold text-ink">Permissions</h2>
          <p className="mt-2">
            <span className="font-semibold text-ink">Calendar (optional).</span> When you choose
            &ldquo;Add to Calendar&rdquo;, JapTour asks for write-only access so it can add your
            trip&apos;s events and reminders. It cannot read, change or delete anything else in
            your calendar. The events then belong to your calendar app and sync however your
            calendar is set up.
          </p>
          <p className="mt-2">
            <span className="font-semibold text-ink">Photos (optional).</span> When you add a
            memory to your trip journal, you pick photos in Apple&apos;s photo picker. Only the
            photos you choose are copied into JapTour&apos;s own storage on your device, where
            they are used for your journal and recap reel. JapTour does not browse your library
            and never uploads your photos.
          </p>
          <p className="mt-2">
            <span className="font-semibold text-ink">Location: not used.</span> JapTour never
            asks for or uses your location. The trip map shows your planned stops only.
          </p>
        </section>

        <section id="other-apps">
          <h2 className="text-lg font-semibold text-ink">Maps, sharing and other apps</h2>
          <p className="mt-2">
            Map directions open in Apple Maps or Google Maps when you tap them; JapTour passes
            only the name of the place. From then on that app&apos;s own privacy policy applies.
            The in-app map is shown by Apple&apos;s MapKit.
          </p>
          <p className="mt-2">
            When you share a trip, a PDF, images or a recap, it goes only where you send it
            through your phone&apos;s share sheet.
          </p>
          <p className="mt-2">
            Phrase audio is pre-recorded and included in the app. Text you save in your own
            cards, and taxi-card addresses, are read aloud by your device&apos;s built-in voice,
            on the device. JapTour does not use the microphone.
          </p>
          <p className="mt-2">
            The current version of JapTour has no purchases, bookings or payments. If paid
            features are added later, they will be bought through Apple and we never receive
            your payment details. This page will be updated before that ships.
          </p>
        </section>

        <section id="backups">
          <h2 className="text-lg font-semibold text-ink">Backups and deleting your data</h2>
          <p className="mt-2">
            If your iPhone backs up apps (for example with iCloud Backup), that backup may include
            JapTour&apos;s data, including journal photos. Backups are stored by Apple under your
            own account, not by us.
          </p>
          <p className="mt-2">
            You can delete individual trips, bookings, journal entries and cards in the app.
            Deleting the app deletes all its data from your device. Copies in your device backups
            stay until you delete those backups. Because we don&apos;t hold any of your data,
            there is nothing for us to delete on our side.
          </p>
          <p className="mt-2">
            JapTour is a general travel app and does not knowingly collect information from
            anyone, including children.
          </p>
        </section>

        <section id="estimates">
          <h2 className="text-lg font-semibold text-ink">Estimates, not quotes</h2>
          <p className="mt-2">
            Costs, fares, travel times, opening days and season dates in JapTour are estimates to
            help you plan. They change, so check before you travel. JapTour is a planning tool,
            not a travel agency, and does not sell or book tours.
          </p>
        </section>

        <section id="contacting-support">
          <h2 className="text-lg font-semibold text-ink">Contacting support</h2>
          <p className="mt-2">
            If you email us, we receive your email address and whatever you include in your
            message. We use it only to reply to you. Messages are handled by our email provider
            and are never used for marketing or shared with anyone else. You can ask us to
            delete your messages at any time.
          </p>
        </section>

        <section id="support">
          <h2 className="text-lg font-semibold text-ink">Support</h2>
          <p className="mt-2">
            Questions, bug reports, or feedback about JapTour can be sent to{" "}
            <a href={`mailto:${contact.email}`} className="text-accent">
              {contact.email}
            </a>
            . We read every message.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Changes to this policy</h2>
          <p className="mt-2">
            If JapTour&apos;s data practices change, this page will be updated first, with the
            date above reflecting the change.
          </p>
        </section>
      </div>
    </main>
  );
}
