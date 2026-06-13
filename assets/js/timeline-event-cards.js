document.addEventListener('DOMContentLoaded', function () {
  var eventImages = {
    'showcase-china-asean-digital-economy-openclaw-ai-industry-application-symposium.html': '../images/showcase-safe/0da71898cc109f34.jpg',
    'showcase-she-rise-2-cham-phay.html': '../images/showcase-safe/f17c2b47c5f1396e.jpg',
    'showcase-she-rise-from-soul-to-shine-khai-mo-ve-dep-tu-ben-trong.html': '../images/showcase-safe/f17c2b47c5f1396e.jpg',
    'showcase-su-kien-very-demure-very-mindful.html': '../images/showcase-safe/f17c2b47c5f1396e.jpg',
    'showcase-workshop-1-dao-tao-koc-inhouse-affiliate-livestream-cho-doanh-nghiep.html': '../images/showcase-safe/0da71898cc109f34.jpg',
    'showcase-koc-connect-with-kotex-hanh-trinh-affiliate-tu-don-dau-tien-den-1000-don.html': '../images/showcase-safe/02a33e13662fcc30.jpg',
    'showcase-su-kien-raise-phoenix-chien-luoc-toi-uu-mo-loi-doanh-thu-trong-nganh-thoi-trang.html': '../images/showcase-safe/54981de40855ad66.jpg',
    'showcase-workshop-phu-nu-kinh-doanh-ben-vung.html': '../images/showcase-safe/79bda31378d80c95.jpg',
    'showcase-raise-revolution-01-ban-la-ai-a-i-la-ban-nhan-hieu-nang-tam-anh-huong-thuong-hieu-dan-loi.html': '../images/showcase-safe/19fffcf9ffbbc664.jpg',
    'showcase-workshop-3-koc-hanh-trinh-van-don-chuan-thue-chuan-ky-nang-chuan-cong-cu.html': '../images/showcase-safe/f8ff3754eaeae8d5.jpg',
    'showcase-workshop-2-but-pha-doanh-thu-voi-booking-affiliate-livestream-toi-uu-chi-phi-cung-ai-autom.html': '../images/showcase-safe/20cebcc47e20bfac.jpg',
    'showcase-raise-revolution-02-xu-huong-anh-cuoi-2026.html': '../images/showcase-safe/8815bdf842264c70.jpg',
    'showcase-workshop-nghe-thuat-thu-hoi-no-va-chuan-hoa-phap-ly.html': '../images/showcase-safe/5411b4ad1bc7c044.jpg',
    'showcase-nang-cao-hieu-suat-sale-marketing-su-kien-nganh-healthcare-beauty.html': '../images/showcase-safe/3dab269d5e63a26c.jpg',
    'showcase-raise-hanh-trinh-tu-can-bep-nho-den-shark-tank-nang-cap-nong-san-ket-tinh-am-thuc.html': '../images/showcase-safe/6f38b95475adb015.jpg',
    'showcase-su-kien-the-k-o-c-series-tu-so-thich-den-thu-nhap-reviewer.html': '../images/showcase-safe/ca99450436ba0fa7.jpg',
    'showcase-kinh-doanh-dung-tu-goc-re.html': '../images/showcase-safe/ed8b7913069159d1.jpg',
    'showcase-raise-toi-uu-hoa-doanh-thu-ket-hop-suc-manh-cua-ai-va-truyen-thong-da-kenh.html': '../images/showcase-safe/5274567c8ec884a8.jpg',
    'showcase-world-ip-day-2026.html': '../images/showcase-safe/7ff6b1f0a2e117c1.jpg',
    'showcase.html': '../images/showcase-safe/0da71898cc109f34.jpg'
  };

  function getPath(href) {
    try {
      return new URL(href, window.location.href).pathname.split('/').pop();
    } catch (error) {
      return href;
    }
  }

  function getYear(card, dateText) {
    var dateYear = dateText.match(/\b(20\d{2})\b/);
    if (dateYear) return dateYear[1];

    var row = card.closest('.community-year-row');
    var rowYear = row ? row.querySelector('.community-year-row__head mark') : null;
    if (rowYear) return rowYear.textContent.trim();

    return '';
  }

  function formatDate(dateText, year) {
    var parts = dateText.replace(/\s+/g, ' ').trim().split(/[·.]/).map(function (part) {
      return part.trim();
    }).filter(Boolean);

    if (parts.length >= 3) {
      return parts.slice(0, 3).join(' · ');
    }

    if (parts.length === 2 && year) {
      return parts.concat(year).join(' · ');
    }

    return dateText.replace(/\s*[.·]\s*/g, ' · ');
  }

  document.querySelectorAll('.community-event-mini').forEach(function (card) {
    if (card.querySelector('.community-event-mini__media')) return;

    var path = getPath(card.getAttribute('href') || '');
    var image = eventImages[path] || eventImages['showcase.html'];
    var date = card.querySelector('.community-event-mini__date');
    var dateText = date ? date.textContent : '';
    var year = getYear(card, dateText);

    if (date) {
      date.textContent = formatDate(dateText, year);
    }

    card.style.setProperty('--community-event-image', 'url("' + image + '")');

    var media = document.createElement('span');
    media.className = 'community-event-mini__media';
    media.setAttribute('aria-hidden', 'true');
    card.appendChild(media);
  });

  document.querySelectorAll('.community-year-row__events').forEach(function (track) {
    var isDown = false;
    var startX = 0;
    var startScroll = 0;
    var moved = false;

    function updateTimelineLine() {
      track.style.setProperty('--community-timeline-line-left', track.scrollLeft + 'px');
    }

    updateTimelineLine();
    track.addEventListener('scroll', updateTimelineLine, { passive: true });
    window.addEventListener('resize', updateTimelineLine);

    track.addEventListener('pointerdown', function (event) {
      if (event.button !== 0) return;
      isDown = true;
      moved = false;
      startX = event.clientX;
      startScroll = track.scrollLeft;
      track.classList.add('is-dragging');
      track.setPointerCapture(event.pointerId);
    });

    track.addEventListener('pointermove', function (event) {
      if (!isDown) return;
      var delta = event.clientX - startX;
      if (Math.abs(delta) > 6) moved = true;
      track.scrollLeft = startScroll - delta;
      updateTimelineLine();
    });

    function endDrag(event) {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');
      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }
    }

    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('click', function (event) {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    }, true);
  });
});
