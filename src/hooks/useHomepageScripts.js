"use client";

import { useEffect } from "react";

const IN_PAGE_TARGETS = new Set(["projek", "contact", "top"]);

function fitHeroTitle() {
  const section = document.querySelector(".hero-section");
  const track = document.querySelector(".hero-title-track");
  if (!section || !track) return;

  const maxW = section.clientWidth * 0.995;
  const maxH = section.clientHeight * 0.98;
  let sizePx = 32;

  track.style.fontSize = `${sizePx}px`;

  while (
    track.scrollWidth < maxW &&
    track.scrollHeight < maxH &&
    sizePx < 2400
  ) {
    sizePx += 3;
    track.style.fontSize = `${sizePx}px`;
  }

  while (
    (track.scrollWidth > maxW || track.scrollHeight > maxH) &&
    sizePx > 32
  ) {
    sizePx -= 1;
    track.style.fontSize = `${sizePx}px`;
  }
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
      clearTimeout(resizeTimer);
    };
  }, []);
}
