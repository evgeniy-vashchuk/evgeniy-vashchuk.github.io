'use strict';

$(function () {
	initViewportHeight();
	initScrollBarWidth();
	header.init();
	initSliders();
	initModal();
	initCookiesBanner();
	initRangeSlider();
	initMobileFilters();
	initMap();
	initAutoResizeTextarea();
	initSticky();
	initHideFixedPrice();
	initFancyBox();

	$(window).on('resize', function () {
		initScrollBarWidth();
	});
});

// VIEWPORT HEIGHT
var initViewportHeight = function initViewportHeight() {
	var appHeight = function appHeight() {
		var doc = document.documentElement;

		doc.style.setProperty('--app-height', "".concat(window.innerHeight, "px"));
	};

	window.addEventListener('resize', appHeight);
	appHeight();
};

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
	var sliderInstagram = $('.js-slider-instagram');

	if (sliderInstagram.length) {
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

	// slider product image
	var sliderProductImage = $('.js-slider-product-image'),
		sliderProductImageNav = $('.js-slider-product-image-nav');

	if (sliderProductImage.length && sliderProductImageNav.length) {
		sliderProductImage.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			draggable: false,
			swipe: false,
			touchMove: false,
			asNavFor: '.js-slider-product-image-nav'
		});

		sliderProductImageNav.on('init', function (event, slick, direction) {
			slick.$slider.addClass('slide-count-' + slick.slideCount);
		});

		sliderProductImageNav.slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			asNavFor: '.js-slider-product-image',
			centerMode: true,
			centerPadding: '16.666666%',
			focusOnSelect: true,
			arrows: false,
			mobileFirst: true,
			responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					centerPadding: '12.5%'
				}
			}]

		});
	}
};

// MODAL
var initModal = function initModal() {
	$('.js-modal-notification').on('show.bs.modal', function (e) {
		$('body').addClass('modal-notification-open');
	});

	$('.js-modal-notification').on('hidden.bs.modal', function (e) {
		$('body').removeClass('modal-notification-open');
	});

	// $('#modalContactFormSuccess').modal('show');
};

// COOKIES BANNER
var initCookiesBanner = function initCookiesBanner() {
	var cookiesModal = $('#modalCookiesBanner'),
		rejectCookiesBtn = $('.js-reject-cookies'),
		acceptCookiesBtn = $('.js-accept-cookies');

	if (!cookiesModal.length) return;

	var cookiesAreRejected = Cookies.get('cookiesAreRejected'),
		cookiesAreAccepted = Cookies.get('cookiesAreAccepted');

	if (cookiesAreRejected === undefined && cookiesAreAccepted === undefined) {
		cookiesModal.modal('show');
	}

	rejectCookiesBtn.on('click', function (e) {
		e.preventDefault();

		Cookies.set('cookiesAreRejected', 'true', { expires: 7 });
	});

	acceptCookiesBtn.on('click', function (e) {
		e.preventDefault();

		Cookies.set('cookiesAreAccepted', 'true', { expires: 7 });
	});
};

// RANGE SLIDER
var initRangeSlider = function initRangeSlider() {
	var $range = $('.js-range-slider'),
		$inputFrom = $('.js-input-from'),
		$inputTo = $('.js-input-to'),
		instance,
		min = 0,
		max = 1000,
		from = 0,
		to = 0;

	$range.ionRangeSlider({
		type: 'double',
		min: min,
		max: max,
		from: 200,
		to: 800,
		hide_min_max: true,
		hide_from_to: true,
		onStart: updateInputs,
		onChange: updateInputs
	});

	instance = $range.data('ionRangeSlider');

	function updateInputs(data) {
		from = data.from;
		to = data.to;

		$inputFrom.prop('value', from);
		$inputTo.prop('value', to);
	}

	$inputFrom.on('input', function () {
		var val = $(this).prop('value');

		// validate
		if (val < min) {
			val = min;
		} else if (val > to) {
			val = to;
		}

		instance.update({
			from: val
		});
	});

	$inputTo.on('input', function () {
		var val = $(this).prop('value');

		// validate
		if (val < from) {
			val = from;
		} else if (val > max) {
			val = max;
		}

		instance.update({
			to: val
		});
	});
};

// MOBILE FILTERS
var initMobileFilters = function initMobileFilters() {
	var filtersMobileBlock = $('.js-filters-mobile-block'),
		openBtn = $('.js-open-filters-on-mobile'),
		closeBtn = $('.js-close-filters-on-mobile');

	var openFilters = function openFilters() {
		$('body').addClass('overflow-hidden');
		filtersMobileBlock.addClass('active');
	};

	var closeFilters = function closeFilters() {
		$('body').removeClass('overflow-hidden');
		filtersMobileBlock.removeClass('active');
	};

	filtersMobileBlock.on('click', function (e) {
		if ($(e.target).is($(this))) {
			closeFilters();
		}
	});

	openBtn.on('click', function () {
		openFilters();
	});

	closeBtn.on('click', function () {
		closeFilters();
	});
};

