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
      className={className}
    >
      {children}
    </Component>
  );
}
