"use client";

import { useRef } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import BentoSection from "../components/BentoSection";
import ProjectBand from "../components/ProjectBand";
import Footer from "../components/Footer";
import { useHomepageScripts } from "../hooks/useHomepageScripts";

export default function Home() {
  const mainRef = useRef(null);
  useHomepageScripts();

  return (
    <main ref={mainRef} className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth" id="top">
      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Selected Projects — shown first for recruiter/client UX */}
      <ProjectBand />

      {/* Section 3: About Me — intro, philosophy, background */}
      <About scrollContainerRef={mainRef} />

      {/* Section 4: Workflow & Stack — process, tools, bento nav */}
      <BentoSection />

      {/* Section 5: Contact & footer */}
      <Footer />
    </main>
  );
}


