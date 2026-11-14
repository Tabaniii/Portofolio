"use client";

import { cn } from "../../lib/utils";

/**
 * Philosophy — three overlapping abstract marks standing in for the principles:
 * a prism (clarity), measured rails (restraint), a worked organic form (craft).
 * A staggered glow hands the highlight from one to the next.
 */
export function PhilosophyVisual({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute bottom-8 right-3 h-[36px] w-[96px] lg:bottom-14 lg:right-7 lg:h-[48px] lg:w-[132px]",
        className
      )}
    >
      <svg
        viewBox="0 0 132 48"
        fill="none"
        className="h-full w-full animate-bento-drift"
      >
        <defs>
          <linearGradient id="philosophy-prism" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5f0e8" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#780606" stopOpacity="0.32" />
          </linearGradient>
        </defs>

        <g className="animate-bento-glow" style={{ animationDelay: "3s" }}>
          <path
            d="M2 8V40M9 12V36M16 16V32"
            stroke="#f5f0e8"
            strokeOpacity="0.32"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path d="M0 24h44" stroke="#f5f0e8" strokeOpacity="0.16" strokeWidth="1" />
        </g>

        <g className="animate-bento-glow">
          <g
            className="animate-bento-tilt"
            style={{ transformBox: "view-box", transformOrigin: "52px 29px" }}
          >
            <path
              d="M52 4 70 42H34L52 4Z"
              fill="url(#philosophy-prism)"
              stroke="#f5f0e8"
              strokeOpacity="0.55"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
          </g>
          <path
            d="M18 26h16"
            stroke="#f5f0e8"
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M72 20h30M72 26h26M72 32h22"
            stroke="#8e3b3b"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>

        <g className="animate-bento-glow" style={{ animationDelay: "6s" }}>
          <g
            className="animate-bento-morph"
            style={{ transformBox: "view-box", transformOrigin: "108px 24px" }}
          >
            <path
              d="M106 11c9-1 16 5 16 13 0 7-6 13-14 13-9 0-14-6-13-14 1-6 5-11 11-12Z"
              fill="#780606"
              fillOpacity="0.26"
              stroke="#780606"
              strokeWidth="1.2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

