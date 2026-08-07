"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";

function TechBadge({ label }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.04] px-2.5 py-1 text-[10px] font-medium tracking-[0.04em] text-[#111111]/75">
      {label}
    </span>
  );
}

function StackGroup({ category, items }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="m-0 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-red">
        {category}
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <TechBadge key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

function CtaButton({ project, isSoon }) {
  if (isSoon) {
    return (
      <span
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red text-white/80 sm:h-12 sm:w-12"
        aria-hidden="true"
      >
        <ArrowTopRightIcon className="h-5 w-5" />
      </span>
    );
  }

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red text-white transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red sm:h-12 sm:w-12"
      aria-label={`Open ${project.title}`}
    >
      <ArrowTopRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

/**
 * Wireframe:
 * [ Title                          (CTA) ]
 * [ image (rounded) | stack ~~~~~~~~~~~~ ]
 */
export default function Card({
  project,
  index,
  progress,
  range,
  targetScale,
  scrollContainerRef,
}) {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: scrollContainerRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]);
  const dimOpacity = useTransform(progress, range, [0, 0.38]);
  const enterY = useTransform(scrollYProgress, [0, 1], [36, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  const isSoon = project.status === "soon";
  const hasStackObject =
    project.stack && typeof project.stack === "object" && !Array.isArray(project.stack);

  const coverBlock = project.cover ? (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] sm:rounded-[24px] bg-black/10">
      {reduceMotion ? (
        <Image
          src={project.cover}
          alt={`${project.title} preview`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, 40vw"
          priority={index === 0}
        />
      ) : (
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
          <Image
            src={project.cover}
            alt={`${project.title} preview`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 40vw"
            priority={index === 0}
          />
        </motion.div>
      )}
    </div>
  ) : (
    <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-[20px] sm:rounded-[24px] bg-black/5">
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">
        classified
      </span>
    </div>
  );

  const stackBlock = (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-4 sm:gap-5">
      {project.description ? (
        <p className="m-0 max-w-2xl text-[clamp(13px,2.2vw,15px)] font-medium leading-[1.55] text-[#111111]/75 line-length-control">
          {project.description}
        </p>
      ) : null}

      {hasStackObject ? (
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {Object.entries(project.stack).map(([category, items]) => (
            <StackGroup key={category} category={category} items={items} />
          ))}
        </div>
      ) : (
        <div className="grid max-w-md gap-2">
          <div className="flex items-center justify-between rounded-[10px] border border-black/10 bg-black/[0.04] px-3 py-2.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/45">
              channel
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-red">
              sealed
            </span>
          </div>
          <div className="flex items-center justify-between rounded-[10px] border border-black/10 bg-black/[0.04] px-3 py-2.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/45">
              access
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-red">
              {typeof project.stack === "string" ? project.stack : "Coming Soon"}
            </span>
          </div>
        </div>
      )}

      {project.price ? (
        <p className="m-0 font-bricolage text-[clamp(14px,2.4vw,18px)] font-bold tracking-[-0.02em] text-[#111111]/55">
          {project.price}
        </p>
      ) : null}
    </div>
  );

  const body = (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-[28px] sm:rounded-[36px] border border-black/5",
        "shadow-[0_24px_80px_rgba(0,0,0,0.28)]",
      )}
      style={{ backgroundColor: project.color }}
    >
      <div className="relative z-[1] flex w-full flex-col gap-5 p-5 sm:gap-6 sm:p-7 lg:p-8">
        {/* Row 1 — Title + CTA */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/45">
              {project.label ?? `0${index + 1}`}
            </span>
            <h3 className="m-0 font-bricolage text-[clamp(32px,6vw,58px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[#111111]">
              {project.title}
            </h3>
          </div>
          <CtaButton project={project} isSoon={isSoon} />
        </div>

        {/* Row 2 — Image full-width (tinggi terkendali) + Stack */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6 lg:gap-7">
          <div className="w-full shrink-0 sm:w-[40%] lg:w-[38%]">
            {coverBlock}
          </div>
          {stackBlock}
        </div>
      </div>

      {!reduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] bg-black"
          style={{ opacity: dimOpacity }}
        />
      ) : null}
    </div>
  );

  return (
    <div
      ref={cardRef}
      className="sticky top-0 flex h-[100dvh] w-full items-center justify-center"
    >
      {reduceMotion ? (
        <div
          className="relative w-full origin-top"
          style={{ top: `calc(-4vh + ${index * 22}px)` }}
        >
          {body}
        </div>
      ) : (
        <motion.div
          className="relative w-full origin-top will-change-transform"
          style={{
            scale,
            y: enterY,
            top: `calc(-4vh + ${index * 22}px)`,
          }}
        >
          {body}
        </motion.div>
      )}
    </div>
  );
}
