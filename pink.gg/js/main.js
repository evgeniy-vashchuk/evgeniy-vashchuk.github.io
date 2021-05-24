'use strict';

jQuery(function ($) {
	initObjectFitImagesPolyfill();
	initActiveHeaderAfterScroll();
	initHamburgerMenu();
	textLetteringAnimation();
	initParalaxForItems();
	initMatchHeight();
	initViewportUnitsOnMobile(); // OBJECT FIT POLYFILL

	function initObjectFitImagesPolyfill() {
		var $ofi = $('img.js-ofi:not(.js-lazy)');
		objectFitImages($ofi);
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
	} // HAMBURGER MENU


	function initHamburgerMenu() {
		function openMenu() {
			$('.js-header').addClass('-menu-open');
			$('body').addClass('-overflow-hidden');
		}

		function closeMenu() {
			$('.js-header').removeClass('-menu-open');
			$('body').removeClass('-overflow-hidden');
		}

		$('.js-hamburger-menu').on('click', function (e) {
			e.preventDefault();

			if ($(this).hasClass('-active')) {
				$(this).removeClass('-active');
				closeMenu();
			} else {
				$(this).addClass('-active');
				openMenu();
			}
		});
	} // TEXT LETTERING ANIMATION


	function textLetteringAnimation() {
		function countWords(str) {
			str = str.replace(/(^\s*)|(\s*$)/gi, "");
			str = str.replace(/[ ]{2,}/gi, " ");
			str = str.replace(/\n /, "\n");
			return str.split(' ').length;
		}

		var item = $('.js-animation-item');

		if (item.hasClass('text-lettering-animation')) {
			item.each(function () {
				if (countWords($(this).text()) > 1) {
					$(this).lettering('words');
				} else {
					$(this).lettering();
				}
			});
		}

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
	} // PARALAX FOR ITEMS


	function initParalaxForItems() {
		var rellax = new Rellax('.js-rellax', {
			center: !0
		});
	} // INIT MATCH HEIGHT


	function initMatchHeight() {
		if ($('.js-match-height').length) {
			$('.js-match-height').matchHeight();
		}
	} // VIEWPORT UNITS ON MOBILE


	function initViewportUnitsOnMobile() {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + 'px');
		$(window).on('resize', function () {
			vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', vh + 'px');
		});
	}
});