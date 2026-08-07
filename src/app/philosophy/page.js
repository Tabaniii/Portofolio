import ReturnToBentoLink from "../../components/ReturnToBentoLink";

export const metadata = {
  title: "My Philosophy — TABANI",
  description:
    "Principles behind execution — clarity, restraint, and craft in code and interface design.",
};

const PILLARS = [
  {
    number: "01",
    title: "Code as Craft",
    body: "Architecture is intentional, not accidental. Every layer should earn its place — efficient paths, clear boundaries, and security treated as a default, not an afterthought. Clean code is the quiet foundation of products that last.",
  },
  {
    number: "02",
    title: "Visual Harmony",
    body: "Grid, type, and space do the heavy lifting. Interfaces should feel responsive and calm — hierarchy that guides, rhythm that breathes, and interaction that never asks the user to work harder than necessary.",
  },
  {
    number: "03",
    title: "Continuous Development",
    body: "Curiosity is part of the craft. Exploring new ecosystems, refining old habits, and staying sharp keeps execution honest. Growth is not noise — it is the discipline of getting better at what matters.",
  },
];

export default function PhilosophyPage() {
  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-black text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,6,6,0.14),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] bg-[radial-gradient(ellipse_at_bottom,rgba(120,6,6,0.08),transparent_60%)]"
      />

      <header className="relative z-10 section-padding-x pt-8 sm:pt-10">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
          <ReturnToBentoLink
            className="group inline-flex min-h-11 items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-zinc-500 no-underline transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
          >
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Return
          </ReturnToBentoLink>
          <span className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-red">
            Philosophy
          </span>
        </div>
      </header>

      <article className="relative z-10 section-padding-x pb-24 pt-20 sm:pb-32 sm:pt-28 md:pt-36">
        <div className="mx-auto w-full max-w-3xl">
          <section className="border-l border-brand-red/35 pl-5 sm:pl-7">
            <p className="m-0 text-[11px] font-black uppercase tracking-[0.24em] text-brand-red sm:text-[12px]">
              My Philosophy
            </p>
            <h1 className="mt-5 m-0 text-[clamp(2.6rem,9vw,5.5rem)] font-black leading-[0.92] tracking-[-0.03em] text-white sm:mt-6">
              Clarity &amp; Restraint
            </h1>
            <p className="mt-8 m-0 max-w-2xl text-[17px] font-medium leading-relaxed text-zinc-300 sm:mt-10 sm:text-[18px] sm:leading-[1.75]">
              Dedicated to writing clean code and shaping intuitive interfaces —
              where every decision serves purpose, and nothing exists without
              reason.
            </p>
          </section>

          <div
            aria-hidden
            className="my-20 h-px w-full bg-gradient-to-r from-brand-red/40 via-white/10 to-transparent sm:my-28"
          />

          <section aria-label="Core pillars" className="flex flex-col gap-20 sm:gap-28">
            {PILLARS.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`flex flex-col gap-5 sm:gap-6 ${
                  index % 2 === 1 ? "sm:ml-10 md:ml-16" : ""
                }`}
              >
                <div className="flex items-baseline gap-4 sm:gap-5">
                  <span className="text-[12px] font-black uppercase tracking-[0.2em] text-brand-red/80">
                    {pillar.number}
                  </span>
                  <h2 className="m-0 text-[clamp(1.6rem,4.5vw,2.35rem)] font-black leading-[1.1] tracking-[-0.02em] text-white">
                    {pillar.title}
                  </h2>
                </div>
                <p className="m-0 max-w-2xl text-[16px] font-medium leading-relaxed text-zinc-400 sm:text-[17px] sm:leading-[1.75]">
                  {pillar.body}
                </p>
                <div
                  aria-hidden
                  className="mt-2 h-px w-16 bg-brand-red/30 shadow-[0_0_18px_rgba(120,6,6,0.35)]"
                />
              </div>
            ))}
          </section>

          <footer className="mt-28 border-t border-white/10 pt-12 sm:mt-36 sm:pt-16">
            <ReturnToBentoLink
              className="group inline-flex min-h-11 items-center gap-3 border border-white/10 px-5 py-3 text-[12px] font-black uppercase tracking-[0.2em] text-zinc-300 no-underline transition-[border-color,color,box-shadow] duration-300 hover:border-brand-red/40 hover:text-white hover:shadow-[0_0_24px_rgba(120,6,6,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
            >
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5"
              >
                ←
              </span>
              Return
            </ReturnToBentoLink>
          </footer>
        </div>
      </article>
    </main>
  );
}
