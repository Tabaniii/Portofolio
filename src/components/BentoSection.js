"use client";

import { BentoGrid, BentoCard } from "./BentoGrid";
import { LayersIcon, DashboardIcon, BlendingModeIcon, ReaderIcon, FrameIcon, FileTextIcon } from "@radix-ui/react-icons";

function StackAmbient() {
  const chips = ["Laravel", "React", "Realtime", "SQL"];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-[60%] bg-[radial-gradient(circle_at_center,rgba(120,6,6,0.18),transparent_58%)] opacity-70 transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute right-3 sm:right-4 lg:right-6 top-3 sm:top-4 lg:top-6 flex flex-wrap justify-end gap-1.5 sm:gap-2 max-w-[55%] sm:max-w-[50%] lg:max-w-[45%]">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/10 bg-black/50 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400"
          >
            {chip}
          </span>
        ))}
      </div>
      <div className="absolute bottom-4 sm:bottom-5 lg:bottom-6 right-4 sm:right-5 lg:right-6 left-[42%] sm:left-[45%] flex items-end gap-1.5 sm:gap-2 opacity-75">
        <span className="h-6 sm:h-8 w-1.5 sm:w-2 rounded-full bg-white/10" />
        <span className="h-10 sm:h-14 w-1.5 sm:w-2 rounded-full bg-white/10" />
        <span className="h-16 sm:h-20 w-1.5 sm:w-2 rounded-full bg-brand-red/50" />
        <span className="h-9 sm:h-12 w-1.5 sm:w-2 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

function ProjectsAmbient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,6,6,0.22),transparent_58%)]" />
      <div className="absolute right-5 top-5 h-20 w-24 rounded-[14px] border border-white/10 bg-black/45 shadow-[0_12px_24px_rgba(0,0,0,0.24)] transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex gap-1 px-2 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </div>
        <div className="mx-2 h-8 rounded-md bg-white/6" />
      </div>
      <div className="absolute bottom-5 right-10 h-16 w-20 rounded-[12px] border border-white/10 bg-black/45 shadow-[0_12px_24px_rgba(0,0,0,0.24)] transition-transform duration-500 group-hover:translate-y-1">
        <div className="mx-2 mt-2 h-2 rounded-full bg-white/10" />
        <div className="mx-2 mt-2 h-2 w-[60%] rounded-full bg-brand-red/35" />
      </div>
    </div>
  );
}

function PhilosophyAmbient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,6,6,0.18),transparent_62%)]" />
      <div className="absolute right-6 top-6 h-24 w-24 rounded-full border border-white/10" />
      <div className="absolute right-10 top-10 h-16 w-16 rounded-full border border-brand-red/35" />
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
      </div>
    </div>
  );
}

