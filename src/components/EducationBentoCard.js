"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, GraduationCap, Maximize2, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import { premiumEasing, stableTween } from "./MotionPrimitives";
import { EducationVisual } from "./bento/MiniVisuals";
import { educationData } from "../data/educationTimeline";

const EducationScene = dynamic(() => import("./bento/EducationScene"), {
  ssr: false,
});

const SCENE_MODULE = () => import("./bento/EducationScene");

const WIDE_SCREEN = "(min-width: 768px)";

function subscribeToWideScreen(onChange) {
  const query = window.matchMedia(WIDE_SCREEN);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function readLightPreview() {
  const connection = navigator.connection;
  return (
    !window.matchMedia(WIDE_SCREEN).matches ||
    Boolean(connection?.saveData) ||
    /(^|-)2g$/.test(connection?.effectiveType ?? "")
  );
}

/**
 * Model .glb-nya ~13 MB, jadi preview 3D di kartu cuma dinyalakan di layar besar
 * dengan koneksi normal. Di luar itu kartu tetap memakai rail tahun yang lama dan
 * scene baru dimuat saat kartu benar-benar dibuka.
 */
function useLightPreview() {
  return useSyncExternalStore(subscribeToWideScreen, readLightPreview, () => true);
}

const subscribeToNothing = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

function useInView(ref, { rootMargin = "200px" } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}

export default function EducationBentoCard({
  className,
  steps = educationData,
  entryFrom = "right",
  revealDelay = 0.14,
  revealOnce = true,
}) {
  const reduceMotion = useReducedMotion();
  const lightPreview = useLightPreview();
  const lenis = useLenis();

  const cardRef = useRef(null);
  const stageRef = useRef(null);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);
  const warmedRef = useRef(false);
  const activeIndexRef = useRef(0);
  const touchOriginRef = useRef(null);
  const originRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [origin, setOrigin] = useState(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const portalReady = useIsClient();
  const inView = useInView(cardRef);
  const lastIndex = steps.length - 1;
  const activeStep = steps[activeIndex] ?? steps[0];
  const showPreview = inView && !expanded && !lightPreview;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const warmScene = useCallback(() => {
    if (warmedRef.current) return;
    warmedRef.current = true;
    SCENE_MODULE().then((module) => module.preloadEducationModel?.());
  }, []);

  const goTo = useCallback(
    (nextIndex) => {
      const clamped = Math.min(Math.max(nextIndex, 0), steps.length - 1);
      if (clamped === activeIndexRef.current) return;
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
    },
    [steps.length],
  );

  const captureOrigin = useCallback(() => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const next = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
    originRef.current = next;
    setOrigin(next);
    return next;
  }, []);

  const open = useCallback(() => {
    warmScene();
    captureOrigin();
    setViewport({ width: window.innerWidth, height: window.innerHeight });
    activeIndexRef.current = 0;
    setActiveIndex(0);
    setExpanded(true);
  }, [captureOrigin, warmScene]);

  const close = useCallback(() => {
    captureOrigin();
    requestAnimationFrame(() => setExpanded(false));
  }, [captureOrigin]);

  useEffect(() => {
    if (!expanded) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const syncViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      captureOrigin();
    };

    window.addEventListener("resize", syncViewport);
    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      window.removeEventListener("resize", syncViewport);
    };
  }, [captureOrigin, expanded, lenis]);

  useEffect(() => {
    if (!expanded) {
      triggerRef.current?.focus?.();
      return undefined;
    }

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        goTo(activeIndexRef.current + 1);
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        goTo(activeIndexRef.current - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, expanded, goTo]);

  useEffect(() => {
    if (!expanded) return undefined;
    const stage = stageRef.current;
    if (!stage) return undefined;

    let lockedUntil = 0;

    const onWheel = (event) => {
      event.preventDefault();

      const now = performance.now();
      if (now < lockedUntil) return;

      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;
      if (Math.abs(delta) < 12) return;

      lockedUntil = now + (reduceMotion ? 320 : 900);
      goTo(activeIndexRef.current + (delta > 0 ? 1 : -1));
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [expanded, goTo, reduceMotion]);

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    touchOriginRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    const origin = touchOriginRef.current;
    if (!origin) return;
    touchOriginRef.current = null;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - origin.x;
    const deltaY = touch.clientY - origin.y;
    const dominant = Math.abs(deltaX) >= Math.abs(deltaY) ? deltaX : deltaY;

    if (Math.abs(dominant) < 48) return;
    goTo(activeIndexRef.current + (dominant < 0 ? 1 : -1));
  };

  const entryOffset = entryFrom === "right" ? 56 : -56;

  return (
    <>
      <motion.div
        ref={cardRef}
        onClick={open}
        onPointerEnter={warmScene}
        initial={{ x: reduceMotion ? 0 : entryOffset, opacity: reduceMotion ? 1 : 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: revealOnce, amount: 0.12, margin: "-10% 0px -10% 0px" }}
        transition={
          reduceMotion
            ? { duration: 0.01 }
            : { ...stableTween, duration: 0.75, delay: revealDelay }
        }
        className={cn(
          "group relative block h-full min-h-0 overflow-hidden rounded-2xl",
          "border border-white/10 bg-neutral-950 text-white",
          "transition-colors duration-300 ease-out",
          "hover:bg-neutral-900 hover:border-white/15",
          "cursor-pointer",
          expanded && "pointer-events-none",
          className,
        )}
        aria-hidden={expanded}
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          {showPreview ? (
            <div className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100">
              <EducationScene
                mode="preview"
                steps={steps}
                reduceMotion={Boolean(reduceMotion)}
                paused={!inView}
              />
            </div>
          ) : (
            <EducationVisual />
          )}
        </div>

        <div className="relative z-10 flex h-full min-h-0 md:min-h-[16rem] lg:min-h-0 flex-col justify-between p-6 sm:p-7 md:p-8">
          <div className="flex max-w-[90%] flex-col gap-3">
            <span className="font-outfit text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
              journey
            </span>

            <GraduationCap
              className="size-5 text-neutral-400 transition-colors duration-300 group-hover:text-brand-red sm:size-6"
              strokeWidth={1.5}
            />

            <div className="space-y-2">
              <h3 className="md:hidden m-0 font-bricolage text-[1.35rem] font-semibold tracking-[-0.03em] leading-tight text-brand-cream">
                Pendidikan
              </h3>
              <h3 className="hidden md:block m-0 font-bricolage text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold tracking-[-0.03em] leading-tight text-brand-cream">
                Education / Experience
              </h3>
              <p className="m-0 max-w-sm font-outfit text-[13px] leading-relaxed text-neutral-400 line-clamp-2 md:line-clamp-3">
                Academic and learning path.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between gap-3">
            <p className="m-0 font-outfit text-[11px] uppercase tracking-[0.14em] text-neutral-600">
              3d timeline
            </p>

            <button
              ref={triggerRef}
              type="button"
              aria-expanded={expanded}
              onClick={(event) => {
                event.stopPropagation();
                open();
              }}
              onFocus={warmScene}
              className="inline-flex items-center gap-1.5 rounded-md font-outfit text-[12px] font-medium text-neutral-400 transition-colors duration-300 group-hover:text-brand-cream hover:text-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
            >
              Expand / View
              <Maximize2
                className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {portalReady
        ? createPortal(
            <AnimatePresence>
              {expanded && origin ? (
                <motion.div
                  key="education-focus"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Education / Experience"
                  className="fixed z-[100] overflow-hidden bg-neutral-950"
                  initial={
                    reduceMotion
                      ? {
                          top: 0,
                          left: 0,
                          width: viewport.width,
                          height: viewport.height,
                          borderRadius: 0,
                        }
                      : {
                          top: origin.top,
                          left: origin.left,
                          width: origin.width,
                          height: origin.height,
                          borderRadius: 16,
                        }
                  }
                  animate={{
                    top: 0,
                    left: 0,
                    width: viewport.width || "100vw",
                    height: viewport.height || "100dvh",
                    borderRadius: 0,
                  }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : {
                          top: origin.top,
                          left: origin.left,
                          width: origin.width,
                          height: origin.height,
                          borderRadius: 16,
                        }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0.01 }
                      : { duration: 0.72, ease: premiumEasing }
                  }
                >
                  <div
                    ref={stageRef}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    className="relative h-full w-full touch-pan-y"
                  >
                    <motion.button
                      ref={closeRef}
                      type="button"
                      onClick={close}
                      aria-label="Tutup tampilan 3D"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: {
                          duration: reduceMotion ? 0.01 : 0.28,
                          delay: reduceMotion ? 0 : 0.32,
                          ease: premiumEasing,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: reduceMotion ? 0.01 : 0.18 },
                      }}
                      className="absolute right-4 top-4 z-20 inline-flex size-10 items-center justify-center rounded-xl border border-white/15 bg-black/70 text-neutral-400 transition-colors duration-300 hover:border-white/30 hover:text-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:right-6 sm:top-6"
                    >
                      <X className="size-4" strokeWidth={1.5} />
                    </motion.button>

                      <EducationScene
                        mode="focus"
                        activeIndex={activeIndex}
                        steps={steps}
                        reduceMotion={Boolean(reduceMotion)}
                        showProgress
                      />

                      <div className="sr-only" aria-live="polite">
                        {`${activeStep.year} — ${activeStep.title}, ${activeStep.subtitle}`}
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: {
                            duration: reduceMotion ? 0.01 : 0.28,
                            delay: reduceMotion ? 0 : 0.32,
                            ease: premiumEasing,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          transition: { duration: reduceMotion ? 0.01 : 0.18 },
                        }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end gap-4 p-5 sm:gap-5 sm:p-8"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="pointer-events-auto flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => goTo(activeIndex - 1)}
                              disabled={activeIndex === 0}
                              aria-label="Titik sebelumnya"
                              className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-black/80 text-neutral-400 transition-colors duration-300 hover:border-white/25 hover:text-brand-cream disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/10 disabled:hover:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                            >
                              <ChevronLeft className="size-4" strokeWidth={1.5} />
                            </button>
                            <button
                              type="button"
                              onClick={() => goTo(activeIndex + 1)}
                              disabled={activeIndex === lastIndex}
                              aria-label="Titik berikutnya"
                              className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-black/80 text-neutral-400 transition-colors duration-300 hover:border-white/25 hover:text-brand-cream disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/10 disabled:hover:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                            >
                              <ChevronRight className="size-4" strokeWidth={1.5} />
                            </button>
                            <span className="ml-1 font-outfit text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                              {activeIndex + 1} / {steps.length}
                            </span>
                          </div>

                          <div className="pointer-events-auto relative flex max-w-full items-center gap-4 overflow-x-auto sm:gap-6">
                            <span className="absolute left-2 right-2 top-[5px] h-px bg-white/10" />
                            {steps.map((step, index) => (
                              <button
                                key={`${step.year}-${step.title}`}
                                type="button"
                                onClick={() => goTo(index)}
                                aria-label={`${step.year} — ${step.title}`}
                                aria-current={index === activeIndex}
                                className="group/dot relative z-[1] flex shrink-0 flex-col items-center gap-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
                              >
                                <span
                                  className={cn(
                                    "size-2.5 rounded-full border bg-neutral-950 transition-colors duration-300",
                                    index === activeIndex
                                      ? "border-brand-red bg-brand-red"
                                      : "border-white/25 group-hover/dot:border-white/50",
                                  )}
                                />
                                <span
                                  className={cn(
                                    "max-w-[4.5rem] truncate font-outfit text-[9px] font-medium tracking-[0.04em] transition-colors duration-300 sm:text-[10px]",
                                    index === activeIndex
                                      ? "text-brand-cream"
                                      : "text-neutral-500 group-hover/dot:text-neutral-300",
                                  )}
                                >
                                  {step.year.split(" - ")[0]}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
