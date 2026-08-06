"use client";

import Image from "next/image";
import ShinyText from "./ShinyText";

const HERO_LETTERS = ["T", "A", "B", "A", "N", "I"];

export default function Hero() {
  return (
    <header
      className="hero-section relative w-full h-screen min-h-[100svh] overflow-hidden snap-start"
      aria-label="Hero"
    >
      <h1
        className="absolute inset-0 z-[3] flex items-center justify-center m-0 p-0 pointer-events-none select-none"
        aria-label="TABANI"
      >
        <span
          className="hero-title-track flex w-full h-full box-border font-[TabaniDisplay,Inter,Poppins,Arial,Helvetica,sans-serif] font-normal"
          aria-hidden="true"
        >
          {HERO_LETTERS.map((letter, index) => (
            <ShinyText
              key={`${letter}-${index}`}
              className="hero-title-letter relative block font-[inherit] font-normal leading-[inherit] uppercase"
              text={letter}
              speed={2.5}
              delay={0.5}
              color="var(--color-red)"
              shineColor="#ff0000"
              spread={120}
              direction="left"
              yoyo={false}
              strokeWidth="var(--hero-stroke)"
            />
          ))}
        </span>
      </h1>
      <Image
        src="/assets/img/homepage.jpg"
        alt="Tabani — foto profil dengan latar graffiti"
        className="hero-image absolute inset-0 z-[2] w-full h-full object-cover block"
        fill
        priority
        sizes="100vw"
      />
    </header>
  );
}
