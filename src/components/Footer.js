"use client";

import BorderGlow from "./BorderGlow";

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
      className="relative w-full h-screen bg-black text-white overflow-hidden snap-start"
      id="contact"
      aria-label="Footer"
    >
      {/* Top Section: Grid/Flex Layout */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 lg:gap-8 px-6 lg:px-16 pt-16 lg:pt-24 pb-20 lg:pb-0">
        {/* Left Side: Call-to-Action */}
        <div className="flex flex-col gap-4 lg:max-w-md">
          <h2 className="m-0 text-[clamp(42px,6vw,72px)] font-black leading-[0.9] tracking-tight">
            Let's <br />
            <span
              className="inline-block mt-[20px] -mb-[20px] font-normal text-brand-red text-[2.0em]"
              style={{ fontFamily: "Carattere, cursive" }}
            >
              Collaborate.
            </span>
          </h2>
          <p className="m-0 text-[15px] lg:text-[16px] font-medium leading-[1.5] text-zinc-300 max-w-sm">
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
              className="inline-flex items-center justify-center px-8 py-4 text-black font-black text-[14px] uppercase tracking-[0.1em] transition-colors duration-300 group-hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              Send Email
            </a>
          </BorderGlow>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex flex-row gap-12 lg:gap-20">
          {/* Socials Column */}
          <nav aria-label="Social links">
            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
              {socialLinks.map((link) => (
                <li key={link.label} className="m-0">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-medium uppercase tracking-[0.1em] text-zinc-300 no-underline transition-colors duration-300 hover:text-brand-red focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Column */}
          <nav aria-label="Contact details">
            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
              {footerLinks.map((link) => (
                <li key={link.label} className="m-0">
                  <a
                    href={link.href}
                    className="text-[12px] font-medium uppercase tracking-[0.1em] text-zinc-300 no-underline transition-colors duration-300 hover:text-brand-red focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="m-0 pt-1">
                <span 
                  className="block text-[15px] font-medium uppercase tracking-[0.1em] text-brand-red">
                  Open for freelance
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom Section: Giant Typography */}
      <div className="absolute bottom-0 w-full flex justify-center z-0 pointer-events-none select-none text-brand-red">
        <span
          className="text-[clamp(120px,25vw,500px)] leading-[0.6] font-normal"
          style={{ fontFamily: "Carattere, cursive" }}
          aria-hidden="true"
        >
          Tabani
        </span>
      </div>
    </footer>
  );
}
