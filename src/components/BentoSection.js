"use client";

import { BentoGrid, BentoCard } from "./BentoGrid";
import { LayersIcon, DashboardIcon, BlendingModeIcon, ReaderIcon, FrameIcon, FileTextIcon } from "@radix-ui/react-icons";

function StackAmbient() {
  const chips = ["Laravel", "React", "Realtime", "SQL"];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-[60%] bg-[radial-gradient(circle_at_center,rgba(120,6,6,0.1),transparent_58%)] opacity-40 md:opacity-70 transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute right-3 sm:right-4 lg:right-6 top-3 sm:top-4 lg:top-6 hidden sm:flex flex-wrap justify-end gap-1.5 sm:gap-2 max-w-[55%] sm:max-w-[50%] lg:max-w-[45%] opacity-50 md:opacity-100">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/8 bg-black/30 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500 md:border-white/10 md:bg-black/50 md:text-zinc-400"
          >
            {chip}
          </span>
        ))}
      </div>
      <div className="absolute bottom-4 sm:bottom-5 lg:bottom-6 right-4 sm:right-5 lg:right-6 left-[42%] sm:left-[45%] flex items-end gap-1.5 sm:gap-2 opacity-25 md:opacity-75">
        <span className="h-6 sm:h-8 w-1.5 sm:w-2 rounded-full bg-white/8 md:bg-white/10" />
        <span className="h-10 sm:h-14 w-1.5 sm:w-2 rounded-full bg-white/8 md:bg-white/10" />
        <span className="h-16 sm:h-20 w-1.5 sm:w-2 rounded-full bg-brand-red/25 md:bg-brand-red/50" />
        <span className="h-9 sm:h-12 w-1.5 sm:w-2 rounded-full bg-white/8 md:bg-white/10" />
      </div>
    </div>
  );
}

function ProjectsAmbient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,6,6,0.12),transparent_58%)] md:bg-[radial-gradient(circle_at_top_right,rgba(120,6,6,0.22),transparent_58%)]" />
      <div className="absolute right-4 top-4 h-14 w-16 md:right-5 md:top-5 md:h-20 md:w-24 rounded-[12px] md:rounded-[14px] border border-white/6 bg-black/20 shadow-[0_8px_16px_rgba(0,0,0,0.14)] transition-transform duration-500 group-hover:-translate-y-1 md:border-white/10 md:bg-black/45 md:shadow-[0_12px_24px_rgba(0,0,0,0.24)]">
        <div className="flex gap-1 px-2 py-1.5 md:py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red/70 md:bg-brand-red" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20 md:bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15 md:bg-white/20" />
        </div>
        <div className="mx-2 h-5 md:h-8 rounded-md bg-white/4 md:bg-white/6" />
      </div>
      <div className="absolute bottom-4 right-8 h-12 w-16 md:bottom-5 md:right-10 md:h-16 md:w-20 rounded-[10px] md:rounded-[12px] border border-white/6 bg-black/20 shadow-[0_8px_16px_rgba(0,0,0,0.14)] transition-transform duration-500 group-hover:translate-y-1 md:border-white/10 md:bg-black/45 md:shadow-[0_12px_24px_rgba(0,0,0,0.24)]">
        <div className="mx-2 mt-2 h-1.5 md:h-2 rounded-full bg-white/6 md:bg-white/10" />
        <div className="mx-2 mt-1.5 md:mt-2 h-1.5 md:h-2 w-[60%] rounded-full bg-brand-red/20 md:bg-brand-red/35" />
      </div>
    </div>
  );
}

function PhilosophyAmbient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,6,6,0.08),transparent_62%)] md:bg-[radial-gradient(circle_at_center,rgba(120,6,6,0.18),transparent_62%)]" />
      <div className="absolute right-4 top-4 h-14 w-14 md:right-6 md:top-6 md:h-24 md:w-24 rounded-full border border-white/6 md:border-white/10" />
      <div className="absolute right-7 top-7 h-8 w-8 md:right-10 md:top-10 md:h-16 md:w-16 rounded-full border border-brand-red/20 md:border-brand-red/35" />
    </div>
  );
}

