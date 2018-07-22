(function ($) {

"use strict";

// SIDE MENY INIT
var meny = Meny.create({
	menuElement: document.querySelector( '.meny' ),
	contentsElement: document.querySelector( '.contents' ),
	position: Meny.getQuery().p || 'right',
	height: 200,
	width: 490,
	threshold: 40,
	angle: 19,
	gradient: 'rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)',
	mouse: false,
	touch: true
});

// PRELOADER CLICK - CLOSE
$('.preloader-wrap').on('click' , function() {
	$('.preloader-wrap').fadeOut(700);
});

$(window).on('load', function () {

	// MASONRY INIT =================================
	if ($('.grid').length) {
		var $masonry = $('.grid').masonry({
			horizontalOrder: true,
		});
	}

	// PRELOADER
	setTimeout(function() {
		$('.preloader-wrap').fadeOut(500);
	}, 2000);

});

$(document).ready(function() {

	// WIDTH OF SCROLLBAR
	var widthScroll;

	function getScrollBarWidth () {
		var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
			widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		$outer.remove();
		widthScroll = 100 - widthWithScroll;
		return 100 - widthWithScroll;
	};

	getScrollBarWidth();

	$(window).on('resize', function() {
		getScrollBarWidth();
	});

	// MENU BUTTON
	$('.menu_btn').on('click' , function() {
		if ($(this).hasClass('open')) {
			meny.close();
		}

		else {
			meny.open();
		}
	});

	// CLOSE MENU WHEN CLICK TO CONTENT
	$('.cube-menu-overlay').on('click' , function() {
		meny.close();
	});

	// WHEN MENU OPEN
	meny.addEventListener('open', function() {
		// remove hide class
		$('.meny').removeClass('meny--hidden');

		// menu button animation
		$('.menu_btn').addClass('open');

		// safari animation fix
		$('#cubeTransition').removeClass('meny-help');

		// no-scroll when menu opened
		$('body').addClass('no-scroll');

		// add bottom border to top line
		$('.js-header .bar').addClass('bottom-border');

		// scrollbar compensation on pages
		if (!$('body').hasClass('fullpage-page') && !$('body').hasClass('cube-page')) {
			$('body, .header-wrap').css("padding-right", widthScroll);
		}

		if (navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1)) {
			$('body, .header-wrap').css("padding-right", widthScroll);
		}

		// TRACKING OR HEIGHT OF TOP LINE
		var $heightOfTopLine = $('.js-header').outerHeight();

		$('.meny').css("top", $heightOfTopLine);
		$('.meny .meny__content').css({ 'height': 'calc(100% - ' + $heightOfTopLine + 'px)' });
	});

	// WHEN MENU CLOSE
	meny.addEventListener('close', function() {
		// menu button animation
		$('.menu_btn').removeClass('open');

		// safari animation fix
		$('#cubeTransition').addClass('meny-help');

		// no-scroll when menu opened
		$('body').removeClass('no-scroll');

		// remove bottom border
		$('.js-header .bar').removeClass('bottom-border');

		// scrollbar compensation on pages
		if (!$('body').hasClass('fullpage-page') && !$('body').hasClass('cube-page')) {
			$('body, .header-wrap').css("padding-right", "0");
		}

		if (navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1)) {
			$('body, .header-wrap').css("padding-right", '0');
		}
	});

	// FOR CUBE MENU HEIGHT
	if ($('body').hasClass('cube-page') && !(navigator.appName === 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1))) {
		$('body.cube-page .meny .meny__content').addClass('-h-100');
	}

	// REDIRECT FOR TABS
	var servicessTabHash = window.location.hash;
	$('.serviсes--cube__item--page[href="' + servicessTabHash + '"]').tab('show');

	// GALLERY SLIDER
	$('.gallery--cube__main-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		speed: 200,
		cssEase: 'linear',
		asNavFor: '.gallery--cube__nav',
		draggable: false,
		swipe: false,
		infinite: false,
	});

	$('.gallery--cube__nav').slick({
		slidesToShow: 10,
		slidesToScroll: 1,
		arrows: true,
		infinite: false,
		asNavFor: '.gallery--cube__main-slider',
		focusOnSelect: true,
		draggable: false,
		swipe: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 7
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 3,
				}
			}
		]
	});

	// PHOTO POP-UP
	$('.gallery--cube__main-slider').slickLightbox({
		itemSelector: '.full-screen-icon',
		navigateByKeyboard: true
	})
	.on({
		'show.slickLightbox': function() {
			$('body').addClass('no-scroll');

			// scrollbar compensation on pages
			if (!$('body').hasClass('fullpage-page') && !$('body').hasClass('cube-page')) {
				$('body, .header-wrap').css("padding-right", widthScroll);
			}

			if (navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1)) {
				$('body, .header-wrap').css("padding-right", widthScroll);
			}
		},
		'hide.slickLightbox': function() {
			$('body').removeClass('no-scroll');

			// scrollbar compensation on pages
			if (!$('body').hasClass('fullpage-page') && !$('body').hasClass('cube-page')) {
				$('body, .header-wrap').css("padding-right", "0");
			}

			if (navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1)) {
				$('body, .header-wrap').css("padding-right", '0');
			}
		},
	});

	// TESTIMONIALS GALLERY
	$('.testimonials--cube__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		speed: 500,
		cssEase: 'linear',
		asNavFor: '.testimonials--cube__nav',
		draggable: false,
		infinite: false,
		swipe: false,
	});

	$('.testimonials--cube__nav').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		vertical: true,
		arrows: true,
		autoplay: false,
		autoplaySpeed: 2000,
		infinite: false,
		asNavFor: '.testimonials--cube__slider',
		focusOnSelect: true,
		draggable: false,
		swipe: false,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 768,
				settings: {
					vertical: false,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 4,
					vertical: false,
				}
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 3,
					vertical: false,
				}
			},
		]
	});

	// FULLSCREEN GOOGLE MAP
	$('.map-wrap .full-screen-icon').on('click' , function() {
		$(".map-wrap").toggleClass("map-full-size");
		$(".bullets_menu").toggleClass("d-none");
		$("#menu_btn--js").toggleClass("d-none");
		$(".js-header").toggleClass("d-none");
		$(".btn-top").toggleClass("d-none");

		$('.page-helper').toggleClass("d-none");
		$('.color-set_wrap').toggleClass("d-none");

		$('body').toggleClass('no-scroll');

		google.maps.event.trigger(map, 'resize');
		map.setCenter({lat: 37.779287, lng: -122.429109});

		// disable scrolling on full page
		if ($('.fullpage-page .map-wrap').hasClass('map-full-size')) {
			$.fn.fullpage.setAllowScrolling(false);
		} else {
			if ($('body').hasClass('fullpage-page')) {
				$.fn.fullpage.setAllowScrolling(true);
			}
		}

	})

	// FORM NOT EMTY CHECK
	$('input:not([type="submit"]) , textarea').on('blur', function() {
		if( !$(this).val() ) {
			$(this).removeClass('active');
			$(this).closest('.form-item-wrap').removeClass('bar--show');
		} else {
			$(this).addClass('active');
			$(this).closest('.form-item-wrap').addClass('bar--show');
		}
	});

	// TEXTAREA TRIANGLE FILL COLOR
	$('.textarea-triangle > textarea').on('focus', function() {
		$('.textarea-triangle').addClass('triangle-fill');
	});

	$('.textarea-triangle > textarea').on('focusout', function() {
		$(".textarea-triangle").removeClass('triangle-fill');
	});

	// HISTORY SLIDER
	$('.about__history-slider-main').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		speed: 500,
		cssEase: 'linear',
		asNavFor: '.about__history-nav-year',
		draggable: false,
		swipe: false,
		infinite: true,
		adaptiveHeight: true
	});

	$('.about__history-nav-year').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		centerPadding: '30px',
		arrows: true,
		infinite: true,
		asNavFor: '.about__history-slider-main',
		focusOnSelect: true,
		draggable: false,
		swipe: false,
		vertical: true,
		centerMode: true,
		speed: 500,
		useTransform: true,
		cssEase: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
		responsive: [
			{
				breakpoint: 991,
				settings: {
					vertical: false,
					centerPadding: '0px',
					slidesToShow: 5,
				}
			},
			{
				breakpoint: 575,
				settings: {
					vertical: false,
					centerPadding: '0px',
					slidesToShow: 3,
				}
			},
		]
	});

	// TEAM SLIDER
	$('.about__team-main-slide').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		speed: 500,
		cssEase: 'linear',
		asNavFor: '.about__team-nav',
		draggable: false,
		swipe: false,
		infinite: false,
	});
	$('.about__team-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		autoplay: false,
		autoplaySpeed: 2000,
		infinite: false,
		asNavFor: '.about__team-main-slide',
		focusOnSelect: true,
		draggable: false,
		swipe: false,
		responsive: [
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 3,
				}
			},
		]
	});

	// PARTNERS SLIDER {
	$('.about__partners-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		speed: 1000,
		draggable: true,
		swipe: false,
		infinite: true,
		rows: 2,
		slidesPerRow: 2,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					swipe: true,
					rows: 4,
					slidesPerRow: 1,
				}
			},
		]
	});

	// SCROLL ON TOP
	$('.btn-top').on('click' , function() {
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
		return false;
	});

	// SCROLL ON TOP FOR TABS
	$('.advantages--page .page-tabs-nav a, .services--page .page-tabs-nav h3').on('click' , function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
	});

	// SMOOTH TRANSITION BETWEEN PAGES
	$(document).on("click", ".page-redirect", function(e) { 
		e.preventDefault();
		$("body").fadeOut(500);
		var self = this;
		setTimeout(function () {
			window.location.href = $(self).attr("href"); 
		}, 500);
	});

	// BACK BUTTON (GO TO PREVIOUS PAGE)
	$('a.link-back').on('click' , function() {
		parent.history.back();
		return false;
	});

	// ARROW LINK SCROLL
	function arrowScroll() {
		if ($('.js-header').hasClass('.-small')) {
			var topLineHeight = $('.js-header').outerHeight();

			$('html, body').animate({
				scrollTop: $("#about-us").offset().top - topLineHeight
			}, 1000);

		} else {
			var topLineHeight = $('.js-header').outerHeight(),
					topPaddingOfHeader = parseInt($('.js-header').css("padding-top")),
					bottomPaddingOfHeader = parseInt($('.js-header').css("padding-bottom"));

			$('html, body').animate({
				scrollTop: $("#about-us").offset().top - topLineHeight + topPaddingOfHeader + bottomPaddingOfHeader
			}, 1000);
		}
	}

	// ARROW LINK SCROLL (CUBE)
	$('.js-cube-mouse').on('click' , function(e) {
		if ($(window).width() <= 991) {
			arrowScroll();
			e.stopPropagation();
		}
	});

	// ARROW LINK SCROLL (FLAT)
	$('.js-mouse-flat').on('click' , function() {
		arrowScroll();
	});

	// ARROW LINK SCROLL (FULLPAGE)
	$('.js-mouse-fullpage').on('click' , function() {
		if ($(window).width() <= 991) {
			arrowScroll();
		}

		if ($(window).width() > 991 && $('#fullpage').length) {
			$.fn.fullpage.moveSectionDown();
		}
	});

	// FULLPAGE ANIMATION =================================
	if ($('#fullpage').length) {
		$('#fullpage').fullpage({
			scrollingSpeed: 1000,
			responsiveWidth: 992,
			responsiveHeight: 600,
			verticalCentered: false,
			navigation: true,
			navigationPosition: 'left',
			navigationTooltips: true,
			showActiveTooltip: true,
			sectionSelector: '.page',
			fixedElements: '.btn-top',

			// change active class
			onLeave: function(index, nextIndex, direction) {
				$('#fp-nav > ul > li').removeClass('active-item');
				$('#fp-nav > ul > li')[nextIndex - 1].classList.add('active-item');
			}
		});

		// DISABLE SCROLLING WHEN MENU IS OPENED
		meny.addEventListener( 'open', function() {
			$.fn.fullpage.setAllowScrolling(false);
		});

		meny.addEventListener( 'close', function() {
			$.fn.fullpage.setAllowScrolling(true);
		});

		// DISABLE SCROLLING WHEN PAGE NAVIGATION IS OPENED
		$('.-JS_helper_click').on('click' , function() {
			if ($(this).parents('.page-helper').hasClass('-open')) {
				$.fn.fullpage.setAllowScrolling(false);
			} else {
				$.fn.fullpage.setAllowScrolling(true);
			}
		});

		// STYLING BULLETS MENU
		$('#fp-nav > ul').addClass('bullets_menu');

		// build elements
		$('#fp-nav > ul > li').append($('<span class="page-title"></span>'));
		$('#fp-nav > ul > li').append($('<span class="hover-title"></span>'));

		// add active class
		$('#fp-nav > ul > li > a').each(function() {
			if ($(this).hasClass('active')) {
				$(this).closest('li').addClass('active-item');
			}
		});

		// add title text
		var i = 0;
		$('#fp-nav .fp-tooltip').each(function() {
			var sectionTitle = $(this).text();

			$('.page-title')[i].innerHTML = sectionTitle;
			$('.hover-title')[i].innerHTML = sectionTitle;

			i++;
		});

	}

	// SMALL HEADER AFTER SCROLL + BUTTON TOP ANIMATION =================================
	$(window).on('scroll', function() {
		if ( $(this).scrollTop() > 0 ) {
			$('.header').addClass('-small');

			$(".btn-top").addClass('-show');

		} else {
			$('.header').removeClass('-small');

			$(".btn-top").removeClass('-show');
		}
	})

	if ( $(this).scrollTop() > 0 ) {
		$('.header').addClass('-small');

		$(".btn-top").addClass('-show');
	}

	// GOOGLE MAP =================================
	var map;

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 40.717887, lng: -74.006999},
			zoom: 13,
			disableDefaultUI: true,
			fullscreenControl: true,
			zoomControl: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			styles: [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
		});

		var marker = new google.maps.Marker({
			position: {lat: 40.717887, lng: -74.006999},
			map: map,
			icon: 'img/logo_map.png',
			animation: google.maps.Animation.BOUNCE
		});

		// KEEP THE CENTER CENTERED ON WINDOW RESIZE
		var center = map.getCenter();

		google.maps.event.addDomListener(window, "resize", function() {
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});

		$('#map .full-screen-icon').on('click' , function() {
			google.maps.event.trigger(map, 'resize');
			map.setCenter(center);
			return false;
		});
	}

	if ($('#map').length) {
		initMap();
	}

	// SCRIPTS FOR IE ! =================================
	if (navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1)) {

		// FIX HISTORY NAV SLIDER
		setTimeout(function() {
			$('.about__history-nav-year').slick('slickNext');
		}, 100);

		// ARROW LINK SCROLL (CUBE)
		$('.js-cube-mouse').on('click' , function(e) {
			arrowScroll();
			e.stopPropagation();
		});

		// FIX SLICK SLIDER ON IE
		function slickReinit(slick) {
			$(slick).slick('slickNext');

			setTimeout(function() {
				$(slick).slick('slickPrev');
			} , 1000);
		}

		slickReinit('.gallery--cube__main-slider');
		slickReinit('.testimonials--cube__slider');
		slickReinit('.about__team-main-slide');
		slickReinit('.about__partners-slider');

	}

});

}(jQuery));