'use strict';

/* global countUp, ScrollTrigger, gsap, IMask, LazyLoad, google */

var breakpointXs = +getComputedStyle(document.documentElement).
  getPropertyValue('--bs-breakpoint-xs').
  replace(/px/g, '') - 1,
  breakpointSm = +getComputedStyle(document.documentElement).
  getPropertyValue('--bs-breakpoint-sm').
  replace(/px/g, '') - 1,
  breakpointMd = +getComputedStyle(document.documentElement).
  getPropertyValue('--bs-breakpoint-md').
  replace(/px/g, '') - 1,
  breakpointLg = +getComputedStyle(document.documentElement).
  getPropertyValue('--bs-breakpoint-lg').
  replace(/px/g, '') - 1,
  breakpointXl = +getComputedStyle(document.documentElement).
  getPropertyValue('--bs-breakpoint-xl').
  replace(/px/g, '') - 1,
  breakpointXxl = +getComputedStyle(document.documentElement).
  getPropertyValue('--bs-breakpoint-xl').
  replace(/px/g, '') - 1;

(function ($) {
  function addScrollbarCompensation(element) {
    element.css('padding-right', window.widthOfScrollbar);
  }

  function removeScrollbarCompensation(element) {
    element.css('padding-right', 0);
  }

  initStopAnimationsDuringWindowResizing();
  initActiveHeaderAfterScroll();
  initSlider();
  initMarquee();
  initCountUp();
  initMatchHeight();
  initSplitterText();
  initBackgroundVideo();
  initFixedSection();
  initForms();
  initScrollBarWidth();
  initModal();
  initMegaMenu();
  initLazyLoad();
  initFancybox();
  initShowMore();
  initSticky();
  initMap();

  $(window).on('resize', function () {
    initScrollBarWidth();
  });

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

  // SLIDER
  function initSlider() {
    var sliderDefault = $('.js-slider-default');

    sliderDefault.slick({
      slidesToShow: 1,
      arrows: false,
      infinite: false,
      autoplay: false,
      mobileFirst: true,
      speed: 400,
      touchThreshold: 100,
      swipeToSlide: true,
      responsive: [
      {
        breakpoint: breakpointMd,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: breakpointXl,
        settings: { slidesToShow: 3 }
      }]

    });

    var isSliding = false;

    sliderDefault.on('beforeChange', function () {
      isSliding = true;
    });

    sliderDefault.on('afterChange', function () {
      isSliding = false;
    });

    sliderDefault.find('[data-fancybox]').click(function () {
      if (isSliding) {
        return false;
      }
    });

    $('.js-slider-products').slick({
      slidesToShow: 1,
      mobileFirst: true,
      dots: true,
      infinite: false,
      speed: 800,
      draggable: false,
      swipe: false,
      touchMove: false
    });

    $('.js-slider-follow-us').slick({
      slidesToShow: 1,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnFocus: false,
      mobileFirst: true,
      speed: 800,
      touchThreshold: 100,
      pauseOnHover: false,
      swipeToSlide: true,
      responsive: [
      {
        breakpoint: breakpointSm,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: breakpointMd,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: breakpointXl,
        settings: { slidesToShow: 4 }
      }]

    });

    $('.js-slider-related-products').slick({
      slidesToShow: 1,
      arrows: false,
      infinite: false,
      autoplay: false,
      mobileFirst: true,
      speed: 400,
      touchThreshold: 100,
      swipeToSlide: true,
      responsive: [
      {
        breakpoint: breakpointSm,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: breakpointMd,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: breakpointXl,
        settings: { slidesToShow: 4 }
      }]

    });
  }

  // MARQUEE
  function initMarquee() {
    $('.js-marquee').marquee({
      speed: 100,
      delayBeforeStart: 0,
      startVisible: true,
      duplicated: true
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
        duration: 3,
        useEasing: true,
        decimal: ',',
        preffix: !preffix ? '' : preffix,
        suffix: !suffix ? '' : suffix,
        enableScrollSpy: true,
        scrollSpyOnce: true
      };

      new countUp.CountUp(this, countNumber, options).start();
    });
  }

  // MATCH HEIGHT
  function initMatchHeight() {
    $('.js-match-height').matchHeight();

    $(window).on('resize', function () {
      setTimeout(function () {
        $.fn.matchHeight._update();
      }, 500);
    });
  }

  // SPLITTER TEXT
  function initSplitterText() {
    $('.js-splitter-text').lettering('words').children('span').
    lettering();

    ScrollTrigger.batch('.js-filled-text', {
      onEnter: function onEnter(elements) {
        gsap.to('.js-splitter-text [class^="char"]', {
          color: '#FFFFFF',
          stagger: { each: 0.04 }
        });
      },
      once: true
    });
  }

  // BACKGROUND VIDEO
  function initBackgroundVideo() {
    var bgVideo = $('.js-bg-video');

    if (bgVideo.length) {
      bgVideo.bgVideo({
        showPausePlay: false,
        pauseAfter: 0
      });
    }
  }

  // FIXED SECTION
  function initFixedSection() {
    var fixedSection = $('.js-fixed-section');

    function detectDistance() {
      var sectionHeight = fixedSection.outerHeight();

      if ($(document).scrollTop() > sectionHeight * 1) {
        fixedSection.addClass('d-none');
      } else {
        fixedSection.removeClass('d-none');
      }
    }

    if (fixedSection.length) {
      $(window).on('scroll', function () {
        detectDistance();
      });
    }
  }

  // FORMS
  function initForms() {
    var phoneInput = $('.js-phone-input');

    if (phoneInput.length) {
      phoneInput.each(function () {
        IMask(
          $(this)[0],
          { mask: $(this).attr('data-mask') }
        );
      });
    }

    var phoneInputWP = $('.create-account-phone .input-text');

    if (phoneInputWP.length) {
      phoneInputWP.each(function () {
        IMask(
          $(this)[0],
          {
            mask: $(this).closest('.create-account-phone').find('.description').
            text()
          }
        );
      });
    }

    // disable auto-scrolling for register form
    $('form.register button[type="submit"]').on('click', function (event) {
      var scrollPosition = $(window).scrollTop();

      setTimeout(function () {
        $(window).scrollTop(scrollPosition);
      }, 1);
    });

    // download brochure
    document.addEventListener('wpcf7mailsent', function (event) {
      var formInModal = $(event.target).closest('.modal');

      if (formInModal && formInModal.attr('id') === 'modal-brochure') {
        var brochureFileUrl = formInModal.attr('data-file');

        fetch(brochureFileUrl, { method: 'GET' }).then(function (resp) {return resp.blob();}).
        then(function (blob) {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');

          a.style.display = 'none';
          a.href = url;
          a.download = 'Brochure';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
      }
    }, false);
  }

  // WIDTH OF SCROLLBAR
  function initScrollBarWidth() {
    if (window.innerWidth > $(window).width()) {
      var $outer = $('<div class="custom-scrollbar">').
        css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).
        appendTo('body'),
        widthWithScroll = $('<div>').
        css({ width: '100%' }).
        appendTo($outer).
        outerWidth();

      $outer.remove();
      window.widthOfScrollbar = 100 - widthWithScroll;

      return 100 - widthWithScroll;
    } else {
      return window.widthOfScrollbar = 0;
    }
  }

  // MODAL
  function initModal() {
    $('.modal').on('show.bs.modal', function (e) {
      addScrollbarCompensation($('.js-fixed-section, .js-bg-video'));
    });

    $('.modal').on('hidden.bs.modal', function (e) {
      removeScrollbarCompensation($('.js-fixed-section, .js-bg-video'));
    });

    $('[data-bs-dismiss="modal"]').on('click', function () {
      var nextModal = $(this).attr('data-open-next-modal');

      if ($(nextModal).length) {
        setTimeout(function () {
          $(nextModal).modal('show');
        }, 500);
      }
    });
  }

  // MEGA MENU
  function initMegaMenu() {
    // back to first active tab on dropdown close
    var megaMenuDropdown = document.getElementsByClassName('js-mega-menu-toggle')[0];

    if (typeof megaMenuDropdown != 'undefined' && megaMenuDropdown != null) {
      megaMenuDropdown.addEventListener('show.bs.dropdown', function (event) {
        $('body').addClass('overflow-hidden');
        addScrollbarCompensation($('body, .js-header, .js-fixed-section, .js-bg-video'));
      });

      megaMenuDropdown.addEventListener('hidden.bs.dropdown', function (event) {
        $('body').removeClass('overflow-hidden');
        removeScrollbarCompensation($('body, .js-header, .js-fixed-section, .js-bg-video'));
      });

      megaMenuDropdown.addEventListener('hide.bs.dropdown', function (event) {
        $('.mega-menu .mega-menu__category-list > li:first-child [data-bs-toggle="tab"]').tab('show');
        $('.mega-menu .mega-menu__sub-category-list > li:first-child [data-bs-toggle="tab"]').tab('show');
      });
    }

    // open mega menu
    $('.js-category-tab').on('click', function () {
      var withSubCategory = $($(this).attr('data-bs-target')).find('.mega-menu__inner-block.sub-category').length;

      if (withSubCategory) {
        $('body').addClass('sub-category-open');
      } else {
        $('body').addClass('products-open');
      }
    });

    $('.js-sub-category-tab').on('click', function () {
      $('body').addClass('products-open');
    });

    // close mega menu on offcanvas close
    var offcanvasMenu = document.getElementById('offcanvas-menu');

    if (typeof offcanvasMenu != 'undefined' && offcanvasMenu != null) {
      offcanvasMenu.addEventListener('hidden.bs.offcanvas', function (event) {
        $('body').removeClass('sub-category-open products-open');
      });
    }

    // back buttons
    $('.js-back-from-category').on('click', function () {
      $('.js-mega-menu-toggle').dropdown('hide');
    });

    $('.js-back-from-sub-category').on('click', function () {
      $('body').removeClass('sub-category-open');
    });

    $('.js-back-from-products').on('click', function () {
      $('body').removeClass('products-open');
    });
  }

  // LAZY LOAD
  function initLazyLoad() {
    var lazyLoadInstance = new LazyLoad({ elements_selector: '.js-lazy' });
  }

  // FANCYBOX
  function initFancybox() {
    $('[data-fancybox]').fancybox({
      idleTime: false,
      btnTpl: {
        close: '<button data-fancybox-close class="fancybox-button fancybox-button--close">' +
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="4.41406" y="3" width="24" height="2" rx="1" transform="rotate(45 4.41406 3)"/><rect x="3.22559" y="20.1965" width="24" height="2" rx="1" transform="rotate(-45 3.22559 20.1965)"/></svg>' +
        '</button>'
      }
    });
  }

  // SHOW MORE
  function initShowMore() {
    var showMoreBtn = $('.js-show-more-btn'),
      showMoreContent = $('.js-show-more-content');

    var checkExpandable = function checkExpandable() {
      if (showMoreContent.outerHeight() > 800) {
        showMoreBtn.removeClass('d-none');
        showMoreContent.addClass('expandable');
      }
    };

    checkExpandable();

    $(window).on('resize', function () {
      showMoreBtn.addClass('d-none');
      showMoreContent.removeClass('expandable');

      checkExpandable();
    });

    showMoreBtn.on('click', function () {
      if (!$(this).hasClass('expanded')) {
        $(this).addClass('expanded');
        $(this).closest('.js-show-more-wrapper').find(showMoreContent).
        addClass('expanded');
      } else {
        $(this).removeClass('expanded');
        $(this).closest('.js-show-more-wrapper').find(showMoreContent).
        removeClass('expanded');
      }
    });
  }

  // STICKY
  function initSticky() {
    var stickyElement = $('.js-sticky'),
      header = $('.js-header'),
      headerHeight = header.outerHeight() + 20;

    if (stickyElement.length && header.length) {
      stickyElement.hcSticky({
        top: headerHeight,
        followScroll: false,

        onResize: function onResize() {
          stickyElement.hcSticky('update', { top: headerHeight });
        }
      });
    }
  }

  // STANDARD GOOGLE MAP
  function initMap() {
    var mapBlock = $('.js-map');

    if (!mapBlock.length) return;

    var coordinateX = mapBlock.attr('data-coordinate-x'),
      coordinateY = mapBlock.attr('data-coordinate-y'),
      coordinates = new google.maps.LatLng(coordinateX, coordinateY),
      iconUrl = mapBlock.attr('data-icon');

    var map = new google.maps.Map(mapBlock.get(0), {
      center: coordinates,
      zoom: 14,
      disableDefaultUI: true,
      zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER },
      /* eslint-disable */
      styles: [{ featureType: 'administrative.locality', elementType: 'all', stylers: [{ hue: '#2c2e33' }, { saturation: 7 }, { lightness: 19 }, { visibility: 'on' }] }, { featureType: 'administrative.locality', elementType: 'labels.text', stylers: [{ visibility: 'on' }, { saturation: '-3' }] }, { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#fd901b' }] }, { featureType: 'landscape', elementType: 'all', stylers: [{ hue: '#ffffff' }, { saturation: -100 }, { lightness: 100 }, { visibility: 'simplified' }] }, { featureType: 'poi', elementType: 'all', stylers: [{ hue: '#ffffff' }, { saturation: -100 }, { lightness: 100 }, { visibility: 'off' }] }, { featureType: 'poi.school', elementType: 'geometry.fill', stylers: [{ color: '#f39247' }, { saturation: '0' }, { visibility: 'on' }] }, { featureType: 'road', elementType: 'geometry', stylers: [{ hue: '#ff6f00' }, { saturation: '100' }, { lightness: 31 }, { visibility: 'simplified' }] }, { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#f39247' }, { saturation: '0' }] }, { featureType: 'road', elementType: 'labels', stylers: [{ hue: '#008eff' }, { saturation: -93 }, { lightness: 31 }, { visibility: 'on' }] }, { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#fd901b' }] }, { featureType: 'road.arterial', elementType: 'geometry.stroke', stylers: [{ visibility: 'on' }, { color: '#f3dbc8' }, { saturation: '0' }] }, { featureType: 'road.arterial', elementType: 'labels', stylers: [{ hue: '#bbc0c4' }, { saturation: -93 }, { lightness: -2 }, { visibility: 'simplified' }] }, { featureType: 'road.arterial', elementType: 'labels.text', stylers: [{ visibility: 'off' }] }, { featureType: 'road.local', elementType: 'geometry', stylers: [{ hue: '#e9ebed' }, { saturation: -90 }, { lightness: -8 }, { visibility: 'simplified' }] }, { featureType: 'transit', elementType: 'all', stylers: [{ hue: '#e9ebed' }, { saturation: 10 }, { lightness: 69 }, { visibility: 'on' }] }, { featureType: 'water', elementType: 'all', stylers: [{ hue: '#e9ebed' }, { saturation: -78 }, { lightness: 67 }, { visibility: 'simplified' }] }, { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#e9e9e9' }] }]
      /* eslint-enable */
    });

    var icon = {
      url: iconUrl,
      scaledSize: new google.maps.Size(48, 48)
    };

    var marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      icon: icon
    });
  }
})(jQuery);