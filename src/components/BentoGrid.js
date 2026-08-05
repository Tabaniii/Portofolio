"use client";

import { useRouter } from "next/navigation";
import { ArrowRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
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
        "grid w-full grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 auto-rows-[minmax(10.5rem,1fr)] md:auto-rows-[minmax(18rem,auto)] lg:auto-rows-[22rem]",
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

  const handleNavigate = () => {
    if (typeof window === "undefined") return;

    if (cardDownload) {
      const link = document.createElement("a");
      link.href = finalHref;
      link.download =
        typeof cardDownload === "string" ? cardDownload : "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (isExternal) {
      const link = document.createElement("a");
      link.href = finalHref;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
        "group relative overflow-hidden rounded-[16px] md:rounded-[22px]",
        "bg-[#0a0a0a] md:bg-black text-white",
        "border border-brand-red/45 md:border-white/10 active:border-brand-red/70",
        "shadow-[0_0_0_1px_rgba(120,6,6,0.12),0_0_22px_rgba(120,6,6,0.1),0_10px_28px_rgba(0,0,0,0.5)] md:shadow-[0_18px_50px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.03)]",
        "transition-transform duration-200 ease-out active:scale-[0.98]",
        "md:transition-transform md:duration-300 md:hover:-translate-y-1.5 md:hover:border-[rgba(120,6,6,0.35)] md:active:scale-100",
        "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
        className
      )}
      {...interactiveProps}
      {...props}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(120,6,6,0.1),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(120,6,6,0.06),transparent_60%)] md:hidden" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(0,0,0,0.4)] md:hidden" />

      <div className="absolute inset-0 hidden md:block">{background}</div>
      <div className="absolute inset-0 hidden md:block bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%,transparent_72%,rgba(120,6,6,0.12))] opacity-70 md:transition-opacity md:duration-300 md:group-hover:opacity-100" />

      <div className="md:hidden absolute right-3 top-3 z-20">
        <ExternalLinkIcon className="h-4 w-4 text-brand-red/45" />
      </div>

      <div className="md:hidden relative z-10 flex h-full min-h-[10.5rem] w-full items-center justify-center p-4 sm:p-5">
        <h3 className="m-0 font-sans font-black tracking-wide text-white text-[clamp(1.35rem,6.2vw,2.5rem)] leading-none break-words text-center select-none">
          {displayMobileName}
        </h3>
      </div>

      <div className="hidden md:flex relative z-10 h-full min-h-[18rem] lg:min-h-[22rem] flex-col justify-between p-5 lg:p-6">
        <div className="flex max-w-[60%] lg:max-w-[85%] flex-col gap-2 lg:gap-3">
          {eyebrow ? (
            <span className="text-[clamp(10px,2vw,11px)] font-black uppercase tracking-[0.22em] text-brand-red">
              {eyebrow}
            </span>
          ) : null}

          <Icon className="h-7 w-7 lg:h-10 lg:w-10 origin-left text-zinc-200 transition-transform duration-300 ease-out group-hover:scale-90 group-hover:text-white shrink-0" />

          <div className="space-y-1 lg:space-y-1.5">
            <h3 className="text-[clamp(20px,5vw,32px)] font-black leading-[1.05] text-white break-words">
              {name}
            </h3>
            <p className="max-w-lg text-[clamp(13px,2.8vw,14px)] leading-[1.55] text-zinc-400 line-length-control break-words">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-end justify-between gap-4 mt-auto">
          <div className="min-h-[18px] shrink-0">
            {note ? (
              <p className="m-0 text-[clamp(10px,2vw,11px)] font-medium uppercase tracking-[0.14em] text-zinc-500">
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
            className="touch-target pointer-events-none inline-flex translate-y-2 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-white no-underline opacity-0 transition-all duration-300 hover:border-[rgba(120,6,6,0.45)] hover:text-brand-red group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 shrink-0"
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
