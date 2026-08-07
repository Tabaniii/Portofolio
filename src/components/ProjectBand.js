"use client";

import { motion, useReducedMotion } from "framer-motion";
import ProjectsSection from "./projects/ProjectsSection";
import { premiumEasing } from "./MotionPrimitives";

const HEADING = "PROFESIONAL PROJECT";

/**
 * Section Selected Projects — sticky stacking cards.
 * Hierarki section tetap: Hero → ProjectBand → About → Bento → Footer.
 */
export default function ProjectBand({ scrollContainerRef }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projek"
      className="relative isolate w-full snap-none bg-black section-padding-x pt-24 sm:pt-32 lg:pt-40 pb-10 sm:pb-12 text-white"
      aria-labelledby="project-heading"
    >
      <header className="sticky top-6 sm:top-8 z-30 mb-8 sm:mb-10 flex items-center justify-center pointer-events-none">
        <h2
          id="project-heading"
          className="m-0 max-w-[95vw] text-center font-[TabaniDisplay,Inter,Poppins,Arial,Helvetica,sans-serif] text-[clamp(42px,9vw,92px)] font-black leading-[0.92] tracking-[0.04em] text-brand-red uppercase drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]"
        >
          <span className="sr-only">{HEADING}</span>
          <motion.span
            className="flex flex-wrap items-center justify-center gap-x-[0.32em] gap-y-2"
            aria-hidden="true"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.35 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.04,
                  delayChildren: reduceMotion ? 0 : 0.06,
                },
              },
            }}
          >
            {HEADING.split(" ").map((word, wordIndex) => (
              <span key={`${word}-${wordIndex}`} className="inline-flex">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${word}-${charIndex}`}
                    className="inline-block"
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: reduceMotion ? 0 : 36,
                        filter: reduceMotion ? "none" : "blur(8px)",
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: reduceMotion
                          ? { duration: 0.01 }
                          : {
                              duration: 0.6,
                              ease: premiumEasing,
                            },
                      },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.span>
        </h2>
      </header>

      <ProjectsSection scrollContainerRef={scrollContainerRef} />
    </section>
  );
}
