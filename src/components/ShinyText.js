"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import "./ShinyText.css";

export default function ShinyText({
  text,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  speed = 2.5,
  delay = 0.5,
  spread = 145,
  yoyo = false,
  direction = "left",
  disabled = false,
  strokeWidth = 5,
  children,
}) {
  const resolvedText = text ?? (typeof children === "string" ? children : "");
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const directionRef = useRef(direction === "left" ? 1 : -1);

  useEffect(() => {
    directionRef.current = direction === "left" ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;

  useAnimationFrame((time) => {
    if (disabled) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    elapsedRef.current += deltaTime;

    if (yoyo) {
      const cycleDuration = animationDuration + delayDuration;
      const fullCycle = cycleDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else if (cycleTime < cycleDuration) {
        progress.set(directionRef.current === 1 ? 100 : 0);
      } else if (cycleTime < cycleDuration + animationDuration) {
        const reverseTime = cycleTime - cycleDuration;
        const p = 100 - (reverseTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 0 : 100);
      }
    } else {
      const cycleDuration = animationDuration + delayDuration;
      const cycleTime = elapsedRef.current % cycleDuration;

      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 100 : 0);
      }
    }
  }, []);

  const maskPosition = useTransform(progress, (p) => `${150 - p * 2}% center`);

  const baseStyle = {
    color: "transparent",
    WebkitTextStroke: `${strokeWidth}px ${color}`,
    textStroke: `${strokeWidth}px ${color}`,
  };

  const shineStyle = {
    color: "transparent",
    WebkitTextStroke: `${strokeWidth}px ${shineColor}`,
    textStroke: `${strokeWidth}px ${shineColor}`,
    WebkitMaskImage: `linear-gradient(${spread}deg, transparent 0%, transparent 35%, #000 50%, transparent 65%, transparent 100%)`,
    maskImage: `linear-gradient(${spread}deg, transparent 0%, transparent 35%, #000 50%, transparent 65%, transparent 100%)`,
    WebkitMaskSize: "200% auto",
    maskSize: "200% auto",
    WebkitMaskPosition: maskPosition,
    maskPosition,
  };

  return (
    <span
      className={`shiny-text relative inline-block ${className}`.trim()}
    >
      <span aria-hidden="true" style={baseStyle}>
        {resolvedText}
      </span>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={shineStyle}
      >
        {resolvedText}
      </motion.span>
      <span className="sr-only">{resolvedText}</span>
    </span>
  );
}
