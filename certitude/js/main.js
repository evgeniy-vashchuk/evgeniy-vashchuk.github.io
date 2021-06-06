'use strict';

jQuery(function ($) {
	initHamburgerMenu();
	initActiveHeaderAfterScroll();
	initViewportUnitsOnMobile();
	initSmoothAnchorLinks();
	initTextLetteringAnimation();
	initLazyLoadingForImages(); // HAMBURGER MENU

	function initHamburgerMenu() {
		var body = $('body'),
				header = $('.js-header'),
				mobileMenuOverlay = $('.js-mobile-menu-overlay'),
				hamburgerMenu = $('.js-hamburger-menu');

		function openMenu() {
			header.addClass('-menu-active');
			mobileMenuOverlay.addClass('-menu-active');
		}

		function closeMenu() {
			header.removeClass('-menu-active');
			mobileMenuOverlay.removeClass('-menu-active');
		}

		hamburgerMenu.on('click', function (e) {
			e.preventDefault();

			if ($(this).hasClass('-active')) {
				$(this).removeClass('-active');
				closeMenu();
			} else {
				$(this).addClass('-active');
				openMenu();
			}
		});
		mobileMenuOverlay.on('click', function () {
			hamburgerMenu.removeClass('-active');
			closeMenu();
		});
		$(window).on('resize', function () {
			body.addClass('-resize-active');
			clearTimeout(window.resizedFinished);
			window.resizedFinished = setTimeout(function () {
				body.removeClass('-resize-active');
			}, 100);
		});
	} // ACTIVE HEADER AFTER SCROLL


	function initActiveHeaderAfterScroll() {
		var header = $('.js-header');
		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 10) {
				header.addClass('-active');
			} else {
				header.removeClass('-active');
			}
		});

		if ($(document).scrollTop() > 10) {
			header.addClass('-active');
		}
	} // VIEWPORT UNITS ON MOBILE


	function initViewportUnitsOnMobile() {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + 'px');
		$(window).on('resize', function () {
			vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', vh + 'px');
		});
	} // SMOOTH ANCHOR LINKS


	function initSmoothAnchorLinks() {
		var animationComplete = true,
				headerOffset = $('.js-header').outerHeight(),
				urlHash = window.location.href.split("#")[1];
		$('a[href*="#"]:not([href="#"]):not(.js-no-scroll)').on('click', function () {
			$('.js-header').removeClass('-menu-active');
			$('.js-mobile-menu-overlay').removeClass('-menu-active');
			$('.js-hamburger-menu').removeClass('-active');
			var idOfElement = $(this).attr('href').split("#")[1];

			if (headerOffset === undefined) {
				headerOffset = 0;
			}

			if (!$('#' + idOfElement).length) return;
			var top = $('#' + idOfElement).offset().top - headerOffset;

			if (animationComplete) {
				animationComplete = false;
				$('body, html').animate({
					scrollTop: top
				}, 500).promise().done(function () {
					animationComplete = true;
				});
			}
		});

		if (urlHash && $('#' + urlHash).length) {
			setTimeout(function () {
				if (animationComplete) {
					animationComplete = false;
					$('body, html').animate({
						scrollTop: $('#' + urlHash).offset().top - headerOffset
					}, 500).promise().done(function () {
						animationComplete = true;
					});
				}
			}, 100);
		}
	} // TEXT LETTERING ANIMATION


	function initTextLetteringAnimation() {
		// wrap all text nodes in span
		$('.js-text-lettering-animation, .js-text-lettering-animation strong').contents().filter(function () {
			return this.nodeType === 3 && this.data.trim().length > 0;
		}).wrap('<span class="word" />');
		var item = $('.js-text-lettering-animation');
		item.find('span').lettering("words");

		if (item.length) {
			item.waypoint({
				handler: function handler() {
					if (!this.element.animationInit) {
						this.element.animationInit = true;
						$(this.element).addClass('-active');
					}
				},
				offset: '90%'
			});
		}
	} // LAZY LOADING FOR IMAGES


	function initLazyLoadingForImages() {
		$(".js-lazy").Lazy({
			effect: 'fadeIn',
			effectTime: 300
		});
	}
});