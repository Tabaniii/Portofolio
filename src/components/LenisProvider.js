"use client";

import { forwardRef, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sync GSAP ScrollTrigger dengan instance Lenis (scroll custom / nested).
 */
function LenisScrollTriggerBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return undefined;

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", onScroll);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return null;
}

/**
 * Lenis smooth scroll wrapper untuk App Router.
 * - root={false}: wrapper sendiri jadi scroller (cocok untuk layout h-[100dvh]).
 * - Ref mengembalikan LenisRef { wrapper, content, lenis }.
 */
const LenisProvider = forwardRef(function LenisProvider(
  {
    children,
    className,
    options = {
      lerp: 0.08,
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.4,
      autoRaf: true,
    },
    ...props
  },
  ref,
) {
  return (
    <ReactLenis ref={ref} root={false} className={className} options={options} {...props}>
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
});

export default LenisProvider;
export { useLenis };
