"use client";

import Image from "next/image";
import BentoCard from "../components/BentoCard";
import BentoGrid from "../components/BentoGrid";
import ScrollVelocity from "../components/ScrollVelocity";
import ShinyText from "../components/ShinyText";
import TiltedCard from "../components/TiltedCard";
import { useHomepageScripts } from "../hooks/useHomepageScripts";

const HERO_LETTERS = ["T", "A", "B", "A", "N", "I"];

const NAV_CARDS = [
  {
    href: "#stack",
    className: "grid-card card-stack",
    placeholder: "stack",
    label: "Stack",
  },
  {
    href: "#projek",
    className: "grid-card card-projek",
    label: "Projek",
  },
  {
    href: "#filosofi",
    className: "grid-card card-filosofi",
    placeholder: "filosofi",
    label: "Filosofi",
  },
  {
    href: "#pendidikan",
    className: "grid-card card-pendidikan",
    placeholder: "pendidikan",
    label: "Pendidikan",
  },
  {
    href: "#dkv-side",
    className: "grid-card card-dkv",
    placeholder: "dkv-side",
    label: "dkv side",
  },
  {
    href: "#cv",
    className: "grid-card card-cv",
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
  "Hallo allemaal",
  "Hallo zusammen",
  "Olá a todos",
  "Hej allihopa!",
  "Hei kaikki!",
  "Merhaba herkese",
  "السلام عليكم للجميع",
  "नमस्ते सबको",
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
    <main className="homepage" id="top">
      {/* Section 1: Hero */}
      <header className="hero-section" aria-label="Hero">
        <h1 className="hero-title" aria-label="TABANI">
          <span className="hero-title-track" aria-hidden="true">
            {HERO_LETTERS.map((letter, index) => (
              <ShinyText
                key={`${letter}-${index}`}
                className="hero-title-letter"
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
          className="hero-image"
          fill
          priority
          sizes="100vw"
        />
      </header>

      {/* Section 3: Intro split */}
      <section className="intro-section" aria-label="Perkenalan">
        <ScrollVelocity
          className="intro-marquee-text"
          texts={[HELLO_ALL_MARQUEE_TEXT]}
          velocity={60}
          numCopies={8}
          parallaxClassName="intro-marquee intro-marquee-top"
          scrollerClassName="intro-marquee-scroller"
        />
        
        <div className="intro-split">
          <div className="intro-card-name" aria-label="card name">
            <div className="w-full max-w-[420px]">
              <TiltedCard
                imageSrc="/assets/img/homepage.jpg"
                altText="Foto Tabani"
                captionText="Tabani"
                containerHeight="420px"
                containerWidth="100%"
                imageHeight="420px"
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

          <div className="intro-bio">
            <div className="intro-bio-copy">
              <p className="intro-bio-eyebrow">perkenalan</p>
              <h2 className="intro-bio-title">gua tabani</h2>
              {INTRO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph} className="bio-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <ScrollVelocity
          className="intro-marquee-text"
          texts={[HELLO_ALL_MARQUEE_TEXT]}
          velocity={-60}
          numCopies={8}
          parallaxClassName="intro-marquee intro-marquee-bottom"
          scrollerClassName="intro-marquee-scroller"
        />
      </section>

      {/* Section 4: Bento card grid */}
      <section className="card-grid-section" aria-label="Navigasi portfolio">
        <BentoGrid as="nav" className="card-grid" aria-label="Menu utama">
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
        className="project-section"
        aria-labelledby="project-heading"
      >
        <h2 id="project-heading" className="project-title">
          Projek
        </h2>
      </section>

      {/* Section 6: Contact & footer */}
      <footer
        className="footer-section"
        id="contact"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="footer-title">
          Contact & Footer
        </h2>
      </footer>
    </main>
  );
}
