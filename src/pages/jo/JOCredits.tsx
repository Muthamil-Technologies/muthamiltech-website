import { PHOTOS } from "../../data/joPhotos";

// /credits: every photograph on japanone.app with its creator, licence and source page.
export function JOCredits() {
  return (
    <article className="mx-auto max-w-[900px] px-4 py-14 sm:px-6">
      <h1 className="t-heading m-0">Photo credits</h1>
      <p className="m-0 mt-3 text-[20px] leading-relaxed">
        The photographs on JapanOne come from Wikimedia Commons under open licences. Thank you to the photographers.
      </p>
      <ul className="m-0 mt-8 flex list-none flex-col gap-1 rounded-[28px] bg-white p-3 sm:p-5">
        {PHOTOS.map((p) => (
          <li key={p.id} className="flex items-center gap-4 rounded-2xl px-3 py-3 sm:px-4">
            <img src={p.src} alt="" loading="lazy" className="h-16 w-24 shrink-0 rounded-xl object-cover" />
            <span className="flex min-w-0 flex-col">
              <a href={p.page} target="_blank" rel="noreferrer" className="font-bold text-jo-navy">{p.title}</a>
              <span className="t-small text-jo-muted">
                by {p.creator} · <a href={p.licenseUrl} target="_blank" rel="noreferrer" className="text-jo-muted underline">{p.license}</a>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
