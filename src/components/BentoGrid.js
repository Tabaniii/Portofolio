"use client";

import { cn } from "../lib/utils";
import BentoCard from "./BentoCard";

const BentoGrid = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid h-full min-h-0 w-full grid-cols-2 grid-rows-3 gap-2",
        "lg:grid-cols-4 lg:grid-rows-[repeat(3,minmax(0,1fr))] lg:auto-rows-[minmax(0,1fr)] lg:gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { BentoCard, BentoGrid };
export default BentoGrid;
