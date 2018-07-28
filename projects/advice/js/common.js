(function ($) {

'use strict';

// hide preloader by click
$('.js-preloader').on('click', function() {
	$('.js-preloader').fadeOut('slow');
});

$(window).on('load', function(){

	// PRELOADER

	// hide preloader
	setTimeout(function() {
		$('.js-preloader').fadeOut('slow');
		$('.js-bg-grid').addClass('-show-grid');
	}, 1000);

	// ANIMATION OF ELEMENTS
	function textAnimation() {
		var waypoints = $('.animation-item').waypoint({
			handler: function() {
				$(this.element).removeClass("left-animation");
				$(this.element).removeClass("right-animation");
			},
			offset: '90%'
		})
	}

	// ANIMATION FOR BOTTOM ELEMENTS
	function textAnimationBottom() {
		var waypoints = $('.animation-item-bottom').waypoint({
			handler: function() {
				$(this.element).removeClass("left-animation");
				$(this.element).removeClass("right-animation");
			},
			offset: 'bottom-in-view'
		})
	}

	setTimeout(function() {
		$('.js-main-wrap, .js-header > .header-container').css('opacity', 1);

		textAnimation();
		textAnimationBottom();
	}, 2500);

});

$(document).ready(function() {

	// HIDE CONTENT FOR GRID ANIMATION
	$('.js-main-wrap, .js-header > .header-container').css('opacity', 0);

	// WIDTH OF SCROLLBAR
	var widthOfScrollbar;

	function getScrollBarWidth() {
		if (window.innerWidth > $(window).width()) {
			var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
					widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
			$outer.remove();
			widthOfScrollbar = 100 - widthWithScroll;
			return 100 - widthWithScroll;
		} else {
			return widthOfScrollbar = 0;
		}
	};

	getScrollBarWidth();

	$(window).on('resize', function() {
		getScrollBarWidth();
	});

	function addScrollBarCompensation(element) {
		element.css('padding-right', widthOfScrollbar);
	}

	function removeScrollBarCompensation(element) {
		element.css('padding-right', '0');
	}

	// WELCOME SLIDER
	$('.welcome-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		draggable: false,
		dots: true,
		speed: 1000,
	});

	// FORM NOT EMTY CHECK
	function formNotEmtyCheck() {
		$('.form-group input:not([type="submit"]) , .form-group textarea').on('blur', function() {
			if (!$(this).val()) {
				$(this).parent().removeClass('active');
			} else {
				$(this).parent().addClass('active');
			}
		});
	}

	formNotEmtyCheck();

	$('.products-slider').slick({
		slidesToShow: 6,
		slidesToScroll: 6,
		arrows: false,
		infinite: false,
		draggable: false,
		swipe: false,
		speed: 0,
		useCSS: false,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			}
		]
	});

	// SLICK ARROWS WITH ANIMATION
	$(".slider-animation-wrap .next-arrow").on('click', function() {
		var thisItem = $(this);
		if (!$(thisItem).parents('.slider-animation-wrap').find('.slick-slide:last-child').hasClass('slick-active')) {
			$(thisItem).parents('.slider-animation-wrap').find('.js-animation-slider-item').addClass("left-animation");
			setTimeout(function() {
				$(thisItem).parents('.slider-animation-wrap').find('.-slider-init').slick('slickNext');
			}, 800);

			setTimeout(function() {
				$(thisItem).parents('.slider-animation-wrap').find('.js-animation-slider-item').removeClass("left-animation");
			}, 850);
		}
	});

	$(".slider-animation-wrap .prev-arrow").on('click', function() {
		var thisItem = $(this);
		if (!$(thisItem).parents('.slider-animation-wrap').find('.slick-slide:first-child').hasClass('slick-active')) {
			$(thisItem).parents('.slider-animation-wrap').find('.js-animation-slider-item').addClass("left-animation");
			setTimeout(function() {
				$(thisItem).parents('.slider-animation-wrap').find('.-slider-init').slick('slickPrev');
			}, 800);
			setTimeout(function() {
				$(thisItem).parents('.slider-animation-wrap').find('.js-animation-slider-item').removeClass("left-animation");
			}, 850);
		}
	});

	// PRODUCTS MODAL PHOTO SLIDER
	$('.js-product-overview-main-photo').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		draggable: false,
		swipe: false,
		fade: true,
		useCSS: false,
		asNavFor: '.js-product-overview-nav'
	});

	$('.js-product-overview-nav').slick({
		slidesToShow: 7,
		slidesToScroll: 1,
		focusOnSelect: true,
		vertical: true,
		useCSS: false,
		asNavFor: '.js-product-overview-main-photo',
	});

	// slick refresh in modal
	$('.js-new-arrivals-modal').on('shown.bs.modal', function () {
		$('.js-product-overview-main-photo')[0].slick.refresh();
		$('.js-product-overview-nav')[0].slick.refresh();
		$(this).find('.product-overview').addClass('-show-modal');
	})

	$('.js-new-arrivals-modal').on('hidden.bs.modal', function () {
		$(this).find('.product-overview').removeClass('-show-modal');
	})

	// PRODUCT SINGLE PHOTO SLIDER
	$('.js-product-overview-single-main-photo').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		draggable: false,
		swipe: false,
		fade: true,
		useCSS: false,
		asNavFor: '.js-product-overview-single-nav'
	});

	$('.js-product-overview-single-nav').slick({
		slidesToShow: 7,
		slidesToScroll: 1,
		focusOnSelect: true,
		vertical: true,
		useCSS: false,
		asNavFor: '.js-product-overview-single-main-photo',
	});

	// SLICK CUSTOM ARROWS
	$(".slider-wrap .js-prev-custom-arrow").on('click' , function(){
		$(this).parents('.slider-wrap').find('.-slider-init').slick('slickPrev');
	});
	$(".slider-wrap .js-next-custom-arrow").on('click' , function(){
		$(this).parents('.slider-wrap').find('.-slider-init').slick('slickNext');
	});

	// IE AND EDGE CHANGE IMG TO BACKGROUND IMAGE FOR BETTER VIEW
	var userAgent, ieReg, ie;
	userAgent = window.navigator.userAgent;
	ieReg = /msie|Trident.*rv[ :]*11\./gi;
	ie = ieReg.test(userAgent);

	if (ie || navigator.userAgent.indexOf('Edge') >= 0) {
		$(".js-product-overview-main-photo .absolute-img").each(function () {
			var $container = $(this),
				imgUrl = $container.find("img").prop("src");
			if (imgUrl) {
				$container.css("backgroundImage", 'url(' + imgUrl + ')').addClass("custom-object-fit");
			}
		});
	}

	// RIGHT COMPENSATION FOR OPEN POP-UP
	$('.modal').on('show.bs.modal', function (e) {
		$('.header, .bg-grid').css("padding-right", widthOfScrollbar);
	})

	$('.modal').on('hidden.bs.modal', function (e) {
		$('.header, .bg-grid').css("padding-right", 0);
	})

	// RATING STARS INIT
	$('.js-stars-rating').barrating({
		theme: 'fontawesome-stars-o'
	});

	// QUANTITY OF PRODUCT
	$('.js-quantity-plus').on('click', function() {
		var currentValue = $(this).closest('.quantity-item').find('.quantity-item__input').val();
		currentValue = +currentValue + 1;
		$(this).closest('.quantity-item').find('.quantity-item__input').val(currentValue);
	});

	$('.js-quantity-minus').on('click', function() {
		var currentValue = $(this).closest('.quantity-item').find('.quantity-item__input').val();
		currentValue = +currentValue - 1;

		if (currentValue <= 0) {
			currentValue = 1;
		}

		$(this).closest('.quantity-item').find('.quantity-item__input').val(currentValue);
	});

	// SHOW PASSWORD TEXT
	$('.js-show-password-text').on('click', function() {
		if ($(this).closest('.form-group').children('.form-control').attr('type') === 'password') {
			$(this).closest('.form-group').children('.form-control').attr('type', 'text');

			// focus on input
			$(this).closest('.form-group').children('.form-control').focus();
		} else {
			$(this).closest('.form-group').children('.form-control').attr('type', 'password');

			// focus on input
			$(this).closest('.form-group').children('.form-control').focus();
		}
	});

	// CHANGE OPACITY OF OVERLAY FOR SEARCH
	$('#search-modal').on('show.bs.modal', function () {
		setTimeout(function() {
			$('.modal-backdrop').addClass('-opacity-95');
		}, 1);
	})

	$('#search-modal').on('hide.bs.modal', function () {
		$('.modal-backdrop').removeClass('.-opacity-95');
	})

	// SIDE CART

	// css time to milliseconds
	function cssTimeToMilliseconds(timeString) {
		var num = parseFloat(timeString, 10),
				unit = timeString.match(/m?s/),
				milliseconds;

		if (unit) {
			unit = unit[0];
		}

		switch (unit) {
			case "s": // seconds
				milliseconds = num * 1000;
				break;
			case "ms": // milliseconds
				milliseconds = num;
				break;
			default:
				milliseconds = 0;
				break;
		}

		return milliseconds;
	}

	function customOverlayСreate() {
		$('body').append('<div class="custom-overlay"></div>');

		addScrollBarCompensation($('body, .js-header, .js-bg-grid'));

		setTimeout(function(){
			$('.custom-overlay').addClass('-show');
		}, 1);

		closeSideCart();
		closeSideMenu();
	}

	function customOverlayRemove() {
		$('.custom-overlay').removeClass('-show');

		removeScrollBarCompensation($('body, .js-header, .js-bg-grid'));

		var transitionTime = $('.custom-overlay').css('transition-duration');

		setTimeout(function() {
			$('.custom-overlay').remove();
		}, cssTimeToMilliseconds(transitionTime));
	}

	// open
	$('.js-side-cart-btn').on('click', function() {
		$('body').addClass('-open-side-cart');
		customOverlayСreate();
	});

	// close
	function closeSideCart() {
		$('.js-side-cart-close, .custom-overlay').on('click', function() {
			$('body').removeClass('-open-side-cart');
			customOverlayRemove();
		});
	}

	// SIDE MENU
	var sideMenuCssWidth = +$('.js-side-menu').css('width').slice(0, -2);

	function sideMenuWidth() {
		if ($('.js-side-menu').length) {
			var windowWidth = $(window).width(),
					containerWidth = $('.js-bg-grid > .container').width(),
					menuLeftIndentation = (windowWidth - containerWidth) / 2;

			$('.js-side-menu').css({
				'width': sideMenuCssWidth + menuLeftIndentation,
				'padding-left': menuLeftIndentation
			});

			if (windowWidth < 576) {
				$('.js-side-menu').css({
					'width': '100%',
					'padding-left': '15px'
				});
			}
		}
	}

	sideMenuWidth();

	$(window).resize(function() {
		sideMenuWidth();
	});

	// open
	$('.js-side-menu-btn').on('click', function() {
		if (!$('body').hasClass('-open-side-menu')) {
			$('body').addClass('-open-side-menu');
			customOverlayСreate();

			// show curent tab
			var curentTab = $(this).text().toLowerCase();
			$('.js-header-nav-tabs a[href="#' + curentTab + '"]').tab('show');

			// add ctive class for menu list
			$('.js-side-menu .tab-pane.active .vertical-list:first').addClass('-animation-active');
		}
	});

	// close
	function closeSideMenu() {
		$('.js-side-menu-btn-close, .custom-overlay').on('click', function() {
			$('body').removeClass('-open-side-menu');
			customOverlayRemove();

			// remove active class for menu list
			$('.js-side-menu .tab-pane .vertical-list').removeClass('-animation-active');
		});
	}

	// change active class for menu list
	$('.js-side-menu a[data-toggle="tab"]').on('shown.bs.tab', function () {
		$('.js-side-menu .tab-pane .vertical-list').removeClass('-animation-active');
		$('.js-side-menu .tab-pane.active .vertical-list:first').addClass('-animation-active');
	});

	// SIDE MENU NAVIGATION
	var transferSrc;

	// FIRST TRANSFER (HOVER ON FIRST COLUMN LINK)
	$('.js-first-transfer .js-transfer-link:not(.-active)').on('mouseenter', function (){
		if(!$(this).hasClass('-active')) {
			$('.js-first-transfer .js-transfer-link').removeClass('-active');
			$('.js-second-transfer .js-transfer-link').removeClass('-active');
			$(this).addClass('-active');

			// left border
			$('.js-second-transfer').addClass('-border-left');
			$('.js-third-transfer').removeClass('-border-left');

			transferSrc = $(this).attr('data-transfer');

			$('.js-second-transfer .catalog-list, .js-third-transfer .catalog-list').removeClass('-animation-active');
			$('.js-second-transfer .catalog-list, .js-third-transfer .catalog-list').fadeOut(300);

			$('.js-second-transfer .catalog-list[data-category="' + transferSrc + '"]').fadeIn(300);

			setTimeout(function(){
				$('.js-second-transfer .catalog-list[data-category="' + transferSrc + '"]').addClass('-animation-active');
			}, 10);
		}
	});

	// SECOND TRANSFER (HOVER ON SECOND COLUMN LINK)
	$('.js-second-transfer .js-transfer-link:not(.-active)').on('mouseenter', function (){
		if(!$(this).hasClass('-active')) {
			$('.js-second-transfer .js-transfer-link').removeClass('-active');
			$(this).addClass('-active');

			// left border
			$('.js-third-transfer').addClass('-border-left');

			transferSrc = $(this).attr('data-transfer');

			$('.js-third-transfer .catalog-list').removeClass('-animation-active');
			$('.js-third-transfer .catalog-list').fadeOut(300);

			$('.js-third-transfer .catalog-list[data-category="' + transferSrc + '"]').fadeIn(300);

			setTimeout(function(){
				$('.js-third-transfer .catalog-list[data-category="' + transferSrc + '"]').addClass('-animation-active');
			}, 10);
		}
	});

	// WHEN HOVER OUT ON MENU
	$('.catalog-block').on('mouseleave', function (){
		$('.js-transfer-link').removeClass('-active');
		$('.catalog-list:not(:first)').fadeOut(300);
		$('.catalog-list:not(:first)').removeClass('-animation-active');

		// remove left border
		$('.js-second-transfer, .js-third-transfer').removeClass('-border-left');
	});

	// ADDITIONAL NAVBAR TOGGLE
	$('.js-hamburger').on('click', function(){
		$('.header__right-block.-toggle-on-mobile .navbar-additional').slideToggle(400);
	});

	// HAMBURGER BUTTON
	$('.js-hamburger').on('click', function() {
		$(this).toggleClass('-open');
	});

	// CENTERING MODALS IN IE
	if (navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1)) {
		$('.modal .modal-dialog').each(function(){
			$(this).removeClass('modal-dialog-centered');
		});

		var centerModal = function() {
			$(this).css('display', 'block');
			var $dialog  = $(this).find('.modal-dialog'),
					offset = ($(window).height() - $dialog.height()) / 2,
					bottomMargin = parseInt($dialog.css('marginBottom'), 10);

			// Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
			if(offset < bottomMargin) {
				offset = bottomMargin;
			}

			$dialog.css('margin-top', offset);
		}

		$(document).on('show.bs.modal', '.modal', centerModal);

		$(window).on('resize', function() {
			$('.modal:visible').each(centerModal);
		});
	}

	// TESTIMONIALS SLIDER
	$('.js-testimonials-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: false,
		infinite: false,
		draggable: false,
		swipe: false,
		speed: 0,
		useCSS: false,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: true
				}
			}
		]
	});

	// OUR PARTNERS SLIDER
	$('.js-our-partners-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		draggable: false,
		swipe: false,
		adaptiveHeight: true,
		speed: 200,
		useCSS: false,
		rows: 3,
		slidesPerRow: 3,

		responsive: [
			{
				breakpoint: 575,
				settings: {
					slidesPerRow: 2
				}
			}
		]
	});

	// RANGE SLIDER FOR FILTER BLOCK
	if ($('#slider').length) {
		var slider = document.getElementById('slider');

		noUiSlider.create(slider, {
			start: [ 20, 20000 ],
			step: 10,
			range: {
				'min': [ 0 ],
				'30%': [ 100 ],
				'max': [ 35000 ]
			},
			format: wNumb({
				decimals: 0,
				thousand: ' ',
				prefix: '$',
			})
		});

		var snapValues = [
			document.getElementById('slider-snap-value-lower'),
			document.getElementById('slider-snap-value-upper')
		];

		slider.noUiSlider.on('update', function( values, handle ) {
			snapValues[handle].setAttribute('value', values[handle]);
		});
	}

	// MAP ABSOLUTE LOCATION
	function mapLocation() {
		var windowWidth = $(window).width(),
				containerWidth = $('.js-bg-grid .container').width(),
				rightValue = (windowWidth - containerWidth) / 2;

		$('.map-wrap #map').css( "right", -rightValue);
	}

	if ($('.map-wrap #map').length) {
		mapLocation();

		$(window).resize(function() {
			mapLocation();
		});
	}

	// GOOGLE MAP =================================

	var map;

	function initMap() {

		// CUSTOM HTML MARKER =============================
		function CustomMarker(latlng, map, args) {
			this.latlng = latlng;
			this.args = args;
			this.setMap(map);
		}

		CustomMarker.prototype = new google.maps.OverlayView();

		CustomMarker.prototype.draw = function() {

			var self = this;

			var div = this.div;

			if (!div) {

				div = this.div = document.createElement('div');

				div.className = 'html-marker';

				div.style.position = 'absolute';
				div.style.cursor = 'pointer';
				div.style.width = '12px';
				div.style.height = '12px';
				div.style.background = '#303030';

				if (typeof(self.args.marker_id) !== 'undefined') {
					div.dataset.marker_id = self.args.marker_id;
				}

				google.maps.event.addDomListener(div, "click", function(event) {
					// marker click
					google.maps.event.trigger(self, "click");
				});

				var panes = this.getPanes();
				panes.overlayImage.appendChild(div);
			}

			var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

			if (point) {
				div.style.left = (point.x - 6) + 'px';
				div.style.top = (point.y - 12) + 'px';
			}
		};

		CustomMarker.prototype.remove = function() {
			if (this.div) {
				this.div.parentNode.removeChild(this.div);
				this.div = null;
			}
		};

		CustomMarker.prototype.getPosition = function() {
			return this.latlng;
		};
		// CUSTOM HTML MARKER =============================

		var mapMarkerPosition = new google.maps.LatLng(37.779287, -122.429109);

		map = new google.maps.Map(document.getElementById('map'), {
			center: mapMarkerPosition,
			zoom: 15,
			disableDefaultUI: true,
			zoomControl: false,
			zoomControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			styles: [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "saturation": "-100" }] }, { "featureType": "administrative.province", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": "50" }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": "-100" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "lightness": "30" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "lightness": "40" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "lightness": -25 }, { "saturation": -100 }] }]
		});

		// KEEP THE CENTER CENTERED ON WINDOW RESIZE
		var center = map.getCenter();

		google.maps.event.addDomListener(window, "resize", function() {
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});

		var overlay = new CustomMarker(
			mapMarkerPosition,
			map, {
				marker_id: '123'
			}
		);
	}

	if ($('#map').length) {
		initMap();
	}

	// ACCORDION ACTIVE CLASS
	$('#faqAccordion .collapse').on('show.bs.collapse', function() {
		$(this).parents('.accordion-item').addClass('open');
	});

	$('#faqAccordion .collapse').on('hide.bs.collapse', function() {
		$(this).parents('.accordion-item').removeClass('open');
	});

	// CHECKOUT STEPS
	if ($('#checkout-steps').length) {
		var form = $('#checkout-steps');

		form.validate({
			errorPlacement: function errorPlacement(error, element) { element.before(error); }
		});

		$.extend(jQuery.validator.messages, {
			required: 'Required field',
		});

		form.children('.checkout-steps').steps({
			headerTag: 'h4',
			bodyTag: 'section',
			transitionEffect: 'fade',
			transitionEffectSpeed: 300,

			labels: {
				cancel: "Back",
				pagination: "Pagination",
				finish: "Place order",
				next: "Continue",
				previous: "Back",
				loading: "Loading ..."
			},

			onStepChanging: function (event, currentIndex, newIndex)
			{
				form.validate().settings.ignore = ":disabled,:hidden";
				return form.valid();
			},
			onFinishing: function (event, currentIndex)
			{
				form.validate().settings.ignore = ":disabled";
				return form.valid();
			},
			onFinished: function (event, currentIndex)
			{
				// FINISH
			},

			onInit: function() {
				formNotEmtyCheck();
			}
		});
	}

	// add buttons class
	$('#checkout-steps .actions a[href="#previous"]').addClass('btn btn-md btn-outline-secondary');
	$('#checkout-steps .actions a[href="#next"], #checkout-steps .actions a[href="#finish"]').addClass('btn btn-secondary btn-md');

	$('#checkout-steps .actions li:nth-child(1)').addClass('animation-item left-animation');
	$('#checkout-steps .actions li:nth-child(2)').addClass('animation-item right-animation');

	// CUSTOM SELECT
	$('.js-selectpicker').select2({
		width: 'style', // width in css
		theme: 'custom', // theme class
		minimumResultsForSearch: Infinity, // hide search
		placeholder: 'Select an option'
	});

	// placeholder for custom select
	$('.js-selectpicker').each(function(){
		var placeholderText = $(this).attr('data-placeholder');
		$(this).siblings('.select2').find('.select2-selection__placeholder').text(placeholderText);
	});

	// transition animation for dropdown
	$('.js-selectpicker').on('select2:open', function (e) {
		$('.select2-dropdown').hide();

		setTimeout(function(){ $('.select2-dropdown').slideDown(200); }, 1);
	});

	// FOOTER BOTTOM
	function footerBottom() {
		var footerHeight = $('footer').outerHeight();
		$('.main-wrap').css( "padding-bottom", footerHeight);
	}

	footerBottom();

	$(window).resize(function() {
		footerBottom();
	});

	// SMOOTH TRANSITION BETWEEN PAGES
	$(document).on("click", ".js-page-redirect", function(e) {
		e.preventDefault();
		$("body").fadeOut(500);
		var self = this;

		setTimeout(function() {
			window.location.href = $(self).attr("href");
		}, 500);
	});

	// SMALL TOP LINE + BUTTON TOP ANIMATION
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 0) {
			$('.header-container').addClass('-filled');
		} else {
			$('.header-container').removeClass('-filled');
		}
	})

	if ($(this).scrollTop() > 0) {
		$('.header-container').addClass('-filled');
	}

});

}(jQuery));