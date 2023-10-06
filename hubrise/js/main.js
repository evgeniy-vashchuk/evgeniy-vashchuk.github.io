'use strict';

jQuery(function ($) {
	initActiveHeaderAfterScroll();
	initParallaxForItems();
	initMenu();
	initStopAnimationsDuringWindowResizing();
	initAos();
});

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

// PARALLAX FOR ITEMS
function initParallaxForItems() {
	// on mouse movement
	var parallaxScene = $('.js-parallax-scene');

	if (parallaxScene.length) {
		var scene = parallaxScene;

		scene.each(function () {
			new Parallax(this, {
				selector: '.js-parallax-item',
				pointerEvents: true
			});
		});
	}

	// on scroll
	var rellax = new Rellax('.js-rellax', {
		center: true
	});
}

// HAMBURGER MENU
function initMenu() {
	var menu = $('.js-menu'),
		openMenuBtn = $('.js-open-menu'),
		closeMenuBtn = $('.js-close-menu');

	function openMenu() {
		menu.addClass('active');
		$('body').addClass('overflow-hidden');
	}

	function closeMenu() {
		menu.removeClass('active');
		$('body').removeClass('overflow-hidden');
	}

	openMenuBtn.on('click', function (e) {
		e.preventDefault();

		openMenu();
	});

	closeMenuBtn.on('click', function (e) {
		e.preventDefault();

		closeMenu();
	});

	// close with escape key
	$(document).on('keyup', function (e) {
		if (e.keyCode == 27) {
			closeMenu();
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

// ANIMATION ON SCROLL
function initAos() {
	AOS.init({
		duration: 1000,
		once: true,
		easing: 'ease-in-out'
	});
}