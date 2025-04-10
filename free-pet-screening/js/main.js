'use strict';

/* global LazyLoad, countUp, Odometer, SVGInjector, AOS */

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

// ACTIVE OFFCANVAS TOGGLER
function initActiveOffcanvasToggler() {
  var offcanvasMenu = document.getElementById('offcanvas-menu');

  offcanvasMenu.addEventListener('show.bs.offcanvas', function (event) {
    var id = event.target.getAttribute('id'),
      offcanvasToggler = document.querySelector("[data-bs-target=\"#".concat(id, "\"][data-bs-toggle=\"offcanvas\"]"));

    offcanvasToggler.classList.add('active');
  });

  offcanvasMenu.addEventListener('hide.bs.offcanvas', function (event) {
    var id = event.target.getAttribute('id'),
      offcanvasToggler = document.querySelector("[data-bs-target=\"#".concat(id, "\"][data-bs-toggle=\"offcanvas\"]"));

    offcanvasToggler.classList.remove('active');
  });
}

// COUNT UP
function initCountUp() {
  var countUpItem = $('.js-count-up');

  countUpItem.each(function () {
    var countNumber = $(this).attr('data-count-number'),
      numbersAfterComma = 0;

    var preffix = $(this).attr('data-preffix'),
      suffix = $(this).attr('data-suffix');

    if (countNumber.indexOf('.') > 0) {
      numbersAfterComma = countNumber.length - (countNumber.indexOf('.') + 1);
    } else if (countNumber.indexOf(',') > 0) {
      numbersAfterComma = countNumber.length - (countNumber.indexOf(',') + 1);
      countNumber = countNumber.replace(',', '.');
    }

    var options = {
      startVal: 0,
      decimalPlaces: numbersAfterComma,
      duration: 1,
      useEasing: true,
      decimal: '.',
      preffix: !preffix ? '' : preffix,
      suffix: !suffix ? '' : suffix,
      enableScrollSpy: true,
      scrollSpyOnce: true,
      plugin: new Odometer({ duration: 2, lastDigitDelay: 0 })
    };

    new countUp.CountUp(this, countNumber, options).start();
  });
}

// SVG INJECTOR
function initSvgInjector() {
  var images = document.querySelectorAll('.js-svg-inject');

  SVGInjector(images);
}

// AOS
function initAos() {
  AOS.init({ once: true });
}

// MATCH HEIGHT
function initMatchHeight() {
  $('.js-match-height').matchHeight();
}

// COLLAPSE
function initCollapse() {
  function isClamped(item) {
    return item.scrollHeight > item.offsetHeight;
  }

  function detectClamp() {
    var collapse = $('.js-card-collapse');

    collapse.each(function () {
      var text = $(this).find('.js-card-collapse-text')[0];

      if (isClamped(text)) {
        $(this).addClass('clamped');
      } else {
        $(this).removeClass('clamped');
      }
    });
  }

  detectClamp();

  $(window).on('resize', function () {
    detectClamp();
  });

  $('.js-card-collapse-toggle').on('click', function (e) {
    e.preventDefault();

    var collapse = $(this).closest('.js-card-collapse');

    collapse.toggleClass('active');
  });
}

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

(function ($) {
  initLazyLoad();
  initStopAnimationsDuringWindowResizing();
  initActiveOffcanvasToggler();
  initCountUp();
  initSvgInjector();
  initAos();
  initMatchHeight();
  initCollapse();
  initForms();
})(jQuery);