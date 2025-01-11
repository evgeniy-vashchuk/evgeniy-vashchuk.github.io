'use strict';

/* global LazyLoad, bootstrap, AirDatepicker, Sortable */

// ACTIVE HEADER AFTER SCROLL
function _toConsumableArray(r) {return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(r, a) {if (r) {if ("string" == typeof r) return _arrayLikeToArray(r, a);var t = {}.toString.call(r).slice(8, -1);return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;}}function _iterableToArray(r) {if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);}function _arrayWithoutHoles(r) {if (Array.isArray(r)) return _arrayLikeToArray(r);}function _arrayLikeToArray(r, a) {(null == a || a > r.length) && (a = r.length);for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];return n;}function initActiveHeaderAfterScroll() {
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

// WIDTH OF SCROLLBAR
function initScrollBarWidth() {
  if (window.innerWidth > $(window).width()) {
    var $outer = $('<div class="custom-scrollbar">').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body'),
      widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).
      outerWidth();

    $outer.remove();
    window.widthOfScrollbar = 100 - widthWithScroll;

    return 100 - widthWithScroll;
  } else {
    return window.widthOfScrollbar = 0;
  }
}

// FORMS
function initForms() {
  var select = $('.js-select');

  if (select.length) {
    select.each(function () {
      var selectItem = $(this);
      var selectContainer = selectItem.closest('.js-select-container');

      function formatTemplate(item) {
        if (!item.id) {
          return item.text;
        }

        var $item = item.text;

        if (item.element.dataset.tag) {
          $item = $('<div class="d-flex align-items-center justify-content-between flex-nowrap">' +
          '<span class="select2-tag-text pe-10">' + item.text + '</span>' + (
          item.element.dataset.tag ? '<span class="select2-tag">' + item.element.dataset.tag + '</span></div>' : ''));
        }

        return $item;
      }

      selectItem.select2({
        dropdownParent: selectContainer.length ? selectContainer : false,
        theme: 'bootstrap',
        width: '100%',
        allowClear: true,
        language: {
          noResults: function noResults() {
            return 'No options';
          }
        },
        templateSelection: formatTemplate,
        templateResult: formatTemplate
      });

      selectItem.on('select2:select', function (e) {
        $(e.currentTarget).addClass('is-selected');
      });

      selectItem.on('select2:clear', function (e) {
        $(e.currentTarget).removeClass('is-selected');
      });

      selectItem.on('select2:unselecting', function () {
        $(this).on('select2:opening', function (e) {
          e.preventDefault();
          $(this).off('select2:opening');
        });
      });

      $('.table-responsive').on('scroll', function () {
        selectItem.select2('close');
      });
    });
  }

  var datepicker = $('.js-datepicker');

  if (datepicker.length) {
    var localeEn = {
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'MM/dd/yyyy',
      timeFormat: 'hh:mm aa',
      firstDay: 0
    };

    datepicker.each(function () {
      var airDatepicker = new AirDatepicker(this, {
        locale: localeEn,
        range: $(this).attr('data-range') === 'true' ? true : false,
        moveToOtherMonthsOnSelect: false,
        multipleDatesSeparator: ' - ',
        prevHtml: '<span class="icomoon-chevron-left"></span>',
        nextHtml: '<span class="icomoon-chevron-right"></span>',
        position: 'bottom center',
        navTitles: { days: 'MMMM yyyy' },
        showOtherMonths: false
      });
    });
  }
}

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

// TOOLTIPS
function initTooltips() {
  var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  var tooltipList = _toConsumableArray(tooltipTriggerList).map(function (tooltipTriggerEl) {return new bootstrap.Tooltip(tooltipTriggerEl, { offset: [0, 16] });});
}

// DROPDOWN
function initDropdown() {
  var dropdownButton = null;

  $('.js-close-dropdown').on('click', function () {
    var dropdownElement = $(this).closest('.dropdown').find('.dropdown-toggle')[0] || dropdownButton;
    var dropdownInstance = bootstrap.Dropdown.getInstance(dropdownElement);

    if (dropdownInstance) {
      dropdownInstance.hide();
    }
  });

  $(document).on('show.bs.dropdown', '.table thead .dropdown', function (e) {
    var dropdown = $(e.currentTarget).find('.dropdown-menu');

    dropdownButton = e.target;

    dropdown.appendTo('body');

    $(this).on('hidden.bs.dropdown', function () {
      dropdown.appendTo(e.currentTarget);
    });
  });

  $('.table-responsive').on('scroll', function () {
    var dropdownElement = $(this).closest('.dropdown').find('.dropdown-toggle')[0] || dropdownButton;
    var dropdownInstance = bootstrap.Dropdown.getInstance(dropdownElement);

    if (dropdownInstance) {
      dropdownInstance.hide();
    }
  });

  var sortable = $('.js-sortable');

  if (sortable.length) {
    sortable.each(function () {
      Sortable.create(this, {
        handle: '.js-sortable-handle',
        animation: 150
      });
    });
  }
}

// MODAL
function initModal() {
  document.addEventListener('hide.bs.modal', function (event) {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  });

  function addScrollbarCompensation(element) {
    element.css('padding-right', window.widthOfScrollbar);
  }

  function removeScrollbarCompensation(element) {
    element.css('padding-right', 0);
  }

  document.addEventListener('show.bs.modal', function (event) {
    addScrollbarCompensation($('.js-header'));
  });

  document.addEventListener('hidden.bs.modal', function (event) {
    removeScrollbarCompensation($('.js-header'));
  });
}

(function ($) {
  initActiveHeaderAfterScroll();
  initScrollBarWidth();
  initForms();
  initLazyLoad();
  initStopAnimationsDuringWindowResizing();
  initTooltips();
  initDropdown();
  initModal();

  $(window).on('resize', function () {
    initScrollBarWidth();
  });
})(jQuery);