"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";

export const premiumEasing = [0.16, 1, 0.3, 1];

export const weightySpring = {
  type: "spring",
  mass: 0.85,
  stiffness: 85,
  damping: 16,
};

export const stableTween = {
  type: "tween",
  duration: 0.72,
  ease: premiumEasing,
};

function getMotionComponent(as) {
  if (!as) return motion.div;
  if (typeof as !== "string") {
    return typeof motion.create === "function" ? motion.create(as) : motion(as);
  }
  return motion[as] ?? motion.div;
}

export function ScrollFadeIn({
  as = "div",
  children,
  className,
  delay = 0,
  duration = 0.8,
  once = false,
  amount = 0.2,
  margin = "0px 0px -60px 0px",
}) {
  const reduceMotion = useReducedMotion();
  const Component = getMotionComponent(as);

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount, margin }}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : { ...stableTween, duration, delay }
      }
    >
      {children}
    </Component>
  );
}

export function ScrollIn({
  as = "div",
  children,
  className,
  delay = 0,
  duration = 0.8,
  distance = 32,
  once = false,
  amount = 0.2,
  margin = "0px 0px -60px 0px",
  useSpring = false,
}) {
  const reduceMotion = useReducedMotion();
  const Component = getMotionComponent(as);

  return (
    <Component
      className={cn(className)}
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : distance,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once, amount, margin }}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : useSpring
            ? { ...weightySpring, delay }
            : { ...stableTween, duration, delay }
      }
    >
      {children}
    </Component>
  );
}

export function DirectionalSlide({
  as = "div",
  children,
  className,
  direction = "left",
  delay = 0,
  duration = 0.78,
  distance = 56,
  once = false,
  amount = 0.18,
  margin = "0px 0px -72px 0px",
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Component = getMotionComponent(as);
  const offset = direction === "right" ? distance : -distance;

  return (
    <Component
      className={cn(className)}
      initial={{
        x: reduceMotion ? 0 : offset,
        opacity: reduceMotion ? 1 : 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      viewport={{ once, amount, margin }}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : { ...stableTween, duration, delay }
      }
      {...rest}
    >
      {children}
    </Component>
  );
}

export const ScrollSlideUp = ScrollIn;

export function StaggerGroup({
  as = "div",
  children,
  className,
  once = false,
  amount = 0.12,
  margin = "0px 0px -60px 0px",
  stagger = 0.12,
  delayChildren = 0.06,
}) {
  const Component = getMotionComponent(as);

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  as = "div",
  children,
  className,
  duration = 0.75,
  distance = 26,
  useSpring = false,
}) {
  const reduceMotion = useReducedMotion();
  const Component = getMotionComponent(as);

  return (
    <Component
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: reduceMotion
            ? { duration: 0.01 }
            : useSpring
              ? { ...weightySpring }
              : { ...stableTween, duration },
        },
      }}
    >
      {children}
    </Component>
  );
}
