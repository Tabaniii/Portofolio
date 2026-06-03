/**
 * Homepage interactions — placeholder navigation only.
 * Wire real routes/pages when backend sections are ready.
 */

(function () {
  'use strict';

  /** Sections that exist on this page (in-page anchors) */
  const IN_PAGE_TARGETS = new Set(['projek', 'contact', 'top']);

  /**
   * Placeholder cards: prevent empty hash jumps; log for dev until pages exist.
   * @param {MouseEvent} event
   */
  function handlePlaceholderClick(event) {
    const link = event.currentTarget;
    if (!(link instanceof HTMLAnchorElement)) return;

    const href = link.getAttribute('href') || '';
    const targetId = href.startsWith('#') ? href.slice(1) : '';

    if (IN_PAGE_TARGETS.has(targetId)) {
      return;
    }

    event.preventDefault();

    const key = link.dataset.placeholder || targetId;
    console.info('[Portfolio placeholder]', key, '— halaman belum tersedia.');
  }

  /** Smooth in-page navigation for #projek and footer */
  function initInPageLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        const id = anchor.getAttribute('href')?.slice(1);
        if (!id || !IN_PAGE_TARGETS.has(id)) return;

        const target = document.getElementById(id);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /**
   * Skala TABANI: isi lebar hero dulu (seperti desain), lalu batasi tinggi.
   * Menggantikan kebutuhan zoom browser 200% di viewport ~914px.
   */
  function fitHeroTitle() {
    const section = document.querySelector('.hero-section');
    const track = document.querySelector('.hero-title-track');
    if (!section || !track) return;

    const maxW = section.clientWidth * 0.995;
    const maxH = section.clientHeight * 0.98;
    let sizePx = 32;

    track.style.fontSize = sizePx + 'px';

    while (track.scrollWidth < maxW && track.scrollHeight < maxH && sizePx < 2400) {
      sizePx += 3;
      track.style.fontSize = sizePx + 'px';
    }

    while ((track.scrollWidth > maxW || track.scrollHeight > maxH) && sizePx > 32) {
      sizePx -= 1;
      track.style.fontSize = sizePx + 'px';
    }
  }

  function init() {
    document
      .querySelectorAll('.grid-card[data-placeholder]')
      .forEach(function (card) {
        card.addEventListener('click', handlePlaceholderClick);
      });

    initInPageLinks();
    fitHeroTitle();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitHeroTitle);
    }

    var heroImg = document.querySelector('.hero-image');
    if (heroImg) {
      if (heroImg.complete) {
        fitHeroTitle();
      } else {
        heroImg.addEventListener('load', fitHeroTitle);
      }
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fitHeroTitle, 100);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
