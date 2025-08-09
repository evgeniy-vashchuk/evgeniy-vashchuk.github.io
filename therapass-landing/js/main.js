'use strict';

/* global LazyLoad, Swiper, AOS, bootstrap */function _typeof(o) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {return typeof o;} : function (o) {return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;}, _typeof(o);}function _defineProperty(e, r, t) {return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;}function _toPropertyKey(t) {var i = _toPrimitive(t, "string");return "symbol" == _typeof(i) ? i : i + "";}function _toPrimitive(t, r) {if ("object" != _typeof(t) || !t) return t;var e = t[Symbol.toPrimitive];if (void 0 !== e) {var i = e.call(t, r || "default");if ("object" != _typeof(i)) return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return ("string" === r ? String : Number)(t);}

var breakpoints = {
  sm: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-sm'), 10),
  md: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-md'), 10),
  lg: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-lg'), 10),
  xl: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xl'), 10),
  xxl: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xxl'), 10)
};

var gridGutterWidth = getComputedStyle(document.documentElement).getPropertyValue('--grid-gutter-width');

// LAZY LOAD
function initLazyLoad() {
  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.js-lazy',
    threshold: 0
  });
}

// STOP ANIMATIONS DURING WINDOW RESIZING
function initStopAnimationsDuringWindowResizing() {
  var resizeTimer;

  window.addEventListener('resize', function () {
    document.body.classList.add('resize-animation-stopper');

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {
      document.body.classList.remove('resize-animation-stopper');
    }, 400);
  });
}

// SLIDERS
function initSliders() {
  var sliderReviews = new Swiper('.js-slider-reviews', {
    slidesPerView: 1,
    spaceBetween: gridGutterWidth,
    speed: 500,
    loop: true,
    autoHeight: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 4,
      enabled: false
    }
  });

  var sliderTherapists = new Swiper('.js-slider-therapists', {
    slidesPerView: 1,
    spaceBetween: gridGutterWidth,
    speed: 500,
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      enabled: false
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 4,
      enabled: true
    },

    breakpoints: _defineProperty(_defineProperty(_defineProperty({},
    breakpoints.sm, {
      slidesPerView: 1,
      navigation: { enabled: true },
      pagination: { enabled: false }
    }),
    breakpoints.lg, {
      slidesPerView: 2,
      navigation: { enabled: true },
      pagination: { enabled: false }
    }),
    breakpoints.xxl, {
      slidesPerView: 3,
      navigation: { enabled: true },
      pagination: { enabled: false }
    })

  });

  var sliderTestimonials = new Swiper('.js-slider-testimonials', {
    slidesPerView: 1,
    spaceBetween: gridGutterWidth,
    speed: 500,
    loop: true,
    autoHeight: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      enabled: false
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 4,
      enabled: true
    }
  });
}

// ACTIVE HEADER AFTER SCROLL
function initActiveHeaderAfterScroll() {
  var header = document.querySelector('.js-header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }
  });

  if (document.documentElement.scrollTop > 10) {
    header.classList.add('active');
  }
}

// AOS
function initAos() {
  AOS.init({ once: true });
}

// ACCORDION
function initAccordion() {
  var accordions = document.querySelectorAll('.js-accordion');

  accordions.forEach(function (item) {
    item.addEventListener('show.bs.collapse', function (event) {
      event.target.closest('.accordion-item').classList.add('active');
    });

    item.addEventListener('hide.bs.collapse', function (event) {
      event.target.closest('.accordion-item').classList.remove('active');
    });
  });
}

// SMOOTH ANCHOR LINKS
function initSmoothAnchorLinks() {
  var animationComplete = true;

  $('a[href^="#"]:not([href="#"]):not(.js-no-scroll)').on('click', function (e) {
    e.preventDefault();

    // height of header (for offset)
    var headerOffset = $('.js-header').outerHeight();
    var idOfElement = $(this).attr('href');

    if (headerOffset === undefined) {
      headerOffset = 0;
    }

    var top = $(idOfElement).offset().top - headerOffset;

    if (animationComplete) {
      animationComplete = false;

      $('body, html').animate({ scrollTop: top }, 1000).promise().
      done(function () {
        animationComplete = true;
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initLazyLoad();
  initStopAnimationsDuringWindowResizing();
  initSliders();
  initActiveHeaderAfterScroll();
  initAos();
  initAccordion();
  initSmoothAnchorLinks();
});