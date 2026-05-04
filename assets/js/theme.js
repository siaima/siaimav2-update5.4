(function () {
  'use strict';

  const root = document.documentElement;
  const STORAGE_THEME = 'sia-theme';
  const STORAGE_LANG  = 'sia-lang';

  // ===== Init theme =====
  const storedTheme =
    localStorage.getItem(STORAGE_THEME) ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', storedTheme);
  updateLogoSources(storedTheme);

  function updateLogoSources(theme) {
    document.querySelectorAll('.logo-img').forEach(img => {
      const darkSrc  = img.dataset.srcDark  || 'assets/images/logo/sia-logo-white.png';
      const lightSrc = img.dataset.srcLight || 'assets/images/logo/sia-logo.png';
      img.src = theme === 'dark' ? darkSrc : lightSrc;
    });
  }

  window.toggleTheme = function () {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_THEME, next);
    updateLogoSources(next);

    // Update toggle button icon state
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-pressed', next === 'dark');
    });
  };

  // ===== Init language =====
  const storedLang = localStorage.getItem(STORAGE_LANG) || 'vi';

  window.setLang = function (lang) {
    localStorage.setItem(STORAGE_LANG, lang);
    document.documentElement.setAttribute('lang', lang);
    // Only toggle visibility on content spans, NOT on the .lang-btn switches.
    document.querySelectorAll('[data-lang]:not(.lang-btn)').forEach(el => {
      el.hidden = el.dataset.lang !== lang;
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
    });
  };

  // Apply on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    window.setLang(storedLang);
    updateLogoSources(root.getAttribute('data-theme'));
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'dark');
    });
  });
})();
