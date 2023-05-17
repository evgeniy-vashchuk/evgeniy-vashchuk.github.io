'use strict';

$(function () {
	initScrollBarWidth();
	header.init();
	initSliders();
	initCookiesBanner();

	$(window).on('resize', function () {
		initScrollBarWidth();
	});
});

// WIDTH OF SCROLLBAR
var initScrollBarWidth = function initScrollBarWidth() {
	if (window.innerWidth > $(window).width()) {
		var $outer = $('<div class="custom-scrollbar">').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body'),
			widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
		$outer.remove();
		window.widthOfScrollbar = 100 - widthWithScroll;
		return 100 - widthWithScroll;
	} else {
		return window.widthOfScrollbar = 0;
	}
};

var header = {
	config: {
		headerMenuBtn: '.js-header-menu-btn',
		headerMenu: '.js-header-menu',

		searchInput: '.js-search-input',
		searchInputClearBtn: '.js-search-input-clear-btn',
		searchResult: '.js-search-result',
		searchBtn: '.js-search-btn',
		searchBlock: '.js-search-block',

		headerBackdrop: '.js-header-backdrop'
	},

	status: {
		menuOrSearchIsOpened: false
	},

	blockScroll: function blockScroll() {
		$('body').addClass('overflow-hidden');
		$('body, .js-compensation-of-scrollbar').css('padding-right', window.widthOfScrollbar);
	},

	unblockScroll: function unblockScroll() {
		$('body').removeClass('overflow-hidden');
		$('body, .js-compensation-of-scrollbar').css('padding-right', 0);
	},

	openMenu: function openMenu() {
		this.blockScroll();

		$(this.config.headerMenuBtn).addClass('active');
		$(this.config.headerMenu).addClass('active');
		$(this.config.headerBackdrop).addClass('active');
	},

	closeMenu: function closeMenu() {
		this.unblockScroll();

		$(this.config.headerMenuBtn).removeClass('active');
		$(this.config.headerMenu).removeClass('active');
		$(this.config.headerBackdrop).removeClass('active');
	},

	openSearch: function openSearch() {
		this.blockScroll();

		$(this.config.searchResult).addClass('active');
		$(this.config.headerBackdrop).addClass('active');
	},

	closeSearch: function closeSearch() {
		this.unblockScroll();
		this.hideSearchClearBtn();

		$(this.config.searchInput).val('');
		$(this.config.searchResult).removeClass('active');
		$(this.config.headerBackdrop).removeClass('active');
	},

	openSearchBlock: function openSearchBlock() {
		this.blockScroll();

		$(this.config.searchBlock).addClass('active');
		$(this.config.headerBackdrop).addClass('active');
	},

	closeSearchBlock: function closeSearchBlock() {
		$(this.config.searchBlock).removeClass('active');
	},

	showSearchClearBtn: function showSearchClearBtn() {
		$(this.config.searchInputClearBtn).addClass('active');
	},

	hideSearchClearBtn: function hideSearchClearBtn() {
		$(this.config.searchInputClearBtn).removeClass('active');
	},

	init: function init() {
		var $this = this;

		$(this.config.headerMenuBtn).on('click', function (e) {
			e.preventDefault();

			if (!$(this).hasClass('active')) {
				$this.closeSearch();
				$this.openMenu();
			} else {
				$this.closeMenu();
			}
		});

		$(this.config.searchInput).on('input', function () {
			if ($(this).val().length) {
				$this.closeMenu();
				$this.showSearchClearBtn();
				$this.openSearch();
			} else {
				$this.closeSearch();
			}
		});

		$(this.config.searchBtn).on('click', function (e) {
			e.preventDefault();

			$this.closeMenu();
			$this.openSearchBlock();
		});

		$(this.config.searchInputClearBtn).on('click', function () {
			$this.closeSearch();
			$this.closeSearchBlock();
		});

		$(this.config.headerBackdrop).on('click', function () {
			$this.closeMenu();
			$this.closeSearch();
			$this.closeSearchBlock();
		});

		$('[data-bs-toggle="dropdown"]').on('show.bs.dropdown', function () {
			$this.closeMenu();
			$this.closeSearch();
			$this.closeSearchBlock();
		});
	}
};

