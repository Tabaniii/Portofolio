"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  className = '',
  as: Tag = 'div',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            scroller: scrollContainerRef?.current || undefined,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      );
    }, ref);

    // Refresh ScrollTrigger to ensure correct placement calculations
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [scrollContainerRef]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default ScrollReveal;
