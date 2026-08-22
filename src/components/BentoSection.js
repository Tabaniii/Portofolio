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
  RightBrainVisual,
  ResumeVisual,
} from "./bento/MiniVisuals";

export default function BentoSection({ id = "bento" }) {
  return (
    <section
      id={id}
      className="w-full h-[100dvh] max-h-[100dvh] bg-black text-white section-padding-x py-3 sm:py-4 lg:h-[100svh] lg:max-h-[100svh] lg:py-5 flex flex-col items-stretch justify-stretch overflow-hidden"
      aria-label="Navigasi portfolio"
    >
      <BentoGrid className="max-w-6xl mx-auto w-full flex-1 min-h-0">
        <BentoCard
          name="Stack"
          mobileName="Stack"
          className="col-span-1 min-h-0 lg:col-span-2 lg:row-span-2"
          entryFrom="left"
          revealOnce
          revealDelay={0}
          Icon={Layers}
          eyebrow="capabilities"
          description="Core tools woven into one workflow."
          href="/stack"
          cta="View Stack"
          background={
            <div className="absolute inset-x-0 bottom-8 top-[48%] lg:bottom-12 lg:top-[30%]">
              <StackBeam />
            </div>
          }
        />

        <BentoCard
          name="Projects"
          mobileName="Projek"
          className="col-span-1 min-h-0 lg:col-span-2"
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
          className="col-span-1 min-h-0 lg:col-span-1"
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
          className="col-span-1 min-h-0 lg:col-span-1"
          entryFrom="right"
          revealOnce
          revealDelay={0.14}
        />

        <BentoCard
          name="right brain zone"
          mobileName="right brain"
          className="col-span-1 min-h-0 lg:col-span-2"
          entryFrom="left"
          revealOnce
          revealDelay={0.18}
          Icon={Frame}
          eyebrow="visual practice"
          description="Studies in type and composition."
          href="#right-brain"
          cta="View"
          background={<RightBrainVisual />}
        />

        <BentoCard
          name="Resume"
          mobileName="resume"
          className="col-span-1 min-h-0 lg:col-span-2"
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
