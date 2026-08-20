"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Card from "./Card";

export const PROJECT_HEADING = "PROFESIONAL PROJECT";

/**
 * Project data untuk sticky stacking cards.
 * Palet merah/hitam dibedakan per kartu supaya stack terbaca jelas.
 */
export const PROJECTS = [
  {
    id: "ride62",
    label: "01",
    title: "Ride62",
    description:
      "Mobility booking flow dengan realtime dispatch, live status, dan operasi yang terasa cepat di banyak surface.",
    price: "Live",
    color: "#780606",
    tone: "red",
    cover: "/assets/img/darkmodefix.png",
    coverContain: true,
    href: "https://ride62.vercel.app/",
    status: "live",
    stack: {
      frontend: ["Bootstrap", "Tailwind CSS", "jQuery", "Vite", "Sass", "Laravel Echo"],
      backend: ["PHP", "Laravel", "Pusher PHP Server", "Vercel Blob PHP"],
      database: ["MySQL", "MariaDB", "PostgreSQL", "SQLite"],
      deployment: ["Vercel"],
    },
  },
  {
    id: "sajjin",
    label: "02",
    title: "SajiIn",
    description:
      "Ordering experience dengan checkout, media asset handling, dan transaksi yang dibungkus dalam flow yang padat.",
    price: "Live",
    color: "#000000",
    tone: "black",
    cover: "/assets/img/SajiIndarkmode.png",
    coverContain: true,
    coverLift: true,
    href: "https://sajihub.vercel.app",
    status: "live",
    stack: {
      frontend: ["HTML", "CSS", "Tailwind", "Vanilla JavaScript"],
      backend: ["PHP Native", "MySQLi", ".env Loader", "Midtrans Snap", "Cloudinary"],
      database: ["MySQL-Compatible DB", "TiDB Cloud"],
      deployment: ["Vercel"],
    },
  },
  {
    id: "karalia",
    label: "03",
    title: "Karalia",
    description:
      "Web jual beli emas dan logam mulia. Di project ini gua cuma pegang Functional Testing dengan Positive Testing — bukan sebagai pembuat.",
    price: "Live",
    color: "#780606",
    tone: "red",
    cover: "/assets/img/karalia.png",
    coverPosition: "top",
    href: "https://www.karalia.co.id",
    status: "live",
    stack: {
      role: ["Functional Testing"],
      method: ["Positive Testing"],
    },
  },
];

/**
 * Scroll container untuk efek sticky stacking cards.
 * Progress section di-share ke tiap Card untuk scale/dim.
 */
export default function ProjectsSection({
  projects = PROJECTS,
  scrollContainerRef,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative z-0 w-full">
      {projects.map((project, index) => {
        const targetScale = 1 - (projects.length - index) * 0.045;
        const start = index / projects.length;
        const end = 1;

        return (
          <Card
            key={project.id}
            project={project}
            index={index}
            progress={scrollYProgress}
            range={[start, end]}
            targetScale={targetScale}
            scrollContainerRef={scrollContainerRef}
            isLast={index === projects.length - 1}
          />
        );
      })}
    </div>
  );
}