// SLIDERS
var initSliders = function initSliders() {
	// slider header text
	var sliderHeaderText = $('.js-slider-header-text');

	if (sliderHeaderText.length) {
		var breakpointMobile = 992,
			isChanging = false,
			isFiltered = false;

		sliderHeaderText.on('init breakpoint', function (event, slick) {
			if (!isChanging) {
				isChanging = true;

				if (slick.activeBreakpoint && slick.activeBreakpoint <= breakpointMobile) {
					if (!isFiltered) {
						slick.slickFilter(':not(.d-lg-none)');
						isFiltered = true;
					}
				} else {
					if (isFiltered) {
						slick.slickUnfilter();
						isFiltered = false;
					}
				}

				isChanging = false;
			}
		});

		sliderHeaderText.slick({
			vertical: true,
			verticalSwiping: true,
			arrows: false,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 4000,
			pauseOnFocus: false,
			pauseOnHover: false,
			draggable: false,
			swipe: false,
			touchMove: false,
			adaptiveHeight: true,
			mobileFirst: true,
			responsive: [
			{ breakpoint: breakpointMobile - 1 }]

		});
	}

	// slider brands
	var sliderBrands = $('.js-slider-brands');

	if (sliderBrands.length) {
		sliderBrands.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 1,
			speed: 6000,
			arrows: false,
			cssEase: 'linear',
			waitForAnimate: false,
			pauseOnFocus: false,
			pauseOnHover: false,
			draggable: false,
			swipe: false,
			touchMove: false,
			mobileFirst: true,
			responsive: [
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 5
				}
			}]

		});
	}

	// slider products
	var sliderProducts = $('.js-slider-products');

	var initArrowCircleProgress = function initArrowCircleProgress(element) {
		element.circleProgress({
			value: 0,
			size: 40,
			startAngle: -Math.PI / 2,
			thickness: 1,
			fill: "#19191F",
			emptyFill: '#C2C2C5'
		});
	};

	var startArrowCircleProgress = function startArrowCircleProgress(element, duration) {
		element.circleProgress({ value: 1, animation: { duration: duration } });
	};

	if (sliderProducts.length) {
		sliderProducts.on('init', function (event, slick) {
			if (slick.options.arrows && slick.options.autoplay) {
				var prevArrow = slick.$prevArrow,
					nextArrow = slick.$nextArrow;

				prevArrow.addClass('with-autoplay');
				nextArrow.addClass('with-autoplay');

				initArrowCircleProgress(prevArrow);
				startArrowCircleProgress(prevArrow, 0);

				initArrowCircleProgress(nextArrow);
				startArrowCircleProgress(nextArrow, slick.options.autoplaySpeed);
			}
		});

		sliderProducts.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			draggable: false,
			swipe: true,
			touchMove: false,
			mobileFirst: true,
			pauseOnFocus: false,
			pauseOnHover: false,
			autoplay: true,
			autoplaySpeed: 5000,
			responsive: [
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 3,
					arrows: false
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 3,
					arrows: true
				}
			},
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 4,
					arrows: true
				}
			}]

		});

		sliderProducts.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			if (slick.options.arrows && slick.options.autoplay) {
				var prevArrow = slick.$prevArrow,
					nextArrow = slick.$nextArrow,
					direction = 'right';

				if (Math.abs(nextSlide - currentSlide) == 1) {
					direction = nextSlide - currentSlide > 0 ? 'right' : 'left';
				} else {
					direction = nextSlide - currentSlide > 0 ? 'left' : 'right';
				}

				prevArrow.addClass('with-autoplay');
				nextArrow.addClass('with-autoplay');

				initArrowCircleProgress(prevArrow);
				initArrowCircleProgress(nextArrow);

				if (direction === 'right') {
					startArrowCircleProgress(prevArrow, 0);
					startArrowCircleProgress(nextArrow, slick.options.autoplaySpeed + 500);
				} else if (direction === 'left') {
					startArrowCircleProgress(prevArrow, slick.options.autoplaySpeed + 500);
					startArrowCircleProgress(nextArrow, 0);
				}
			}
		});
	}

	// slider offers
	var sliderOffers = $('.js-slider-offers'),
		sliderOffersCurrentNumber = $('.js-slider-offers-current-number'),
		sliderOffersTotalNumber = $('.js-slider-offers-total-number'),
		sliderOffersProgressBar = $('.js-slider-offers-progress-bar');

	if (sliderOffers.length) {
		sliderOffers.on('init', function (event, slick) {
			sliderOffersTotalNumber.text(('0' + slick.slideCount).slice(-2));
			sliderOffersProgressBar.addClass('active');
			sliderOffers.addClass('active');
		});

		sliderOffers.slick({
			infinite: true,
			fade: true,
			arrows: false,
			draggable: false,
			swipe: false,
			touchMove: false,
			mobileFirst: true,
			pauseOnFocus: false,
			pauseOnHover: false,
			autoplay: true,
			autoplaySpeed: 5000
		});

		sliderOffers.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			var nextSlideNumber = nextSlide + 1;

			sliderOffersCurrentNumber.text(('0' + nextSlideNumber).slice(-2));
			sliderOffersProgressBar.removeClass('active');
			sliderOffers.removeClass('active');
		});

		sliderOffers.on('afterChange', function (event, slick, currentSlide, nextSlide) {
			setTimeout(function () {
				sliderOffersProgressBar.addClass('active');
				sliderOffers.addClass('active');
			}, 10);
		});
	}

	// slider instagram
	var sliderInstagram = $('.js-slider-instagram'),
		token = sliderInstagram.attr('data-token');

	if (sliderInstagram.length) {
		var feed = new Instafeed({
			accessToken: token,
			limit: 10,
			target: 'sliderInstagram',
			template: '<div><a href="{{link}}" target="_blank" class="slider-instagram__photo"><img title="{{caption}}" src="{{image}}" class="of-cover" /></a></div>',

			after: function after() {
				sliderInstagram.on('init', function (event, slick) {
					if (slick.options.arrows && slick.options.autoplay) {
						var prevArrow = slick.$prevArrow,
							nextArrow = slick.$nextArrow;

						prevArrow.addClass('with-autoplay');
						nextArrow.addClass('with-autoplay');

						initArrowCircleProgress(prevArrow);
						startArrowCircleProgress(prevArrow, 0);

						initArrowCircleProgress(nextArrow);
						startArrowCircleProgress(nextArrow, slick.options.autoplaySpeed);
					}
				});

				sliderInstagram.slick({
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
					draggable: false,
					swipe: true,
					touchMove: false,
					mobileFirst: true,
					pauseOnFocus: false,
					pauseOnHover: false,
					autoplay: true,
					autoplaySpeed: 5000,
					responsive: [
					{
						breakpoint: 575,
						settings: {
							slidesToShow: 3,
							arrows: false
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 3,
							arrows: true
						}
					},
					{
						breakpoint: 1199,
						settings: {
							slidesToShow: 4,
							arrows: true
						}
					}]

				});

				sliderInstagram.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
					if (slick.options.arrows && slick.options.autoplay) {
						var prevArrow = slick.$prevArrow,
							nextArrow = slick.$nextArrow,
							direction = 'right';

						if (Math.abs(nextSlide - currentSlide) == 1) {
							direction = nextSlide - currentSlide > 0 ? 'right' : 'left';
						} else {
							direction = nextSlide - currentSlide > 0 ? 'left' : 'right';
						}

						prevArrow.addClass('with-autoplay');
						nextArrow.addClass('with-autoplay');

						initArrowCircleProgress(prevArrow);
						initArrowCircleProgress(nextArrow);

						if (direction === 'right') {
							startArrowCircleProgress(prevArrow, 0);
							startArrowCircleProgress(nextArrow, slick.options.autoplaySpeed + 500);
						} else if (direction === 'left') {
							startArrowCircleProgress(prevArrow, slick.options.autoplaySpeed + 500);
							startArrowCircleProgress(nextArrow, 0);
						}
					}
				});
			}
		});

		feed.run();
	}
};

// COOKIES BANNER
var initCookiesBanner = function initCookiesBanner() {
	var cookiesBanner = $('.js-cookies-banner'),
		rejectCookiesBtn = $('.js-reject-cookies'),
		acceptCookiesBtn = $('.js-accept-cookies');

	if (!cookiesBanner.length) return;

	var cookiesAreRejected = Cookies.get('cookiesAreRejected'),
		cookiesAreAccepted = Cookies.get('cookiesAreAccepted');

	if (cookiesAreRejected === undefined && cookiesAreAccepted === undefined) {
		cookiesBanner.removeClass('d-none');
	}

	rejectCookiesBtn.on('click', function (e) {
		e.preventDefault();

		Cookies.set('cookiesAreRejected', 'true', { expires: 7 });
		cookiesBanner.addClass('d-none');
	});

	acceptCookiesBtn.on('click', function (e) {
		e.preventDefault();

		Cookies.set('cookiesAreAccepted', 'true', { expires: 7 });
		cookiesBanner.addClass('d-none');
	});
};