"use client";

import Image from "next/image";
import BentoCard from "../components/BentoCard";
import BentoGrid from "../components/BentoGrid";
import ScrollVelocity from "../components/ScrollVelocity";
import ScrollReveal from "../components/ScrollReveal";
import ShinyText from "../components/ShinyText";
import TiltedCard from "../components/TiltedCard";
import { useHomepageScripts } from "../hooks/useHomepageScripts";

const HERO_LETTERS = ["T", "A", "B", "A", "N", "I"];

const NAV_CARDS = [
  {
    href: "#stack",
    className: "col-span-2 row-start-1",
    placeholder: "stack",
    label: "Stack",
  },
  {
    href: "#projek",
    className: "col-start-3 row-start-1",
    label: "Projek",
  },
  {
    href: "#filosofi",
    className: "col-start-1 row-start-2",
    placeholder: "filosofi",
    label: "Filosofi",
  },
  {
    href: "#pendidikan",
    className: "col-start-2 col-span-2 row-start-2",
    placeholder: "pendidikan",
    label: "Pendidikan",
  },
  {
    href: "#dkv-side",
    className: "col-span-2 row-start-3",
    placeholder: "dkv-side",
    label: "dkv side",
  },
  {
    href: "#cv",
    className: "col-start-3 row-start-3",
    placeholder: "cv",
    label: "dw cv",
  },
];

const HELLO_ALL_MARQUEE = [
  "Halo semua",
  "Hello everyone",
  "¡Hola a todos!",
  "안녕하세요",
  "Bonjour à tous",
  "Ciao a tutti",
  "Hallo Belanda",
  "Hallo Jerman",
  "Olá Portugal",
  "Hej Swedia",
  "Hei Finlandia",
  "Merhaba Turki",
  "السلام عليكم",
  "नमस्ते",
  "こんにちは",
];

const HELLO_ALL_MARQUEE_TEXT = `${HELLO_ALL_MARQUEE.join(" • ")} •`;

const INTRO_PARAGRAPHS = [
  "gua tabani, seorang junior programmer yang hobi ngulik ekosistem Laravel dan ngebangun alur kerja web yang rapi.",
  "fokus gua ada di aplikasi yang nggak cuma jalan, tapi juga aman, responsif, dan enak dipakai buat kebutuhan real-time.",
  "dari magang di Rubicweb sampai ngerjain marketplace otomotif, gua selalu percaya kalau kode yang bersih adalah pondasi produk yang hebat.",
];

