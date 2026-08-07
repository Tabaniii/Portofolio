"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollVelocity from "./ScrollVelocity";
import TiltedCard from "./TiltedCard";

gsap.registerPlugin(ScrollTrigger);

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
  "i'm Tabani, a full-stack web developer who loves exploring the Laravel ecosystem and building clean web workflows.",
  "my focus is on apps that don't just work, but also feel secure, responsive, and smooth for real-time needs.",
  "from my internship at Rubicweb to building an automotive marketplace, i've always believed clean code is the foundation of a great product.",
];

export default function About({ scrollContainerRef }) {
  const sectionRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;

    if (!section || !intro) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        intro,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            scroller: scrollContainerRef?.current || undefined,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [scrollContainerRef]);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-black flex flex-col justify-between overflow-hidden snap-start py-4 sm:py-0"
      aria-label="Introduction"
    >
      {/* Marquee Atas - Menempel di ujung atas section */}
      <div className="w-full pt-2 sm:pt-2 shrink-0">
        <ScrollVelocity
          scrollContainerRef={scrollContainerRef}
          className="text-[clamp(28px,8vw,120px)] font-black leading-[0.86] uppercase text-brand-red"
          texts={[HELLO_ALL_MARQUEE_TEXT]}
          velocity={60}
          numCopies={8}
          parallaxClassName="w-full flex items-center justify-start relative overflow-hidden"
          scrollerClassName="flex whitespace-nowrap"
        />
      </div>

      {/* Grid Layout Tengah - Dibagi rata 2 kolom (Kiri Teks, Kanan Gambar) */}
      <div className="w-full responsive-grid-1-2 section-padding-x items-center flex-1 py-4 sm:py-8 md:py-4 my-auto">
        {/* SEBELAH KIRI: Teks Perkenalan */}
        <div ref={introRef} className="flex items-center justify-start text-left order-2 md:order-1">
          <div className="w-full max-w-[580px] flex flex-col gap-3 sm:gap-4">
            <p className="m-0 text-[clamp(11px,2.5vw,14px)] font-black leading-none tracking-[0.18em] uppercase text-brand-red">
              introduction
            </p>

            <h2 className="m-0 text-[clamp(32px,10vw,64px)] font-black leading-[0.95] lowercase text-white">
              i'm tabani
            </h2>

            <div className="flex flex-col gap-2 sm:gap-3 mt-1 sm:mt-2">
              {INTRO_PARAGRAPHS.map((paragraph) => (
                <p
                  key={paragraph}
                  className="w-full m-0 text-[clamp(14px,3vw,17px)] font-medium leading-[1.6] tracking-[0.02em] text-zinc-300 line-length-control"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* SEBELAH KANAN: TiltedCard */}
        <div className="text-brand-red flex items-center justify-center order-1 md:order-2">
          <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] aspect-square">
            <TiltedCard
              imageSrc="/assets/img/homepage.jpg"
              altText="Tabani portrait"
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
                <div className="flex h-full w-full items-end justify-start rounded-[15px] bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4 sm:p-5">
                  <div className="flex flex-col gap-1 text-left">
                    <p className="m-0 text-[clamp(22px,6vw,40px)] font-black leading-none text-white">
                      Tabani
                    </p>
                    <p className="m-0 text-[clamp(10px,2vw,12px)] font-extrabold uppercase tracking-[0.2em] text-white">
                      full-stack web developer
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Marquee Bawah - Menempel di ujung bawah section */}
      <div className="w-full pb-2 sm:pb-2 shrink-0">
        <ScrollVelocity
          scrollContainerRef={scrollContainerRef}
          className="text-[clamp(28px,8vw,120px)] font-black leading-[0.86] uppercase text-brand-red"
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
