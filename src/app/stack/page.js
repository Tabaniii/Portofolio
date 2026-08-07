import ReturnToBentoLink from "../../components/ReturnToBentoLink";
import TechBadge from "../../components/TechBadge";
import { STACK_CATEGORIES } from "../../data/techStack";

export const metadata = {
  title: "Tech Stack & Capabilities — TABANI",
  description:
    "Front-end, back-end, database, and infrastructure tools behind the work.",
};

export default function StackPage() {
  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-black text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,6,6,0.14),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42vh] bg-[radial-gradient(ellipse_at_bottom,rgba(120,6,6,0.08),transparent_60%)]"
      />

      <header className="relative z-10 section-padding-x pt-8 sm:pt-10">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <ReturnToBentoLink className="group inline-flex min-h-11 items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-zinc-500 no-underline transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red">
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Return
          </ReturnToBentoLink>
          <span className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-red">
            Stack
          </span>
        </div>
      </header>

      <article className="relative z-10 section-padding-x pb-24 pt-16 sm:pb-32 sm:pt-24 md:pt-28">
        <div className="mx-auto w-full max-w-5xl">
          <section className="border-l border-brand-red/35 pl-5 sm:pl-7">
            <p className="m-0 text-[11px] font-black uppercase tracking-[0.24em] text-brand-red sm:text-[12px]">
              Tech Stack &amp; Capabilities
            </p>
            <h1 className="mt-5 m-0 max-w-3xl text-[clamp(2.4rem,8vw,4.75rem)] font-black leading-[0.94] tracking-[-0.03em] text-white sm:mt-6">
              Tools Behind Execution
            </h1>
            <p className="mt-8 m-0 max-w-2xl text-[16px] font-medium leading-relaxed text-zinc-300 sm:mt-10 sm:text-[18px] sm:leading-[1.75]">
              A curated map of languages, frameworks, and infrastructure used to
              ship clean systems — organized by layer, easy to scan, easy to
              refine.
            </p>
          </section>

          <div
            aria-hidden
            className="my-16 h-px w-full bg-gradient-to-r from-brand-red/40 via-white/10 to-transparent sm:my-24"
          />

          <div className="flex flex-col gap-20 sm:gap-28 md:gap-32">
            {STACK_CATEGORIES.map((category) => (
              <section
                key={category.id}
                id={category.id}
                aria-labelledby={`stack-${category.id}-title`}
                className="scroll-mt-24"
              >
                <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:max-w-2xl">
                  <div className="flex items-baseline gap-4 sm:gap-5">
                    <span className="text-[12px] font-black uppercase tracking-[0.2em] text-brand-red/80">
                      {category.number}
                    </span>
                    <h2
                      id={`stack-${category.id}-title`}
                      className="m-0 text-[clamp(1.45rem,3.8vw,2.1rem)] font-black leading-[1.1] tracking-[-0.02em] text-white"
                    >
                      {category.title}
                    </h2>
                  </div>
                  {category.description ? (
                    <p className="m-0 text-[15px] font-medium leading-relaxed text-zinc-500 sm:text-[16px] sm:leading-[1.7]">
                      {category.description}
                    </p>
                  ) : null}
                </div>

                {category.caption ? (
                  <p className="mb-6 m-0 max-w-3xl text-[13px] font-medium leading-relaxed text-neutral-500 sm:mb-8 sm:text-[14px] sm:leading-[1.7]">
                    {category.caption}
                  </p>
                ) : null}

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-3">
                  {category.items.map((item) => (
                    <TechBadge
                      key={`${category.id}-${item.name}`}
                      name={item.name}
                      slug={item.slug}
                      color={item.color}
                    />
                  ))}
                </div>

                <div
                  aria-hidden
                  className="mt-10 h-px w-16 bg-brand-red/30 shadow-[0_0_18px_rgba(120,6,6,0.35)] sm:mt-12"
                />
              </section>
            ))}
          </div>

          <footer className="mt-24 border-t border-white/10 pt-12 sm:mt-32 sm:pt-16">
            <ReturnToBentoLink className="group inline-flex min-h-11 items-center gap-3 border border-white/10 px-5 py-3 text-[12px] font-black uppercase tracking-[0.2em] text-zinc-300 no-underline transition-[border-color,color,box-shadow] duration-300 hover:border-brand-red/40 hover:text-white hover:shadow-[0_0_24px_rgba(120,6,6,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red">
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
