document.addEventListener('DOMContentLoaded', function () {
  if (typeof Swiper === 'undefined') return;

  // Logo wall — continuous autoplay
  if (document.querySelector('.logo-wall-swiper')) {
    new Swiper('.logo-wall-swiper', {
      loop: true,
      speed: 4000,
      autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false },
      slidesPerView: 'auto',
      spaceBetween: 48,
      allowTouchMove: false,
      freeMode: true
    });
  }

  // Case studies carousel
  if (document.querySelector('.cases-swiper')) {
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

  // Timeline carousels (community + home)
  document.querySelectorAll('.timeline-events-swiper').forEach(function (el) {
    var timelineSwiper = new Swiper(el, {
      loop: true,
      speed: 800,
      autoplay: {
        delay: 3200,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      },
      grabCursor: true,
      allowTouchMove: true,
      watchOverflow: false,
      observer: true,
      observeParents: true,
      slidesPerView: 1.1,
      spaceBetween: 16,
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 16 },
        1024: { slidesPerView: 3, spaceBetween: 18 },
        1280: { slidesPerView: 4, spaceBetween: 20 }
      },
      pagination: {
        el: el.querySelector('.swiper-pagination'),
        clickable: true
      },
      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev')
      }
    });

    if (timelineSwiper.autoplay) {
      timelineSwiper.autoplay.start();
    }
  });
});
