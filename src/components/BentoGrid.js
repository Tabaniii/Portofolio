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
        "grid w-full grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4",
        "auto-rows-[minmax(8.25rem,auto)] md:auto-rows-[minmax(18rem,auto)]",
        "lg:grid-rows-[repeat(3,minmax(0,1fr))] lg:h-full lg:min-h-0",
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
  target,
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
  const linkTarget = cardTarget ?? target;
  const opensNewTab = linkTarget === "_blank";
  const linkRel = cardRel ?? (opensNewTab ? "noopener noreferrer" : undefined);
  const isExternalUrl = /^https?:\/\//i.test(finalHref);
  const isFile = /\.(pdf|png|jpg|jpeg|svg|docx|doc|xlsx|xls|zip)$/i.test(finalHref);
  const isNativeNewTabLink = opensNewTab && isExternalUrl && !cardDownload;

  const openInNewTab = () => {
    const link = document.createElement("a");
    link.href = finalHref;
    link.target = "_blank";
    link.rel = linkRel ?? "noopener noreferrer";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNavigate = () => {
    if (typeof window === "undefined") return;

    if (isFile) {
      if (opensNewTab || !isMobile) {
        openInNewTab();
      } else {
        window.location.href = finalHref;
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

    if (opensNewTab) {
      openInNewTab();
      return;
    }

    if (isExternalUrl) {
      window.location.href = finalHref;
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

  const interactiveProps = isNativeNewTabLink
    ? {
        href: finalHref,
        target: "_blank",
        rel: linkRel,
      }
    : {
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
      as={isNativeNewTabLink ? "a" : "div"}
      key={name}
      direction={entryFrom}
      delay={isMobile ? 0 : revealDelay}
      once={revealOnce}
      distance={isMobile ? 0 : 140}
      duration={isMobile ? 0.001 : 0.88}
      amount={0.12}
      margin="-10% 0px -10% 0px"
      className={cn(
        "group relative overflow-hidden rounded-[14px] md:rounded-[22px] block",
        "bg-black text-white",
        "border border-white/10 active:border-white/20",
        "shadow-[0_14px_36px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.03)]",
        "transition-[transform,border-color] duration-200 ease-out active:scale-[0.985]",
        "md:transition-[border-color,transform] md:duration-300 md:hover:border-[rgba(120,6,6,0.35)] md:active:scale-100",
        "lg:h-full lg:min-h-0",
        "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
        isNativeNewTabLink && "no-underline text-inherit",
        className
      )}
      {...interactiveProps}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 opacity-35 md:opacity-100 [&_.bento-marquee]:pointer-events-auto">{background}</div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_28%,transparent_72%,rgba(120,6,6,0.1))] opacity-80 md:opacity-70 md:transition-opacity md:duration-300 md:group-hover:opacity-100" />

      <div className="relative z-10 flex h-full min-h-[8.25rem] md:min-h-[18rem] lg:min-h-0 transform-gpu flex-col justify-between p-4 md:p-5 lg:p-5">
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

        {note ? (
          <p className="hidden md:block m-0 mt-auto text-[clamp(10px,2vw,11px)] font-medium uppercase tracking-[0.14em] text-zinc-500 line-clamp-1 transition-opacity duration-300 md:group-hover:opacity-40">
            {note}
          </p>
        ) : null}

        {cta ? (
          <div className="pointer-events-none mt-3 flex w-full transform-gpu flex-row items-center md:hidden">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
              {cta}
              <ArrowRightIcon className="h-3.5 w-3.5 rtl:rotate-180 shrink-0" />
            </span>
          </div>
        ) : null}
      </div>

      {cta ? (
        <div className="pointer-events-none absolute bottom-0 z-20 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 md:p-5 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 md:flex">
          {isNativeNewTabLink ? (
            <span className="inline-flex items-center gap-1.5 text-[clamp(12px,2vw,14px)] font-medium text-zinc-400">
              {cta}
              <ArrowRightIcon className="h-4 w-4 rtl:rotate-180 shrink-0" />
            </span>
          ) : (
            <a
              href={finalHref}
              target={linkTarget}
              rel={linkRel}
              download={cardDownload}
              onClick={(event) => event.stopPropagation()}
              className="pointer-events-auto inline-flex items-center gap-1.5 text-[clamp(12px,2vw,14px)] font-medium text-zinc-400 no-underline transition-colors duration-300 hover:text-white"
            >
              {cta}
              <ArrowRightIcon className="h-4 w-4 rtl:rotate-180 shrink-0" />
            </a>
          )}
        </div>
      ) : null}
    </DirectionalSlide>
  );
};

export { BentoCard, BentoGrid };
