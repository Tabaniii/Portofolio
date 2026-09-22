"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import BentoSection from "../components/BentoSection";
import ProjectBand from "../components/ProjectBand";
import Footer from "../components/Footer";
import LenisProvider from "../components/LenisProvider";
import { useHomepageScripts } from "../hooks/useHomepageScripts";
import {
  consumeScrollTarget,
  clearScrollTarget,
  hasPendingScrollTarget,
  isPageReload,
} from "../components/ReturnToBentoLink";

function scrollScrollerToId(scroller, id) {
  const target = document.getElementById(id);
  if (!scroller || !target) return false;

  const scrollerRect = scroller.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const nextTop = scroller.scrollTop + (targetRect.top - scrollerRect.top);

  scroller.scrollTo({ top: nextTop, behavior: "auto" });
  return true;
}

export default function Home() {
  const lenisRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [scrollReady, setScrollReady] = useState(false);
  useHomepageScripts();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (isPageReload()) {
      clearScrollTarget();
      if (window.location.hash) {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Bind Lenis wrapper sebagai scroller untuk Framer Motion + GSAP.
  useEffect(() => {
    let frame = 0;
    let tries = 0;

    const bind = () => {
      const wrapper = lenisRef.current?.wrapper ?? null;
      if (wrapper) {
        scrollContainerRef.current = wrapper;
        if (isPageReload() || !hasPendingScrollTarget()) {
          wrapper.scrollTop = 0;
        }
        setScrollReady(true);
        return;
      }

      if (tries < 30) {
        tries += 1;
        frame = requestAnimationFrame(bind);
      }
    };

    bind();
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!scrollReady) return undefined;

    const resetToHero = () => {
      const nextScroller =
        lenisRef.current?.wrapper ?? scrollContainerRef.current;
      const nextLenis = lenisRef.current?.lenis;
      nextScroller?.scrollTo({ top: 0, behavior: "auto" });
      nextLenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    };

    // Reload selalu Hero. Masuk link biasa juga Hero, kecuali ada target
    // scroll yang disengaja (hash / kembali dari halaman dalam).
    if (isPageReload()) {
      clearScrollTarget();
      if (window.location.hash) {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }

      const timers = [0, 50, 150, 350, 700].map((delay) =>
        window.setTimeout(resetToHero, delay),
      );
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }

    const sectionId = consumeScrollTarget();
    const hasTarget =
      sectionId &&
      (sectionId === "bento" || Boolean(document.getElementById(sectionId)));

    if (!hasTarget) {
      const timers = [0, 50, 150, 350, 700].map((delay) =>
        window.setTimeout(resetToHero, delay),
      );
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }

    const timers = [0, 50, 150, 350, 700].map((delay) =>
      window.setTimeout(() => {
        const scroller = lenisRef.current?.wrapper ?? scrollContainerRef.current;
        scrollScrollerToId(scroller, sectionId);
      }, delay),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [scrollReady]);

  return (
    <LenisProvider
      ref={lenisRef}
      id="top"
      className="w-full h-[100dvh] overflow-y-auto overscroll-none bg-black"
    >
      {/* Section 1: Hero */}
      <Hero id="hero" />

      {/* Section 2: Selected Projects — sticky stacking cards */}
      <ProjectBand
        key={scrollReady ? "projects-ready" : "projects-pending"}
        scrollContainerRef={scrollContainerRef}
      />

      {/* Section 3: About Me — intro, philosophy, background */}
      <About
        key={scrollReady ? "about-ready" : "about-pending"}
        scrollContainerRef={scrollContainerRef}
        id="about"
      />

      {/* Section 4: Workflow & Stack — process, tools, bento nav */}
      <BentoSection id="bento" />

      {/* Section 5: Contact & footer */}
      <Footer id="footer" />
    </LenisProvider>
  );
}
