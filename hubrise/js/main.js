'use strict';

(function ($) {
	initActiveHeaderAfterScroll();
	initParallax();
	initMenu();
	initStopAnimationsDuringWindowResizing();
	initAos();
	initForms();
	initSmoothAnchorLinks();
	initYouTubeThumbnail();
})(jQuery);

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
function initParallax() {
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
	if ($('.js-rellax').length) {
		var rellax = new Rellax('.js-rellax', {
			center: true
		});
	}
}

// HAMBURGER MENU
function initMenu() {
	var menu = $('.js-menu'),
		openMenuBtn = $('.js-open-menu'),
		closeMenuBtn = $('.js-close-menu');

	function openMenu() {
		menu.addClass('active');
	}

	function closeMenu() {
		menu.removeClass('active');
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

// FORMS
function initForms() {
	var select = $('.js-select');

	select.each(function () {
		$(this).select2({
			dropdownParent: $(this).closest('.js-select-container'),
			minimumResultsForSearch: -1,
			theme: "bootstrap"
		});
	});

	// clear cf7 after success submit
	var contactForm = $('.wpcf7-form');

	if (contactForm.length) {
		contactForm[0].addEventListener('wpcf7mailsent', function (event) {
			contactForm.trigger('reset');
		}, false);
	}
}

// SMOOTH ANCHOR LINKS
function initSmoothAnchorLinks() {
	var animationComplete = true;

	$('a[href^="#"]:not([href="#"]):not(.js-no-scroll)').on('click', function (e) {
		e.preventDefault();

		// height of header (for offset)
		var headerOffset = $('.js-header').outerHeight(),
			idOfElement = $(this).attr('href');

		if (headerOffset === undefined) {
			headerOffset = 0;
		}

		var top = $(idOfElement).offset().top - headerOffset;

		if (animationComplete) {
			animationComplete = false;

			$('body, html').animate({
				scrollTop: top
			}, 1000).promise().done(function () {
				animationComplete = true;
			});
		}
	});
}

// YOUTUBE THUMBNAIL
function initYouTubeThumbnail() {
	function getVideoId(videoItem) {
		var videoThumbnailUrl = videoItem.attr('data-video-url'),
			regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
			match = videoThumbnailUrl.match(regExp);

		return match && match[7].length == 11 ? match[7] : false;
	}

	function insertYouTubeIframe() {
		$('.js-youtube-thumbnail').on('click', function () {
			var youTubeIframe = $('<iframe class="youtube-thumbnail__media" allowfullscreen></iframe>');
			youTubeIframe.attr('allow', 'autoplay');
			youTubeIframe.attr('src', 'https://www.youtube.com/embed/' + getVideoId($(this)) + '?rel=0&showinfo=0&autoplay=1');

			$(this).find('.js-youtube-thumbnail-media').remove();
			$(this).append(youTubeIframe);
		});
	}

	insertYouTubeIframe();
}