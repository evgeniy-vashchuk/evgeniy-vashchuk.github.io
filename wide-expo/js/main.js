'use strict';

$(function () {
	initActiveHeaderAfterScroll();
	initStopAnimationsDuringWindowResizing();
	initCountdown();
	initTabsList();
	initSliders();
	initMap();
	initAos();
	initFormValidate();
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

// COUNTDOWN
function initCountdown() {
	var countdown = $('.js-countdown'),
	countdownProgressValue = countdown.find('.js-progress-value'),
	countdownProgressWidth = countdown.find('.js-progress-width'),
	startDate = countdown.attr('data-start-date'),
	finalDate = countdown.attr('data-final-date');

	if (countdown.length) {
		countdown.countdown(finalDate, function (event) {
			var countdownDays = $(this).find('.js-days'),
			countdownHours = $(this).find('.js-hours'),
			countdownMinutes = $(this).find('.js-minutes');

			countdownDays.html(event.strftime('%D'));
			countdownHours.html(event.strftime('%H'));
			countdownMinutes.html(event.strftime('%M'));
		});

		setProgress();

		countdown.on('update.countdown', function (event) {
			setProgress();
		});

		countdown.on('finish.countdown', function (event) {
			setProgress();
		});
	}

	function getProgress() {
		var start = new Date(startDate),
		end = new Date(finalDate),
		today = new Date(),
		q = Math.abs(today - start),
		d = Math.abs(end - start),
		progressPercent = Math.floor(q / d * 100);

		return progressPercent;
	}

	function setProgress() {
		var progressPercent = getProgress();

		countdownProgressValue.text(progressPercent + '%');
		countdownProgressWidth.css('width', progressPercent + '%');
	}
}

// TABS LIST
function initTabsList() {
	$('[data-bs-toggle="tab"]').on('show.bs.tab', function (e) {
		var currentTabNumber = $(e.target).closest('li').index() + 1,
		tabsList = $(e.target).closest('.js-tabs-list');

		if (tabsList.length) {
			tabsList.attr('data-active', currentTabNumber);
		}
	});
}

// SLIDERS
function initSliders() {
	var sliderDigitalNetwork = $('.js-slider-digital-network');

	if (sliderDigitalNetwork.length) {
		sliderDigitalNetwork.each(function () {
			var slider = tns({
				container: this,
				items: 1,
				gutter: 12,
				controls: false,
				nav: false,
				mouseDrag: true,
				loop: false,
				speed: 500,
				responsive: {
					576: {
						items: 2 },

					800: {
						gutter: 30 },

					992: {
						items: 3 },

					1620: {
						gutter: 70 } } });



		});
	}

	var sliderOurTeam = $('.js-slider-our-team'),
	sliderOurTeamObj = {},
	ourTeamPhotoItem = $('.js-our-team-photo-item');

	if (sliderOurTeam.length) {
		sliderOurTeam.each(function () {
			sliderOurTeamObj = tns({
				container: this,
				items: 1,
				gutter: 30,
				controlsPosition: 'bottom',
				controlsText: ['<span class="icomoon-arrow-left"></span>', '<span class="icomoon-arrow-right"></span>'],
				nav: false,
				mouseDrag: true,
				loop: false,
				speed: 500 });

		});

		ourTeamPhotoItem.on('click', function (e) {
			e.preventDefault();

			var index = +$(this).attr('data-team-photo') - 1;

			sliderOurTeamObj.goTo(index);
			ourTeamPhotoItem.removeClass('active');
			$(this).addClass('active');
		});

		sliderOurTeamObj.events.on('transitionStart', function (info) {
			var index = info.displayIndex;

			ourTeamPhotoItem.removeClass('active');
			$('.js-our-team-photo-item[data-team-photo="' + index + '"]').addClass('active');
		});
	}
}

// STANDARD GOOGLE MAP
function initMap() {
	var mapBlock = $('.js-map');

	if (!mapBlock.length) return;

	var coordinateX = mapBlock.attr('data-coordinate-x'),
	coordinateY = mapBlock.attr('data-coordinate-y'),
	coordinates = new google.maps.LatLng(coordinateX, coordinateY);

	var map = new google.maps.Map(mapBlock.get(0), {
		center: coordinates,
		zoom: 13,
		disableDefaultUI: true,
		styles: [{ "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "labels.text", "stylers": [{ "visibility": "on" }, { "color": "#8e8e8e" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#7f7f7f" }] }, { "featureType": "administrative", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "color": "#bebebe" }] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{ "visibility": "on" }, { "color": "#cbcbcb" }, { "weight": "0.69" }] }, { "featureType": "administrative.locality", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#ffffff" }, { "saturation": "0" }] }, { "featureType": "poi.attraction", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "saturation": "0" }] }, { "featureType": "poi.attraction", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.government", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.medical", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#98da9f" }, { "visibility": "on" }] }, { "featureType": "poi.park", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.place_of_worship", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.school", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.sports_complex", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.sports_complex", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.sports_complex", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": "-100" }, { "lightness": "50" }, { "gamma": "1" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#e4e4e4" }, { "saturation": "0" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": "0" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "saturation": "0" }] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "labels.text", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "saturation": "0" }] }, { "featureType": "road.arterial", "elementType": "labels.text", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#e4e4e4" }, { "lightness": "0" }, { "gamma": "1" }, { "saturation": "0" }] }, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "transit", "elementType": "labels", "stylers": [{ "hue": "#ff0000" }, { "saturation": "-100" }, { "visibility": "simplified" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#cbcbcb" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#f3f3f3" }, { "saturation": "0" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.text", "stylers": [{ "visibility": "simplified" }] }] });


	// OPTIONAL - custom icon
	var icon = {
		url: '../img/map-marker.svg',
		scaledSize: new google.maps.Size(51, 63) };


	var marker = new google.maps.Marker({
		position: coordinates,
		map: map,
		animation: google.maps.Animation.BOUNCE,
		icon: icon });

}

// ANIMATION ON SCROLL
function initAos() {
	AOS.init({
		duration: 1000,
		once: true,
		easing: 'ease-in-out' });

}

// FORM VALIDATE
function initFormValidate() {
	var form = $('.js-form-validate');

	if (form.length) {
		form.validate({
			lang: 'it',
			errorClass: 'is-invalid',

			errorPlacement: function errorPlacement(error, element) {
				error.addClass('invalid-feedback');
				error.insertAfter(element);
			},

			submitHandler: function submitHandler(form) {
				$('#formSuccessModal').modal('show');
			} });

	}
}