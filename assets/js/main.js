document.addEventListener('DOMContentLoaded', function () {
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let deferDefaultHeroIntro = false;
  const playHomeHeroReveal = () => {
    if (typeof gsap === 'undefined') return;
    const navTarget = document.querySelector('.site-header');
    const heroVisual = document.querySelector('#hero .hero-event__slides');
    const heroControls = document.querySelector('#hero .hero-event__controls');
    const textTargets = Array.from(document.querySelectorAll('#hero .hero-title, #hero .hero-subtitle, #hero .hero-cta'));
    const allTargets = [navTarget, heroVisual, heroControls, ...textTargets].filter(Boolean);
    if (!allTargets.length) return;

    gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        gsap.set(allTargets, { clearProps: 'filter,opacity,transform' });
      }
    })
      .to(navTarget, { autoAlpha: 1, y: 0, duration: 0.52 }, 0.22)
      .to([heroVisual, heroControls].filter(Boolean), {
        autoAlpha: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.82
      }, 0.08)
      .fromTo(
        textTargets,
        { y: 34, autoAlpha: 0, filter: 'blur(11px)' },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 0.84,
          stagger: 0.14
        },
        0.28
      );
  };

  // ===== Home-only SIA Signal loader =====
  const path = window.location.pathname || '';
  const isHomePage = /(^|\/)(index\.html)?$/.test(path);
  const homeLoader = document.getElementById('homeLoader');
  const LOADER_SEEN_KEY = 'sia-home-loader-seen-v4';
  const hasSeenHomeLoader = (() => {
    try {
      return window.sessionStorage.getItem(LOADER_SEEN_KEY) === '1';
    } catch (error) {
      return false;
    }
  })();
  const LOADER_MIN_MS = hasSeenHomeLoader ? 1200 : 3100;
  const LOADER_BLANK_HOLD_MS = 1000;
  const loaderStartedAt = performance.now();
  const shouldRunHomeLoader = isHomePage && !!homeLoader;
  const runReducedLoader = shouldRunHomeLoader && prefersReducedMotion;
  const runFullCinematicLoader = shouldRunHomeLoader && !prefersReducedMotion && !hasSeenHomeLoader;
  let loaderCompleted = false;
  const finishHomeLoader = () => {
    if (loaderCompleted) return;
    loaderCompleted = true;
    try {
      window.sessionStorage.setItem(LOADER_SEEN_KEY, '1');
    } catch (error) {
      // ignore storage write failures
    }
    root.classList.add('sia-ready');
    if (!prefersReducedMotion) playHomeHeroReveal();
  };

  if (!shouldRunHomeLoader) {
    root.classList.add('sia-ready');
  } else if (runReducedLoader) {
    deferDefaultHeroIntro = true;
    const loaderPercent = homeLoader.querySelector('[data-loader-percent]');
    if (loaderPercent) loaderPercent.textContent = '100';
    const elapsed = performance.now() - loaderStartedAt;
    const wait = Math.max(0, LOADER_MIN_MS - elapsed);
    window.setTimeout(() => {
      homeLoader.style.transition = 'opacity 320ms ease';
      homeLoader.style.opacity = '0';
      window.setTimeout(finishHomeLoader, 320);
    }, wait);
  } else {
    deferDefaultHeroIntro = true;
    const loaderPercent = homeLoader.querySelector('[data-loader-percent]');
    const loaderBar = homeLoader.querySelector('[data-loader-bar]');
    const counterStage = homeLoader.querySelector('[data-loader-counter]');
    const stripStage = homeLoader.querySelector('[data-loader-strip]');
    const stripCols = Array.from(homeLoader.querySelectorAll('.home-loader__strip-col'));
    const stripImages = Array.from(homeLoader.querySelectorAll('.home-loader__strip-col img'));

    // Prepare hero targets for reveal stage
    if (typeof gsap !== 'undefined') {
      const heroRevealTargets = document.querySelectorAll('#hero .hero-title, #hero .hero-subtitle, #hero .hero-cta');
      const heroVisualTargets = document.querySelectorAll('#hero .hero-event__slides, #hero .hero-event__controls');
      const navTarget = document.querySelector('.site-header');
      gsap.set(heroRevealTargets, { autoAlpha: 0, y: 26, filter: 'blur(8px)' });
      gsap.set(heroVisualTargets, { autoAlpha: 0, scale: 1.03, filter: 'blur(10px)' });
      gsap.set(navTarget, { autoAlpha: 0, y: -18 });
    }

    const waitForImages = () => {
      const images = Array.from(homeLoader.querySelectorAll('img'));
      if (!images.length) return Promise.resolve();
      return Promise.all(images.map((img) => new Promise((resolve) => {
        if (img.complete) return resolve();
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      })));
    };

    const markReady = async () => {
      await waitForImages();
      if (typeof gsap === 'undefined') {
        const elapsed = performance.now() - loaderStartedAt;
        const wait = Math.max(0, LOADER_MIN_MS - elapsed);
        window.setTimeout(() => {
          finishHomeLoader();
        }, wait);
        return;
      }

      const counterValue = { value: 0 };
      const mm = gsap.matchMedia();
      mm.add('(max-width: 768px)', () => {
        gsap.set(homeLoader.querySelector('.home-loader__counter-wrap'), { clearProps: 'all' });
      });
      mm.add('(min-width: 769px)', () => {
        gsap.set(homeLoader.querySelector('.home-loader__counter-wrap'), { clearProps: 'all' });
      });

      const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
      const appendLoaderExit = () => {
        const elapsed = performance.now() - loaderStartedAt;
        const wait = Math.min(LOADER_BLANK_HOLD_MS, Math.max(0, LOADER_MIN_MS - elapsed));
        if (wait > 0) tl.to({}, { duration: wait / 1000 });
        tl.to(homeLoader, { autoAlpha: 0, yPercent: -8, duration: runFullCinematicLoader ? 0.62 : 0.44, ease: 'power3.inOut' });
      };

      gsap.set(stripStage, { autoAlpha: 0, visibility: 'hidden' });
      gsap.set(counterStage, { autoAlpha: 1, y: 0 });
      if (!isMobileViewport || runFullCinematicLoader) {
        gsap.set(stripImages, { autoAlpha: 0, y: 22, scale: 1.08, filter: 'blur(18px)', transformOrigin: '50% 50%' });
      }
      if (loaderBar) gsap.set(loaderBar, { width: '0%' });

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: finishHomeLoader
      });

      tl.to(counterValue, {
        value: 100,
        duration: runFullCinematicLoader ? (isMobileViewport ? 1.2 : 1.36) : 0.76,
        ease: runFullCinematicLoader ? 'power2.out' : 'power1.out',
        onUpdate: () => {
          const value = Math.round(counterValue.value);
          if (loaderPercent) loaderPercent.textContent = String(value);
          if (loaderBar) loaderBar.style.width = `${value}%`;
        }
      });
      tl.to(counterStage, {
        autoAlpha: 0,
        y: -16,
        filter: 'blur(8px)',
        duration: runFullCinematicLoader ? 0.32 : 0.2,
        ease: 'power2.in'
      }, runFullCinematicLoader ? '>-0.06' : '>');

      if (isMobileViewport && !runFullCinematicLoader) {
        appendLoaderExit();
        return;
      }

      if (!stripCols.length || !stripImages.length) {
        appendLoaderExit();
        return;
      }

      tl.set(stripStage, { visibility: 'visible' }, '-=0.16');
      tl.to(stripStage, { autoAlpha: 1, duration: 0.32, ease: 'power2.out' }, '-=0.16');
      tl.fromTo(stripCols, { filter: 'blur(15px)' }, { filter: 'blur(0px)', duration: 0.52, ease: 'power2.out' }, '<');
      tl.to(stripImages, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: runFullCinematicLoader ? 1.08 : 0.68,
        stagger: { each: runFullCinematicLoader ? 0.078 : 0.04, from: 'start' },
        ease: 'power3.out'
      }, '<');
      tl.fromTo('.home-loader__strip-col--a', { yPercent: 24 }, { yPercent: -22, duration: 1.85, ease: 'power2.inOut' }, '<');
      tl.fromTo('.home-loader__strip-col--b', { yPercent: -20 }, { yPercent: 20, duration: 1.85, ease: 'power2.inOut' }, '<');
      tl.fromTo('.home-loader__strip-col--c', { yPercent: 18 }, { yPercent: -18, duration: 1.85, ease: 'power2.inOut' }, '<');
      tl.fromTo('.home-loader__strip-col--mobile', { yPercent: 18 }, { yPercent: -18, duration: 1.35, ease: 'power2.inOut' }, '<');
      tl.to(stripStage, { autoAlpha: 0, filter: 'blur(8px)', duration: runFullCinematicLoader ? 0.32 : 0.2, ease: 'power2.in' }, '>-0.08');
      appendLoaderExit();
    };

    if (document.readyState === 'complete') markReady();
    else window.addEventListener('load', markReady, { once: true });
    window.setTimeout(() => {
      finishHomeLoader();
    }, 7000);
  }

  // ===== Unified form feedback =====
  const FORM_COPY = {
    vi: {
      sending: 'Đang gửi...',
      successDefault: 'SIA đã nhận brief. Đội ngũ sẽ phản hồi trong 24h.',
      successNewsletter: 'Đăng ký thành công. Hẹn gặp bạn ở bản tin SIA Weekly.',
      successEvent: 'Đăng ký thành công. Vé sẽ được xác nhận qua email trong 24h.'
    },
    en: {
      sending: 'Sending...',
      successDefault: 'Brief received. Our team will reply within 24 hours.',
      successNewsletter: 'Subscription successful. See you in SIA Weekly.',
      successEvent: 'Registration successful. Your ticket confirmation will be sent within 24 hours.'
    }
  };

  let toastRoot = null;
  const getLang = () => (document.documentElement.getAttribute('lang') || localStorage.getItem('sia-lang') || 'vi').toLowerCase().startsWith('en') ? 'en' : 'vi';
  const getToastRoot = () => {
    if (toastRoot) return toastRoot;
    toastRoot = document.createElement('div');
    toastRoot.className = 'sia-toast-stack';
    toastRoot.setAttribute('aria-live', 'polite');
    toastRoot.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastRoot);
    return toastRoot;
  };

  const pushToast = (message, type = 'success') => {
    const host = getToastRoot();
    const toast = document.createElement('div');
    toast.className = `sia-toast is-${type}`;
    toast.innerHTML = `
      <span class="sia-toast__icon" aria-hidden="true">${type === 'success' ? '✓' : '!'}</span>
      <span class="sia-toast__text">${message}</span>
      <button type="button" class="sia-toast__close" aria-label="Close">×</button>
    `;
    host.appendChild(toast);
    const dismiss = () => {
      toast.classList.add('is-leaving');
      window.setTimeout(() => toast.remove(), 240);
    };
    toast.querySelector('.sia-toast__close').addEventListener('click', dismiss);
    window.setTimeout(dismiss, 5000);
  };

  const getInlineNote = (form) => {
    return form.querySelector('.form-note, .register-form__note, [data-form-note]');
  };

  const setInlineNote = (form, message, type = 'success') => {
    let note = getInlineNote(form);
    if (!note && form.matches('.newsletter__form')) return;
    if (!note) {
      note = document.createElement('p');
      note.className = 'sia-form-note';
      form.appendChild(note);
    }
    note.textContent = message;
    note.classList.remove('is-error');
    if (type === 'error') note.classList.add('is-error');
  };

  const getSuccessMessage = (form, lang) => {
    const copy = FORM_COPY[lang];
    if (form.matches('.newsletter__form')) return copy.successNewsletter;
    if (form.matches('.register-form')) return copy.successEvent;
    return copy.successDefault;
  };

  const lockSubmit = (button, lang) => {
    if (!button) return;
    if (!button.dataset.defaultHtml) button.dataset.defaultHtml = button.innerHTML;
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    button.innerHTML = `<span class="sia-btn-spinner" aria-hidden="true"></span><span>${FORM_COPY[lang].sending}</span>`;
  };

  const unlockSubmit = (button) => {
    if (!button) return;
    button.disabled = false;
    button.removeAttribute('aria-busy');
    if (button.dataset.defaultHtml) button.innerHTML = button.dataset.defaultHtml;
  };

  const handleUnifiedSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return false;
    if (form.dataset.submitting === 'true') return false;
    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }

    const lang = getLang();
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    form.dataset.submitting = 'true';
    lockSubmit(submitBtn, lang);

    window.setTimeout(() => {
      const successMessage = getSuccessMessage(form, lang);
      setInlineNote(form, successMessage, 'success');
      pushToast(successMessage, 'success');
      form.reset();
      unlockSubmit(submitBtn);
      form.dataset.submitting = 'false';
    }, 950);

    return false;
  };

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', handleUnifiedSubmit);
  });

  window.handleSiaFormSubmit = handleUnifiedSubmit;
  window.handleContactSubmit = handleUnifiedSubmit;
  window.handleEventReg = handleUnifiedSubmit;

  // ===== Split CTA cards =====
  const initSplitCtas = () => {
    document.querySelectorAll('.cta-banner').forEach((banner) => {
      if (banner.dataset.ctaReady === 'true') return;
      const currentTitle = banner.querySelector('h2');
      const currentIntro = banner.querySelector('p');
      const titleHtml = currentTitle && currentTitle.innerHTML.trim()
        ? currentTitle.innerHTML.trim()
        : 'Bắt đầu dự án cùng SIA IMA';
      const introHtml = currentIntro && currentIntro.innerHTML.trim()
        ? currentIntro.innerHTML.trim()
        : 'Kết nối với đội ngũ SIA để biến brief thành kế hoạch triển khai rõ ràng.';

      const showcaseCard = document.createElement('a');
      showcaseCard.className = 'cta-banner__tile cta-banner__tile--showcase';
      showcaseCard.href = 'showcase.html';
      showcaseCard.innerHTML = `
        <span class="cta-banner__eyebrow">Showcase</span>
        <span class="cta-banner__arrow" aria-hidden="true">-></span>
        <strong class="cta-banner__title">Dự án &<br>Case Study</strong>
        <span class="cta-banner__intro">Xem các chiến dịch, sự kiện và hoạt động tăng trưởng đã triển khai.</span>
      `;

      const contactCard = document.createElement('a');
      contactCard.className = 'cta-banner__tile cta-banner__tile--contact';
      contactCard.href = 'contact.html';
      contactCard.innerHTML = `
        <span class="cta-banner__eyebrow">Liên hệ</span>
        <span class="cta-banner__arrow" aria-hidden="true">-></span>
        <span class="cta-banner__intro">${introHtml}</span>
        <strong class="cta-banner__title">${titleHtml}</strong>
        <span class="cta-banner__link-label">Trao đổi ngay <span aria-hidden="true">-></span></span>
      `;

      banner.replaceChildren(showcaseCard, contactCard);
      banner.dataset.ctaReady = 'true';
    });
  };
  initSplitCtas();

  // ===== Header scroll effect =====
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ===== Mobile menu toggle =====
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a, .nav-item').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== GSAP animations =====
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({ ease: 'power4.out', duration: 0.8 });

  if (prefersReducedMotion) {
    gsap.globalTimeline.timeScale(2.5);
    document.querySelectorAll('[data-animate], [data-stagger-item]').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
    return;
  }

  // ===== Hero entrance =====
  const heroItems = document.querySelectorAll('[data-hero]');
  if (heroItems.length && !deferDefaultHeroIntro) {
    gsap.from(heroItems, {
      y: 26,
      autoAlpha: 0,
      filter: 'blur(8px)',
      duration: 0.9,
      stagger: 0.17,
      delay: 0.08,
      ease: 'power4.out',
      clearProps: 'transform,filter,opacity'
    });
  }

  // ===== Scroll-triggered reveal for every section =====
  gsap.utils.toArray('[data-animate]').forEach(el => {
    const delay = parseFloat(el.dataset.delay || 0);
    const siblings = el.parentElement
      ? Array.from(el.parentElement.querySelectorAll(':scope > [data-animate]'))
      : [];
    const siblingIndex = siblings.indexOf(el);
    const staggerDelay = siblingIndex > 0 ? Math.min(siblingIndex * 0.16, 0.48) : 0;
    gsap.fromTo(el,
      { y: 34, autoAlpha: 0, filter: 'blur(10px)' },
      {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 0.92,
        delay: delay + staggerDelay,
        ease: 'power4.out',
        clearProps: 'transform,filter',
        scrollTrigger: {
          trigger: el,
          start: 'top 84%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ===== Staggered grid/card items =====
  gsap.utils.toArray('[data-stagger]').forEach(container => {
    const items = container.querySelectorAll('[data-stagger-item]');
    if (!items.length) return;
    gsap.fromTo(items,
      { y: 36, autoAlpha: 0, scale: 0.965, filter: 'blur(8px)' },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power4.out',
        stagger: { each: 0.16, from: 'start' },
        clearProps: 'transform,filter',
        scrollTrigger: {
          trigger: container,
          start: 'top 83%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ===== Counter animation =====
  // data-target (number) · data-prefix · data-suffix · data-decimals (default 0)
  const counters = gsap.utils.toArray('.counter');
  counters.forEach((el, index) => {
    const target = parseFloat(el.dataset.target || 0);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = parseInt(el.dataset.decimals || 0);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.55,
      delay: (index % 4) * 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 86%',
        once: true
      },
      onUpdate() {
        const v = decimals > 0
          ? obj.val.toFixed(decimals)
          : Math.round(obj.val).toLocaleString('en-US');
        el.textContent = prefix + v + suffix;
      }
    });
  });

  // ===== Subtle media/image parallax =====
  const mediaParallaxTargets = gsap.utils.toArray([
    '.story-grid__visual',
    '.moments-main-img img',
    '.case-feature__media',
    '.case-card__media',
    '.blog-feature__media',
    '.blog-card__media',
    '.service-hero__visual',
    '.case-gallery__item > div'
  ].join(', '));

  gsap.matchMedia().add('(min-width: 768px)', () => {
    const parallaxTweens = mediaParallaxTargets.map(el => {
      return gsap.fromTo(el,
        { yPercent: 3 },
        {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        }
      );
    });

    return () => parallaxTweens.forEach(tween => tween.kill());
  });

  // ===== Parallax on hero bg =====
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    gsap.to(heroBg, {
      y: 100, ease: 'none',
      scrollTrigger: { trigger: '.section-hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  // ===== Hover spotlight glow (cursor-following) =====
  const GLOW_SELECTOR = [
    // Cards
    '.stat-card', '.case-card', '.blog-card', '.team-card',
    '.mvv-card', '.culture-card', '.service-hero__kpi-card',
    '.pricing-card', '.case-meta-card', '.psr-card', '.industry-card',
    '.speaker-form-card',
    '.gen-stat-card', '.gen-chart-card', '.gen-speaker-card', '.gen-timeline-item',
    '.gen-logo-item', '.audience-card', '.value-card',
    '.hero-stat', '.faq-item',
    // Interactive
    '.btn', '.nav-link', '.nav-item',
    '.form-input', '.form-select', '.form-textarea', '.form-tab',
    '.moments-thumb'
  ].join(', ');
  document.querySelectorAll(GLOW_SELECTOR).forEach(el => el.classList.add('glow'));
  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest('.glow');
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });



  // ===== setup showcase load more =====
  const loadMoreWrap = document.querySelector('.showcase-loadmore');
  if (loadMoreWrap) {
    const loadBtn = loadMoreWrap.querySelector('button');
    const viLabel = loadBtn ? loadBtn.querySelector('[data-lang="vi"]') : null;
    const enLabel = loadBtn ? loadBtn.querySelector('[data-lang="en"]') : null;
    const note = loadMoreWrap.querySelector('[data-loadmore-note]');
    const allCards = Array.from(document.querySelectorAll('#cases .case-grid .case-card--item'));
    const initialVisible = 9;
    const step = 6;
    let visible = Math.min(initialVisible, allCards.length);

    const updateNote = () => {
      if (!note) return;
      const vi = note.querySelector('[data-lang="vi"]');
      const en = note.querySelector('[data-lang="en"]');
      if (vi) vi.textContent = `Đang hiển thị ${visible} trên ${allCards.length} case studies`;
      if (en) en.textContent = `Showing ${visible} of ${allCards.length} case studies`;
    };

    const render = () => {
      allCards.forEach((card, i) => {
        card.style.display = i < visible ? '' : 'none';
      });

      if (!loadBtn) return;
      const done = visible >= allCards.length;
      loadBtn.disabled = done;
      loadBtn.style.opacity = done ? '0.55' : '1';
      loadBtn.style.cursor = done ? 'default' : 'pointer';
      if (viLabel) viLabel.textContent = done ? 'Đã hiển thị tất cả case studies' : 'Xem thêm case studies';
      if (enLabel) enLabel.textContent = done ? 'All case studies loaded' : 'Load more cases';
      updateNote();
    };

    render();

    loadBtn && loadBtn.addEventListener('click', () => {
      if (visible >= allCards.length) return;
      visible = Math.min(visible + step, allCards.length);
      render();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  }

  // ===== Smooth anchor scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});