// STANDARD GOOGLE MAP
var initMap = function initMap() {
	var mapBlock = $('.js-map');

	if (!mapBlock.length) return;

	var coordinateX = mapBlock.attr('data-coordinate-x'),
		coordinateY = mapBlock.attr('data-coordinate-y'),
		coordinates = new google.maps.LatLng(coordinateX, coordinateY);

	var map = new google.maps.Map(mapBlock.get(0), {
		center: coordinates,
		zoom: 17,
		disableDefaultUI: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
	});

	var icon = {
		url: '../img/map-marker.svg',
		scaledSize: new google.maps.Size(20, 20)
	};

	var marker = new google.maps.Marker({
		position: coordinates,
		map: map,
		icon: icon
	});
};

// AUTO RESIZE TEXTAREA
var initAutoResizeTextarea = function initAutoResizeTextarea() {
	$('textarea[data-autoresize]').each(function () {
		var offset = this.offsetHeight - this.clientHeight;

		var resizeTextarea = function resizeTextarea(el) {
			$(el).css('height', 'auto').css('height', el.scrollHeight + offset);
		};

		$(this).on('keyup input', function () {resizeTextarea(this);}).removeAttr('data-autoresize');
	});
};

// STICKY
var initSticky = function initSticky() {
	var stickyToHeaderElement = $('.js-sticky-to-header-element'),
		header = $('.js-header'),
		headerHeight = header.outerHeight() - 1;

	if (stickyToHeaderElement.length && header.length) {
		stickyToHeaderElement.hcSticky({
			top: headerHeight,
			followScroll: false,

			onResize: function onResize() {
				stickyToHeaderElement.hcSticky('update', {
					top: headerHeight
				});
			}
		});

		var hideTimerId;

		$('.accordion').on('hide.bs.collapse', function () {
			hideTimerId = setInterval(function () {
				stickyToHeaderElement.hcSticky('refresh');
			}, 10);
		});

		$('.accordion').on('hidden.bs.collapse', function () {
			clearInterval(hideTimerId);
		});

		var showTimerId;

		$('.accordion').on('show.bs.collapse', function () {
			showTimerId = setInterval(function () {
				stickyToHeaderElement.hcSticky('refresh');
			}, 10);
		});

		$('.accordion').on('shown.bs.collapse', function () {
			clearInterval(showTimerId);
		});
	}
};

// HIDE FIXED PRICE
var initHideFixedPrice = function initHideFixedPrice() {
	var sectionProduct = $('.js-section-product'),
		priceBlock = $('.js-price-block');

	if (sectionProduct.length && priceBlock.length) {
		$(window).on('scroll', function () {
			var scrollLength = $(document).scrollTop(),
				sectionProductDistanceFromTop = sectionProduct.offset().top,
				sectionProductHeight = sectionProduct.outerHeight(),
				priceBlockHeight = priceBlock.outerHeight();

			if (scrollLength + $(window).height() > sectionProductDistanceFromTop + sectionProductHeight + priceBlockHeight) {
				priceBlock.addClass('hide');
			} else {
				priceBlock.removeClass('hide');
			}
		});
	}
};

// FANCYBOX
var initFancyBox = function initFancyBox() {
	$('.js-fancybox').fancybox({
		keyboard: false,
		infobar: false,
		toolbar: true,
		buttons: ["close"],
		idleTime: false,
		zoomOpacity: false,
		thumbs: {
			autoStart: true,
			parentEl: '.fancybox-stage',
			axis: 'x'
		},
		animationEffect: false,
		transitionEffect: 'slide',
		hash: false,
		wheel: false,
		loop: true,
		clickContent: false,
		clickSlide: false,
		btnTpl: {
			arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
			'<span class="icomoon-arrow-left-bold"></span>' +
			"</button>",
			arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
			'<span class="icomoon-arrow-right-bold"></span>' +
			"</button>",
			close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
			'<span class="icomoon-close-bold"></span>' +
			"</button>"
		},
		baseTpl:
		'<div class="fancybox-container" role="dialog" tabindex="-1">' +
		'<div class="fancybox-bg"></div>' +
		'<div class="fancybox-inner">' +
		'<div class="fancybox-inner-wrap">' +
		'<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
		'<div class="fancybox-toolbar">{{buttons}}</div>' +
		'<div class="fancybox-navigation">{{arrows}}</div>' +
		'<div class="fancybox-stage"></div>' +
		'<div class="fancybox-caption"><div class=""fancybox-caption__body"></div></div>' +
		'</div>' +
		'</div>' +
		'</div>'
	});
};