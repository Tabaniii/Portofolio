"use client";

import {
  Layers,
  LayoutDashboard,
  Compass,
  Frame,
  FileText,
} from "lucide-react";
import { BentoGrid, BentoCard } from "./BentoGrid";
import EducationBentoCard from "./EducationBentoCard";
import StackBeam from "./bento/StackBeam";
import ProjectsMarquee from "./bento/ProjectsMarquee";
import {
  PhilosophyVisual,
  ArtVisual,
  ResumeVisual,
} from "./bento/MiniVisuals";

export default function BentoSection({ id = "bento" }) {
  return (
    <section
      id={id}
      className="w-full min-h-[100dvh] bg-black text-white section-padding-x py-8 sm:py-12 lg:min-h-0 lg:h-[100svh] lg:max-h-[100svh] lg:py-5 flex flex-col items-center justify-start lg:justify-center overflow-hidden snap-start snap-always"
      aria-label="Navigasi portfolio"
    >
      <BentoGrid className="max-w-6xl mx-auto w-full lg:flex-1 lg:min-h-0 lg:max-h-full">
        <BentoCard
          name="Stack"
          mobileName="Stack"
          className="col-span-1 min-h-[18rem] md:col-span-2 md:min-h-[18rem] lg:col-span-2 lg:row-span-2 lg:min-h-0"
          entryFrom="left"
          revealOnce
          revealDelay={0}
          Icon={Layers}
          eyebrow="capabilities"
          description="Core tools woven into one workflow."
          href="/stack"
          cta="View Stack"
          background={
            <div className="absolute inset-x-0 bottom-12 top-[40%] sm:top-[36%] lg:top-[30%]">
              <StackBeam />
            </div>
          }
        />

        <BentoCard
          name="Projects"
          mobileName="Projek"
          className="col-span-1 min-h-[14rem] md:col-span-1 md:min-h-[17rem] lg:col-span-2 lg:min-h-0"
          entryFrom="right"
          revealOnce
          revealDelay={0.06}
          Icon={LayoutDashboard}
          eyebrow="selected"
          description="Selected work in production."
          href="#projek"
          cta="View Projects"
          background={<ProjectsMarquee />}
        />

        <BentoCard
          name="Philosophy"
          mobileName="Filosofi"
          className="col-span-1 min-h-[13rem] md:col-span-1 md:min-h-[17rem] lg:col-span-1 lg:min-h-0"
          entryFrom="left"
          revealOnce
          revealDelay={0.1}
          Icon={Compass}
          eyebrow="mindset"
          description="Principles behind execution."
          href="/philosophy"
          cta="Read"
          background={<PhilosophyVisual />}
        />

        <EducationBentoCard
          className="col-span-1 min-h-[13rem] md:col-span-2 md:min-h-[17rem] lg:col-span-1 lg:min-h-0"
          entryFrom="right"
          revealOnce
          revealDelay={0.14}
        />

        <BentoCard
          name="Art"
          mobileName="Art"
          className="col-span-1 min-h-[13rem] md:col-span-1 md:min-h-[17rem] lg:col-span-2 lg:min-h-0"
          entryFrom="left"
          revealOnce
          revealDelay={0.18}
          Icon={Frame}
          eyebrow="visual practice"
          description="Studies in type and composition."
          href="#Art"
          cta="View"
          background={<ArtVisual />}
        />

        <BentoCard
          name="Resume"
          mobileName="resume"
          className="col-span-1 min-h-[13rem] md:col-span-2 md:min-h-[17rem] lg:col-span-2 lg:min-h-0"
          entryFrom="right"
          revealOnce
          revealDelay={0.22}
          Icon={FileText}
          eyebrow="profile"
          description="Professional resume summary."
          href="https://drive.google.com/file/d/1eBgic2PsW0uH6lIaXN27BfMwuylNPWlb/view?usp=sharing"
          target="_blank"
          cta="Open"
          background={<ResumeVisual />}
        />
      </BentoGrid>
    </section>
  );
}
