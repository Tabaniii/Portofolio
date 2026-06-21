"use client";

import Hero from "../components/Hero";
import About from "../components/About";
import BentoSection from "../components/BentoSection";
import ProjectBand from "../components/ProjectBand";
import Footer from "../components/Footer";
import { useHomepageScripts } from "../hooks/useHomepageScripts";

export default function Home() {
  useHomepageScripts();

  return (
    <main className="w-full min-h-screen overflow-x-hidden" id="top">
      {/* Section 1: Hero */}
      <Hero />

      {/* Section 3: Intro split */}
      <About />

      {/* Section 4: Bento card grid */}
      <BentoSection />

      {/* Section 5: Project band */}
      <ProjectBand />

      {/* Section 6: Contact & footer */}
      <Footer />
    </main>
  );
}

