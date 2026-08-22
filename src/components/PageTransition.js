"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { rememberScrollTarget } from "./ReturnToBentoLink";
import { premiumEasing } from "./MotionPrimitives";

const PageTransitionContext = createContext({
  phase: "idle",
  isHome: true,
  isFirstPageLoad: true,
  reduceMotion: false,
  onExitComplete: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

const EXIT_EASE = [0.4, 0, 1, 1];

function isModifiedClick(event) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

function resolveInternalNavigation(anchor) {
  if (!anchor?.href) return null;
  if (anchor.target && anchor.target !== "_self") return null;
  if (anchor.hasAttribute("download")) return null;
  if (anchor.dataset.transition === "none") return null;

  const hrefAttr = anchor.getAttribute("href");
  if (
    !hrefAttr ||
    hrefAttr === "#" ||
    hrefAttr.startsWith("mailto:") ||
    hrefAttr.startsWith("tel:")
  ) {
    return null;
  }

  let url;
  try {
    url = new URL(anchor.href);
  } catch {
    return null;
  }

  if (url.origin !== window.location.origin) return null;

  const current = new URL(window.location.href);
  if (url.pathname === current.pathname && url.search === current.search) {
    return null;
  }

  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
  };
}

export function PageTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("idle");
  const [route, setRoute] = useState(pathname);
  const pendingRef = useRef(null);
  const hasNavigatedRef = useRef(false);

  if (route !== pathname) {
    setRoute(pathname);
    setPhase("idle");
  }

  const commitNavigation = useCallback(
    (nextPath, hash) => {
      if (hash) {
        rememberScrollTarget(hash.replace(/^#/, ""));
      }
      router.push(nextPath);
    },
    [router],
  );

  const requestNavigation = useCallback(
    (nextPath, hash) => {
      if (reduceMotion) {
        commitNavigation(nextPath, hash);
        return;
      }

      if (phase !== "idle") return;
      if (nextPath === pathname && !hash) return;

      pendingRef.current = { href: nextPath, hash };
      hasNavigatedRef.current = true;
      setPhase("exiting");
    },
    [commitNavigation, pathname, phase, reduceMotion],
  );

  const onExitComplete = useCallback(() => {
    const pending = pendingRef.current;
    pendingRef.current = null;
    if (!pending) return;
    commitNavigation(pending.href, pending.hash);
  }, [commitNavigation]);

  useEffect(() => {
    const onClick = (event) => {
      if (reduceMotion) return;
      if (isModifiedClick(event) || event.defaultPrevented) return;

      const anchor = event.target.closest("a");
      const nav = resolveInternalNavigation(anchor);
      if (!nav) return;

      event.preventDefault();
      event.stopPropagation();
      requestNavigation(`${nav.pathname}${nav.search}`, nav.hash || null);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduceMotion, requestNavigation]);

  return (
    <PageTransitionContext.Provider
      value={{
        phase,
        isHome: pathname === "/",
        isFirstPageLoad: !hasNavigatedRef.current,
        reduceMotion: Boolean(reduceMotion),
        onExitComplete,
      }}
    >
      {children}
      <AnimatePresence>
        {phase === "exiting" ? (
          <motion.div
            key="page-transition-veil"
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[80] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: "easeInOut" }}
          />
        ) : null}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
}

export function PageTransition({ children }) {
  const { phase, isHome, isFirstPageLoad, reduceMotion, onExitComplete } =
    usePageTransition();
  const pathname = usePathname();

  if (reduceMotion) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      className="w-full"
      variants={{
        initial: isHome ? { opacity: 0 } : { opacity: 0, y: 24 },
        animate: isHome ? { opacity: 1 } : { opacity: 1, y: 0 },
        exit: isHome ? { opacity: 0 } : { opacity: 0, y: -16 },
      }}
      initial={isFirstPageLoad ? false : "initial"}
      animate={phase === "exiting" ? "exit" : "animate"}
      transition={
        phase === "exiting"
          ? { duration: 0.42, ease: EXIT_EASE }
          : { duration: 0.5, ease: premiumEasing }
      }
      style={{ pointerEvents: phase === "exiting" ? "none" : undefined }}
      onAnimationComplete={(definition) => {
        if (definition === "exit") {
          onExitComplete();
        }
      }}
    >
      {children}
    </motion.div>
  );
}
