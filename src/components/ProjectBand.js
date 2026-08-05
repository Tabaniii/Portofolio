"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ScrollSlideUp } from "./MotionPrimitives";

const PROJECTS = [
  {
    id: "ride62",
    title: "Ride62",
    description:
      "Mobility booking flow dengan realtime dispatch, live status, dan operasi yang terasa cepat di banyak surface.",
    stack: {
      frontend: ["Bootstrap", "Tailwind CSS", "jQuery", "Vite", "Sass", "Laravel Echo"],
      backend: ["PHP", "Laravel", "Pusher PHP Server", "Vercel Blob PHP"],
      database: ["MySQL", "MariaDB", "PostgreSQL", "SQLite"],
      deployment: ["Vercel"],
    },
    href: "https://ride62.vercel.app/",
    cover: "/assets/img/darkmodefix.png",
    status: "live",
  },
  {
    id: "project-02",
    title: "SajiIn",
    description:
      "Ordering experience dengan checkout, media asset handling, dan transaksi yang dibungkus dalam flow yang padat.",
    stack: {
      frontend: [
        "HTML",
        "CSS",
        "Tailwind",
        "Vanilla JavaScript",
      ],
      backend: [
        "PHP Native",
        "MySQLi",
        ".env Loader",
        "Midtrans Snap",
        "Cloudinary",
      ],
      database: [
        "MySQL-Compatible DB",
        "TiDB Cloud",
      ],
      deployment: ["Vercel"],
    },
    cover: "/assets/img/SajiIndarkmode.png",
    href: "https://sajihub.vercel.app",
    status: "live",
  },
  {
    id: "project-03",
    title: "Project 03",
    stack: "Coming Soon",
    href: "#",
    status: "soon",
  },
];

function SectionIcon({ kind }) {
  const commonProps = {
    className: "h-4 w-4 text-zinc-500",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  switch (kind) {
    case "description":
      return (
        <svg {...commonProps}>
          <path d="M4 6h16" />
          <path d="M4 12h10" />
          <path d="M4 18h7" />
          <path d="M18 10l2 2-5 5H13v-2z" />
        </svg>
      );
    case "frontend":
      return (
        <svg {...commonProps}>
          <rect x="3" y="5" width="18" height="12" rx="2" />
          <path d="M8 20h8" />
          <path d="M12 17v3" />
        </svg>
      );
    case "backend":
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="16" height="6" rx="1.5" />
          <rect x="4" y="14" width="16" height="6" rx="1.5" />
          <path d="M8 7h.01" />
          <path d="M8 17h.01" />
          <path d="M14 7h2" />
          <path d="M14 17h2" />
        </svg>
      );
    case "database":
      return (
        <svg {...commonProps}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v8c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 10c0 1.7 3.1 3 7 3s7-1.3 7-3" />
        </svg>
      );
    case "deployment":
      return (
        <svg {...commonProps}>
          <path d="M12 4v12" />
          <path d="m7 9 5-5 5 5" />
          <path d="M5 20h14" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 3" />
        </svg>
      );
  }
}

function TechBadge({ label }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium tracking-[0.05em] text-zinc-300">
      <span>{label}</span>
    </span>
  );
}

