(function () {
  'use strict';

  const SOURCE_PAGE = 'showcase.html';
  const INDEX_WRAPPER_SELECTOR = '[data-latest-showcase="index"]';
  const SERVICE_GRID_SELECTOR = '[data-latest-showcase="services-event"]';
  const FALLBACK_ITEMS = [
    {
      href: 'showcase-china-asean-digital-economy-openclaw-ai-industry-application-symposium.html',
      mediaClass: 'case-card__media case-card__media--blue',
      mediaStyle: "background-image: linear-gradient(rgba(16,18,24,.22), rgba(16,18,24,.22)), url('assets/images/Eventimage/Hình ảnh sự kiện 2025/Sự kiện VERY DEMURE, VERY MINDFUL/Ảnh sự kiện/473285213_122128388174403251_1689216600735940338_n.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;",
      tag: { vi: 'Event', en: 'Event' },
      meta: { vi: 'SIA Event · Trí tuệ nhân tạo & Vận hành doanh nghiệp · 2026', en: 'SIA Event · AI & Business Operations · 2026' },
      title: { vi: 'CHINA ASEAN DIGITAL ECONOMY & OPENCLAW AI INDUSTRY APPLICATION SYMPOSIUM', en: 'CHINA ASEAN DIGITAL ECONOMY & OPENCLAW AI INDUSTRY APPLICATION SYMPOSIUM' },
      desc: { vi: 'Hội thảo về trí tuệ nhân tạo quy tụ các chuyên gia hàng đầu từ Silicon Valley và Trung Quốc. Sự kiện tập trung vào việc chuyển đổi từ …', en: 'AI symposium with experts from Silicon Valley and China, focused on moving from AI assistance to AI operations…' },
      kpi1: '1500+ <small>attendees</small>',
      kpi2: '17/04 <small>event date</small>',
      rank: new Date(2026, 3, 17).getTime()
    },
    {
      href: 'showcase-she-rise-2-cham-phay.html',
      mediaClass: 'case-card__media case-card__media--dark',
      mediaStyle: "background-image: linear-gradient(rgba(16,18,24,.22), rgba(16,18,24,.22)), url('assets/images/Eventimage/Hình ảnh sự kiện 2026/SHE RISE %232 - CHẤM PHẨY/Ảnh sự kiện/647452312_122164766036403251_2622446514461473799_n.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;",
      tag: { vi: 'Event', en: 'Event' },
      meta: { vi: 'SIA Event · Phụ nữ & Sức khỏe tinh thần · 2026', en: 'SIA Event · Women & Mental Wellness · 2026' },
      title: { vi: 'SHE RISE #2 - CHẤM PHẨY', en: 'SHE RISE #2 - CHẤM PHẨY' },
      desc: { vi: 'Không gian thư giãn dành cho phụ nữ hiện đại tạm rời xa áp lực với những vai trò trong xã hội để phục hồi năng lượng thông qua buổi ch…', en: 'A restorative experience for modern women to reset and recharge through guided sessions…' },
      kpi1: '100+ <small>attendees</small>',
      kpi2: '05/03 <small>event date</small>',
      rank: new Date(2026, 2, 5).getTime()
    },
    {
      href: 'showcase-she-rise-from-soul-to-shine-khai-mo-ve-dep-tu-ben-trong.html',
      mediaClass: 'case-card__media case-card__media--orange',
      mediaStyle: "background-image: linear-gradient(rgba(16,18,24,.22), rgba(16,18,24,.22)), url('assets/images/Eventimage/Hình ảnh sự kiện 2026/SHE RISE %232 - CHẤM PHẨY/Ảnh sự kiện/647452312_122164766036403251_2622446514461473799_n.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;",
      tag: { vi: 'Event', en: 'Event' },
      meta: { vi: 'SIA Event · Phụ nữ & Phong cách sống · 2025', en: 'SIA Event · Women & Lifestyle · 2025' },
      title: { vi: 'SHE RISE: FROM SOUL TO SHINE - KHAI MỞ VẺ ĐẸP TỪ BÊN TRONG', en: 'SHE RISE: FROM SOUL TO SHINE - KHAI MỞ VẺ ĐẸP TỪ BÊN TRONG' },
      desc: { vi: 'Sự kiện dành riêng cho phái đẹp nhằm kết nối và tái tạo năng lượng thông qua buổi panel talk truyền cảm hứng và workshop trải nghiệm c…', en: 'A women-focused experience combining inspiration talks and hands-on workshops…' },
      kpi1: '40+ <small>attendees</small>',
      kpi2: '17/12 <small>event date</small>',
      rank: new Date(2025, 11, 17).getTime()
    },
    {
      href: 'showcase-su-kien-very-demure-very-mindful.html',
      mediaClass: 'case-card__media case-card__media--blue',
      mediaStyle: "background-image: linear-gradient(rgba(16,18,24,.22), rgba(16,18,24,.22)), url('assets/images/Eventimage/Hình ảnh sự kiện 2026/SHE RISE %232 - CHẤM PHẨY/Ảnh sự kiện/647452312_122164766036403251_2622446514461473799_n.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;",
      tag: { vi: 'Event', en: 'Event' },
      meta: { vi: 'SIA Event · Thời trang & Phong cách sống · 2025', en: 'SIA Event · Fashion & Lifestyle · 2025' },
      title: { vi: 'SỰ KIỆN VERY DEMURE, VERY MINDFUL', en: 'VERY DEMURE, VERY MINDFUL EVENT' },
      desc: { vi: 'Workshop kết hợp trưng bày thời trang và panel talk truyền cảm hứng dành riêng cho phái đẹp. Sự kiện tập trung vào việc định hình phon…', en: 'Workshop blending fashion showcase and inspiration panel talks for women…' },
      kpi1: '100+ <small>attendees</small>',
      kpi2: '01/11 <small>event date</small>',
      rank: new Date(2025, 10, 1).getTime()
    },
    {
      href: 'showcase-workshop-1-dao-tao-koc-inhouse-affiliate-livestream-cho-doanh-nghiep.html',
      mediaClass: 'case-card__media case-card__media--dark',
      mediaStyle: "background-image: linear-gradient(rgba(16,18,24,.22), rgba(16,18,24,.22)), url('assets/images/Eventimage/Hình ảnh sự kiện 2025/Sự kiện VERY DEMURE, VERY MINDFUL/Ảnh sự kiện/473285213_122128388174403251_1689216600735940338_n.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;",
      tag: { vi: 'Event', en: 'Event' },
      meta: { vi: 'SIA Event · Thương mại điện tử & Truyền thông số · 2025', en: 'SIA Event · Ecommerce & Digital Media · 2025' },
      title: { vi: 'WORKSHOP 1: ĐÀO TẠO KOC INHOUSE AFFILIATE & LIVESTREAM CHO DOANH NGHIỆP', en: 'WORKSHOP 1: INHOUSE KOC AFFILIATE & LIVESTREAM TRAINING' },
      desc: { vi: 'Buổi đào tạo thực chiến về cách xây dựng đội ngũ KOC nội bộ, triển khai chiến lược Affiliate Booking và thiết lập hệ thống Livestream …', en: 'Practical training on building inhouse KOC teams and livestream systems…' },
      kpi1: '100+ <small>attendees</small>',
      kpi2: '23/09 <small>event date</small>',
      rank: new Date(2025, 8, 23).getTime()
    },
    {
      href: 'showcase-koc-connect-with-kotex-hanh-trinh-affiliate-tu-don-dau-tien-den-1000-don.html',
      mediaClass: 'case-card__media case-card__media--orange',
      mediaStyle: "background-image: linear-gradient(rgba(16,18,24,.22), rgba(16,18,24,.22)), url('assets/images/Eventimage/Hình ảnh sự kiện 2025/KOC Connect with Kotex – Hành trình Affiliate_ Từ đơn đầu tiên đến 1000 đơn/579274134_806685565534913_549673301829335587_n.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;",
      tag: { vi: 'Event', en: 'Event' },
      meta: { vi: 'SIA Event · Marketing & Thương hiệu · 2025', en: 'SIA Event · Marketing & Branding · 2025' },
      title: { vi: 'KOC Connect with Kotex – Hành trình Affiliate: Từ đơn đầu tiên đến 1000 đơn', en: 'KOC Connect with Kotex – Affiliate Journey: From First Order to 1,000 Orders' },
      desc: { vi: 'Buổi chia sẻ chuyên sâu dành cho các KOC mới bắt đầu, tập trung vào lộ trình phát triển doanh số Affiliate và cách xây dựng uy tín để …', en: 'In-depth sharing for new KOCs about affiliate growth roadmap and trust building…' },
      kpi1: '100+ <small>attendees</small>',
      kpi2: '11/09 <small>event date</small>',
      rank: new Date(2025, 8, 11).getTime()
    }
  ];

  function getLangText(element, fallback) {
    if (!element) {
      const text = fallback || '';
      return { vi: text, en: text };
    }
    const viNode = element.querySelector('[data-lang="vi"]');
    const enNode = element.querySelector('[data-lang="en"]');
    if (!viNode && !enNode) {
      const text = element.textContent ? element.textContent.trim() : '';
      return { vi: text, en: text };
    }
    return {
      vi: viNode ? viNode.textContent.trim() : (fallback || ''),
      en: enNode ? enNode.textContent.trim() : (viNode ? viNode.textContent.trim() : (fallback || ''))
    };
  }

  function parseDateFromCard(card, index) {
    const fallback = -index;
    const metaVi = card.querySelector('.case-card__meta [data-lang="vi"]');
    const metaText = metaVi ? metaVi.textContent : (card.querySelector('.case-card__meta') ? card.querySelector('.case-card__meta').textContent : '');
    const yearMatch = metaText ? metaText.match(/\b(20\d{2})\b/) : null;
    const year = yearMatch ? Number(yearMatch[1]) : null;

    const kpiDateNode = card.querySelector('.case-card__kpis span:nth-child(2)');
    const kpiText = kpiDateNode ? kpiDateNode.textContent : '';
    const dayMonthMatch = kpiText ? kpiText.match(/(\d{1,2})\s*\/\s*(\d{1,2})/) : null;

    if (!year || !dayMonthMatch) return fallback;

    const day = Number(dayMonthMatch[1]);
    const month = Number(dayMonthMatch[2]);
    if (!day || !month || month > 12 || day > 31) return fallback;

    return new Date(year, month - 1, day).getTime();
  }

  function toSafeHTML(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function extractCards(doc) {
    const cards = Array.from(doc.querySelectorAll('#cases .case-grid .case-card--item'));
    const mapped = cards.map((card, index) => {
      const link = card.querySelector('.case-card__link');
      const media = card.querySelector('.case-card__media');
      const tag = card.querySelector('.case-card__tag');
      const meta = card.querySelector('.case-card__meta');
      const title = card.querySelector('.case-card__title');
      const desc = card.querySelector('.case-card__desc');
      const kpi1 = card.querySelector('.case-card__kpis span:nth-child(1)');
      const kpi2 = card.querySelector('.case-card__kpis span:nth-child(2)');

      return {
        href: link ? link.getAttribute('href') : '',
        mediaClass: media ? media.className : 'case-card__media',
        mediaStyle: media ? (media.getAttribute('style') || '') : '',
        tag: getLangText(tag, 'Event'),
        meta: getLangText(meta),
        title: getLangText(title),
        desc: getLangText(desc),
        kpi1: kpi1 ? kpi1.innerHTML.trim() : '',
        kpi2: kpi2 ? kpi2.innerHTML.trim() : '',
        rank: parseDateFromCard(card, index),
        rawCard: card
      };
    });

    const unique = new Map();
    mapped.forEach((item) => {
      if (!item.href) return;
      if (!unique.has(item.href)) unique.set(item.href, item);
    });

    return Array.from(unique.values()).sort((a, b) => b.rank - a.rank);
  }

  function renderIndexSlides(items, wrapper) {
    const targetCount = wrapper.children.length || 5;
    const pick = items.slice(0, targetCount);
    if (!pick.length) return;

    wrapper.innerHTML = pick.map((item) => {
      const styleAttr = item.mediaStyle ? ` style="${toSafeHTML(item.mediaStyle)}"` : '';
      return `
        <div class="swiper-slide">
          <article class="case-card">
            <div class="${toSafeHTML(item.mediaClass)}"${styleAttr}>
              <span class="case-card__tag">
                <span data-lang="vi">${toSafeHTML(item.tag.vi)}</span>
                <span data-lang="en" hidden>${toSafeHTML(item.tag.en)}</span>
              </span>
            </div>
            <div class="case-card__body">
              <div class="case-card__meta">
                <span data-lang="vi">${toSafeHTML(item.meta.vi)}</span>
                <span data-lang="en" hidden>${toSafeHTML(item.meta.en)}</span>
              </div>
              <h3 class="case-card__title">
                <span data-lang="vi">${toSafeHTML(item.title.vi)}</span>
                <span data-lang="en" hidden>${toSafeHTML(item.title.en)}</span>
              </h3>
              <p class="case-card__desc">
                <span data-lang="vi">${toSafeHTML(item.desc.vi)}</span>
                <span data-lang="en" hidden>${toSafeHTML(item.desc.en)}</span>
              </p>
              <a href="${toSafeHTML(item.href)}" class="case-card__link card-stretch-link">
                <span data-lang="vi">Xem dự án</span><span data-lang="en" hidden>View project</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </article>
        </div>
      `;
    }).join('');

    const swiperEl = wrapper.closest('.cases-swiper');
    if (!swiperEl || typeof Swiper === 'undefined') return;

    if (swiperEl.swiper) {
      swiperEl.swiper.destroy(true, true);
    }
    new Swiper('.cases-swiper', {
      slidesPerView: 1.1,
      spaceBetween: 16,
      grabCursor: true,
      breakpoints: {
        768: { slidesPerView: 2.1, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 }
      },
      pagination: { el: '.cases-swiper .swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.cases-swiper .swiper-button-next',
        prevEl: '.cases-swiper .swiper-button-prev'
      }
    });
  }

  function renderServiceGrid(items, grid) {
    const targetCount = grid.querySelectorAll('.case-card--item').length || 6;
    const pick = items.slice(0, targetCount);
    if (!pick.length) return;

    grid.innerHTML = '';
    pick.forEach((item) => {
      if (item.rawCard) {
        const clone = item.rawCard.cloneNode(true);
        clone.removeAttribute(':class');
        grid.appendChild(clone);
        return;
      }

      const article = document.createElement('article');
      article.className = 'case-card case-card--item';
      article.setAttribute('data-stagger-item', '');
      article.innerHTML = `
        <div class="${toSafeHTML(item.mediaClass)}" style="${toSafeHTML(item.mediaStyle)}">
          <span class="case-card__tag">${toSafeHTML(item.tag.vi)}</span>
        </div>
        <div class="case-card__body">
          <div class="case-card__meta">
            <span data-lang="vi">${toSafeHTML(item.meta.vi)}</span>
            <span data-lang="en" hidden>${toSafeHTML(item.meta.en)}</span>
          </div>
          <h3 class="case-card__title">
            <span data-lang="vi">${toSafeHTML(item.title.vi)}</span>
            <span data-lang="en" hidden>${toSafeHTML(item.title.en)}</span>
          </h3>
          <p class="case-card__desc">
            <span data-lang="vi">${toSafeHTML(item.desc.vi)}</span>
            <span data-lang="en" hidden>${toSafeHTML(item.desc.en)}</span>
          </p>
          <div class="case-card__kpis">
            <span>${item.kpi1 || ''}</span>
            <span>${item.kpi2 || ''}</span>
          </div>
          <a href="${toSafeHTML(item.href)}" class="case-card__link">
            <span data-lang="vi">Chi tiết</span><span data-lang="en" hidden>Details</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      `;
      grid.appendChild(article);
    });
  }

  function applyCurrentLanguage() {
    if (typeof window.setLang !== 'function') return;
    const lang = localStorage.getItem('sia-lang') || 'vi';
    window.setLang(lang);
  }

  async function initLatestShowcaseBlocks() {
    const indexWrapper = document.querySelector(INDEX_WRAPPER_SELECTOR);
    const serviceGrid = document.querySelector(SERVICE_GRID_SELECTOR);
    if (!indexWrapper && !serviceGrid) return;

    try {
      const response = await fetch(SOURCE_PAGE, { cache: 'no-store' });
      if (!response.ok) {
        const fallback = FALLBACK_ITEMS.slice().sort((a, b) => b.rank - a.rank);
        if (indexWrapper) renderIndexSlides(fallback, indexWrapper);
        if (serviceGrid) renderServiceGrid(fallback, serviceGrid);
        applyCurrentLanguage();
        return;
      }
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const latestItems = extractCards(doc);
      if (!latestItems.length) {
        const fallback = FALLBACK_ITEMS.slice().sort((a, b) => b.rank - a.rank);
        if (indexWrapper) renderIndexSlides(fallback, indexWrapper);
        if (serviceGrid) renderServiceGrid(fallback, serviceGrid);
        applyCurrentLanguage();
        return;
      }

      if (indexWrapper) renderIndexSlides(latestItems, indexWrapper);
      if (serviceGrid) renderServiceGrid(latestItems, serviceGrid);
      applyCurrentLanguage();
    } catch (error) {
      const fallback = FALLBACK_ITEMS.slice().sort((a, b) => b.rank - a.rank);
      if (indexWrapper) renderIndexSlides(fallback, indexWrapper);
      if (serviceGrid) renderServiceGrid(fallback, serviceGrid);
      applyCurrentLanguage();
    }
  }

  document.addEventListener('DOMContentLoaded', initLatestShowcaseBlocks);
})();
