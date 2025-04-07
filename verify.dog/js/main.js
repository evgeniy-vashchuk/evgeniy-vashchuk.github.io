'use strict';

/* global LazyLoad, AOS, Scroller */

var breakpointSm = getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-sm').replace(/px/g, '') - 1,
  breakpointMd = getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-md').replace(/px/g, '') - 1,
  breakpointLg = getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-lg').replace(/px/g, '') - 1,
  breakpointXl = getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xl').replace(/px/g, '') - 1;

var gridGutterWidth = getComputedStyle(document.documentElement).getPropertyValue('--grid-gutter-width');

// FORMS
function initForms() {
  var select = $('.js-select');

  select.each(function () {
    var selectItem = $(this),
      selectLabel = selectItem.siblings('.form-label'),
      selectContainer = selectItem.closest('.js-select-container');

    selectItem.select2({
      dropdownParent: selectContainer.length ? selectContainer : false,
      width: '100%',
      theme: 'bootstrap',
      minimumResultsForSearch: 10
    });

    selectLabel.on('click', function () {
      selectItem.select2('open');
    });
  });
}

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

  $(window).on('resize', function () {
    $('body').addClass('resize-animation-stopper');

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {
      $('body').removeClass('resize-animation-stopper');
    }, 400);
  });
}

// MATCH HEIGHT
function initMatchHeight() {
  $('.js-match-height').matchHeight();
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

// AOS
function initAos() {
  AOS.init({ once: true });
}

// COUNT DOWN
function initCountdown() {
  var countdownElement = document.querySelectorAll('.js-countdown');

  countdownElement.forEach(function (element) {
    var clockScroller = Scroller.getNewInstance({
      direction: Scroller.DIRECTION.DOWN,
      width: 72,
      amount: 36,
      interval: 600,
      separatorType: Scroller.SEPARATOR.TIME,
      separator: ':'
    });

    clockScroller.appendTo(element);

    var minute = element.getAttribute('data-count-minutes'),
      second = element.getAttribute('data-count-seconds');

    minute = minute < 10 ? '0' + minute : minute + '';
    second = second < 10 ? '0' + second : second + '';

    var timeStr = minute + second;

    clockScroller.start(timeStr);

    var timeInterval = setInterval(function () {
      minute = parseInt(minute);
      second = parseInt(second);

      if (minute == 0 && second == 0) {
        clearInterval(timeInterval);
      } else {
        if (second == 0) {
          if (minute == 0) {
            minute = 59;
            second = 59;
          } else {
            minute -= 1;
            second = 59;
          }
        } else {
          second -= 1;
        }

        minute = minute < 10 ? '0' + minute : minute + '';
        second = second < 10 ? '0' + second : second + '';

        var _timeStr = minute + second;

        clockScroller.scrollTo(_timeStr);
      }
    }, 1000);
  });
}

(function ($) {
  initForms();
  initLazyLoad();
  initStopAnimationsDuringWindowResizing();
  initMatchHeight();
  initSmoothAnchorLinks();
  initAos();
  initCountdown();
})(jQuery);