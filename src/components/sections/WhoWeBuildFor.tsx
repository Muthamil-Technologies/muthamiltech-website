import { useReveal } from "../../hooks/useReveal";

const audiences = [
  {
    title: "People learning Japanese",
    text: "Build confidence in Japanese for everyday life.",
  },
  {
    title: "JLPT candidates",
    text: "Prepare for the next level of your Japanese journey.",
  },
  {
    title: "People looking for work in Japan",
    text: "Discover opportunities and build your career.",
  },
  {
    title: "People exploring Japan",
    text: "Plan memorable trips with less effort.",
  },
];

export function WhoWeBuildFor() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="border-b border-line bg-surface py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Who we build for
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="rounded-2xl border border-line bg-paper p-6 text-center"
            >
              <h3 className="text-sm font-bold text-ink">{audience.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{audience.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
