"use client";

import { BentoGrid, BentoCard } from "./BentoGrid";
import { Marquee, BentoMarqueeItem } from "./Marquee";
import { LayersIcon, DashboardIcon, BlendingModeIcon, ReaderIcon, FrameIcon, FileTextIcon } from "@radix-ui/react-icons";

const MARQUEE_MASK =
  "absolute top-8 sm:top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]";

function StackAmbient() {
  const items = [
    { name: "Laravel", body: "backend core" },
    { name: "React", body: "ui layer" },
    { name: "Realtime", body: "live sync" },
    { name: "SQL", body: "data layer" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-[60%] bg-[radial-gradient(circle_at_center,rgba(120,6,6,0.1),transparent_58%)] opacity-40 md:opacity-70 transition-transform duration-500 group-hover:scale-105" />
      <Marquee pauseOnHover className={MARQUEE_MASK}>
        {items.map((item) => (
          <BentoMarqueeItem key={item.name} name={item.name} body={item.body} />
        ))}
      </Marquee>
    </div>
  );
}

function ProjectsAmbient() {
  const items = [
    { name: "prod", body: "live release" },
    { name: "case", body: "selected work" },
    { name: "ship", body: "in production" },
    { name: "build", body: "end to end" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,6,6,0.12),transparent_58%)] md:bg-[radial-gradient(circle_at_top_right,rgba(120,6,6,0.22),transparent_58%)]" />
      <Marquee pauseOnHover reverse className={`${MARQUEE_MASK} [--duration:24s]`}>
        {items.map((item) => (
          <BentoMarqueeItem key={item.name} name={item.name} body={item.body} />
        ))}
      </Marquee>
    </div>
  );
}

function PhilosophyAmbient() {
  const items = [
    { name: "clarity", body: "less noise" },
    { name: "restraint", body: "intentional" },
    { name: "craft", body: "execution" },
    { name: "focus", body: "what matters" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,6,6,0.08),transparent_62%)] md:bg-[radial-gradient(circle_at_center,rgba(120,6,6,0.18),transparent_62%)]" />
      <Marquee pauseOnHover className={`${MARQUEE_MASK} [--duration:22s]`}>
        {items.map((item) => (
          <BentoMarqueeItem key={item.name} name={item.name} body={item.body} />
        ))}
      </Marquee>
    </div>
  );
}

function EducationAmbient() {
  const items = [
    { name: "2023", body: "started" },
    { name: "2026", body: "ongoing" },
    { name: "2030", body: "target" },
    { name: "learn", body: "continuous" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-[45%] bg-[linear-gradient(180deg,rgba(120,6,6,0.06),transparent)] md:bg-[linear-gradient(180deg,rgba(120,6,6,0.14),transparent)]" />
      <Marquee pauseOnHover reverse className={`${MARQUEE_MASK} [--duration:26s]`}>
        {items.map((item) => (
          <BentoMarqueeItem key={item.name} name={item.name} body={item.body} />
        ))}
      </Marquee>
    </div>
  );
}

function ArtAmbient() {
  const items = [
    { name: "type", body: "letterforms" },
    { name: "grid", body: "structure" },
    { name: "poster", body: "composition" },
    { name: "layout", body: "visual rhythm" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(120,6,6,0.08),transparent_55%)] md:bg-[radial-gradient(circle_at_bottom_right,rgba(120,6,6,0.18),transparent_55%)]" />
      <Marquee pauseOnHover className={`${MARQUEE_MASK} [--duration:18s]`}>
        {items.map((item) => (
          <BentoMarqueeItem key={item.name} name={item.name} body={item.body} />
        ))}
      </Marquee>
    </div>
  );
}

function CvAmbient() {
  const items = [
    { name: "experience", body: "work history" },
    { name: "skills", body: "core stack" },
    { name: "profile", body: "summary" },
    { name: "dw cv", body: "download" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,6,6,0.1),transparent_58%)] md:bg-[radial-gradient(circle_at_top_right,rgba(120,6,6,0.24),transparent_58%)]" />
      <Marquee pauseOnHover reverse className={`${MARQUEE_MASK} [--duration:21s]`}>
        {items.map((item) => (
          <BentoMarqueeItem key={item.name} name={item.name} body={item.body} />
        ))}
      </Marquee>
    </div>
  );
}

export default function BentoSection() {
  return (
    <section className="w-full min-h-screen lg:h-[100svh] lg:max-h-[100svh] bg-black text-white section-padding-x py-10 sm:py-12 lg:py-5 flex flex-col items-center justify-center overflow-hidden snap-start snap-always" aria-label="Navigasi portfolio">
      <BentoGrid className="max-w-5xl mx-auto w-full flex-1 min-h-0 lg:max-h-full">
        <BentoCard
          name="Stack"
          mobileName="Stack"
          className="col-span-3 md:col-span-2 lg:col-span-2"
          entryFrom="left"
          revealOnce
          revealDelay={0}
          Icon={LayersIcon}
          eyebrow="capabilities"
          description="Core tools and systems."
          href="#stack"
          cta="View Stack"
          background={<StackAmbient />}
        />
        <BentoCard
          name="Projects"
          mobileName="Projek"
          className="col-span-2 md:col-span-1 lg:col-span-1"
          entryFrom="right"
          revealOnce
          revealDelay={0.08}
          Icon={DashboardIcon}
          eyebrow="selected"
          description="Selected work in production."
          href="#projek"
          cta="View Projects"
          background={<ProjectsAmbient />}
        />

        <BentoCard
          name="Philosophy"
          mobileName="Filosofi"
          className="col-span-2 md:col-span-1 lg:col-span-1"
          entryFrom="left"
          revealOnce
          revealDelay={0.16}
          Icon={BlendingModeIcon}
          eyebrow="mindset"
          description="Principles behind execution."
          href="#filosofi"
          cta="Read Philosophy"
          background={<PhilosophyAmbient />}
        />
        <BentoCard
          name="Education"
          mobileName="Pendidikan"
          className="col-span-3 md:col-span-2 lg:col-span-2"
          entryFrom="right"
          revealOnce
          revealDelay={0.24}
          Icon={ReaderIcon}
          eyebrow="journey"
          description="Academic and learning path."
          href="#pendidikan"
          cta="View Education"
          background={<EducationAmbient />}
        />

        <BentoCard
          name="Art"
          mobileName="Art"
          className="col-span-3 md:col-span-2 lg:col-span-2"
          entryFrom="left"
          revealOnce
          revealDelay={0.32}
          Icon={FrameIcon}
          eyebrow="visual practice"
          description="Visual studies and composition."
          href="#Art"
          cta="View Design"
          background={<ArtAmbient />}
        />
        <BentoCard
          name="Resume"
          mobileName="resume"
          className="col-span-2 md:col-span-1 lg:col-span-1"
          entryFrom="right"
          revealOnce
          revealDelay={0.4}
          Icon={FileTextIcon}
          eyebrow="profile"
          description="Professional resume summary."
          href="https://drive.google.com/file/d/1eBgic2PsW0uH6lIaXN27BfMwuylNPWlb/view?usp=sharing"
          target="_blank"
          cta="Open Resume"
          background={<CvAmbient />}
        />
      </BentoGrid>
    </section>
  );
}
