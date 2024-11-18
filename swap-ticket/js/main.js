'use strict';

/* global LazyLoad, Swiper, AOS, gsap, ScrollTrigger */

var gridGutterWidth = getComputedStyle(document.documentElement).getPropertyValue('--grid-gutter-width');
var colorPrimary = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary');

// LAZY LOAD IMAGES
function initLazyLoad() {
  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.js-lazy',
    threshold: 0
  });
}

// STOP ANIMATIONS DURING WINDOW RESIZING
function initStopAnimationsDuringWindowResizing() {
  var resizeTimer;

  $(window).on('resize', function () {
    $('body').addClass('resize-animation-stopper');

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {
      $('body').removeClass('resize-animation-stopper');
    }, 400);
  });
}

// SLIDERS
function initSliders() {
  var sliderWelcome = new Swiper('.js-slider-welcome', {
    slidesPerView: 1,
    spaceBetween: gridGutterWidth,
    speed: 1000,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false
    },
    effect: 'fade'
  });
}

// ACTIVE HEADER AFTER SCROLL
function initActiveHeaderAfterScroll() {
  var header = $('.js-header');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 10) {
      header.addClass('active');
    } else {
      header.removeClass('active');
    }
  });

  if ($(document).scrollTop() > 10) {
    header.addClass('active');
  }
}

// AOS ANIMATION
function initAosAnimation() {
  AOS.init({
    offset: 120,
    duration: 600,
    easing: 'ease-in-sine',
    delay: 100
  });

  document.querySelectorAll('.js-lazy').forEach(function (img) {return img.addEventListener('load', function () {return AOS.refresh();});});
}

// SMOOTH ANCHOR LINKS
function initSmoothAnchorLinks() {
  var animationComplete = true;

  $('a[href^="#"]:not([href="#"]):not(.js-no-scroll)').on('click', function (e) {
    e.preventDefault();

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

// HIGHLIGHT TEXT ON SCROLL
function initHighlightTextOnScroll() {
  var highlightText = $('.js-highlight-text');

  highlightText.lettering('words').children('span').lettering();

  gsap.registerPlugin(ScrollTrigger);

  highlightText.each(function () {
    var text = $(this),
      chars = text.find('[class^="char"]'),
      progress = $(text.attr('data-circle-progress'));

    gsap.to(chars, {
      color: colorPrimary,
      ease: 'none',
      stagger: { each: 0.04 },
      scrollTrigger: {
        trigger: chars,
        start: 'center 90%',
        end: 'center 10%',
        scrub: true,
        onUpdate: function onUpdate(self) {
          var percent = Math.round(self.progress * 100),
            degree = 360 / 100 * percent + 'deg';

          progress[0].style.setProperty('--progress', degree);
        }
      }
    });
  });

  $('[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    ScrollTrigger.refresh();
  });
}

(function ($) {
  initLazyLoad();
  initStopAnimationsDuringWindowResizing();
  initSliders();
  initActiveHeaderAfterScroll();
  initAosAnimation();
  initSmoothAnchorLinks();
  initHighlightTextOnScroll();
})(jQuery);