"use client";

import Image from "next/image";
import ShinyText from "./ShinyText";
import { Menu, ChevronDown } from "lucide-react";
import { color } from "framer-motion";

const HERO_LETTERS = ["T", "A", "B", "A", "N", "I"];
const MOBILE_FIRST_ROW = ["A", "K", "M", "A", "L"];
const MOBILE_SECOND_ROW = ["T", "A", "B", "A", "N", "I"];

export default function Hero() {
  return (
    <header
      className="hero-section relative w-full h-screen min-h-[100svh] overflow-hidden"
      aria-label="Hero"
    >
      {/* MOBILE LAYOUT (under 768px) — Akmal (font biasa) + tabani (script cursive) + foto oval di DEPAN */}
      <div className="md:hidden absolute inset-0 z-[2] flex flex-col w-full h-full bg-black">

        {/* Center composite: text Akmal tabani di BELAKANG, foto oval di DEPAN */}
        <div className="flex-1 flex flex-col items-center justify-center relative px-4 -mt-[30%]">
          {/* Nama composite di belakang foto */}
          <div className="mobile-hero-name-wrap absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-[1] w-full text-center pointer-events-none select-none">
            <span className="mobile-hero-name-akmal block font-[Outfit,Inter,sans-serif] font-black text-white leading-[0.85] tracking-tight">
              Akmal
            </span>
            <span style={{ fontFamily: "Carattere, cursive", color: "var(--color-red)" , fontSize: "150px" }} className="mobile-hero-name-tabani block leading-[0.75] tracking-wide">
              Tabani
            </span>
          </div>

          {/* Oval foto — DI DEPAN teks */}
          <div className="mobile-hero-photo-wrap relative z-[5] mt-[50%]">
            <div className="mobile-hero-photo-frame relative overflow-hidden">
              <Image
                src="/assets/img/mobileherosection.png"
                alt="Akmal Tabani"
                className="w-full h-full object-cover"
                fill
                sizes="45vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Role + short bio */}
        <div className="px-6 pb-4 text-center relative z-[3] mb-[20%]">
          <h2 className="mobile-hero-role text-white/70 font-[InstrumentSerif,ui-serif,Georgia,serif] italic text-lg tracking-wide mb-2">
            Full stack developer
          </h2>
        </div>

        {/* Scroll indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 text-white/50 flex flex-col items-center gap-1 z-[3]">
          <ChevronDown className="w-8 h-8 animate-bounce" strokeWidth={2} />
        </div>
      </div>

      {/* DESKTOP/TABLET (768px+) — 100% TIDAK DIUBAH — existing TABANI stroke style */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
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
          className="hero-image absolute inset-0 z-[2] w-full h-full object-cover"
          fill
          priority
          sizes="100vw"
        />
      </div>
    </header>
  );
}
