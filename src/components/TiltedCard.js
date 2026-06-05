"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export default function TiltedCard({
  children,
  className = "",
  glareClassName = "",
  maxTilt = 12,
}) {
  const shouldReduceMotion = useReducedMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacityValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(rotateYValue, { stiffness: 180, damping: 18 });
  const glareOpacity = useSpring(glareOpacityValue, {
    stiffness: 220,
    damping: 22,
  });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.32), rgba(255,255,255,0.08) 18%, transparent 52%)`;

  function handleMove(event) {
    if (shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateXValue.set((0.5 - py) * maxTilt);
    rotateYValue.set((px - 0.5) * maxTilt);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacityValue.set(1);
  }

  function handleLeave() {
    rotateXValue.set(0);
    rotateYValue.set(0);
    glareX.set(50);
    glareY.set(50);
    glareOpacityValue.set(0);
  }

  return (
    <motion.div
      className={`relative h-full w-full [perspective:1200px] ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
      >
        {children}
        <motion.div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[inherit] ${glareClassName}`.trim()}
          style={{ background: glareBackground, opacity: glareOpacity }}
        />
      </motion.div>
    </motion.div>
  );
}
