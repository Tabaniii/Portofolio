"use client";

import { useEffect } from "react";

const IN_PAGE_TARGETS = new Set(["projek", "contact", "top", "bento"]);

// Desktop hero = layar lebar landscape (laptop/monitor).
const DESKTOP_HERO_MQ =
  "(min-width: 1024px) and (orientation: landscape)";
const MOBILE_VERTICAL_MQ = "(max-width: 767px)";

function measureHeroLetters(track) {
  const letters = track.querySelectorAll(".hero-title-letter");
  let totalWidth = 0;
  let totalHeight = 0;
  let maxWidth = 0;
  let maxHeight = 0;

  letters.forEach((letter) => {
    const rect = letter.getBoundingClientRect();
    totalWidth += rect.width;
    totalHeight += rect.height;
    maxWidth = Math.max(maxWidth, rect.width);
    maxHeight = Math.max(maxHeight, rect.height);
  });

  return { totalWidth, totalHeight, maxWidth, maxHeight, count: letters.length };
}

function fitHeroTitle() {
  const section = document.querySelector(".hero-section");
  const track = document.querySelector(".hero-title-track");
  if (!section || !track) return;

  // Desktop landscape: biarkan CSS text-[1250px] — jangan override.
  if (window.matchMedia(DESKTOP_HERO_MQ).matches) {
    track.style.fontSize = "";
    section.style.removeProperty("--hero-letter-scale-x");
    return;
  }

  const isMobileVertical = window.matchMedia(MOBILE_VERTICAL_MQ).matches;

  // Mobile vertikal: scaleX biar huruf "ditarik" kiri-kanan ~82% lebar layar.
  if (isMobileVertical) {
    section.style.removeProperty("--hero-letter-scale-x");

    const maxH = section.clientHeight * 0.97;
    const gapBudget = Math.max(section.clientHeight * 0.02, 6);
    let lo = 64;
    let hi = 260;
    let best = 64;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      track.style.fontSize = `${mid}px`;

      const { totalHeight, count } = measureHeroLetters(track);
      if (!count) {
        track.style.fontSize = "";
        return;
      }

      if (totalHeight + gapBudget <= maxH) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    track.style.fontSize = `${best}px`;

    // Ukur lebar natural (tanpa stretch), lalu tarik kiri-kanan ~88% lebar layar.
    section.style.setProperty("--hero-letter-scale-x", "1");
    const natural = measureHeroLetters(track);
    const targetWidth = section.clientWidth * 0.92;
    const naturalWidth = Math.max(natural.maxWidth, 1);
    const scaleX = Math.min(Math.max(targetWidth / naturalWidth, 2.4), 8.5);
    section.style.setProperty("--hero-letter-scale-x", scaleX.toFixed(3));
    return;
  }

  // Tablet horizontal (sementara, sebelum ide iPad)
  section.style.setProperty("--hero-letter-scale-x", "1");
  const maxW = section.clientWidth * 1.12;
  const maxH = section.clientHeight * 0.97;
  const gapBudget = Math.max(section.clientWidth * 0.02, 4);

  let lo = 48;
  let hi = 820;
  let best = 48;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    track.style.fontSize = `${mid}px`;

    const { totalWidth, maxHeight, count } = measureHeroLetters(track);
    if (!count) {
      track.style.fontSize = "";
      return;
    }

    const fits = totalWidth + gapBudget <= maxW && maxHeight <= maxH;

    if (fits) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  track.style.fontSize = `${best}px`;
}

/**
 * Port dari scripts.js — placeholder nav, smooth scroll, skala TABANI.
 */
export function useHomepageScripts() {
  useEffect(() => {
    function handlePlaceholderClick(event) {
      const link = event.currentTarget;
      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.getAttribute("href") || "";
      const targetId = href.startsWith("#") ? href.slice(1) : "";

      if (IN_PAGE_TARGETS.has(targetId)) return;

      event.preventDefault();

      const key = link.dataset.placeholder || targetId;
      console.info("[Portfolio placeholder]", key, "— halaman belum tersedia.");
    }

    function handleInPageClick(event) {
      const anchor = event.currentTarget;
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const id = anchor.getAttribute("href")?.slice(1);
      if (!id || !IN_PAGE_TARGETS.has(id)) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }

    const placeholderCards = document.querySelectorAll(
      ".grid-card[data-placeholder]",
    );
    placeholderCards.forEach((card) => {
      card.addEventListener("click", handlePlaceholderClick);
    });

    const inPageLinks = document.querySelectorAll('a[href^="#"]');
    inPageLinks.forEach((anchor) => {
      anchor.addEventListener("click", handleInPageClick);
    });

    const scrollToHashTarget = () => {
      const id = window.location.hash?.replace(/^#/, "");
      if (!id || !IN_PAGE_TARGETS.has(id)) return;
      const target = document.getElementById(id);
      if (!target) return;
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    const isReload = performance.getEntriesByType("navigation")[0]?.type === "reload";
    if (!isReload) {
      scrollToHashTarget();
    }
    window.addEventListener("hashchange", scrollToHashTarget);

    fitHeroTitle();

    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      fontsReady.then(fitHeroTitle);
    }

    const heroImg = document.querySelector(".hero-image");
    const onHeroLoad = () => fitHeroTitle();

    if (heroImg) {
      if (heroImg.complete) {
        fitHeroTitle();
      } else {
        heroImg.addEventListener("load", onHeroLoad);
      }
    }

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fitHeroTitle, 100);
    };
    window.addEventListener("resize", onResize);

    return () => {
      placeholderCards.forEach((card) => {
        card.removeEventListener("click", handlePlaceholderClick);
      });
      inPageLinks.forEach((anchor) => {
        anchor.removeEventListener("click", handleInPageClick);
      });
      if (heroImg) {
        heroImg.removeEventListener("load", onHeroLoad);
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", scrollToHashTarget);
      clearTimeout(resizeTimer);
    };
  }, []);
}
