"use client";

import Image from "next/image";
import BentoCard from "../components/BentoCard";
import BentoGrid from "../components/BentoGrid";
import ScrollVelocity from "../components/ScrollVelocity";
import ShinyText from "../components/ShinyText";
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
  "hallo semua",
  "Halo Semua",
  "Hello Everyone",
  "Hola a todos",
  "Bonjour a tous",
  "Ciao a tutti",
  "Hallo allemaal",
  "Hallo zusammen",
  "Ola a todos",
  "Hej allihopa",
  "Hei kaikki",
  "Merhaba herkese",
  "Salam semua",
  "Namaste sabko",
  "Konnichiwa minna",
  "Annyeong everyone",
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
          className="intro-marquee intro-marquee-top"
          texts={[HELLO_ALL_MARQUEE.join(" • ")]}
          velocity={60}
          numCopies={8}
          parallaxClassName="intro-marquee intro-marquee-top"
          scrollerClassName="intro-marquee-scroller"
        />
        <div className="intro-void" aria-hidden="true" />
        <ScrollVelocity
          className="intro-marquee intro-marquee-bottom"
          texts={[HELLO_ALL_MARQUEE.join(" • ")]}
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
