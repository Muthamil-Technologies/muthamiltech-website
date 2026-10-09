import { Link } from "react-router-dom";
import { contact } from "../data/products";

// Mirrors the in-app policy in japtutor-mobile
// (lib/screens/legal/privacy_policy_screen.dart). Keep the two in step.
export function JapTutorLegal() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link to="/" className="text-sm font-semibold text-accent">
        &larr; Back to Muthamil Technologies
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink">
        JapTutor — Privacy &amp; Support
      </h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated: October 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-ink-soft">
        <section id="privacy">
          <h2 className="text-lg font-semibold text-ink">Privacy Policy</h2>
          <p className="mt-2">
            The JapTutor app does not collect personal data. Your study information stays on
            your device and is never sent to us. There are no accounts, no sign-in, no
            analytics, no advertising and no tracking. If you email us for support, see
            &ldquo;Contacting support&rdquo; below.
          </p>
          <p className="mt-2">
            The app stores your exam date and level, your study plan, lesson progress,
            homework, daily test results, reminder settings and app settings only on your
            device. It is not sent to us or to anyone else.
          </p>
          <p className="mt-2">
            The current version of JapTutor has no purchases. If paid content is added later,
            subscriptions will be bought and managed through Apple (App Store) or Google
            (Google Play); we never receive your payment details. This page will be updated
            before that ships.
          </p>
          <p className="mt-2">
            Reminders are optional and are scheduled on your device. They are not sent from a
            server.
          </p>
          <p className="mt-2">
            Lesson and tutor audio is pre-recorded and included in the app. The app does not
            use the microphone and does not send anything you type or say anywhere. When a line
            has no recording, your device&apos;s built-in text-to-speech reads it on the device.
          </p>
          <p className="mt-2">
            If your device backs up apps (for example iCloud Backup on iPhone, or Google backup
            on Android), that backup may include JapTutor&apos;s data, such as your study
            progress. Backups are stored by Apple or Google under your own account, not by us,
            and let you restore your progress on a new device.
          </p>
          <p className="mt-2">
            Deleting the app deletes its data from your device. Copies in your device backups
            stay until you delete those backups in your device or account settings. Because we
            don&apos;t hold any of your study data, there is nothing for us to delete on our
            side.
          </p>
          <p className="mt-2">
            JapTutor is a general study app and does not knowingly collect information from
            anyone, including children.
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
            Questions, bug reports, or feedback about JapTutor can be sent to{" "}
            <a href={`mailto:${contact.email}`} className="text-accent">
              {contact.email}
            </a>
            . We read every message.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Changes to this policy</h2>
          <p className="mt-2">
            If JapTutor&apos;s data practices change, this page and the policy inside the app
            will be updated first, with the date above reflecting the change.
          </p>
        </section>
      </div>
    </main>
  );
}
