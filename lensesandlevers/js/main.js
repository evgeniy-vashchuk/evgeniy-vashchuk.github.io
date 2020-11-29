"use strict";

(function ($) {
  'use strict';

  var MOBILE_BREACKPOINT = 768;
  $(document).ready(function () {
    colorHeaderAfterScroll();
    initMobileMenu();
    initObjectFitImagesPolyfil();
    initLazyLoadingForImages();
    initAnimationsOnScroll();
    initCountUp();
    initMasonryLayout();
    initBackgroundVideo();

    if ($(window).width() > MOBILE_BREACKPOINT) {
      initParallaxForItems();
    }
  }); // COLOR HEADER AFTER SCROLL

  function colorHeaderAfterScroll() {
    var header = $('.js-header');
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 1) {
        header.addClass('-active');
      } else {
        header.removeClass('-active');
      }
    });

    if ($(document).scrollTop() > 1) {
      header.addClass('-active');
    }
  } // MOBILE MENU


  function initMobileMenu() {
    function openMenu() {
      $('.js-hamburger-menu').addClass('-active');
      $('.js-mobile-menu').addClass('-active');
      $('.js-header').addClass('-show-overlay');
    }

    function closeMenu() {
      $('.js-hamburger-menu').removeClass('-active');
      $('.js-mobile-menu').removeClass('-active');
      $('.js-header').removeClass('-show-overlay');
    }

    $('.js-hamburger-menu').on('click', function (e) {
      e.preventDefault();

      if ($(this).hasClass('-active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    $('.js-mobile-menu-overlay').on('click', function () {
      closeMenu();
    });
  } // OBJECT FIT POLIFIL


  function initObjectFitImagesPolyfil() {
    var $ofImage = $('img.js-of-image:not(.js-lazy)');
    objectFitImages($ofImage);
  } // LAZY LOADING FOR IMAGES


  function initLazyLoadingForImages() {
    $('.js-lazy').Lazy({
      effect: 'fadeIn',
      effectTime: 300,
      afterLoad: function afterLoad(element) {
        var image = $(element);

        if (image.hasClass('lazy')) {
          image.addClass('-active');
        }

        if (image.hasClass('js-of-image')) {
          objectFitImages(image);
        }
      }
    });
  } // ANIMATIONS ON SCROLL


  function initAnimationsOnScroll() {
    $('.js-footer-title-with-arrow').waypoint({
      handler: function handler() {
        if (!this.element.activeInit) {
          this.element.activeInit = true;
          $(this.element).addClass('-active');
        }
      },
      offset: '80%'
    });
    $('.js-active-on-scroll').waypoint({
      handler: function handler() {
        if (!this.element.activeInit) {
          this.element.activeInit = true;
          $(this.element).addClass('-active');
        }
      },
      offset: '90%'
    });
  } // INIT COUNT UP


  function initCountUp() {
    function countUpNumbers(countUpItem, duration) {
      var countNumber = $(countUpItem).attr('data-count-number'),
          numbersAfterComma = 0;

      if (countNumber.indexOf('.') > 0) {
        numbersAfterComma = countNumber.length - (countNumber.indexOf('.') + 1);
      }

      var options = {
        startVal: 0,
        decimalPlaces: numbersAfterComma,
        duration: duration / 1000,
        useEasing: true,
        decimal: '.',
        suffix: '%'
      };
      new countUp.CountUp(countUpItem, countNumber, options).start();
    }

    function countUpNumbersOnScroll() {
      var countUpItem = $('.js-count-up-item');

      if (countUpItem.length) {
        countUpItem.waypoint({
          handler: function handler() {
            if (!this.element.countUpInit) {
              this.element.countUpInit = true;
              countUpNumbers(this.element, 8000);
            }
          },
          offset: '80%'
        });
      }
    }

    countUpNumbersOnScroll();
  } // INIT MASONRY LAYOUT


  function initMasonryLayout() {
    var masonryLayoutBlock = $('.js-masonry-layout');
    masonryLayoutBlock.masonry({
      itemSelector: '.js-masonry-grid-item',
      horizontalOrder: true
    });
    $('.js-simple-accordion').on('shown.bs.collapse', function () {
      if ($(this).closest('.js-masonry-layout').length) {
        masonryLayoutBlock.masonry();
      }
    });
    $('.js-simple-accordion').on('hidden.bs.collapse', function () {
      if ($(this).closest('.js-masonry-layout').length) {
        masonryLayoutBlock.masonry();
      }
    });
  } // INIT PARALLAX FOR ITEMS


  function initParallaxForItems() {
    if ($('.js-parallax-item').length) {
      var scene = $('.js-parallax-scene');
      scene.each(function () {
        new Parallax(this, {
          selector: '.js-parallax-item',
          pointerEvents: true
        });
      });
    }
  } // INIT BACKGROUND VIDEOS


  function initBackgroundVideo() {
    var videoSettings = {
      containment: '.js-video-block',
      startAt: 0,
      mute: true,
      ratio: 'auto',
      showControls: false,
      autoPlay: true,
      loop: true,
      showYTLogo: false,
      stopMovieOnBlur: false
    };

    if ($('.js-youtube-bg-video').length) {
      $('.js-youtube-bg-video').YTPlayer(videoSettings);
    }

    if ($('.js-vimeo-bg-video').length) {
      $('.js-vimeo-bg-video').vimeo_player(videoSettings);
    }

    if ($('.js-html-bg-video').length) {
      $('.js-html-bg-video').bgVideo({
        showPausePlay: false,
        pauseAfter: 0
      });
    }
  }
})(jQuery);
//# sourceMappingURL=main.js.map