function EducationAmbient() {
  const years = ["2023", "2026", "2030"];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-[45%] bg-[linear-gradient(180deg,rgba(120,6,6,0.06),transparent)] md:bg-[linear-gradient(180deg,rgba(120,6,6,0.14),transparent)]" />
      <div className="absolute right-4 sm:right-7 lg:right-8 top-4 sm:top-7 lg:top-8 bottom-12 sm:bottom-20 lg:bottom-24 w-px bg-white/5 md:bg-white/10" />
      <div className="absolute right-3 sm:right-[23px] lg:right-[27px] top-5 sm:top-8 lg:top-10 flex h-[calc(100%-5.5rem)] sm:h-[calc(100%-9rem)] lg:h-[calc(100%-10rem)] flex-col justify-between opacity-60 md:opacity-100">
        {years.map((year, index) => (
          <div key={year} className="relative">
            <span className={`absolute -left-[4px] sm:-left-[5px] top-1/2 h-2 w-2 sm:h-3 sm:w-3 -translate-y-1/2 rounded-full ${index === 1 ? "bg-brand-red/60 md:bg-brand-red" : "bg-white/15 md:bg-white/30"}`} />
            <span className="ml-3.5 sm:ml-5 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-700 md:text-zinc-500">
              {year}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtAmbient() {
  const strips = ["type", "grid", "poster"];
  const stripOffsets = ["translate-x-0", "translate-x-1 sm:translate-x-2", "translate-x-2 sm:translate-x-4"];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(120,6,6,0.08),transparent_55%)] md:bg-[radial-gradient(circle_at_bottom_right,rgba(120,6,6,0.18),transparent_55%)]" />
      <div className="absolute right-2 sm:right-4 lg:right-6 top-2 sm:top-5 lg:top-6 flex w-[38%] sm:w-[38%] lg:w-[34%] max-w-[55%] flex-col gap-1.5 sm:gap-3 opacity-50 md:opacity-100">
        {strips.map((strip, index) => (
          <div
            key={strip}
            className={`rounded-full border border-white/6 bg-black/20 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.16em] sm:tracking-[0.22em] text-zinc-600 transition-transform duration-500 truncate md:border-white/10 md:bg-black/40 md:text-zinc-400 ${stripOffsets[index]}`}
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,6,6,0.1),transparent_58%)] md:bg-[radial-gradient(circle_at_top_right,rgba(120,6,6,0.24),transparent_58%)]" />
      <div className="absolute right-3 top-3 h-20 w-[4.5rem] md:right-6 md:top-6 md:h-28 md:w-24 rounded-[12px] md:rounded-[16px] border border-white/6 bg-black/20 p-2 md:p-3 shadow-[0_8px_16px_rgba(0,0,0,0.16)] md:border-white/10 md:bg-black/45 md:shadow-[0_16px_30px_rgba(0,0,0,0.28)]">
        <div className="mb-2 md:mb-3 h-2 md:h-3 w-8 md:w-10 rounded-full bg-brand-red/25 md:bg-brand-red/45" />
        <div className="space-y-1.5 md:space-y-2">
          <div className="h-1.5 md:h-2 rounded-full bg-white/6 md:bg-white/10" />
          <div className="h-1.5 md:h-2 w-[75%] rounded-full bg-white/6 md:bg-white/10" />
          <div className="h-1.5 md:h-2 w-[60%] rounded-full bg-white/6 md:bg-white/10" />
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
          name="Art"
          mobileName="Art"
          className="col-span-3 md:col-span-2 lg:col-span-2"
          entryFrom="left"
          revealDelay={0.32}
          Icon={FrameIcon}
          eyebrow="visual practice"
          description="Visual studies and composition."
          href="#Art"
          cta="View Design"
          note="type and grid"
          background={<ArtAmbient />}
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
