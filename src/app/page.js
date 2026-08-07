"use client";

import { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import BentoSection from "../components/BentoSection";
import ProjectBand from "../components/ProjectBand";
import Footer from "../components/Footer";
import { useHomepageScripts } from "../hooks/useHomepageScripts";
import { consumeScrollTarget } from "../components/ReturnToBentoLink";

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
  const mainRef = useRef(null);
  useHomepageScripts();

  useEffect(() => {
    const sectionId = consumeScrollTarget();
    if (!sectionId) return;

    if (sectionId !== "bento" && !document.getElementById(sectionId)) return;

    const timers = [0, 50, 150, 350, 700].map((delay) =>
      window.setTimeout(() => {
        scrollScrollerToId(mainRef.current, sectionId);
      }, delay),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <main ref={mainRef} className="w-full h-[100dvh] overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black" id="top">
      {/* Section 1: Hero */}
      <Hero id="hero"/>

      {/* Section 2: Selected Projects — shown first for recruiter/client UX */}
      <ProjectBand id="projects"/>

      {/* Section 3: About Me — intro, philosophy, background */}
      <About scrollContainerRef={mainRef} id="about"/>

      {/* Section 4: Workflow & Stack — process, tools, bento nav */}
      <BentoSection id="bento"/>

      {/* Section 5: Contact & footer */}
      <Footer id="footer"/>
    </main>
  );
}
