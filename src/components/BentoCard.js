"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
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

export default function BentoCard({
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
}) {
  const router = useRouter();
  const isMobile = useIsMobile(768);
  const displayMobileName = mobileName ?? name;

  const finalHref = cardHref ?? href ?? "#";
  const linkTarget = cardTarget ?? target;
  const opensNewTab = linkTarget === "_blank";
  const linkRel = cardRel ?? (opensNewTab ? "noopener noreferrer" : undefined);
  const isExternalUrl = /^https?:\/\//i.test(finalHref);
  const isFile = /\.(pdf|png|jpg|jpeg|svg|docx|doc|xlsx|xls|zip)$/i.test(finalHref);
  const isInternalAppRoute =
    finalHref.startsWith("/") &&
    !finalHref.startsWith("//") &&
    !isExternalUrl &&
    !isFile &&
    !cardDownload &&
    !opensNewTab;
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
    : isInternalAppRoute
      ? {
          href: finalHref,
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

  const SlideTag = isNativeNewTabLink ? "a" : isInternalAppRoute ? Link : "div";

  return (
    <DirectionalSlide
      as={SlideTag}
      key={name}
      direction={entryFrom}
      delay={isMobile ? 0 : revealDelay}
      once={revealOnce}
      distance={isMobile ? 0 : 56}
      duration={isMobile ? 0.001 : 0.75}
      amount={0.12}
      margin="-10% 0px -10% 0px"
      className={cn(
        "group relative block h-full min-h-0 overflow-hidden rounded-2xl",
        "border border-white/10 bg-neutral-950 text-white",
        "transition-colors duration-300 ease-out",
        "hover:bg-neutral-900 hover:border-white/15",
        "cursor-pointer",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
        (isNativeNewTabLink || isInternalAppRoute) && "no-underline text-inherit",
        className
      )}
      {...interactiveProps}
      {...props}
    >
      {background ? (
        <div className="pointer-events-none absolute inset-0 z-0 [&_.bento-marquee]:pointer-events-auto [&_button]:pointer-events-auto">
          {background}
        </div>
      ) : null}

      <div className="relative z-10 flex h-full min-h-0 flex-col justify-between p-3 lg:p-8">
        <div className="flex max-w-[90%] flex-col gap-1.5 lg:gap-3">
          {eyebrow ? (
            <span className="font-outfit text-[8px] font-medium uppercase tracking-[0.16em] text-neutral-500 lg:text-[10px] lg:tracking-[0.2em]">
              {eyebrow}
            </span>
          ) : null}

          {Icon ? (
            <Icon
              className="size-4 text-neutral-400 transition-colors duration-300 group-hover:text-brand-red lg:size-6"
              strokeWidth={1.5}
            />
          ) : null}

          <div className="space-y-1 lg:space-y-2">
            <h3 className="lg:hidden m-0 font-bricolage text-[0.98rem] font-semibold tracking-[-0.03em] leading-tight text-brand-cream">
              {displayMobileName}
            </h3>
            <h3 className="hidden lg:block m-0 font-bricolage text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold tracking-[-0.03em] leading-tight text-brand-cream">
              {name}
            </h3>
            {description ? (
              <p className="m-0 max-w-sm font-outfit text-[13px] leading-relaxed text-neutral-400 line-clamp-3 max-lg:hidden">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          {note ? (
            <p className="m-0 font-outfit text-[11px] uppercase tracking-[0.14em] text-neutral-600">
              {note}
            </p>
          ) : (
            <span />
          )}

          {cta ? (
            <span className="inline-flex items-center gap-1 font-outfit text-[11px] font-medium text-neutral-400 transition-colors duration-300 group-hover:text-brand-cream lg:gap-1.5 lg:text-[12px]">
              {cta}
              <ArrowRight className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </span>
          ) : null}
        </div>
      </div>
    </DirectionalSlide>
  );
}

export { BentoCard };
