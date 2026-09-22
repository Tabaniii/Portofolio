"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const SCROLL_KEY = "portfolio:scrollTo";

export function rememberScrollTarget(sectionId) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SCROLL_KEY, sectionId);
}

export function clearScrollTarget() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SCROLL_KEY);
}

export function hasPendingScrollTarget() {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(SCROLL_KEY)) return true;
  return Boolean(window.location.hash?.replace(/^#/, ""));
}

export function consumeScrollTarget() {
  if (typeof window === "undefined") return null;
  const fromStore = sessionStorage.getItem(SCROLL_KEY);
  if (fromStore) {
    sessionStorage.removeItem(SCROLL_KEY);
    return fromStore;
  }
  const fromHash = window.location.hash?.replace(/^#/, "");
  return fromHash || null;
}

export function isPageReload() {
  if (typeof performance === "undefined") return false;
  const nav = performance.getEntriesByType("navigation")[0];
  return nav?.type === "reload";
}

export default function ReturnToBentoLink({
  children,
  className,
  sectionId = "bento",
  ...props
}) {
  const router = useRouter();

  return (
    <Link
      href={`/#${sectionId}`}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        rememberScrollTarget(sectionId);
        router.push("/");
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
