import { Link } from "react-router-dom";
import { contact } from "../../data/products";
import { SHOW_PARTNERS } from "../../lib/joSections";

// Terms of Use for JapanOne (japanone.app and the JapanOne app). Plain English; keep the
// "not advice", "not an agent" and "no copying or scraping" sections in step with the product.
const UPDATED = "November 11, 2026";

const SECTIONS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "about",
    title: "1. About these terms",
    body: (
      <p>
        These terms apply to the JapanOne website (japanone.app) and the JapanOne app, made by Muthamil Technologies in Tokyo,
        Japan ("we", "us"). By using JapanOne you agree to them. If you don't agree, please don't use JapanOne.
      </p>
    ),
  },
  {
    id: "information",
    title: "2. General information, not advice",
    body: (
      <>
        <p>
          JapanOne gives general information and tools about learning Japanese and studying, working, travelling and living in
          Japan. It is not legal, immigration, visa, tax or financial advice, and it is not a decision about your own case.
        </p>
        <p>
          We take facts from official sources and show the date we checked them, but rules change and every case is different.
          Before you decide anything, check the official source, your school or employer, or a licensed specialist (for example a
          行政書士 for visa matters). Plans, estimates and calculators show estimates only.
        </p>
      </>
    ),
  },
  {
    id: "not-an-agent",
    title: "3. We are not an agent",
    body: (
      <>
        <p>
          JapanOne does not recruit or place workers, admit students, sell tours or take bookings, applications or payments for
          anyone.{SHOW_PARTNERS && <> Schools, employers, tour agencies and shops ("partners") list their own information. When you apply, book or buy,
          you deal directly with the partner on their own channels, and your agreement is with them, not with us.</>}
          {!SHOW_PARTNERS && <> When you contact a school, employer or other organisation from a link in our guides, you deal with them
          directly and your agreement is with them, not with us.</>}
        </p>
        {SHOW_PARTNERS && <p>
          We review listings before they go live, but we can't check every detail. If something looks wrong, use "Report this
          listing" or contact us.
        </p>}
      </>
    ),
  },
  {
    id: "accounts",
    title: "4. Your account",
    body: (
      <p>
        An account is optional. If you create one, keep your sign-in details to yourself and give accurate information. You can
        delete your account at any time from your account page. How we handle your data is explained in our{" "}
        <Link to="/japanone/legal" className="text-[#1f4fa8] underline">privacy policy</Link>.
      </p>
    ),
  },
  {
    id: "content",
    title: "5. Our content and how you may use it",
    body: (
      <>
        <p>
          The text, guides, lessons, quizzes, tools, data compilations, images, characters (including Maru), design and software of
          JapanOne belong to Muthamil Technologies or our licensors and are protected by copyright and other laws. "JapanOne" and
          its logo are our marks.
        </p>
        <p>
          You may use JapanOne for your own, personal and non-commercial purposes. You may share links to any page, and quote a short
          part of a guide if you name JapanOne and link to the page.
        </p>
      </>
    ),
  },
  {
    id: "not-allowed",
    title: "6. What is not allowed",
    body: (
      <>
        <p>Without our written permission, you must not:</p>
        <ul className="m-0 flex flex-col gap-1.5 pl-6">
          <li>copy, republish, translate, sell or distribute our guides, lessons, quizzes, tools, data or design, in whole or in substantial part, on another website, app, social media account, book or course;</li>
          <li>scrape, crawl, harvest or download JapanOne content or data with bots, scripts or other automated means (search engines indexing pages for search results are welcome);</li>
          <li>use JapanOne content or data to train, fine-tune or test artificial intelligence or machine-learning systems, or to build datasets;</li>
          <li>copy, decompile or reverse-engineer the app or the website's software, or build a competing product from it;</li>
          <li>frame or mirror JapanOne, or remove copyright, source or "not advice" notices;</li>
          <li>use the JapanOne name, logo or characters in a way that suggests we are connected with or endorse you;</li>
          <li>{SHOW_PARTNERS ? "post false listings or reports, spam" : "spam"}, break the law, or interfere with JapanOne or other people's use of it.</li>
        </ul>
        <p>
          We may block access, remove content or end accounts that break these rules, and we may take legal action, including for
          copyright infringement.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    title: "7. Changes and availability",
    body: (
      <p>
        We may change, add or remove features and content, and JapanOne may sometimes be unavailable. We may update these terms; the
        date at the top shows the latest version, and continuing to use JapanOne means you accept the update.
      </p>
    ),
  },
  {
    id: "liability",
    title: "8. Our responsibility",
    body: (
      <p>
        We work to keep JapanOne accurate and available, but it is provided as it is. To the extent permitted by law, we are not
        responsible for losses caused by decisions made on general information, {SHOW_PARTNERS ? "by partners' listings, products or services, " : ""}or by
        third-party websites we link to. Nothing in these terms limits rights you have under Japanese law, including the Consumer
        Contract Act, or our responsibility for our own intentional acts or gross negligence.
      </p>
    ),
  },
  {
    id: "law",
    title: "9. Law and disputes",
    body: <p>These terms are governed by the laws of Japan. The Tokyo District Court has exclusive first-instance jurisdiction over any dispute.</p>,
  },
  {
    id: "contact",
    title: "10. Contact",
    body: (
      <p>
        Questions, permission requests or reports:{" "}
        <a href={`mailto:${contact.email}`} className="text-[#1f4fa8] underline">{contact.email}</a>
      </p>
    ),
  },
];

export function JOTerms() {
  return (
    <article className="mx-auto max-w-[820px] px-4 py-12 sm:px-6">
      <h1 className="m-0 text-[36px] font-black sm:text-[44px]">Terms of Use</h1>
      <p className="m-0 mt-2 text-sm text-jo-muted">JapanOne · Last updated {UPDATED}</p>
      <nav aria-label="Sections" className="mt-6 rounded-[18px] bg-white p-5 text-[15px]">
        <ol className="m-0 grid list-none gap-1 p-0 sm:grid-cols-2">
          {SECTIONS.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-[#1f4fa8]">{s.title}</a></li>)}
        </ol>
      </nav>
      <div className="mt-8 flex flex-col gap-8 leading-relaxed">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="flex flex-col gap-3 scroll-mt-24">
            <h2 className="m-0 text-xl font-extrabold">{s.title}</h2>
            {s.body}
          </section>
        ))}
      </div>
    </article>
  );
}
