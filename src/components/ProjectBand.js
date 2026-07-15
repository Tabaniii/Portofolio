"use client";

import Image from "next/image";
import { useId, useState } from "react";

const PROJECTS = [
  {
    id: "ride62",
    status: "live",
    title: "Ride62",
    preview: "Flagship Full-Stack Marketplace",
    badge: "Live",
    href: "https://ride62.vercel.app/",
    cover: "/assets/img/cover_ride62.png",
    metrics: [
      {
        label: "Visual Concept",
        title: "Cinematic dark catalog",
        body: "Immersive dark-mode UI elevating standard vehicle listings into a premium, editorial showcase.",
      },
      {
        label: "Layout & Type",
        title: "Bold structural grid",
        body: "High-contrast typography hierarchy and deliberate information architecture built for quick scanning.",
      },
      {
        label: "Deliverables",
        title: "Shipped end-to-end",
        body: "UI Design · User Journey Mapping · Responsive Frontend Development.",
      },
    ],
  },
  {
    id: "project-02",
    status: "soon",
    title: "Project 02",
    preview: "Upcoming Release",
    badge: "Soon",
  },
  {
    id: "project-03",
    status: "soon",
    title: "Project 03",
    preview: "Upcoming Release",
    badge: "Soon",
  },
];

function CoverLive({ src, alt }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 700px) 100vw, 33vw"
        priority
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-black via-black/70 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

function CoverSoon() {
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-zinc-950"
      aria-hidden="true"
    >
      <div className="absolute inset-[14%] border border-dashed border-zinc-800 bg-zinc-900/40 blur-[1px]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-10 w-10 items-center justify-center border border-zinc-700 bg-black text-zinc-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, expanded, onToggle }) {
  const panelId = useId();
  const isSoon = project.status === "soon";

  if (isSoon) {
    return (
      <div
        className="group relative flex h-full min-h-0 flex-col border border-zinc-800 bg-black opacity-70"
        aria-disabled="true"
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden border-b border-zinc-800">
          <CoverSoon />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity duration-300 group-hover:bg-black/55 group-hover:opacity-100 group-focus-within:bg-black/55 group-focus-within:opacity-100">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-zinc-300">
              Coming Soon
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-3 p-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="m-0 text-[clamp(18px,2vh,22px)] font-black leading-none text-zinc-500">
                {project.title}
              </h3>
              <span className="shrink-0 border border-zinc-700 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-zinc-500">
                {project.badge}
              </span>
            </div>
            <p className="m-0 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-600">
              {project.preview}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article
      className={`relative flex h-full min-h-0 flex-col border bg-black transition-[border-color,box-shadow] duration-300 ${
        expanded ? "border-brand-red" : "border-zinc-800 hover:border-zinc-600"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="flex w-full flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-zinc-800">
          <CoverLive src={project.cover} alt={`${project.title} cover`} />
          <span className="absolute right-3 top-3 z-[1] border border-brand-red bg-black px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-brand-red">
            {project.badge}
          </span>
        </div>
        <div className="flex items-start justify-between gap-3 p-4">
          <div className="flex flex-col gap-1.5">
            <h3 className="m-0 text-[clamp(18px,2vh,22px)] font-black leading-none text-white">
              {project.title}
            </h3>
            <p className="m-0 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
              {project.preview}
            </p>
          </div>
          <span
            className={`mt-0.5 text-[18px] font-black leading-none text-brand-red transition-transform duration-300 ${
              expanded ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </div>
      </button>

      <div
        id={panelId}
        role="region"
        aria-label={`${project.title} details`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 border-t border-zinc-800 px-4 pb-4 pt-3">
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {project.metrics.map((metric) => (
                <li key={metric.label} className="m-0 flex flex-col gap-1">
                  <p className="m-0 text-[9px] font-extrabold uppercase tracking-[0.18em] text-brand-red">
                    {metric.label}
                  </p>
                  <p className="m-0 text-[13px] font-black leading-tight text-brand-outline">
                    {metric.title}
                  </p>
                  <p className="m-0 text-[12px] font-medium leading-[1.45] text-zinc-400">
                    {metric.body}
                  </p>
                </li>
              ))}
            </ul>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 border border-white bg-white px-4 py-3 text-[12px] font-black uppercase tracking-[0.14em] text-black no-underline transition-colors duration-200 hover:border-brand-red hover:bg-brand-red hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              LIVE INTERFACE
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectBand() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section
      id="projek"
      className="w-full h-screen bg-black text-white flex flex-col overflow-hidden snap-start px-6 py-8 max-[768px]:py-6 min-[901px]:px-16 min-[901px]:py-12"
      aria-labelledby="project-heading"
    >
      <header className="flex shrink-0 items-end justify-between gap-6 mb-6 min-[901px]:mb-8">
        <h2
          id="project-heading"
          className="m-0 text-[clamp(42px,7vh,72px)] font-black leading-none text-brand-red"
        >
          Projek
        </h2>
        <p className="m-0 pb-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-zinc-500">
          Grid · 03
        </p>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid h-full min-h-0 grid-cols-1 gap-4 min-[700px]:grid-cols-3 min-[700px]:gap-5">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              expanded={expandedId === project.id}
              onToggle={() =>
                setExpandedId((current) =>
                  current === project.id ? null : project.id
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
