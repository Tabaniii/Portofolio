"use client";

export default function BentoGrid({
  children,
  className = "",
  as: Component = "div",
  ...props
}) {
  return (
    <Component
      {...props}
      className={`grid h-full w-full grid-cols-3 gap-3 md:auto-rows-[minmax(10rem,1fr)] md:gap-5 ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
