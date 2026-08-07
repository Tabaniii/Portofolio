"use client";

import { forwardRef, useRef } from "react";
import {
  Code2,
  Database,
  LayoutTemplate,
  Server,
  UserRound,
  Boxes,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { AnimatedBeam } from "../ui/AnimatedBeam";

const Circle = forwardRef(function Circle(
  { className, children, label },
  ref
) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-10 sm:size-11 items-center justify-center rounded-full",
          "border border-white/10 bg-neutral-950",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
          className
        )}
      >
        {children}
      </div>
      {label ? (
        <span className="font-outfit text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">
          {label}
        </span>
      ) : null}
    </div>
  );
});

export default function StackBeam({ className }) {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const reactRef = useRef(null);
  const nextRef = useRef(null);
  const laravelRef = useRef(null);
  const filamentRef = useRef(null);
  const sqlRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="flex w-full max-w-[280px] flex-col items-center gap-5 sm:gap-6 px-2">
        <div className="flex w-full items-start justify-between gap-2">
          <Circle ref={reactRef} label="React">
            <Code2 className="size-4 text-brand-cream" strokeWidth={1.5} />
          </Circle>
          <Circle ref={nextRef} label="Next.js">
            <Boxes className="size-4 text-brand-cream" strokeWidth={1.5} />
          </Circle>
          <Circle ref={laravelRef} label="Laravel">
            <Server className="size-4 text-brand-cream" strokeWidth={1.5} />
          </Circle>
        </div>

        <Circle
          ref={centerRef}
          className="size-12 sm:size-14 border-brand-red/40 bg-neutral-900"
          label="dev"
        >
          <UserRound className="size-5 text-brand-red" strokeWidth={1.5} />
        </Circle>

        <div className="flex w-full items-start justify-around gap-6">
          <Circle ref={filamentRef} label="Filament">
            <LayoutTemplate className="size-4 text-brand-cream" strokeWidth={1.5} />
          </Circle>
          <Circle ref={sqlRef} label="SQL">
            <Database className="size-4 text-brand-cream" strokeWidth={1.5} />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={reactRef}
        curvature={40}
        duration={3.2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={nextRef}
        curvature={12}
        duration={3.6}
        delay={0.2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={laravelRef}
        curvature={40}
        duration={3.4}
        delay={0.35}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={filamentRef}
        curvature={-35}
        duration={3.8}
        delay={0.15}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={sqlRef}
        curvature={-35}
        duration={3.5}
        delay={0.45}
        reverse
      />
    </div>
  );
}
