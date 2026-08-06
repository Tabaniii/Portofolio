"use client";

import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { DirectionalSlide } from "./MotionPrimitives";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

const BentoGrid = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-5 auto-rows-[minmax(8.25rem,auto)] md:auto-rows-[minmax(18rem,auto)] lg:auto-rows-[22rem]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  mobileName,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  eyebrow,
  note,
  cardHref,
  cardTarget,
  cardRel,
  cardDownload,
  revealDelay = 0,
  revealOnce = false,
  entryFrom = "left",
  ...props
}) => {
  const router = useRouter();
  const isMobile = useIsMobile(768);
  const displayMobileName = mobileName ?? name;

  const finalHref = cardHref ?? href ?? "#";
  const isExternal = cardTarget === "_blank";
  const isFile = /\.(pdf|png|jpg|jpeg|svg|docx|doc|xlsx|xls|zip)$/i.test(finalHref);

  const handleNavigate = () => {
    if (typeof window === "undefined") return;

    if (isFile) {
      if (isMobile) {
        window.location.href = finalHref;
      } else {
        try {
          const win = window.open(finalHref, "_blank", "noopener,noreferrer");
          if (!win || win.closed || typeof win.closed === "undefined") {
            window.location.href = finalHref;
          }
        } catch {
          window.location.href = finalHref;
        }
      }
      return;
    }

    if (cardDownload) {
      if (isMobile) {
        window.location.href = finalHref;
      } else {
        const link = document.createElement("a");
        link.href = finalHref;
        link.download =
          typeof cardDownload === "string" ? cardDownload : "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      return;
    }

    if (isExternal) {
      if (isMobile) {
        window.location.href = finalHref;
      } else {
        try {
          const win = window.open(finalHref, "_blank", "noopener,noreferrer");
          if (!win || win.closed || typeof win.closed === "undefined") {
            window.location.href = finalHref;
          }
        } catch {
          window.location.href = finalHref;
        }
      }
      return;
    }

    if (finalHref.startsWith("#")) {
      const id = finalHref.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.hash = finalHref;
      }
      return;
    }

    try {
      router.push(finalHref);
    } catch {
      window.location.href = finalHref;
    }
  };

  const interactiveProps = {
    role: "link",
    tabIndex: 0,
    onClick: handleNavigate,
    onKeyDown: (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleNavigate();
      }
    },
  };

  return (
    <DirectionalSlide
      as="div"
      key={name}
      direction={entryFrom}
      delay={isMobile ? 0 : revealDelay}
      once={revealOnce}
      distance={isMobile ? 0 : 64}
      duration={isMobile ? 0.001 : 0.82}
      className={cn(
        "group relative overflow-hidden rounded-[14px] md:rounded-[22px] block",
        "bg-black text-white",
        "border border-white/10 active:border-white/20",
        "shadow-[0_14px_36px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.03)]",
        "transition-[transform,border-color] duration-200 ease-out active:scale-[0.985]",
        "md:transition-all md:duration-300 md:hover:-translate-y-1.5 md:hover:border-[rgba(120,6,6,0.35)] md:active:scale-100",
        "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
        className
      )}
      {...interactiveProps}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 opacity-35 md:opacity-100">{background}</div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_28%,transparent_72%,rgba(120,6,6,0.1))] opacity-80 md:opacity-70 md:transition-opacity md:duration-300 md:group-hover:opacity-100" />

      <div className="relative z-10 flex h-full min-h-[8.25rem] md:min-h-[18rem] lg:min-h-[22rem] flex-col justify-center md:justify-between p-4 md:p-5 lg:p-6">
        <div className="flex max-w-[88%] md:max-w-[60%] lg:max-w-[85%] flex-col gap-1.5 md:gap-2 lg:gap-3">
          {eyebrow ? (
            <span className="text-[9px] sm:text-[10px] md:text-[clamp(10px,2vw,11px)] font-black uppercase tracking-[0.2em] md:tracking-[0.22em] text-brand-red">
              {eyebrow}
            </span>
          ) : null}

          <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-10 lg:w-10 origin-left text-zinc-300 md:text-zinc-200 transition-transform duration-300 ease-out md:group-hover:scale-90 md:group-hover:text-white shrink-0" />

          <div className="space-y-0.5 md:space-y-1 lg:space-y-1.5">
            <h3 className="md:hidden m-0 font-black leading-[1.05] text-white break-words text-[clamp(1.2rem,5.4vw,1.7rem)]">
              {displayMobileName}
            </h3>
            <h3 className="hidden md:block text-[clamp(20px,5vw,32px)] font-black leading-[1.05] text-white break-words">
              {name}
            </h3>
            {description ? (
              <p className="m-0 max-w-lg text-[10px] sm:text-[11px] md:text-[clamp(13px,2.8vw,14px)] leading-[1.4] md:leading-[1.55] text-zinc-500 md:text-zinc-400 line-clamp-2 md:line-clamp-none break-words">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="hidden md:flex flex-row items-end justify-between gap-4 mt-auto">
          <div className="min-h-[18px] shrink-0">
            {note ? (
              <p className="m-0 text-[clamp(10px,2vw,11px)] font-medium uppercase tracking-[0.14em] text-zinc-500 line-clamp-1">
                {note}
              </p>
            ) : null}
          </div>

          <a
            href={href}
            target={cardTarget}
            rel={cardRel}
            download={cardDownload}
            onClick={(event) => event.stopPropagation()}
            className="touch-target pointer-events-none hidden md:inline-flex translate-y-2 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-white no-underline opacity-0 transition-all duration-300 hover:border-[rgba(120,6,6,0.45)] hover:text-brand-red group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 shrink-0"
          >
            {cta}
            <ArrowRightIcon className="h-4 w-4 rtl:rotate-180 shrink-0" />
          </a>
        </div>
      </div>
    </DirectionalSlide>
  );
};

export { BentoCard, BentoGrid };
