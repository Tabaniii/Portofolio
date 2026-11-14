import ReturnToBentoLink from "../../components/ReturnToBentoLink";
import WorkflowSection from "../../components/workflow/WorkflowSection";

export const metadata = {
  title: "Cara Kerja Kami (How We Work) — TABANI",
  description:
    "6 tahapan alur kerja pembuatan website profesional, terstruktur, dan mudah dipahami oleh pemilik bisnis dan UMKM.",
};

export default function CaraKerjaPage() {
  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-black text-white">
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,6,6,0.16),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] bg-[radial-gradient(ellipse_at_bottom,rgba(120,6,6,0.1),transparent_60%)]"
      />

      {/* Header bar navigasi atas */}
      <header className="relative z-10 section-padding-x pt-8 sm:pt-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
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
            How We Work
          </span>
        </div>
      </header>

      {/* Konten Halaman */}
      <article className="relative z-10 section-padding-x pb-24 pt-16 sm:pb-32 sm:pt-20 md:pt-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* Hero Judul & Ringkasan */}
          <section className="border-l border-brand-red/35 pl-5 sm:pl-7">
            <p className="m-0 text-[11px] font-black uppercase tracking-[0.24em] text-brand-red sm:text-[12px]">
              Alur Kerja Terstruktur
            </p>
            <h1 className="mt-4 m-0 max-w-4xl text-[clamp(2.4rem,7.5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-white sm:mt-5">
              Cara Kerja Kami
            </h1>
            <p className="mt-6 m-0 max-w-3xl text-[16px] font-medium leading-relaxed text-zinc-300 sm:mt-8 sm:text-[18px] sm:leading-[1.7]">
              Membangun website tidak harus membingungkan atau penuh jargon teknis. Kami memandu Anda lewat 6 tahapan yang jelas, transparan, dan terukur — dari ide awal sampai website siap mendatangkan pelanggan bagi bisnis Anda.
            </p>
          </section>

          {/* Garis Pembatas Gradien */}
          <div
            aria-hidden
            className="my-12 h-px w-full bg-gradient-to-r from-brand-red/40 via-white/10 to-transparent sm:my-16"
          />

          {/* Komponen Alur Kerja 6 Tahapan & CTA */}
          <WorkflowSection />
        </div>
      </article>
    </main>
  );
}
