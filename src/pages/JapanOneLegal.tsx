import { Link } from "react-router-dom";
import { contact } from "../data/products";

// Privacy & support page for the JapanOne app (iOS and Android), which
// replaced JapTalk (its Speak section) and JapTutor (its JLPT section). Keep in
// step with what the app does, and with the JLPT section's in-app policy
// (japtalk-mobile: packages/jlpt/lib/screens/legal/privacy_policy_screen.dart).
export function JapanOneLegal() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link to="/" className="text-sm font-semibold text-accent">
        &larr; Back to Muthamil Technologies
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink">
        JapanOne — Privacy &amp; Support
      </h1>
      <p className="mt-2 text-sm text-ink-faint">
        Last updated: October 2026 · JapanOne is an app by Muthamil Technologies.
      </p>

      <div className="mt-8 flex flex-col gap-6 text-ink-soft">
        <section id="privacy">
          <h2 className="text-lg font-semibold text-ink">Privacy Policy</h2>
          <p className="mt-2">
            The JapanOne app does not collect personal data. There are no accounts, no sign-in,
            no analytics, no advertising and no tracking. All lessons are included in the app,
            and what you do in it is stored only on your device; nothing is sent to us. If you
            email us for support, see &ldquo;Contacting support&rdquo; below.
          </p>
          <p className="mt-2">The app stores the following only on your device:</p>
          <ul className="mt-2 list-disc pl-6">
            <li>which section you used last (Speak or JLPT);</li>
            <li>
              <span className="font-semibold text-ink">Speak:</span> your onboarding answers
              (learning goal and starting level), your settings and daily goal, and your learning
              progress (completed lessons and exercises, words you have practised, and your
              speaking statistics);
            </li>
            <li>
              <span className="font-semibold text-ink">JLPT:</span> your exam date and level,
              your study plan, lesson progress, homework, daily test results, reminder settings
              and settings.
            </li>
          </ul>
        </section>

        <section id="microphone">
          <h2 className="text-lg font-semibold text-ink">Microphone and speech recognition (Speak)</h2>
          <p className="mt-2">
            Voice practice is optional; you can always type your answer instead. When you tap the
            microphone, JapanOne asks for microphone permission and uses your phone&apos;s
            built-in speech recognition to turn what you say into Japanese text, which the app
            then checks on your device. JapanOne does not record, save or upload your voice
            itself. The JLPT section does not use the microphone.
          </p>
          <p className="mt-2">
            <span className="font-semibold text-ink">On iPhone</span>, speech recognition is
            provided by Apple. Depending on your device and settings, Apple may process the audio
            on its servers under{" "}
            <a href="https://www.apple.com/legal/privacy/" className="text-accent">
              Apple&apos;s privacy policy
            </a>
            .
          </p>
          <p className="mt-2">
            <span className="font-semibold text-ink">On Android</span>, speech recognition is
            provided by your phone&apos;s speech service, usually Google. Depending on your device
            and settings, Google may process the audio on its servers under{" "}
            <a href="https://policies.google.com/privacy" className="text-accent">
              Google&apos;s privacy policy
            </a>
            .
          </p>
        </section>

        <section id="audio">
          <h2 className="text-lg font-semibold text-ink">Audio and reminders (JLPT)</h2>
          <p className="mt-2">
            Lesson and tutor audio is pre-recorded and included in the app. When a line has no
            recording, your device&apos;s built-in text-to-speech reads it on the device.
          </p>
          <p className="mt-2">
            Study reminders are optional and are scheduled on your device; they are not sent
            from a server. The app asks for notification permission only when you turn a
            reminder on.
          </p>
        </section>

        <section id="purchases">
          <h2 className="text-lg font-semibold text-ink">Purchases</h2>
          <p className="mt-2">
            JapanOne has no purchases; every lesson is free. If paid features are ever added,
            they will be bought through the App Store or Google Play, and we never receive your
            payment details. This page will be updated before that ships.
          </p>
        </section>

        <section id="backups">
          <h2 className="text-lg font-semibold text-ink">Backups and deleting your data</h2>
          <p className="mt-2">
            If your phone backs up apps (for example with iCloud Backup or Google backup), that
            backup may include JapanOne&apos;s data, such as your progress. Backups are stored
            by Apple or Google under your own account, not by us.
          </p>
          <p className="mt-2">
            Deleting the app deletes all its data from your device. Copies in your device backups
            stay until you delete those backups. Because we don&apos;t hold any of your data,
            there is nothing for us to delete on our side.
          </p>
          <p className="mt-2">
            JapanOne is an app for a general audience and does not knowingly collect information
            from anyone, including children.
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
            Questions, bug reports, or feedback about JapanOne can be sent to{" "}
            <a href={`mailto:${contact.email}`} className="text-accent">
              {contact.email}
            </a>
            . We read every message.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Changes to this policy</h2>
          <p className="mt-2">
            If JapanOne&apos;s data practices change, this page and the policy inside the app
            will be updated first, with the date above reflecting the change.
          </p>
        </section>
      </div>
    </main>
  );
}