/** Minimal year rail for Education */
export function EducationVisual({ className }) {
  const years = ["2023", "2026", "2030"];

  return (
    <div
      className={cn(
        "absolute inset-x-3 bottom-9 lg:inset-x-8 lg:bottom-16",
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

/**
 * Workflow / Cara Kerja visual — connected flow nodes with glowing pulses.
 */
export function WorkflowVisual({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute bottom-7 right-3 h-[52px] w-[96px] lg:bottom-12 lg:right-6 lg:h-[84px] lg:w-[156px]",
        className
      )}
    >
      <svg viewBox="0 0 156 84" fill="none" className="h-full w-full">
        {/* Connecting flow line */}
        <path
          d="M16 26 H60 L86 58 H138"
          className="bento-draw-path animate-bento-draw"
          style={{ "--bento-dash": "200", strokeDasharray: "200", animationDelay: "0.2s" }}
          stroke="#780606"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Node 1: Planning */}
        <circle cx="16" cy="26" r="5" fill="#111" stroke="#ff8d28" strokeWidth="1.5" />
        <circle cx="16" cy="26" r="2" fill="#ff8d28" className="animate-bento-pulse" />

        {/* Node 2: Analysis */}
        <circle cx="56" cy="26" r="5" fill="#111" stroke="#f5f0e8" strokeOpacity="0.7" strokeWidth="1.5" />
        <circle cx="56" cy="26" r="2" fill="#f5f0e8" />

        {/* Node 3: Design */}
        <circle cx="78" cy="46" r="4.5" fill="#111" stroke="#780606" strokeWidth="1.5" />

        {/* Node 4: Implementation */}
        <circle cx="102" cy="58" r="5" fill="#111" stroke="#f5f0e8" strokeOpacity="0.7" strokeWidth="1.5" />
        <circle cx="102" cy="58" r="2" fill="#f5f0e8" />

        {/* Node 5 & 6: Testing & Launch */}
        <circle cx="138" cy="58" r="6" fill="#780606" stroke="#ff8d28" strokeWidth="1.5" />
        <path
          d="M135 58 L137 60 L142 55"
          stroke="#fff"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="138"
          cy="58"
          r="10"
          className="animate-bento-pulse"
          stroke="#ff8d28"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

/**
 * right brain zone — a type sketch caught mid-construction: an outlined glyph
 * pair on live baseline guides, crossed by a brush gesture and two bare marks.
 */
export function RightBrainVisual({ className }) {
  const guides = [
    { d: "M4 32h156", delay: "0s", opacity: "0.22" },
    { d: "M4 54h156", delay: "0.5s", opacity: "0.14" },
    { d: "M4 76h156", delay: "1s", opacity: "0.28" },
  ];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute bottom-8 right-3 h-[48px] w-[86px] lg:bottom-14 lg:right-7 lg:h-[92px] lg:w-[164px]",
        className
      )}
    >
      <svg viewBox="0 0 164 92" fill="none" className="h-full w-full">
        {guides.map((guide) => (
          <path
            key={guide.d}
            d={guide.d}
            className="bento-draw-path animate-bento-draw"
            style={{ "--bento-dash": "160", strokeDasharray: "160", animationDelay: guide.delay }}
            stroke="#f5f0e8"
            strokeOpacity={guide.opacity}
            strokeWidth="1"
          />
        ))}

        <path
          d="M8 84V24"
          className="bento-draw-path animate-bento-draw"
          style={{ "--bento-dash": "60", strokeDasharray: "60", animationDelay: "1.4s" }}
          stroke="#8e3b3b"
          strokeWidth="1"
        />

        <text
          x="14"
          y="76"
          className="font-bricolage animate-bento-rhythm"
          fontSize="58"
          fontWeight="700"
          letterSpacing="-3"
          fill="none"
          stroke="#f5f0e8"
          strokeOpacity="0.6"
          strokeWidth="1"
        >
          Aa
        </text>

        <path
          d="M92 72C104 48 122 38 158 26"
          className="bento-draw-path animate-bento-draw"
          style={{ "--bento-dash": "100", strokeDasharray: "100", animationDelay: "2s" }}
          stroke="#780606"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <circle
          cx="116"
          cy="54"
          r="16"
          className="animate-bento-rhythm"
          style={{ animationDelay: "1.2s" }}
          stroke="#f5f0e8"
          strokeOpacity="0.32"
          strokeWidth="1"
        />

        <rect
          x="132"
          y="58"
          width="19"
          height="19"
          rx="2"
          className="animate-bento-rhythm"
          style={{ animationDelay: "2.4s" }}
          transform="rotate(14 141.5 67.5)"
          fill="#780606"
          fillOpacity="0.55"
        />

        <circle
          cx="99"
          cy="18"
          r="3.5"
          className="animate-bento-rhythm"
          style={{ animationDelay: "3s" }}
          fill="#f5f0e8"
          fillOpacity="0.5"
        />
      </svg>
    </div>
  );
}

/**
 * Resume — a floating digital profile card paired with a small career readout:
 * proficiency bars that swell and a milestone rail whose nodes take turns lighting.
 */
export function ResumeVisual({ className }) {
  const bars = [
    { width: "100%", delay: "0s" },
    { width: "78%", delay: "0.7s" },
    { width: "56%", delay: "1.4s" },
  ];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute bottom-8 right-3 flex items-end gap-2 lg:bottom-14 lg:right-7 lg:gap-4",
        className
      )}
    >
      <div className="flex w-[52px] flex-col gap-2 sm:w-[62px]">
        {bars.map((bar) => (
          <span
            key={bar.delay}
            className="block h-1 overflow-hidden rounded-full bg-white/10"
            style={{ width: bar.width }}
          >
            <span
              className="block h-full origin-left rounded-full bg-brand-maroon animate-bento-bar"
              style={{ animationDelay: bar.delay }}
            />
          </span>
        ))}
      </div>

      <div className="w-[98px] rounded-xl border border-white/10 bg-neutral-900/85 p-2.5 animate-bento-float sm:w-[112px]">
        <div className="flex items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brand-red/50 bg-neutral-950">
            <svg viewBox="0 0 24 24" fill="none" className="size-4">
              <circle cx="12" cy="8.5" r="3.8" fill="#8e3b3b" />
              <path
                d="M4.6 20.5a7.4 7.4 0 0 1 14.8 0Z"
                fill="#8e3b3b"
                fillOpacity="0.55"
              />
            </svg>
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="block h-1.5 w-full rounded-full bg-white/20" />
            <span className="block h-1 w-2/3 rounded-full bg-white/10" />
          </span>
        </div>

        <div className="relative mt-3 flex items-center justify-between">
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />
          {[0, 1, 2, 3].map((node) => (
            <span
              key={node}
              className="relative inline-block size-1.5 rounded-full bg-brand-red animate-bento-pulse"
              style={{ animationDelay: `${node * 0.6}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
