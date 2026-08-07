"use client";

import { cn } from "../lib/utils";

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        "bento-marquee group flex overflow-hidden [--duration:20s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    >
      {Array(repeat)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
              reverse && "[animation-direction:reverse]"
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

export function BentoMarqueeItem({ name, body, className }) {
  return (
    <figure
      className={cn(
        "relative w-28 sm:w-32 shrink-0 cursor-pointer overflow-hidden rounded-xl border p-3 sm:p-4",
        "border-white/[.1] bg-white/[.01] hover:bg-white/[.05]",
        "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
        className
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">{name}</figcaption>
        </div>
      </div>
      {body ? <blockquote className="mt-2 text-xs text-zinc-500">{body}</blockquote> : null}
    </figure>
  );
}
