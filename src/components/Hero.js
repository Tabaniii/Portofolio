"use client";

import Image from "next/image";
import ShinyText from "./ShinyText";

const HERO_LETTERS = ["T", "A", "B", "A", "N", "I"];

export default function Hero() {
  return (
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
  );
}
