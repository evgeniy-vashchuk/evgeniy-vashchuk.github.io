'use strict';

/* global LazyLoad, AirDatepicker, Popper, IMask, Swiper */function _slicedToArray(r, e) {return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(r, a) {if (r) {if ("string" == typeof r) return _arrayLikeToArray(r, a);var t = {}.toString.call(r).slice(8, -1);return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;}}function _arrayLikeToArray(r, a) {(null == a || a > r.length) && (a = r.length);for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];return n;}function _iterableToArrayLimit(r, l) {var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];if (null != t) {var e,n,i,u,a = [],f = !0,o = !1;try {if (i = (t = t.call(r)).next, 0 === l) {if (Object(t) !== t) return;f = !1;} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);} catch (r) {o = !0, n = r;} finally {try {if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;} finally {if (o) throw n;}}return a;}}function _arrayWithHoles(r) {if (Array.isArray(r)) return r;}

var gridGutterWidth = getComputedStyle(document.documentElement).getPropertyValue('--grid-gutter-width');

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
      minimumResultsForSearch: 10,
      searchInputPlaceholder: 'Search'
    });

    selectLabel.on('click', function (e) {
      e.preventDefault();

      selectItem.select2('open');
    });
  });

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
      dateFormat: 'dd.MM.yyyy',
      timeFormat: 'hh:mm aa',
      firstDay: 1
    };

    datepicker.each(function () {
      var datepickerItem = $(this),
        datepickerValue = datepickerItem.val(),
        datepickerExcludeFuture = datepickerItem.attr('data-exclude-future') === 'true' ? true : false,
        datepickerContainer = datepickerItem.closest('.js-datepicker-container');

      var _datepickerValue$spli = datepickerValue.split('.'),_datepickerValue$spli2 = _slicedToArray(_datepickerValue$spli, 3),day = _datepickerValue$spli2[0],month = _datepickerValue$spli2[1],year = _datepickerValue$spli2[2];
      var selectedDate = new Date(+year, +month - 1, +day);

      var airDatepicker = new AirDatepicker(datepickerItem[0], {
        locale: localeEn,
        container: datepickerContainer.length ? datepickerContainer[0] : false,
        range: $(this).attr('data-range') === 'true' ? true : false,
        moveToOtherMonthsOnSelect: false,
        multipleDatesSeparator: ' - ',
        prevHtml: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2749 17.7375L9.5374 12L15.2749 6.2625L13.4999 4.5L5.9999 12L13.4999 19.5L15.2749 17.7375Z"/></svg>',
        nextHtml: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.7251 17.7375L14.4626 12L8.7251 6.2625L10.5001 4.5L18.0001 12L10.5001 19.5L8.7251 17.7375Z"/></svg>',
        navTitles: { days: 'MMMM yyyy' },
        startDate: datepickerValue ? selectedDate : false,
        selectedDates: datepickerValue ? [selectedDate] : [],
        maxDate: datepickerExcludeFuture ? new Date() : false,
        position: function position(_ref) {var $datepicker = _ref.$datepicker,$target = _ref.$target,$pointer = _ref.$pointer,done = _ref.done;
          var popper = Popper.createPopper($target, $datepicker, {
            placement: 'bottom-end',
            modifiers: [
            {
              name: 'flip',
              options: { padding: { top: 64 } }
            },
            {
              name: 'offset',
              options: { offset: [0, 8] }
            }]

          });

          return function completeHide() {
            popper.destroy();
            done();
          };
        }
      });
    });
  }

  var inputMask = $('.js-input-mask');

  if (inputMask.length) {
    inputMask.each(function () {
      var maskItem = $(this),
        mask = maskItem.attr('data-mask');

      var maskOptions = { mask: mask };
      var maskInstance = IMask(maskItem[0], maskOptions);
    });
  }
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

