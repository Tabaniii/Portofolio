"use client";

import { ShinyButton } from "./ShinyButton";
import { ScrollSlideUp, StaggerGroup, StaggerItem } from "./MotionPrimitives";

export default function Footer() {
  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/_tabaniii" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/akmal-tabani" },
    { label: "GitHub", href: "https://github.com/Tabaniii" },
    { label: "WhatsApp", href: "https://wa.me/85559536429" },
  ];

  const footerLinks = [
    { label: "Email", href: "mailto:tabani@email.com" },
    { label: "Projects", href: "#projek" },
    {
      label: "Resume",
      href: "https://drive.google.com/file/d/1eBgic2PsW0uH6lIaXN27BfMwuylNPWlb/view?usp=sharing",
      external: true,
    },
  ];

  return (
    <footer
      className="relative w-full h-screen min-h-[100svh] bg-black text-white overflow-hidden"
      id="contact"
      aria-label="Footer"
    >
      {/* Content Wrapper: ALL negative space DI LEMPAR ke ATAS. 
          INNER GROUP = CTA + medsos, dipush mt-auto, CTA menempel medsos (gap kecil), medsos 14px ke Tabani */}
      <div className="relative z-10 w-full h-full min-h-[100svh] flex flex-col lg:flex-row items-start section-padding-x pt-0 sm:pt-0 lg:pt-24 pb-0 sm:pb-0 lg:pb-0">
        <div
          className="w-full flex flex-col lg:flex-row lg:justify-between lg:w-full lg:items-start mt-auto lg:mt-0 gap-6 sm:gap-8 lg:gap-16 max-lg:mb-[calc(clamp(160px,30vw,500px)*0.72+6.5rem)] lg:mb-[calc(clamp(64px,18vw,500px)*0.6+75px)]"
        >
          <ScrollSlideUp
            className="flex flex-col gap-3 sm:gap-4 lg:max-w-md w-full lg:w-auto lg:shrink-0"
            duration={0.85}
            distance={38}
            amount={0.25}
          >
            <h2 className="mt-5 text-[clamp(32px,9vw,72px)] font-black leading-[0.9] tracking-tight">
              Let's <br />
              <span
                className="inline-block mt-2 sm:mt-[20px] mb-1 sm:-mb-[20px] font-normal text-brand-red text-[1.7em] sm:text-[2.0em]"
                style={{ fontFamily: "Carattere, cursive" }}
              >
                Collaborate.
              </span>
            </h2>
            <p className="m-0 text-[clamp(13px,2.8vw,16px)] font-medium leading-[1.55] text-zinc-300 line-length-control">
              Mau ngobrol tentang proyek, kolaborasi, atau sekadar kerendahan hati? Drop email ke gua lewat tautan di bawah.
            </p>
            <ShinyButton
              href="mailto:tabani@email.com"
              className="touch-target w-fit rounded-[15px] border-white/20 bg-white px-5 sm:px-8 py-2.5 sm:py-4 font-black text-[12px] sm:text-[14px] tracking-[0.1em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red mb-2 sm:mb-0"
            >
              Send Email
            </ShinyButton>
          </ScrollSlideUp>

          <StaggerGroup
            as="nav"
            aria-label="Footer navigation"
            className="grid w-full sm:w-auto grid-cols-2 gap-x-8 sm:gap-x-12 lg:gap-x-20 gap-y-1 sm:gap-y-2 lg:shrink-0 lg:pt-[0.35em] max-lg:pb-2"
            stagger={0.08}
            delayChildren={0.1}
            amount={0.3}
          >
            {socialLinks.map((link, index) => (
              <StaggerItem key={`row-${index}`} as="div" className="contents">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target inline-flex items-center -mx-3 sm:-mx-4 text-[clamp(12px,2.8vw,14px)] font-medium uppercase tracking-[0.1em] text-zinc-300 no-underline transition-colors duration-300 hover:text-brand-red focus-visible:outline-none focus-visible:text-brand-red"
                >
                  {link.label}
                </a>
                {footerLinks[index] ? (
                  <a
                    href={footerLinks[index].href}
                    {...(footerLinks[index].external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="touch-target inline-flex items-center -mx-3 sm:-mx-4 text-[clamp(12px,2.8vw,14px)] font-medium uppercase tracking-[0.1em] text-zinc-300 no-underline transition-colors duration-300 hover:text-brand-red focus-visible:outline-none focus-visible:text-brand-red"
                  >
                    {footerLinks[index].label}
                  </a>
                ) : (
                  <span className="touch-target inline-flex items-center -mx-3 sm:-mx-4 text-[clamp(12px,2.8vw,14px)] font-medium uppercase tracking-[0.1em] text-brand-red">
                    Open for freelance
                  </span>
                )}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>

      {/* Bottom Section: Giant Typography */}
      <div className="absolute bottom-0 w-full flex justify-center z-0 pointer-events-none select-none text-brand-red px-2">
        <span
          className="text-[clamp(160px,30vw,2000px)] leading-[0.6] font-normal whitespace-nowrap"
          style={{ fontFamily: "Carattere, cursive" }}
          aria-hidden="true"
        >
          Tabani
        </span>
      </div>
    </footer>
  );
}
