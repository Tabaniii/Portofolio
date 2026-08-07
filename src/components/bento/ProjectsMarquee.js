"use client";

import { cn } from "../../lib/utils";
import { Marquee } from "../Marquee";

function WireframeCard({ title, variant = "a" }) {
  return (
    <div
      className={cn(
        "relative h-[88px] w-[140px] shrink-0 overflow-hidden rounded-lg",
        "border border-white/10 bg-neutral-900/80"
      )}
    >
      <div className="flex h-5 items-center gap-1 border-b border-white/10 px-2">
        <span className="size-1.5 rounded-full bg-white/15" />
        <span className="size-1.5 rounded-full bg-white/15" />
        <span className="size-1.5 rounded-full bg-white/15" />
      </div>
      <div className="grid h-[calc(100%-1.25rem)] grid-cols-3 gap-1.5 p-2">
        {variant === "a" ? (
          <>
            <div className="col-span-2 row-span-2 rounded-sm bg-white/[0.06]" />
            <div className="rounded-sm bg-brand-red/25" />
            <div className="rounded-sm bg-white/[0.04]" />
          </>
        ) : variant === "b" ? (
          <>
            <div className="col-span-3 h-3 rounded-sm bg-white/[0.06]" />
            <div className="col-span-1 rounded-sm bg-white/[0.04]" />
            <div className="col-span-2 rounded-sm bg-brand-red/20" />
          </>
        ) : (
          <>
            <div className="col-span-1 row-span-2 rounded-sm bg-white/[0.05]" />
            <div className="col-span-2 rounded-sm bg-white/[0.07]" />
            <div className="col-span-2 rounded-sm bg-brand-red/15" />
          </>
        )}
      </div>
      <span className="pointer-events-none absolute bottom-1.5 left-2 font-outfit text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-500">
        {title}
      </span>
    </div>
  );
}

const PROJECTS = [
  { title: "prod", variant: "a" },
  { title: "case", variant: "b" },
  { title: "ship", variant: "c" },
  { title: "build", variant: "a" },
  { title: "live", variant: "b" },
];

export default function ProjectsMarquee({ className }) {
  return (
    <div className={cn("absolute inset-x-0 bottom-14 flex items-end overflow-hidden sm:bottom-16", className)}>
      <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <Marquee pauseOnHover className="[--duration:28s] [--gap:0.75rem]">
          {PROJECTS.map((item) => (
            <WireframeCard
              key={`${item.title}-${item.variant}`}
              title={item.title}
              variant={item.variant}
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
