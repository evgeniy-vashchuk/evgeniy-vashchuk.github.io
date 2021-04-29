'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function ($) {
	initPreloader();
	initObjectFitImagesPolyfill();
	initHamburgerMenu();
	initActiveHeaderAfterScroll();
	initViewportUnitsOnMobile();
	initBackgroundVideo();
	initSliders();
	initSmoothAnchorLinks();
	initMap();
	initStickyFooter();
	$(window).on('resize', function () {
		initStickyFooter();
	}); // PRELOADER

	function initPreloader() {
		var preloader = $('.js-preloader'),
				hideTimeout = 3000;

		function hidePreloader(preloader) {
			preloader.fadeOut('slow');
			$('body').addClass('-preloader-init');
		} // hide preloader by click


		preloader.on('click', function () {
			hidePreloader($(this));
			animationOnScroll();
		});
		$(window).on('load', function () {
			// hide preloader
			setTimeout(function () {
				hidePreloader(preloader);
				animationOnScroll();
			}, hideTimeout);
		});
	} // OBJECT FIT IMAGES POLYFILL


	function initObjectFitImagesPolyfill() {
		var $ofi = $('img.js-ofi:not(.js-lazy)');
		objectFitImages($ofi);
	} // HAMBURGER MENU


	function initHamburgerMenu() {
		var hamburger = $('.js-hamburger-menu'),
				menu = $('.js-header-menu-block'),
				body = $('body');
		hamburger.on('click', function (e) {
			e.preventDefault();

			if ($(this).hasClass('-active')) {
				$(this).removeClass('-active');
				menu.removeClass('-active');
				body.removeClass('-overflow-hidden');
			} else {
				$(this).addClass('-active');
				menu.addClass('-active');
				body.addClass('-overflow-hidden');
			}
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
	} // BACKGROUND VIDEO


	function initBackgroundVideo() {
		if ($('.js-html-bg-video').length) {
			$('.js-html-bg-video').bgVideo({
				showPausePlay: false,
				pauseAfter: 0
			});
		}
	} // SLIDERS


	function initSliders() {
		if ($('.js-blog-slider').length) {
			$('.js-blog-slider').slick({
				adaptiveHeight: true,
				dots: true,
				arrows: false,
				draggable: true,
				swipe: true,
				touchMove: true,
				speed: 800,
				autoplay: true,
				autoplaySpeed: 3000,
				mobileFirst: true,
				responsive: [{
					breakpoint: 575,
					settings: {
						arrows: true,
						draggable: false,
						swipe: false,
						touchMove: false
					}
				}]
			});
		}

		if ($('.js-posts-list-slider').length) {
			var _$$slick;

			$('.js-posts-list-slider').slick((_$$slick = {
				adaptiveHeight: true,
				dots: false,
				arrows: false,
				draggable: true,
				swipe: true,
				touchMove: true,
				mobileFirst: true,
				rows: 2,
				slidesPerRow: 1
			}, _defineProperty(_$$slick, "mobileFirst", true), _defineProperty(_$$slick, "responsive", [{
				breakpoint: 575,
				settings: {
					draggable: false,
					swipe: false,
					touchMove: false
				}
			}]), _$$slick));
		}

		$('.js-prev-slide').on('click', function (e) {
			e.preventDefault();
			$(this).closest('.js-slick-slider-wrap-for-btns').find('.slick-slider').slick('slickPrev');
		});
		$('.js-next-slide').on('click', function (e) {
			e.preventDefault();
			$(this).closest('.js-slick-slider-wrap-for-btns').find('.slick-slider').slick('slickNext');
		});
	} // ANIMATION ON SCROLL


	function animationOnScroll() {
		var item = $('.js-animation-item');

		if (item.length) {
			item.waypoint({
				handler: function handler() {
					if (!this.element.animationInit && $('body').hasClass('-preloader-init')) {
						this.element.animationInit = true;
						$(this.element).addClass('-active');
					}
				},
				offset: '90%'
			});
		}
	} // SMOOTH ANCHOR LINKS


	function initSmoothAnchorLinks() {
		var animationComplete = true; // scroll on click

		$('a[href^="#"]:not([href="#"]):not(.js-no-scroll)').on('click', function (e) {
			e.preventDefault();
			var idOfElement = $(this).attr('href'),
					top = $(idOfElement).offset().top;

			if (animationComplete) {
				animationComplete = false;
				$('body, html').animate({
					scrollTop: top
				}, 1000).promise().done(function () {
					animationComplete = true;
				});
			}
		});
	} // STANDARD GOOGLE MAP


	function initMap() {
		var mapBlock = $('.js-google-map');
		if (!mapBlock.length) return;
		var coordinateX = mapBlock.attr('data-coordinate-x'),
				coordinateY = mapBlock.attr('data-coordinate-y'),
				coordinates = new google.maps.LatLng(coordinateX, coordinateY);
		var mapMarker = $('.js-map-marker');
		var map = new google.maps.Map(mapBlock.get(0), {
			center: coordinates,
			zoom: 16,
			disableDefaultUI: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			}
		}); // OPTIONAL - custom icon

		if (mapMarker.length) {
			var mapMarkerUrl = mapMarker.attr('src'),
					mapMarkerWidth = mapMarker.width(),
					mapMarkerHeight = mapMarker.height();
			var icon = {
				url: mapMarkerUrl,
				scaledSize: new google.maps.Size(mapMarkerWidth, mapMarkerHeight)
			};
		} else {
			var icon = null;
		}

		new google.maps.Marker({
			position: coordinates,
			map: map,
			icon: icon,
			animation: google.maps.Animation.BOUNCE
		});
	} // STICKY FOOTER


	function initStickyFooter() {
		// 1) height of footer
		var footerHeight = $('.js-footer').outerHeight(); // 2) compensation

		$('.js-wrap-for-sticky').css('padding-bottom', footerHeight);
	}
})(jQuery);