document.addEventListener('DOMContentLoaded', function () {
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

  gsap.defaults({ ease: 'power2.out', duration: 0.7 });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
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
  if (heroItems.length) {
    gsap.from(heroItems, {
      y: 26,
      autoAlpha: 0,
      filter: 'blur(8px)',
      duration: 0.85,
      stagger: 0.09,
      delay: 0.08,
      clearProps: 'transform,filter'
    });
  }

  // ===== Scroll-triggered reveal for every section =====
  gsap.utils.toArray('[data-animate]').forEach(el => {
    const delay = parseFloat(el.dataset.delay || 0);
    gsap.fromTo(el,
      { y: 34, autoAlpha: 0, filter: 'blur(10px)' },
      {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 0.82,
        delay,
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
        duration: 0.78,
        stagger: { each: 0.07, from: 'start' },
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