export default function Home() {
  useHomepageScripts();

  return (
    <main className="w-full min-h-screen overflow-x-hidden" id="top">
      {/* Section 1: Hero */}
      <header className="relative w-full h-svh min-h-svh supports-[height:100dvh]:h-dvh supports-[height:100dvh]:min-h-dvh overflow-hidden [container-type:size] [container-name:hero]" aria-label="Hero">
        <h1 className="absolute inset-0 z-[3] flex items-center justify-center m-0 p-0 pointer-events-none select-none" aria-label="TABANI">
          <span className="flex items-center justify-between w-full h-full px-[0.08em] box-border font-[TabaniDisplay,Inter,Poppins,Arial,Helvetica,sans-serif] font-normal text-[100cqh] leading-[0.72] [@supports_not_(font-size:1cqh)]:text-[clamp(200px,85vmin,900px)]" aria-hidden="true">
            {HERO_LETTERS.map((letter, index) => (
              <ShinyText
                key={`${letter}-${index}`}
                className="relative block text-[1300px] font-[inherit] font-normal leading-[inherit] uppercase"
                text={letter}
                speed={2.5}
                delay={0.5}
                color="var(--color-red)"
                shineColor="#ff0000"
                spread={120}
                direction="left"
                yoyo={false}
              />
            ))}
          </span>
        </h1>
        <Image
          src="/assets/img/homepage.jpg"
          alt="Tabani — foto profil dengan latar graffiti"
          className="absolute inset-0 z-[2] w-full h-full object-cover object-center block"
          fill
          priority
          sizes="100vw"
        />
      </header>

      {/* Section 3: Intro split - Dibuat mengunci h-screen agar pas satu layar penuh */}
      <section className="w-full h-screen min-h-screen bg-black flex flex-col justify-between overflow-hidden" aria-label="Perkenalan">

        {/* Marquee Atas - Menempel di ujung atas section */}
        <div className="w-full pt-2">
          <ScrollVelocity
            className="text-[clamp(36px,7vw,120px)] font-black leading-[0.86] uppercase text-brand-red"
            texts={[HELLO_ALL_MARQUEE_TEXT]}
            velocity={60}
            numCopies={8}
            parallaxClassName="w-full flex items-center justify-start relative overflow-hidden"
            scrollerClassName="flex whitespace-nowrap"
          />
        </div>

        {/* Grid Layout Tengah - Dibagi rata 2 kolom (Kiri Gambar, Kanan Teks) */}
        <div className="w-full grid grid-cols-2 gap-8 px-16 items-center max-[768px]:grid-cols-1 max-[768px]:px-6 flex-1">

          {/* SEBELAH KIRI: TiltedCard */}
          <div className="text-brand-red flex items-center justify-center">
            <div className="w-full max-w-[400px] aspect-square">
              <TiltedCard
                imageSrc="/assets/img/homepage.jpg"
                altText="Foto Tabani"
                captionText="Tabani"
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={10}
                scaleOnHover={1.03}
                showMobileWarning={false}
                showTooltip
                displayOverlayContent
                overlayContent={
                  <div className="flex h-full w-full items-end justify-start rounded-[15px] bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5">
                    <div className="flex flex-col gap-1 text-left">
                      <p className="m-0 text-[clamp(26px,3vw,40px)] font-black leading-none text-white">
                        tabani
                      </p>
                      <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#780606]">
                        junior programmer
                      </p>
                    </div>
                  </div>
                }
              />
            </div>
          </div>

          {/* SEBELAH KANAN: Teks Perkenalan */}
          <div className="flex items-center justify-start text-left">
            <div className="w-full max-w-[580px] flex flex-col gap-4">
              <p className="m-0 text-[clamp(12px,1.1vw,16px)] font-black leading-none tracking-[0.18em] uppercase text-brand-red">
                perkenalan
              </p>

              <ScrollReveal as="h2" className="m-0 text-[clamp(36px,4.5vw,64px)] font-black leading-[0.95] lowercase text-white">
                gua tabani
              </ScrollReveal>

              <div className="flex flex-col gap-3 mt-2">
                {INTRO_PARAGRAPHS.map((paragraph) => (
                  <ScrollReveal
                    key={paragraph}
                    as="p"
                    className="w-full m-0 text-[clamp(14px,1.8vh,19px)] font-medium leading-[1.5] tracking-[0.02em] text-zinc-300"
                  >
                    {paragraph}
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Marquee Bawah - Menempel di ujung bawah section */}
        <div className="w-full pb-2">
          <ScrollVelocity
            className="text-[clamp(36px,7vw,120px)] font-black leading-[0.86] uppercase text-brand-red"
            texts={[HELLO_ALL_MARQUEE_TEXT]}
            velocity={-60}
            numCopies={8}
            parallaxClassName="w-full flex items-center justify-start relative overflow-hidden"
            scrollerClassName="flex whitespace-nowrap"
          />
        </div>
      </section>

      {/* Section 4: Bento card grid */}
      <section className="w-full h-screen bg-brand-orange p-[clamp(14px,2vh,24px)] box-border flex flex-col min-h-0" aria-label="Navigasi portfolio">
        <BentoGrid as="nav" className="flex-1 w-full min-h-0 grid grid-cols-3 grid-rows-[1fr_1.237fr_1fr] gap-[clamp(12px,1.8vh,22px)_clamp(14px,2vw,22px)]" aria-label="Menu utama">
          {NAV_CARDS.map((card) => (
            <BentoCard
              key={card.href}
              href={card.href}
              className={card.className}
              placeholder={card.placeholder}
              label={card.label}
            />
          ))}
        </BentoGrid>
      </section>

      {/* Section 5: Project band */}
      <section
        id="projek"
        className="w-full min-h-screen bg-black text-brand-red flex items-center justify-center"
        aria-labelledby="project-heading"
      >
        <h2 id="project-heading" className="m-0 text-[clamp(42px,7vh,72px)] font-black leading-none text-center">
          Projek
        </h2>
      </section>

      {/* Section 6: Contact & footer */}
      <footer
        className="w-full min-h-[400px] bg-black text-brand-red flex items-center justify-center"
        id="contact"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="m-0 text-[clamp(38px,6vh,64px)] font-black leading-none text-center">
          Contact & Footer
        </h2>
      </footer>
    </main>
  );
}
