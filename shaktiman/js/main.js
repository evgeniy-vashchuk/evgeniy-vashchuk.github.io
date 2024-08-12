'use strict';

var breakpointXs = +getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xs').replace(/px/g, '') - 1,
	breakpointSm = +getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-sm').replace(/px/g, '') - 1,
	breakpointMd = +getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-md').replace(/px/g, '') - 1,
	breakpointLg = +getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-lg').replace(/px/g, '') - 1,
	breakpointXl = +getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xl').replace(/px/g, '') - 1,
	breakpointXxl = +getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xl').replace(/px/g, '') - 1;

(function ($) {
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
		$('.js-slider-default').slick({
			slidesToShow: 1,
			arrows: false,
			infinite: false,
			autoplay: false,
			mobileFirst: true,
			speed: 800,
			responsive: [
			{
				breakpoint: breakpointMd,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: breakpointXl,
				settings: {
					slidesToShow: 3
				}
			}]

		});

		$('.js-slider-products').slick({
			slidesToShow: 1,
			mobileFirst: true,
			dots: true,
			infinite: false,
			speed: 800
		});

		$('.js-slider-follow-us').slick({
			slidesToShow: 1,
			arrows: false,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
			pauseOnFocus: false,
			mobileFirst: true,
			speed: 800,
			pauseOnHover: false,
			responsive: [
			{
				breakpoint: breakpointSm,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: breakpointMd,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: breakpointXl,
				settings: {
					slidesToShow: 4
				}
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
				preffix = $(this).attr('data-preffix'),
				suffix = $(this).attr('data-suffix'),
				numbersAfterComma = 0;

			if (countNumber.indexOf('.') > 0) {
				numbersAfterComma = countNumber.length - (countNumber.indexOf('.') + 1);
			} else if (countNumber.indexOf(',') > 0) {
				numbersAfterComma = countNumber.length - (countNumber.indexOf(',') + 1);
				countNumber = countNumber.replace(',', '.');
			}

			var options = {
				startVal: 0,
				decimalPlaces: numbersAfterComma,
				duration: 5,
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
		splt({
			target: '.js-splitter-text'
		});

		ScrollTrigger.batch('.js-filled-text', {
			onEnter: function onEnter(elements) {
				gsap.to('.js-splitter-text .char', {
					color: "#FFFFFF",
					stagger: {
						each: 0.04
					}
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

			if ($(document).scrollTop() > sectionHeight * 1.5) {
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
					{
						mask: $(this).attr('data-mask')
					}
				);
			});
		}
	}

	// WIDTH OF SCROLLBAR
	function initScrollBarWidth() {
		if (window.innerWidth > $(window).width()) {
			var $outer = $('<div class="custom-scrollbar">').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body'),
				widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
			$outer.remove();
			window.widthOfScrollbar = 100 - widthWithScroll;
			return 100 - widthWithScroll;
		} else {
			return window.widthOfScrollbar = 0;
		}

	}

	// MODAL
	function initModal() {
		function addScrollbarCompensation(element) {
			element.css('padding-right', window.widthOfScrollbar);
		}

		function removeScrollbarCompensation(element) {
			element.css('padding-right', 0);
		}

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
		megaMenuDropdown.addEventListener('hide.bs.dropdown', function (event) {
			$('.mega-menu .mega-menu__category-list > li:first-child [data-bs-toggle="tab"]').tab('show');
			$('.mega-menu .mega-menu__sub-category-list > li:first-child [data-bs-toggle="tab"]').tab('show');
		});

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
		offcanvasMenu.addEventListener('hidden.bs.offcanvas', function (event) {
			$('body').removeClass('sub-category-open products-open');
		});

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

})(jQuery);