// OFFCANVAS
function initOffcanvas() {
  var offCanvas = document.querySelectorAll('.js-sidebar');

  if (typeof offCanvas != 'undefined' && offCanvas != null) {
    offCanvas.forEach(function (element) {
      element.addEventListener('show.bs.offcanvas', function (e) {
        e.relatedTarget.classList.add('active');
      });

      element.addEventListener('hide.bs.offcanvas', function (e) {
        var relatedTarget = document.querySelectorAll('a[href="#' + e.target.id + '"], [data-bs-target="#' + e.target.id + '"]')[0];

        if (typeof relatedTarget != 'undefined' && relatedTarget != null) {
          relatedTarget.classList.remove('active');
        }
      });
    });
  }
}

// EDIT SWITCH
function initEditSwitch() {
  var editBtn = $('.js-edit-btn');
  var editAction = $('.js-edit-action');
  var editSwitchBtn = $('.js-edit-switch-btn');

  function enableEditForms(editCard) {
    var inputs = editCard.find('input:not(.js-edit-switch-btn), textarea');
    var selects = editCard.find('select.js-select');
    var photoItemUploader = editCard.find('.js-photo-item-uploader');

    inputs.each(function () {
      var input = $(this);

      input.attr('disabled', false);
    });

    selects.each(function () {
      var select = $(this);

      select.select2('enable');
    });

    photoItemUploader.addClass('active');
  }

  function disableEditForms(editCard) {
    var inputs = editCard.find('input:not(.js-edit-switch-btn), textarea');
    var selects = editCard.find('select.js-select');
    var photoItemUploader = editCard.find('.js-photo-item-uploader');

    inputs.each(function () {
      var input = $(this);

      input.attr('disabled', true);
    });

    selects.each(function () {
      var select = $(this);

      select.select2('enable', false);
    });

    photoItemUploader.removeClass('active');
  }

  editBtn.on('click', function (e) {
    e.preventDefault();

    var editBtn = $(this),
      editCard = editBtn.closest('.js-edit-card'),
      editActions = editCard.find('.js-edit-actions');

    editBtn.addClass('d-none');
    editActions.removeClass('d-none');

    enableEditForms(editCard);
  });

  editAction.on('click', function (e) {
    e.preventDefault();

    var editAction = $(this),
      editCard = editAction.closest('.js-edit-card'),
      editBtn = editCard.find('.js-edit-btn'),
      editActions = editCard.find('.js-edit-actions');

    editBtn.removeClass('d-none');
    editActions.addClass('d-none');

    disableEditForms(editCard);
  });

  editSwitchBtn.on('change', function (e) {
    var editSwitch = $(this),
      editSwitchChecked = editSwitch.is(':checked'),
      editCard = editSwitch.closest('.js-edit-card');

    if (editSwitchChecked) {
      enableEditForms(editCard);
    } else {
      disableEditForms(editCard);
    }
  });
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

// SELECT BASED FORMS SWITCHER
function initSelectBasedFormsSwitcher() {
  var selectBasedForms = $('.js-select-based-forms');
  var select = $('.js-select-based');

  function switchForms(selectBasedForms) {
    var formItems = selectBasedForms.find('[data-select-based-type]');
    var select = selectBasedForms.find('.js-select-based');
    var selectedValue = select.val();

    formItems.each(function () {
      var formItem = $(this);
      var formItemData = formItem.attr('data-select-based-type');

      if (formItemData.includes(selectedValue)) {
        formItem.removeClass('d-none');
      } else {
        formItem.addClass('d-none');
      }
    });
  }

  selectBasedForms.each(function () {
    switchForms($(this));
  });

  select.on('change', function () {
    var selectBasedForms = $(this).closest('.js-select-based-forms');

    switchForms(selectBasedForms);
  });
}

// SLIDERS
function initSliders() {
  var sliderAnimals = new Swiper('.js-slider-animals', {
    slidesPerView: 1,
    spaceBetween: gridGutterWidth,
    speed: 500,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 8
    }
  });
}

(function ($) {
  initActiveHeaderAfterScroll();
  initForms();
  initLazyLoad();
  initStopAnimationsDuringWindowResizing();
  initOffcanvas();
  initEditSwitch();
  initScrollBarWidth();
  initModal();
  initSelectBasedFormsSwitcher();
  initSliders();
})(jQuery);