"use client";

import { useState } from "react";
import { cn } from "../lib/utils";

function iconUrl(slug, color) {
  if (!slug) return null;
  const safeColor = (color || "FFFFFF").replace("#", "");
  return `https://cdn.simpleicons.org/${slug}/${safeColor}`;
}

export default function TechBadge({ name, slug, color }) {
  const [hideIcon, setHideIcon] = useState(false);
  const src = iconUrl(slug, color);

  return (
    <div
      tabIndex={0}
      className={cn(
        "group/badge flex min-h-11 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5",
        "transition-[border-color,background-color,box-shadow] duration-300",
        "hover:border-brand-red/35 hover:bg-white/[0.05] hover:shadow-[0_0_20px_rgba(120,6,6,0.16)]",
        "active:border-brand-red/35 active:bg-white/[0.05]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
      )}
    >
      {src && !hideIcon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          width={18}
          height={18}
          loading="lazy"
          decoding="async"
          onError={() => setHideIcon(true)}
          className={cn(
            "h-[18px] w-[18px] shrink-0 object-contain opacity-70",
            "grayscale transition-[filter,opacity] duration-300",
            "group-hover/badge:grayscale-0 group-hover/badge:opacity-100",
            "group-active/badge:grayscale-0 group-active/badge:opacity-100",
            "group-focus-within/badge:grayscale-0 group-focus-within/badge:opacity-100",
          )}
        />
      ) : (
        <span
          aria-hidden
          className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm border border-white/15 text-[9px] font-black uppercase tracking-wide text-zinc-500"
        >
          {name.slice(0, 1)}
        </span>
      )}
      <span className="text-[13px] font-medium leading-none tracking-[0.01em] text-zinc-300 transition-colors duration-300 group-hover/badge:text-white group-active/badge:text-white group-focus-within/badge:text-white sm:text-[14px]">
        {name}
      </span>
    </div>
  );
}