function StackGroup({ category, items }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <SectionIcon kind={category} />
        <h4 className="m-0 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-red">
          {category}
        </h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <TechBadge key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

function CardButton({ href, disabled = false }) {
  const content = (
    <>
      <span className="text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-200 group-hover:font-black">
        SEE DETAIL
      </span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </>
  );

  if (disabled) {
    return (
      <div className="group inline-flex w-full items-center justify-center gap-2 border-t border-white/5 bg-[#121212] px-4 py-4 text-zinc-600">
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex w-full items-center justify-center gap-2 border-t border-white/5 bg-[#121212] px-4 py-4 text-zinc-300 no-underline transition-colors duration-300 hover:bg-[#1a1a1a] hover:text-white"
    >
      {content}
    </a>
  );
}

function LiveProjectCard({ project, index }) {
  return (
    <ScrollSlideUp
      as="article"
      delay={index * 0.15}
      duration={0.75}
      distance={34}
      margin="-50px"
      className="group relative flex min-h-[auto] sm:min-h-[620px] flex-col overflow-hidden rounded-[16px] sm:rounded-[20px] border border-white/10 bg-[#0d0d0d] transition-transform duration-300 hover:-translate-y-1.5 hover:border-[rgba(220,38,38,0.2)]"
    >
      <div className="relative border-b border-white/5 p-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[12px] border border-white/5 bg-[#121212]">
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 700px) 100vw, 33vw"
            priority
          />
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[rgba(220,38,38,0.2)] bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-brand-red backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            Live
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-5 py-3 sm:py-4">
        <h3 className="m-0 text-[clamp(20px,4vw,24px)] font-bold leading-none text-white">
          {project.title}
        </h3>
      </div>

      <div className="px-4 sm:px-5 pb-3 sm:pb-4">
        <p className="m-0 text-[clamp(13px,2.8vw,14px)] leading-[1.6] text-zinc-400 line-length-control">
          {project.description}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 border-t border-white/5 px-4 sm:px-5 py-3 sm:py-4">
        {Object.entries(project.stack).map(([category, items]) => (
          <StackGroup key={category} category={category} items={items} />
        ))}
      </div>

      <div className="flex-grow" />

      <CardButton href={project.href} />
    </ScrollSlideUp>
  );
}

function MysteryCard({ project, index }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let glitchTimeout;
    let resetTimeout;
    let active = true;

    const scheduleGlitch = () => {
      const delay = 4200 + Math.random() * 7000;
      glitchTimeout = window.setTimeout(() => {
        if (!active) return;

        setIsGlitching(true);
        resetTimeout = window.setTimeout(() => {
          if (!active) return;
          setIsGlitching(false);
          scheduleGlitch();
        }, 90);
      }, delay);
    };

    scheduleGlitch();

    return () => {
      active = false;
      window.clearTimeout(glitchTimeout);
      window.clearTimeout(resetTimeout);
    };
  }, []);

  return (
    <ScrollSlideUp
      as="article"
      delay={index * 0.15}
      duration={0.75}
      distance={34}
      margin="-50px"
      className={`group relative flex min-h-[auto] sm:min-h-[620px] cursor-not-allowed flex-col overflow-hidden rounded-[16px] sm:rounded-[20px] border border-white/10 bg-[#0d0d0d] opacity-90 transition-transform duration-300 hover:-translate-y-1.5 hover:border-[rgba(220,38,38,0.2)] ${isGlitching ? "projectband-glitch" : ""}`}
      aria-disabled="true"
    >
      <div className="border-b border-white/5 p-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[12px] border border-white/5 bg-[#121212] flex items-center justify-center">
          <div className="absolute left-1/2 top-1/2 h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 bg-[#0a0a0a]" />
          <div className="absolute left-1/2 top-1/2 h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red shadow-[0_0_10px_rgba(120,6,6,0.8)]" />
          
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[rgba(220,38,38,0.2)] bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-brand-red/80 backdrop-blur-md">
            Classified
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-5 py-3 sm:py-4">
        <h3 className="m-0 text-[clamp(20px,4vw,24px)] font-bold leading-none text-zinc-500">
          {project.title}
        </h3>
      </div>

      <div className="px-4 sm:px-5 pb-3 sm:pb-4">
        <p className="m-0 text-[clamp(13px,2.8vw,14px)] leading-[1.6] text-zinc-600 line-length-control">
          Access masih dikunci. Surface ini sengaja tampil kayak data field terenkripsi yang belum dibuka.
        </p>
      </div>

      <div className="border-t border-white/5 px-4 sm:px-5 py-3 sm:py-4">
        <div className="rounded-[12px] border border-white/5 bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2">
            <SectionIcon kind="database" />
            <h4 className="m-0 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              status
            </h4>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between rounded-[8px] border border-white/5 bg-black/40 px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500">channel</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-red/80">sealed</span>
            </div>
            <div className="flex items-center justify-between rounded-[8px] border border-white/5 bg-black/40 px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500">access</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-red/80">{project.stack}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow" />

      <CardButton disabled />
    </ScrollSlideUp>
  );
}

function ProjectCard({ project, index }) {
  if (project.status !== "live") {
    return <MysteryCard project={project} index={index} />;
  }

  return <LiveProjectCard project={project} index={index} />;
}

export default function ProjectBand() {
  return (
    <section
      id="projek"
      className="relative isolate flex min-h-screen w-full snap-start flex-col overflow-hidden bg-black section-padding-x py-8 sm:py-10 lg:py-12 text-white"
      aria-labelledby="project-heading"
    >
      <header className="relative z-10 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
        <h2
          id="project-heading"
          className="m-0 font-[TabaniDisplay,Inter,Poppins,Arial,Helvetica,sans-serif] text-[clamp(40px,8vw,76px)] font-black leading-none tracking-[0.02em] text-brand-red"
        >
          Projek
        </h2>
        <p className="m-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 backdrop-blur-md shrink-0">
          Grid · 03
        </p>
      </header>

      <div className="relative z-10 responsive-grid-1-2-3">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
