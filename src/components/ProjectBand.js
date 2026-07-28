"use client";


import Image from "next/image";

const PROJECTS = [
  {
    id: "ride62",
    title: "Ride62",
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

function ProjectCard({ project }) {
  const isLive = project.status === "live";

  if (!isLive) {
    // Coming Soon card
    return (
      <article className="relative flex min-h-[500px] flex-col border border-zinc-800 bg-black opacity-60 cursor-not-allowed">
        {/* Lock Icon Placeholder */}
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-zinc-800 flex items-center justify-center bg-zinc-950">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={`${project.title} cover`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 700px) 100vw, 33vw"
            />
          ) : (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          )}
        </div>

        {/* Title */}
        <div className="border-b border-zinc-800 p-4">
          <h3 className="m-0 text-[clamp(20px,3vh,28px)] font-black leading-none text-zinc-600">
            {project.title}
          </h3>
        </div>

        {/* Stack */}
        <div className="border-b border-zinc-800 p-4">
          <p className="m-0 text-[14px] font-medium text-zinc-700">
            {project.stack}
          </p>
        </div>

        {/* Spacer to push button down */}
        <div className="flex-grow" />

        {/* Disabled Button */}
        <div className="inline-flex w-full items-center justify-center gap-2 border-t border-zinc-800 bg-zinc-900 px-4 py-4 text-[12px] font-black uppercase tracking-[0.18em] text-zinc-700">
          See Detail
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </div>
      </article>
    );
  }

  // Live Project Card
  return (
    <article className="relative flex min-h-[500px] flex-col border border-zinc-800 bg-black">
      {/* Cover Image */}
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-zinc-800">
        <Image
          src={project.cover}
          alt={`${project.title} cover`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 700px) 100vw, 33vw"
          priority
        />
      </div>

      {/* Title */}
      <div className="border-b border-zinc-800 p-4">
        <h3 className="m-0 text-[clamp(20px,3vh,28px)] font-black leading-none text-white">
          {project.title}
        </h3>
      </div>

      {/* Stack (Categorized) */}
      <div className="border-b border-zinc-800 p-4 flex flex-col gap-3">
        {Object.entries(project.stack).map(([category, items]) => (
          <div key={category} className="flex flex-col gap-1">
            <h4 className="m-0 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-red">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {items.map((item, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-[11px] font-medium border border-zinc-700 bg-zinc-950 text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Spacer to push button down */}
      <div className="flex-grow" />

      {/* See Detail Button */}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 border-t border-zinc-700 bg-zinc-950 px-4 py-4 text-[12px] font-black uppercase tracking-[0.18em] text-white no-underline transition-all duration-200 hover:border-t-brand-red hover:bg-brand-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
      >
        See Detail
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
    </article>
  );
}

// Test commit for Vercel deployment
export default function ProjectBand() {
  return (
    <section
      id="projek"
      className="w-full min-h-screen bg-black text-white flex flex-col snap-start px-6 py-8 max-[768px]:py-6 min-[901px]:px-16 min-[901px]:py-12"
      aria-labelledby="project-heading"
    >
      <header className="flex items-end justify-between gap-6 mb-6 min-[901px]:mb-8">
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

      <div className="grid grid-cols-1 gap-4 min-[700px]:grid-cols-3 min-[700px]:gap-5">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
