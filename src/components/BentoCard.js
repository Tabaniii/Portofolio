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
      className={`flex h-full w-full items-center justify-center rounded-[5px] bg-white px-2 text-center no-underline border-none cursor-pointer transition-opacity duration-150 hover:opacity-[0.92] motion-reduce:transition-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-black ${className}`.trim()}
      {...(placeholder ? { "data-placeholder": placeholder } : {})}
    >
      <span className="px-2 text-[clamp(26px,5.2vh,58px)] font-black leading-none text-black">
        {label}
      </span>
    </a>
  );
}
