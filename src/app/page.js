"use client";

import Image from "next/image";
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

export default function Home() {
  useHomepageScripts();

  return (
    <main className="homepage" id="top">
      {/* Section 1: Hero */}
      <header className="hero-section" aria-label="Hero">
        <h1 className="hero-title" aria-label="TABANI">
          <span className="hero-title-track" aria-hidden="true">
            {HERO_LETTERS.map((letter, index) => (
              <span key={`${letter}-${index}`}>{letter}</span>
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

      {/* Section 2: Greeting */}
      <section className="greeting-section" aria-labelledby="greeting-heading">
        <h2 id="greeting-heading" className="greeting-title">
          Halo Semua
        </h2>
      </section>

      {/* Section 3: Intro split */}
      <section className="intro-section" aria-label="Perkenalan">
        <div className="intro-bio">
          <p className="bio-text">
            Gua Tabani, seorang Junior Programmer yang hobi ngulik ekosistem
            Laravel. Fokus gua adalah ngebangun aplikasi web yang nggak cuma
            jalan, tapi juga aman dan punya fitur real-time yang responsif. Dari
            magang di Rubicweb sampai bikin marketplace otomotif, gua selalu
            percaya kalau kode yang bersih adalah kunci aplikasi yang hebat
          </p>
        </div>
        <div className="intro-card-name" aria-label="card name">
          <span>card name</span>
        </div>
      </section>

      {/* Section 4: Bento card grid */}
      <section className="card-grid-section" aria-label="Navigasi portfolio">
        <nav className="card-grid" aria-label="Menu utama">
          {NAV_CARDS.map((card) => (
            <a
              key={card.href}
              className={card.className}
              href={card.href}
              {...(card.placeholder
                ? { "data-placeholder": card.placeholder }
                : {})}
            >
              <span className="card-label">{card.label}</span>
            </a>
          ))}
        </nav>
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
