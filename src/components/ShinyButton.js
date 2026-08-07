"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const idleTransition = {
  repeat: Infinity,
  repeatType: "loop",
  repeatDelay: 1,
  type: "spring",
  stiffness: 20,
  damping: 15,
  mass: 2,
  scale: {
    type: "spring",
    stiffness: 200,
    damping: 5,
    mass: 0.5,
  },
};

const hoverTransition = {
  repeat: Infinity,
  repeatType: "loop",
  repeatDelay: 0.15,
  type: "spring",
  stiffness: 55,
  damping: 14,
  mass: 1,
  scale: {
    type: "spring",
    stiffness: 200,
    damping: 5,
    mass: 0.5,
  },
};

export const ShinyButton = forwardRef(function ShinyButton(
  { children, className, href, style, ...props },
  ref
) {
  const [hovered, setHovered] = useState(false);
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ "--x": "100%", scale: 0.8 }}
      animate={{ "--x": "-100%", scale: 1 }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={hovered ? hoverTransition : idleTransition}
      className={cn(
        "group relative inline-flex cursor-pointer rounded-lg border px-6 py-2 font-medium no-underline backdrop-blur-xl",
        "transition-[background-color,border-color,box-shadow] duration-300 ease-out",
        "border-white/20 bg-white shadow-[0_0_0_rgba(120,6,6,0)]",
        "hover:border-brand-red hover:bg-brand-red hover:shadow-[0_0_32px_rgba(120,6,6,0.42)]",
        className
      )}
      style={{ "--primary": "#780606", ...style }}
      {...props}
    >
      <span
        className={cn(
          "relative block size-full text-sm tracking-wide uppercase transition-colors duration-300",
          hovered ? "text-white" : "text-[rgb(0,0,0,65%)]"
        )}
        style={{
          maskImage: hovered
            ? "linear-gradient(-75deg,#ffffff calc(var(--x) + 20%),transparent calc(var(--x) + 30%),#ffffff calc(var(--x) + 100%))"
            : "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
          WebkitMaskImage: hovered
            ? "linear-gradient(-75deg,#ffffff calc(var(--x) + 20%),transparent calc(var(--x) + 30%),#ffffff calc(var(--x) + 100%))"
            : "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMask:
            "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          backgroundImage: hovered
            ? "linear-gradient(-75deg,rgba(255,255,255,0.15) calc(var(--x) + 20%),rgba(255,255,255,0.75) calc(var(--x) + 25%),rgba(255,255,255,0.15) calc(var(--x) + 100%))"
            : "linear-gradient(-75deg,rgba(120,6,6,0.1) calc(var(--x) + 20%),rgba(120,6,6,0.5) calc(var(--x) + 25%),rgba(120,6,6,0.1) calc(var(--x) + 100%))",
        }}
        className="pointer-events-none absolute inset-0 z-10 block rounded-[inherit] p-px transition-opacity duration-300"
      />
    </Component>
  );
});

ShinyButton.displayName = "ShinyButton";
