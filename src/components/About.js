"use client";

import ScrollVelocity from "./ScrollVelocity";
import ScrollReveal from "./ScrollReveal";
import TiltedCard from "./TiltedCard";

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

export default function About() {
  return (
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
  );
}