function EducationAmbient() {
  const years = ["2023", "2026", "2030"];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-[45%] bg-[linear-gradient(180deg,rgba(120,6,6,0.14),transparent)]" />
      <div className="absolute right-5 sm:right-7 lg:right-8 top-5 sm:top-7 lg:top-8 bottom-16 sm:bottom-20 lg:bottom-24 w-px bg-white/10" />
      <div className="absolute right-4 sm:right-[23px] lg:right-[27px] top-6 sm:top-8 lg:top-10 flex h-[calc(100%-8rem)] sm:h-[calc(100%-9rem)] lg:h-[calc(100%-10rem)] flex-col justify-between">
        {years.map((year, index) => (
          <div key={year} className="relative">
            <span className={`absolute -left-[4px] sm:-left-[5px] top-1/2 h-2.5 w-2.5 sm:h-3 sm:w-3 -translate-y-1/2 rounded-full ${index === 1 ? "bg-brand-red" : "bg-white/30"}`} />
            <span className="ml-4 sm:ml-5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
              {year}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DkvAmbient() {
  const strips = ["type", "grid", "poster"];
  const stripOffsets = ["translate-x-0 sm:translate-x-0", "translate-x-0 sm:translate-x-2", "translate-x-0 sm:translate-x-4"];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(120,6,6,0.18),transparent_55%)]" />
      <div className="absolute right-3 sm:right-4 lg:right-6 top-3 sm:top-5 lg:top-6 flex w-[42%] sm:w-[38%] lg:w-[34%] max-w-[55%] flex-col gap-2 sm:gap-3">
        {strips.map((strip, index) => (
          <div
            key={strip}
            className={`rounded-full border border-white/10 bg-black/40 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-1.5 lg:py-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.22em] text-zinc-400 transition-transform duration-500 truncate ${stripOffsets[index]}`}
          >
            {strip}
          </div>
        ))}
      </div>
    </div>
  );
}

function CvAmbient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,6,6,0.24),transparent_58%)]" />
      <div className="absolute right-6 top-6 h-28 w-24 rounded-[16px] border border-white/10 bg-black/45 p-3 shadow-[0_16px_30px_rgba(0,0,0,0.28)]">
        <div className="mb-3 h-3 w-10 rounded-full bg-brand-red/45" />
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-white/10" />
          <div className="h-2 w-[75%] rounded-full bg-white/10" />
          <div className="h-2 w-[60%] rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function BentoSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white section-padding-x py-10 sm:py-12 lg:py-16 flex flex-col items-center justify-center overflow-hidden snap-start" aria-label="Navigasi portfolio">
      <BentoGrid className="max-w-5xl mx-auto w-full">
        <BentoCard
          name="Stack"
          mobileName="Stack"
          className="col-span-3 md:col-span-2 lg:col-span-2"
          entryFrom="left"
          revealDelay={0}
          Icon={LayersIcon}
          eyebrow="capabilities"
          description="Core tools and systems."
          href="#stack"
          cta="View Stack"
          note="technical foundation"
          background={<StackAmbient />}
        />
        <BentoCard
          name="Projects"
          mobileName="Projek"
          className="col-span-2 md:col-span-1 lg:col-span-1"
          entryFrom="right"
          revealDelay={0.08}
          Icon={DashboardIcon}
          eyebrow="selected"
          description="Selected work in production."
          href="#projek"
          cta="View Projects"
          note="live releases"
          background={<ProjectsAmbient />}
        />

        <BentoCard
          name="Philosophy"
          mobileName="Filosofi"
          className="col-span-2 md:col-span-1 lg:col-span-1"
          entryFrom="left"
          revealDelay={0.16}
          Icon={BlendingModeIcon}
          eyebrow="mindset"
          description="Principles behind execution."
          href="#filosofi"
          cta="Read Philosophy"
          note="clarity and restraint"
          background={<PhilosophyAmbient />}
        />
        <BentoCard
          name="Education"
          mobileName="Pendidikan"
          className="col-span-3 md:col-span-2 lg:col-span-2"
          entryFrom="right"
          revealDelay={0.24}
          Icon={ReaderIcon}
          eyebrow="journey"
          description="Academic and learning path."
          href="#pendidikan"
          cta="View Education"
          note="continuous development"
          background={<EducationAmbient />}
        />

        <BentoCard
          name="dkv side"
          mobileName="Art"
          className="col-span-3 md:col-span-2 lg:col-span-2"
          entryFrom="left"
          revealDelay={0.32}
          Icon={FrameIcon}
          eyebrow="visual practice"
          description="Visual studies and composition."
          href="#dkv-side"
          cta="View Design"
          note="type and grid"
          background={<DkvAmbient />}
        />
        <BentoCard
          name="Resume"
          mobileName="resume"
          className="col-span-2 md:col-span-1 lg:col-span-1"
          entryFrom="right"
          revealDelay={0.4}
          Icon={FileTextIcon}
          eyebrow="profile"
          description="Professional resume summary."
          href="/resume.pdf"
          cta="Open Resume"
          note="professional profile"
          cardHref="/resume.pdf"
          cardTarget="_blank"
          cardRel="noopener noreferrer"
          background={<CvAmbient />}
        />
      </BentoGrid>
    </section>
  );
}
