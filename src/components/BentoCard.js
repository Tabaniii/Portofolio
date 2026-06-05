"use client";

export default function BentoCard({
  href,
  label,
  className = "",
  placeholder,
}) {
  return (
    <a
      href={href}
      className={`grid-card flex h-full w-full items-center justify-center rounded-[5px] bg-[var(--color-white)] px-2 text-center no-underline transition-opacity duration-150 hover:opacity-95 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--color-black)] ${className}`.trim()}
      {...(placeholder ? { "data-placeholder": placeholder } : {})}
    >
      <span className="px-2 text-[clamp(26px,5.2vh,58px)] font-black leading-none text-[var(--color-black)]">
        {label}
      </span>
    </a>
  );
}
