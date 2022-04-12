'use strict';

jQuery(function ($) {
	initActiveHeaderAfterScroll();
	initHamburgerMenu();
	initStopAnimationsDuringWindowResizing();
	initViewportUnitsOnMobile();
	initMovementParallax();
	initCountUp();

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

	// HAMBURGER MENU
	function initHamburgerMenu() {
		$('.js-hamburger-menu').on('click', function (e) {
			e.preventDefault();

			function openMenu() {
				$('.js-header-menu').addClass('active');
				$('body').addClass('overflow-hidden');
			}

			function closeMenu() {
				$('.js-header-menu').removeClass('active');
				$('body').removeClass('overflow-hidden');
			}

			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				closeMenu();
			} else {
				$(this).addClass('active');
				openMenu();
			}
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

	// VIEWPORT UNITS ON MOBILE
	function initViewportUnitsOnMobile() {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + 'px');

		$(window).on('resize', function () {
			vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', vh + 'px');
		});
	}

	// MOVEMENT PARALLAX
	function initMovementParallax() {
		if ($('.js-parallax-scene').length) {
			var scene = $('.js-parallax-scene');

			scene.each(function () {
				new Parallax(this, {
					selector: '.js-parallax-item',
					pointerEvents: true });

			});
		}
	}

	// COUNT UP
	function initCountUp() {
		function countUpNumbers(countUpItem, duration) {
			var countNumber = $(countUpItem).attr('data-count-number'),
			prefix = $(countUpItem).attr('data-count-prefix') !== undefined ? $(countUpItem).attr('data-count-prefix') : '',
			suffix = $(countUpItem).attr('data-count-suffix') !== undefined ? $(countUpItem).attr('data-count-suffix') : '',
			numbersAfterComma = 0;

			if (countNumber.indexOf('.') > 0) {
				numbersAfterComma = countNumber.length - (countNumber.indexOf('.') + 1);
			}

			if (countNumber.indexOf(',') > 0) {
				numbersAfterComma = countNumber.length - (countNumber.indexOf(',') + 1);

				countNumber = countNumber.replace(',', '.');
			}

			var options = {
				startVal: 0,
				decimalPlaces: numbersAfterComma,
				duration: duration / 1000,
				useEasing: true,
				decimal: '.',
				prefix: prefix,
				suffix: suffix };


			new countUp.CountUp(countUpItem, countNumber, options).start();
		}

		function countUpNumbersOnScroll() {
			var countUpItem = $('.js-count-up-item');

			if (countUpItem.length) {
				countUpItem.waypoint({
					handler: function handler() {
						if (!this.element.countUpInit) {
							this.element.countUpInit = true;

							countUpNumbers(this.element, 3000);
						}
					},
					offset: '90%' });

			}
		}

		countUpNumbersOnScroll();
	}

});