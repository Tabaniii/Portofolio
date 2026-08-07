"use client";

import { cn } from "../../lib/utils";

/** Quiet principle marks for Philosophy */
export function PhilosophyVisual({ className }) {
  const lines = ["clarity", "restraint", "craft"];

  return (
    <div
      className={cn(
        "absolute inset-x-6 bottom-16 sm:inset-x-8 flex flex-col gap-2 opacity-70",
        className
      )}
    >
      {lines.map((line, index) => (
        <div
          key={line}
          className="flex items-center gap-3"
          style={{ opacity: 1 - index * 0.18 }}
        >
          <span className="h-px w-6 bg-brand-red/70" />
          <span className="font-outfit text-[11px] uppercase tracking-[0.18em] text-neutral-500">
            {line}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Minimal year rail for Education */
export function EducationVisual({ className }) {
  const years = ["2023", "2026", "2030"];

  return (
    <div
      className={cn(
        "absolute inset-x-6 bottom-16 sm:inset-x-8",
        className
      )}
    >
      <div className="relative flex items-center justify-between pt-3">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
        {years.map((year, index) => (
          <div key={year} className="relative z-[1] flex flex-col items-center gap-2">
            <span
              className={cn(
                "size-2 rounded-full border border-white/20 bg-neutral-950",
                index === 1 && "border-brand-red bg-brand-red"
              )}
            />
            <span className="font-outfit text-[10px] font-medium tracking-[0.08em] text-neutral-500">
              {year}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Quiet composition blocks for Art */
export function ArtVisual({ className }) {
  return (
    <div
      className={cn(
        "absolute bottom-16 right-6 sm:right-8 flex h-20 w-28 gap-1.5 opacity-80",
        className
      )}
    >
      <div className="flex w-1/3 flex-col gap-1.5">
        <div className="flex-1 rounded-sm border border-white/10 bg-white/[0.03]" />
        <div className="h-5 rounded-sm bg-brand-red/30" />
      </div>
      <div className="flex w-2/3 flex-col gap-1.5">
        <div className="h-6 rounded-sm border border-white/10 bg-white/[0.05]" />
        <div className="flex-1 rounded-sm border border-white/10 bg-white/[0.02]" />
      </div>
    </div>
  );
}

/** Document cue for Resume */
export function ResumeVisual({ className }) {
  return (
    <div
      className={cn(
        "absolute bottom-16 right-6 sm:right-8 h-[88px] w-[68px]",
        "rounded-md border border-white/10 bg-neutral-900/90 p-2.5",
        className
      )}
    >
      <div className="mb-2 h-2 w-8 rounded-sm bg-brand-red/40" />
      <div className="space-y-1.5">
        <div className="h-1.5 w-full rounded-sm bg-white/10" />
        <div className="h-1.5 w-[85%] rounded-sm bg-white/10" />
        <div className="h-1.5 w-[70%] rounded-sm bg-white/10" />
        <div className="h-1.5 w-[90%] rounded-sm bg-white/10" />
      </div>
    </div>
  );
}
