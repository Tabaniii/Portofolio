"use client";

import BorderGlow from "./BorderGlow";
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
    { label: "CV", href: "#cv" },
  ];

  return (
    <footer
      className="relative w-full h-screen min-h-[100svh] bg-black text-white overflow-hidden snap-start"
      id="contact"
      aria-label="Footer"
    >
      {/* Content Wrapper: ALL negative space DI LEMPAR ke ATAS. 
          INNER GROUP = CTA + medsos, dipush mt-auto, CTA menempel medsos (gap kecil), medsos 14px ke Tabani */}
      <div className="relative z-10 w-full h-full min-h-[100svh] flex flex-col lg:flex-row items-start lg:items-center section-padding-x pt-0 sm:pt-0 lg:pt-24 pb-0 sm:pb-0 lg:pb-0">
        {/* ===== INNER GROUP (flex flow): mt-auto → SELURUH grup ketarik ke BAWAH. 
             SISA SPACE LEMPAR KE ATAS LAYAR. 
             - MOBILE: flex-col gap-4 (CTA atas, nav bawah, menempel 16px)
             - DESKTOP LG+: lg:flex-row lg:justify-between (CTA kiri, nav kanan, space between) ===== */}
        <div className="w-full flex flex-col mb-[16px] lg:mb-0 lg:flex-row lg:justify-between lg:w-full lg:items-center mt-auto lg:mt-0 gap-4 sm:gap-8 lg:gap-15">
          {/* Left Side: Call-to-Action — langsung anak dari inner flex (BUKAN dibungkus lagi), 
              di mobile posisi di ATAS nav medsos, cuma berjarak gap-4 */}
          <ScrollSlideUp
            className="flex flex-col gap-3 sm:gap-4 lg:max-w-md w-full lg:w-auto"
            duration={0.85}
            distance={38}
            amount={0.25}
          >
            <h2 className="m-0 text-[clamp(32px,9vw,72px)] font-black leading-[0.9] tracking-tight">
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
            <BorderGlow
              edgeSensitivity={35}
              glowColor="0 90 25"
              backgroundColor="#ffffff"
              borderRadius={15}
              glowRadius={30}
              glowIntensity={1.2}
              coneSpread={25}
              animated={true}
              colors={["#780606", "#8e3b3b", "#ff8d28"]}
              className="w-fit group transition-all duration-300 hover:!bg-brand-red"
            >
              <a
                href="mailto:tabani@email.com"
                className="touch-target inline-flex items-center justify-center px-5 sm:px-8 py-2.5 sm:py-4 text-black font-black text-[12px] sm:text-[14px] uppercase tracking-[0.1em] transition-colors duration-300 group-hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              >
                Send Email
              </a>
            </BorderGlow>
          </ScrollSlideUp>

          {/* Right Side: Navigation Links — di mobile DI BAWAH CTA (gap-4 = menempel), 
              JARAK KE TEKS "Tabani" = 14px persis: mb = Tabani actual height + 14px */}
          <div className="grid grid-cols-2 gap-3 sm:gap-12 lg:gap-20 w-full sm:w-auto"
               style={{ marginBottom: "calc(clamp(64px, 18vw, 500px) * 0.6 + 75px)" }}>
            {/* Socials Column */}
            <nav aria-label="Social links" className="w-full">
              <StaggerGroup
                as="ul"
                className="flex flex-col gap-1 sm:gap-2 m-0 p-0 list-none"
                stagger={0.08}
                delayChildren={0.1}
                amount={0.3}
              >
                {socialLinks.map((link) => (
                  <StaggerItem key={link.label} as="li" className="m-0">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target inline-flex items-center -mx-3 sm:-mx-4 text-[clamp(12px,2.8vw,14px)] font-medium uppercase tracking-[0.1em] text-zinc-300 no-underline transition-colors duration-300 hover:text-brand-red focus-visible:outline-none focus-visible:text-brand-red"
                    >
                      {link.label}
                    </a>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </nav>

            {/* Contact Column */}
            <nav aria-label="Contact details" className="w-full">
              <StaggerGroup
                as="ul"
                className="flex flex-col gap-1 sm:gap-2 m-0 p-0 list-none"
                stagger={0.08}
                delayChildren={0.14}
                amount={0.3}
              >
                {footerLinks.map((link) => (
                  <StaggerItem key={link.label} as="li" className="m-0">
                    <a
                      href={link.href}
                      className="touch-target inline-flex items-center -mx-3 sm:-mx-4 text-[clamp(12px,2.8vw,14px)] font-medium uppercase tracking-[0.1em] text-zinc-300 no-underline transition-colors duration-300 hover:text-brand-red focus-visible:outline-none focus-visible:text-brand-red"
                    >
                      {link.label}
                    </a>
                  </StaggerItem>
                ))}
                <StaggerItem as="li" className="m-0 pt-1 sm:pt-1">
                  <span
                    className="touch-target inline-flex items-center -mx-3 sm:-mx-0 text-[clamp(12px,2.8vw,15px)] font-medium uppercase tracking-[0.1em] text-brand-red">
                    Open for freelance
                  </span>
                </StaggerItem>
              </StaggerGroup>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Section: Giant Typography */}
      <div className="absolute bottom-0 w-full flex justify-center z-0 pointer-events-none select-none text-brand-red px-2">
        <span
          className="text-[clamp(160px,18vw,500px)] leading-[0.6] font-normal whitespace-nowrap"
          style={{ fontFamily: "Carattere, cursive" }}
          aria-hidden="true"
        >
          Tabani
        </span>
      </div>
    </footer>
  );
}
