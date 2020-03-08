"use strict";

(function ($) {
  "use strict";

  $(document).ready(function () {
    initSmallHeaderAfterScroll(1);
    initMobileMenu();
    initInsertVideoIframe();
    initReviewsSlider();
    initScrollToElement();
    initStickyFooter();
    $(window).on('resize', function () {
      initStickyFooter();
    });
  }); // SMALL HEADER AFTER SCROLL

  function initSmallHeaderAfterScroll(distanceY) {
    var header = $('.js-header');
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > distanceY) {
        header.addClass('-small');
      } else {
        header.removeClass('-small');
      }
    });

    if ($(document).scrollTop() > distanceY) {
      header.addClass('-small');
    }
  } // MOBILE MENU


  function initMobileMenu() {
    var hamburger = $('.js-hamburger'),
        header = $('.js-header'),
        mobileMenu = $('.js-mobile-menu'),
        menuNavigationLink = mobileMenu.find('a'),
        body = $('body');

    function openMobileMenu() {
      hamburger.addClass('-active');
      mobileMenu.addClass('-active');
      header.addClass('-active');
      body.addClass('-overflow-hidden');
    }

    function closeMobileMenu() {
      hamburger.removeClass('-active');
      mobileMenu.removeClass('-active');
      header.removeClass('-active');
      body.removeClass('-overflow-hidden');
    }

    hamburger.on('click', function (e) {
      e.preventDefault();

      if (!$(this).hasClass('-active')) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });
    menuNavigationLink.on('click', function () {
      closeMobileMenu();
    });
  } // VIDEO THUMBNAIL


  function detectVideoHosting(url) {
    var videoHosting = '';

    if (url.indexOf('youtube') >= 0) {
      videoHosting = 'youtube';
    } else if (url.indexOf('vimeo') >= 0) {
      videoHosting = 'vimeo';
    }

    return videoHosting;
  }

  function getVideoId(videoItem) {
    var videoThumbnailUrl = videoItem.attr('data-video'),
        videoHosting = detectVideoHosting(videoThumbnailUrl),
        separator = '';

    if (videoHosting === 'youtube') {
      separator = 'v=';
    } else if (videoHosting === 'vimeo') {
      separator = '/';
    }

    return videoThumbnailUrl.split(separator)[videoThumbnailUrl.split(separator).length - 1];
  }

  function initInsertVideoIframe() {
    $('.js-video-thumbnail').on('click', function () {
      var videoHosting = detectVideoHosting($(this).attr('data-video')),
          videoIframe = $('<iframe class="video-thumbnail__media" allowfullscreen></iframe>');
      videoIframe.attr('allow', 'autoplay');

      if (videoHosting === 'youtube') {
        videoIframe.attr('src', 'https://www.youtube.com/embed/' + getVideoId($(this)) + '?rel=0&showinfo=0&autoplay=1');
      } else if (videoHosting === 'vimeo') {
        videoIframe.attr('src', 'https://player.vimeo.com/video/' + getVideoId($(this)) + '?autoplay=1');
      }

      $(this).find('.js-video-thumbnail-media').remove();
      $(this).append(videoIframe);
    });
  } // REVIEWS SLIDER


  function initReviewsSlider() {
    var reviewsSlider = $(".js-reviews-slider");
    reviewsSlider.slick({
      arrows: false,
      dots: true
    });
    $('.js-prev-slide').on('click', function (e) {
      e.preventDefault();
      reviewsSlider.slick('slickPrev');
    });
    $('.js-next-slide').on('click', function (e) {
      e.preventDefault();
      reviewsSlider.slick('slickNext');
    });
  } // SCROLL TO ELEMENT


  function initScrollToElement() {
    var animationComplete = true;
    $('a[href^="#"]:not(.js-no-scroll)').on('click', function (e) {
      e.preventDefault();
      var idOfElement = $(this).attr('href'),
          scrollToTop = $(this).hasClass('js-without-compensation'),
          compensation = 0;

      if ($(window).width() > 767 && !scrollToTop) {
        compensation = 60;
      }

      var top = $(idOfElement).offset().top + compensation;

      if (animationComplete) {
        animationComplete = false;
        $('body, html').animate({
          scrollTop: top
        }, 1000).promise().done(function () {
          animationComplete = true;
        });
      }
    });
  } // STICKY FOOTER


  function initStickyFooter() {
    // 1) height of footer
    var footerHeight = $('.js-footer').outerHeight(); // 2) compensation

    $('.js-wrap-for-sticky').css({
      'padding-bottom': footerHeight
    });
  }
})(jQuery);
//# sourceMappingURL=main.js.map
