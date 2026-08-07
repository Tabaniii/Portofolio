"use client";

import { cn } from "../lib/utils";
import BentoCard from "./BentoCard";

const BentoGrid = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-3 sm:gap-4",
        "md:grid-cols-3 md:auto-rows-[minmax(17rem,auto)]",
        "lg:grid-cols-4 lg:auto-rows-[minmax(0,1fr)] lg:grid-rows-[repeat(3,minmax(0,1fr))]",
        "lg:h-full lg:min-h-0",
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
