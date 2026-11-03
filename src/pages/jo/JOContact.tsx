import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Choice } from "../../components/jo/Choice";

// Contact form for users and partners. Sent with Netlify Forms (form "contact"; the hidden copy in
// index.html lets Netlify detect it), which emails each message to us, so no address is in the page.
const TOPICS: [string, string][] = [
  ["user", "Using JapanOne"],
  ["school", "School or institute"],
  ["employer", "Employer"],
  ["tour_agency", "Tour agency"],
  ["seller", "Shop"],
  ["other", "Something else"],
];

const field = "w-full rounded-xl border border-[#d9dee6] bg-white px-3 py-2.5 text-base text-jo-navy";

export function JOContact() {
  const [params] = useSearchParams();
  const fromLink = params.get("topic");
  const [form, setForm] = useState({
    topic: TOPICS.some(([v]) => v === fromLink) ? fromLink! : "user",
    name: "",
    email: "",
    organisation: "",
    message: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const partner = !["user", "other"].includes(form.topic);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = new FormData(e.currentTarget);
    data.set("form-name", "contact");
    data.set("topic", form.topic);
    if (!partner) data.delete("organisation");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="mx-auto max-w-[760px] px-4 py-14 sm:px-6">
      <h1 className="mb-3 mt-0 text-[36px] font-black sm:text-[44px]">Contact us</h1>
      <p className="m-0 text-lg leading-relaxed text-jo-muted">
        A question about JapanOne, an idea, or interest in becoming a partner? Send us a message and we'll reply by email.
      </p>
      <p lang="ja" className="mt-2 text-sm text-jo-muted">日本語でのお問い合わせも承ります。</p>

      {state === "sent" ? (
        <div className="mt-8 rounded-[22px] bg-white p-7">
          <strong className="text-xl font-extrabold">Thank you, your message is on its way.</strong>
          <p className="mb-0 mt-2 leading-relaxed text-jo-muted">We read every message and reply to {form.email || "your email"}, usually within a few working days.</p>
          <Link to="/" className="mt-4 inline-block font-bold">Back to JapanOne →</Link>
        </div>
      ) : (
        <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} className="mt-8 flex flex-col gap-5 rounded-[22px] bg-white p-6 sm:p-7">
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>Leave this empty: <input name="bot-field" /></label>
          </p>
          <div className="flex flex-col gap-2">
            <strong>What is it about?</strong>
            <Choice name="topic" value={form.topic} options={TOPICS} onChange={(v) => setForm({ ...form, topic: v })} />
          </div>
          <label className="flex flex-col gap-1.5 font-semibold">
            Your name
            <input name="name" required value={form.name} onChange={set("name")} className={field} autoComplete="name" />
          </label>
          <label className="flex flex-col gap-1.5 font-semibold">
            Your email
            <input name="email" type="email" required value={form.email} onChange={set("email")} className={field} autoComplete="email" />
          </label>
          {partner && (
            <label className="flex flex-col gap-1.5 font-semibold">
              Organisation name
              <input name="organisation" value={form.organisation} onChange={set("organisation")} className={field} autoComplete="organization" />
            </label>
          )}
          <label className="flex flex-col gap-1.5 font-semibold">
            Message
            <textarea name="message" required rows={6} maxLength={4000} value={form.message} onChange={set("message")} className={field} />
          </label>
          <p className="m-0 text-sm leading-relaxed text-jo-muted">
            We use your name and email only to reply to you. See our{" "}
            <Link to="/japanone/legal#contacting-support" className="text-[#1f4fa8] underline">privacy policy</Link>.
            Please don't send passport, residence card or bank details.
          </p>
          {state === "error" && (
            <p role="alert" className="m-0 rounded-xl bg-[#fdeadb] p-3 text-[#9a4612]">
              Sorry, the message couldn't be sent. Please try again in a moment.
            </p>
          )}
          <button type="submit" disabled={state === "sending"} className="self-start rounded-full bg-jo-navy px-6 py-3 font-bold text-white disabled:opacity-60">
            {state === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}
