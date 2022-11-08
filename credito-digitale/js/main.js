'use strict';

$(function () {
	var sliderCalculateTheTaxCreditTns = null;

	initActiveHeaderAfterScroll();
	initViewportUnitsOnMobile();
	initHamburgerMenu();
	initStopAnimationsDuringWindowResizing();
	initAos();
	initAccordionScroll();
	initMapMultipleMarkers();
	initInputOnlyNumbers();
	initCustomSelect();
	initSliders();
	initFormValidate();
	initSetYear();

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

	// VIEWPORT UNITS ON MOBILE
	function initViewportUnitsOnMobile() {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + 'px');

		$(window).on('resize', function () {
			vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', vh + 'px');
		});
	}

	// HAMBURGER MENU
	function initHamburgerMenu() {
		var hamburger = $('.js-hamburger-menu'),
			menu = $('.js-header-menu');

		hamburger.on('click', function (e) {
			e.preventDefault();

			function openMenu() {
				hamburger.addClass('active');
				menu.addClass('active');
				$('body').addClass('overflow-hidden');
			}

			function closeMenu() {
				hamburger.removeClass('active');
				menu.removeClass('active');
				$('body').removeClass('overflow-hidden');
			}

			if ($(this).hasClass('active')) {
				closeMenu();
			} else {
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

	// ANIMATION ON SCROLL
	function initAos() {
		AOS.init({
			duration: 1000,
			once: true,
			easing: 'ease-in-out'
		});
	}

	// ACCORDION SCROLL
	function initAccordionScroll() {
		$('.js-accordion .accordion-collapse').on('shown.bs.collapse', function () {
			var headerOffset = $('.js-header').outerHeight();

			if (headerOffset === undefined) {
				headerOffset = 0;
			}

			var top = $(this).closest('.accordion-item').offset().top - headerOffset - 10;

			$('body, html').animate({
				scrollTop: top
			}, 300);
		});
	}

	// GOOGLE MAP WITH MULTIPLE MARKER
	function initMapMultipleMarkers() {
		var mapBlock = $('.js-map-multiple-markers');

		if (!mapBlock.length) return;

		var map = new google.maps.Map(mapBlock.get(0), {
			disableDefaultUI: true,
			styles: [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "saturation": "-100" }] }, { "featureType": "administrative.province", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": "50" }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": "-100" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "lightness": "30" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "lightness": "40" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "lightness": -25 }, { "saturation": -100 }] }]
		});

		// array of markers (with coordinates, name, address)
		var multipleMarkers = [
		{
			lat: 45.45922196159336,
			lng: 9.20883535584747,
			name: 'Ufficio 1',
			address: 'Via Spartaco 10, Milano'
		},
		{
			lat: 45.06800106010096,
			lng: 7.701812855834449,
			name: 'Ufficio 2',
			address: 'Via Giovanni Francesco Napione 22, Torino'
		}];


		var infoWindow = new google.maps.InfoWindow();

		google.maps.event.addListener(map, 'click', function () {
			infoWindow.close();
		});

		// Determine the boundaries of the visible area of the map in accordance with the position of the markers
		var bounds = new google.maps.LatLngBounds();

		// create the markers
		for (var i = 0; i < multipleMarkers.length; i++) {

			var latLng = new google.maps.LatLng(multipleMarkers[i].lat, multipleMarkers[i].lng);
			var name = multipleMarkers[i].name;
			var address = multipleMarkers[i].address;

			addMarker(latLng, name, address);

			// Expand the boundaries of our visible area by adding the coordinates of our current marker
			bounds.extend(latLng);
		}

		// Automatically scale the map so that all markers are in the visible area of the map
		map.fitBounds(bounds);

		function addMarker(latLng, name, address) {
			var icon = {
				url: '../img/map-marker.svg',
				scaledSize: new google.maps.Size(53, 70)
			};

			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: name,
				icon: icon
			});

			google.maps.event.addListener(marker, 'click', function () {
				var contentString = '<div class="infowindow">' +
				'<h6>' + name + '</h6>' +
				'<p>' + address + '</p>' +
				'</div>';

				infoWindow.setContent(contentString);
				infoWindow.open(map, marker);
			});
		}
	}

	// INPUT ONLY NUMBERS
	function initInputOnlyNumbers() {
		(function ($) {
			$.fn.inputFilter = function (callback) {
				return this.on("input keydown keyup mousedown mouseup select contextmenu drop focusout", function (e) {
					if (callback(this.value)) {
						// Accepted value
						this.oldValue = this.value;
						this.oldSelectionStart = this.selectionStart;
						this.oldSelectionEnd = this.selectionEnd;
					} else if (this.hasOwnProperty("oldValue")) {
						// Rejected value - restore the previous one
						this.reportValidity();
						this.value = this.oldValue;
						this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
					} else {
						// Rejected value - nothing to restore
						this.value = "";
					}
				});
			};
		})(jQuery);

		$('.js-only-numbers').inputFilter(function (value) {
			return /^-?\d*$/.test(value);
		});
	}

	// CUSTOM SELECT
	function initCustomSelect() {
		var select = $('.js-select');

		select.each(function () {
			$(this).select2({
				minimumResultsForSearch: Infinity,
				dropdownParent: $(this).closest('.js-select-parent')
			});
		});
	}

	// SLIDERS
	function initSliders() {
		var sliderCalculateTheTaxCredit = $('.js-slider-calculate-the-tax-credit');

		if (sliderCalculateTheTaxCredit.length) {
			sliderCalculateTheTaxCreditTns = tns({
				container: '.js-slider-calculate-the-tax-credit',
				gutter: 15,
				controls: false,
				nav: false,
				loop: false,
				autoHeight: true,
				touch: false,
				speed: 1000
			});

			$('#modalCalculateTheTaxCredit').on('shown.bs.modal', function (e) {
				sliderCalculateTheTaxCreditTns.updateSliderHeight();
			});

			$('#modalCalculateTheTaxCredit').on('hidden.bs.modal', function (e) {
				sliderCalculateTheTaxCreditTns.goTo('first');

				$('.js-form-calculate-the-tax-credit').trigger('reset');
				$('.js-form-contact').trigger('reset');
			});

			$('.js-go-next-slide').on('click', function (e) {
				e.preventDefault();

				sliderCalculateTheTaxCreditTns.goTo('next');
			});
		}
	}

	// FORM VALIDATE
	function initFormValidate() {
		var formWriteToUs = $('.js-form-write-to-us');

		if (formWriteToUs.length) {
			formWriteToUs.validate({
				lang: 'it',
				errorClass: 'is-invalid',

				errorPlacement: function errorPlacement(error, element) {
					error.addClass('invalid-feedback');

					if (element.attr('type') === 'checkbox' && element.closest('.custom-checkbox').length) {
						error.insertAfter(element.closest('.custom-checkbox'));
					} else {
						error.insertAfter(element);
					}
				},

				submitHandler: function submitHandler(form) {
					// $.ajax({
					// 	type: 'POST',
					// 	url: 'files/mail.php',
					// 	data: $(form).serialize()
					// }).done(function() {
					// 	setTimeout(function() {
					// 		// show success block
					// 		$(form).trigger('reset').addClass('d-none');
					// 		$('.js-form-write-to-us-success').removeClass('d-none');

					// 		// scroll compensation
					// 		var headerOffset = $('.js-header').outerHeight();

					// 		if (headerOffset === undefined) {
					// 			headerOffset = 0;
					// 		}

					// 		var top = $('#section-write-to-us').offset().top - headerOffset;

					// 		$('body, html').animate({
					// 			scrollTop: top
					// 		}, 300);
					// 	}, 1000);
					// });

					setTimeout(function () {
						// show success block
						$(form).trigger('reset').addClass('d-none');
						$('.js-form-write-to-us-success').removeClass('d-none');

						// scroll compensation
						var headerOffset = $('.js-header').outerHeight();

						if (headerOffset === undefined) {
							headerOffset = 0;
						}

						var top = $('#section-write-to-us').offset().top - headerOffset;

						$('body, html').animate({
							scrollTop: top
						}, 300);
					}, 1000);

					return false;
				}
			});
		}

		var formCalculateTheTaxCredit = $('.js-form-calculate-the-tax-credit');

		if (formCalculateTheTaxCredit.length) {
			formCalculateTheTaxCredit.validate({
				lang: 'it',
				errorClass: 'is-invalid',

				errorPlacement: function errorPlacement(error, element) {
					error.addClass('invalid-feedback');

					if (element.attr('type') === 'checkbox' && element.closest('.custom-checkbox').length) {
						error.insertAfter(element.closest('.custom-checkbox'));
					} else {
						error.insertAfter(element);
					}
				},

				submitHandler: function submitHandler(form) {
					var annualStaffCost = +$('.js-annual-staff-cost').val(),
						calcLowerNumber = Math.round(annualStaffCost * 0.15 * 0.15),
						calcUpperNumber = Math.round(annualStaffCost * 0.4 * 0.15);

					$('.js-calc-lower-number').text(calcLowerNumber);
					$('.js-calc-upper-number').text(calcUpperNumber);

					$('#modalCalculateTheTaxCredit').modal('show');
					$(form).trigger('reset');

					return false;
				}
			});
		}

		var formContact = $('.js-form-contact');

		if (formContact.length) {
			formContact.validate({
				lang: 'it',
				errorClass: 'is-invalid',

				errorPlacement: function errorPlacement(error, element) {
					error.addClass('invalid-feedback');

					if (element.attr('type') === 'checkbox' && element.closest('.custom-checkbox').length) {
						error.insertAfter(element.closest('.custom-checkbox'));
					} else {
						error.insertAfter(element);
					}
				},

				submitHandler: function submitHandler(form) {
					// $.ajax({
					// 	type: 'POST',
					// 	url: 'files/mail.php',
					// 	data: $(form).serialize()
					// }).done(function() {
					// 	setTimeout(function() {
					// 		$(form).trigger('reset');
					// 		sliderCalculateTheTaxCreditTns.goTo('next');
					// 	}, 1000);
					// });

					setTimeout(function () {
						$(form).trigger('reset');
						sliderCalculateTheTaxCreditTns.goTo('next');
					}, 1000);

					return false;
				}
			});
		}
	}

	// SET YEAR
	function initSetYear() {
		var currentYear = new Date().getFullYear();

		$('.js-year').text(currentYear);
	}
});