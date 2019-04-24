(function($) {
	"use strict";

	$(document).ready(function() {
		// MAIN SLIDER
		$('.js-main-slider').slick({
			prevArrow: $('.js-main-slider-arrows .js-prev-arrow'),
			nextArrow: $('.js-main-slider-arrows .js-next-arrow'),
			adaptiveHeight: true
		});

		$('.js-main-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$('.js-main-slider-current-slide').html(nextSlide + 1);

			$('.js-main-slider-background-item').fadeOut(500);
			$('.js-main-slider-background-item[data-slide="' + nextSlide + '"]').fadeIn(500);
		});

		// CATEGORIES SLIDER
		$('.js-categories-slider').slick({
			slidesToShow: 5,
			slidesToScroll: 2,
			dots: true,
			prevArrow: $('.js-categories-slider-arrows .js-prev-arrow'),
			nextArrow: $('.js-categories-slider-arrows .js-next-arrow'),
			responsive: [
				{
					breakpoint: 1660,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 575,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});

		// BESTSELLERS SLIDER
		$('.js-bestsellers-slider').slick({
			slidesToShow: 5,
			slidesToScroll: 2,
			dots: true,
			prevArrow: $('.js-bestsellers-slider-arrows .js-prev-arrow'),
			nextArrow: $('.js-bestsellers-slider-arrows .js-next-arrow'),
			responsive: [
				{
					breakpoint: 1660,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 575,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});

		// MOBILE MENU
		function openMobileMenu() {
			$('.js-mobile-menu').addClass('-open');
			$('html').addClass('-overflow-hidden');
			$('.js-mobile-menu-overlay').fadeIn(500);
		}

		function closeMobileMenu() {
			$('.js-mobile-menu').removeClass('-open');
			$('html').removeClass('-overflow-hidden');
			$('.js-mobile-menu-overlay').fadeOut(500);
		}

		$('.js-open-mobile-menu').on('click', function() {
			openMobileMenu();
		});

		$('.js-close-mobile-menu').on('click', function() {
			closeMobileMenu();
		});
	});

})(jQuery);