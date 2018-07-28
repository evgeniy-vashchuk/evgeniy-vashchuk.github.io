(function ($) {

'use strict';

// hide preloader by click
$('.js-preloader').on('click', function() {
	$(".js-preloader").fadeOut('slow');
});

$(window).on("load", function() {
	// PRELOADER

	// hide preloader
	setTimeout(function() {
		$(".js-preloader").fadeOut('slow');

		// ANIMATION OF ELEMENTS AFTER SCROLLING
		InitWaypointAnimations({
			offset: "70%",
			animateClass: "js-animate-on-scroll",
			animateGroupClass: "js-animate-group-on-scroll"
		});

	}, 1000);

	// PARALLAX OF ELEMENTS
	var rellax = new Rellax('.js-rellax', {
		center: true
	});
});

$(document).ready(function() {

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

	$(window).resize(function() {
		getScrollBarWidth();
	});

	// SCROLLSPY
	$('body').scrollspy({target: '.js-scroll-spy'});

	// RIGHT VALUE OF SCROLL TOP BUTTON (FOR COMPENSATION)
	var scrollTopButtonRight = $('.js-scroll-top-btn').css('right').slice(0, -2);

	$(window).resize(function() {
		scrollTopButtonRight = $('.js-scroll-top-btn').css('right').slice(0, -2);
	});

	// SCROLL TO ELEMENT
	// for srip slider / animation compleat
	var skipScrolling = true;

	$('a[href^="#"]:not(.js-no-scroll)').on('click', function(e) {
		e.preventDefault();

		// height of header (for offset)
		var idOfElement = $(this).attr('href');

		var top = $(idOfElement).offset().top;

		if (skipScrolling) {
			skipScrolling = false;

			$('body,html').animate({
				scrollTop: top
			}, 1000 ).promise().done(function() {
				skipScrolling = true;

				setTimeout(function(){
					upDirection = true;
				}, 100);

			});
		}

		// for slider init
		if ($(this).attr('href') === '#section-fullpage-slider') {
			skipScrolling = true;
		}
	});

	// HIDE HEADER AFTER SCROLL
	$('.menu-list a').on('click', function() {
		upDirection = false;

		if ($(this).text() !== 'home') {
			$('.js-header').addClass('-hide-header');
		}
	});

	// FILL HEADER AFTER SCROLL

	// distance
	var distanceY = 1;

	$(window).on('scroll', function() {
		if ($(this).scrollTop() > distanceY) {
			$('.js-header').addClass('-fill-header');
		} else {
			$('.js-header').removeClass('-fill-header');
		}
	})

	if ($(document).scrollTop() > distanceY) {
		$('.js-header').addClass('-fill-header');
	}

	// hide header depending on the direction
	var downDirection = true;
	var upDirection = true;

	$.scrollDetection({
		scrollDown: function() {
			upDirection = true;

			if (downDirection === true) {
				$('.js-header').addClass('-hide-header');
				downDirection = false;
			}
		},
		scrollUp: function() {
			downDirection = true;

			if (upDirection === true) {
				$('.js-header').removeClass('-hide-header');
				upDirection = false;
			}
		}
	});

	// COUNT UP NUMBERS
	$.each($('.js-count-up-number'), function() {
		var options = {
			useEasing: true,
			useGrouping: true,
			separator: '',
			decimal: '.',
		};
		var count = $(this).data('count'),
			numAnim = new CountUp(this, 0, count, 0, 5, options);

		var waypoints = $('.js-count-up-number').waypoint({
			handler: function(direction) {
				numAnim.start();
			},
			offset: '90%'
		})
	});

	// TESTIMONIALS SLIDER
	$('.js-testimonials-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrows: true,
		infinite: true,
		draggable: false,
		swipe: false,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					swipe: true,
				}
			},
		]
	});

	// LIMIT BLOG TEXT
	$('.js-blog-text p').each(function() {
		var $this = $(this);
		var txt= $this.text();

		if (txt.length >= 120) {
			$this.text(txt.substring(0, 120) + '...');
		}
	});

	// BLOG SLIDER
	$('.js-blog-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		infinite: true,
		draggable: false,
		swipe: false,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					swipe: true,
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			}, {
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	});

	// SVG ANIMATION
	$.each($('.js-animation-svg'), function() {
		var waypoints = $('.js-animation-svg').waypoint({
			handler: function(direction) {

				$('.js-animation-svg').each(function(){
					var thisItem = $(this);

					if (thisItem.hasClass('-hide-stroke')) {
						// remove hide class
						thisItem.removeClass('-hide-stroke');

						// svg animation init
						new Vivus(thisItem[0], {
							duration: 200
						});
					}

				});

			},
			offset: '80%'
		})
	});

	// VIDEO IN POP-UP

	// resize video
	function resizeVideo() {
		var win = $(window);
		var lightbox = $('.js-modal-video');

		var win_width = win.width() - 200,
				win_height = win.height() - 200,
				win_ratio = win_width / win_height,
				ratio = 16/9;

		if (win.width() <= 575) {
			win_width = win.width() - 30,
			win_height = win.height() - 30;
		}

		if ( win_ratio > ratio ) {
			lightbox.height( win_height );
			lightbox.width( win_height * ratio );
		}

		else {
			lightbox.width( win_width );
			lightbox.height( win_width / ratio );
		}

		lightbox.css( "left", ( win.width() - lightbox.width() ) / 2 );
		lightbox.css( "top", (win.height() - lightbox.height() ) / 2 );
	}

	resizeVideo();

	$(window).resize(function() {
		resizeVideo();
	});

	// play/stop video when open/close
	var videoSrc;

	$('.js-video-modal-btn').on('click', function() {
		videoSrc = $(this).attr('data-src');
	});

	$('.js-video-modal').on('show.bs.modal', function () {
		// ADD SRC
		$(this).find('.responsive-video-item').attr('src', videoSrc);

		// COMPENSATION OF SCROLLBAR WHEN VIDOE MODAL IS OPENED
		// header
		$('.js-header-container').css('padding-right', widthOfScrollbar);

		// scroll top btn
		$('.js-scroll-top-btn').css('right', +scrollTopButtonRight + widthOfScrollbar);
	})

	$('.js-video-modal').on('hidden.bs.modal', function () {
		// REMOVE SRC
		$(this).find('iframe').attr('src', '');

		// COMPENSATION OF SCROLLBAR WHEN VIDOE MODAL IS OPENED
		// header
		$('.js-header-container').css('padding-right', 0);

		// scroll top btn
		$('.js-scroll-top-btn').css('right', +scrollTopButtonRight);
	})

	// close btn
	$('.js-video-modal-close').on('click', function () {
		$('.js-video-modal').modal('hide');
	});

	// slider block top offset

	// SCROLL TOP BUTTON
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 0) {
			$('.js-scroll-top-btn > .btn-scroll-top').addClass('-show');
		} else {
			$('.js-scroll-top-btn > .btn-scroll-top').removeClass('-show');
		}
	});

	if ($(document).scrollTop() > 0) {
		$('.js-scroll-top-btn > .btn-scroll-top').addClass('-show');
	}

	// 2) сlick event to scroll to top

	$('.js-scroll-top').on('click', function() {

		if ($(this).hasClass('-disable')) {
			slideout.close();
			return false;
		}

		if (skipScrolling) {
			skipScrolling = false;

			$('body, html').animate({
				scrollTop: 0
			}, 1000 ).promise().done(function() {
				skipScrolling = true;
			});

			return false;
		}
	});

	// STANDARD GOOGLE MAP
	function initMap() {
		var coordinates = new google.maps.LatLng(40.712348, -74.006720),
		zoom = 12;

		var map = new google.maps.Map(document.getElementById('js-map'), {
			center: coordinates,
			zoom: zoom,
			disableDefaultUI: true,
			zoomControl: false,
			fullscreenControl: false,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			},

			styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
		});

		// OPTIONAL - custom icon
		var icon = {
			url: './img/svg/icon_map_marker.svg',
			scaledSize: new google.maps.Size(35, 40)
		};

		var marker = new google.maps.Marker({
			position: coordinates,
			map: map,
			icon: icon,
			animation: google.maps.Animation.BOUNCE
		});

		// OPTIONAL - add info window
		var infoWindow = new google.maps.InfoWindow({
			content: 'Info window'
		});

		// close info window after click anywhere on the map
		google.maps.event.addListener(map, "click", function() {
			infoWindow.close();
		});
	}

	if ($('#js-map').length) {
		initMap();
	}

	// FULL PAGE MODAL
	$(".js-fullpage-modal").iziModal({
		width: "100%"
	});

	// SINGLE PROJECT MODAL
	$(document).on('click', '.js-project-single-modal', function (event) {
		event.preventDefault();

		$('#project-modal-' + $(this).attr('data-project-post') + '').iziModal('open');
	});

	// SINGLE BLOG MODAL
	$(document).on('click', '.js-blog-single-modal', function (event) {
		event.preventDefault();

		$('#blog-modal-' + $(this).attr('data-blog-post') + '').iziModal('open');
	});

	// COMPENSATION OF SCROLLBAR WHEN POP-UP IS OPENED
	$(document).on('opening', '.js-fullpage-modal', function () {
		// header
		$('.js-header-container').css('padding-right', widthOfScrollbar);

		// scroll top btn
		$('.js-scroll-top-btn').css('right', +scrollTopButtonRight + widthOfScrollbar);
	});

	$(document).on('closed', '.js-fullpage-modal', function () {
		// header
		$('.js-header-container').css('padding-right', 0);

		// scroll top btn
		$('.js-scroll-top-btn').css('right', +scrollTopButtonRight);
	});

	// MOUSE PARALLAX
	if ($('#welcome-scene').length) {
		var welcomeScene = document.getElementById('welcome-scene');
		var parallaxInstanceInWelcome = new Parallax(welcomeScene);
	}

	if ($('#download-scene').length) {
		var downloadScene = document.getElementById('download-scene');
		var parallaxInstanceInDownload = new Parallax(downloadScene);
	}

	// SIDE MENU
	var slideout = new Slideout({
		'menu': document.getElementById('menu'),
		'panel': document.getElementById('main-content'),
		'duration': 500,
		'side': 'right',
		'touch': false
	});

	document.querySelector('.js-hamberger-btn').addEventListener('click', function() {
		slideout.toggle();
	});

	// humberger btn
	slideout.on('beforeopen', function() {
		$('.js-hamberger-btn').addClass('-open');
		$('.js-scroll-top-btn').addClass('-disable');

		if ($(document).scrollTop() === 0) {
			$('.js-header').addClass('-fill-header');
		}
	});

	slideout.on('beforeclose', function() {
		$('.js-hamberger-btn').removeClass('-open');
		$('.js-scroll-top-btn').removeClass('-disable')

		if ($(document).scrollTop() === 0) {
			$('.js-header').removeClass('-fill-header');
		}
	});

	// fixed elements
	var fixedHeader = document.querySelector('.js-header'),
			fixedScrollTopBtn = document.querySelector('.js-scroll-top-btn');

	slideout.on('translate', function(translated) {
		fixedHeader.style.transform = 'translateX(' + translated + 'px)';
		fixedScrollTopBtn.style.transform = 'translateX(' + translated + 'px)';
	});

	slideout.on('beforeopen', function () {
		fixedHeader.style.transition = 'transform 500ms ease';
		fixedHeader.style.transform = 'translateX(-256px)';

		fixedScrollTopBtn.style.transition = 'transform 500ms ease';
		fixedScrollTopBtn.style.transform = 'translateX(-256px)';
	});

	slideout.on('beforeclose', function () {
		fixedHeader.style.transition = 'transform 500ms ease';
		fixedHeader.style.transform = 'translateX(0px)';

		fixedScrollTopBtn.style.transition = 'transform 500ms ease';
		fixedScrollTopBtn.style.transform = 'translateX(0px)';
	});

	slideout.on('open', function () {
		fixedHeader.style.transition = '';
		fixedScrollTopBtn.style.transition = '';
	});

	slideout.on('close', function () {
		fixedHeader.style.transition = '';
		fixedScrollTopBtn.style.transition = '';
	});

	// overlay
	function close(eve) {
		eve.preventDefault();
		slideout.close();
	}

	slideout
		.on('beforeopen', function() {
			this.panel.classList.add('-panel-open');
		})
		.on('open', function() {
			this.panel.addEventListener('click', close);
		})
		.on('beforeclose', function() {
			this.panel.classList.remove('-panel-open');
			this.panel.removeEventListener('click', close);
		});

	// side menu list click
	$('.side-menu .menu-list a').on('click', function() {
		slideout.close();
	});

	// get in touch click
	$('.js-header-btn').on('click', function() {
		slideout.close();
	});

	// FULLPAGE SLIDER ==============================================================

	if ($('.js-fullpage-slider').length) {
		! function($) {
			$.fn.wangfullpage = function() {
				var _this = this,
						$mjPos = ".fullpage-slider-nav",
						$lengthArr = {};

				var moveStart = function() {
					var $winHeight = $(window).height(),
							$winScroll = $(window).scrollTop();
					return _this.each(function(index) {
						var $this = $(this),
								$boxOffsetTop = $this.offset().top,
								$boxItems = $this.find(".fullpage-slider-item");
						$lengthArr[index] = $boxItems.length;
						var $offSetNum = $boxOffsetTop + $this.height() - $winHeight,
								$isPosition = $winScroll >= $boxOffsetTop && $winScroll <= $offSetNum ? "fixed" : "absolute";
						if ($this.css({
							height: $winHeight * $lengthArr[index]
							}), $boxItems.css({
									height: $winHeight,
									position: $isPosition,
									width: "100%",
									top: 0,
									left: 0
							}), 0 === $this.find($mjPos).length && ($this.append('<div class="fullpage-slider-nav"></div>'), $boxItems.each(function(index) {
									$this.find($mjPos).append('<a class="fullpage-slider-nav-item" href="javascript:;"><span>' + index + "</span></a>")
							}), $this.find(".fullpage-slider-nav-item").eq(0).addClass("-active")), "absolute" === $isPosition) $this.find($mjPos).fadeOut("slow"),
									$('.fullpage-slider-item').removeClass('-animation'),
									$winScroll > $boxOffsetTop && $boxItems.last().css({
							top: "auto",
							bottom: 0,
							opacity: 1
						});

						else {
							$this.find($mjPos).fadeIn("slow");
							var numBer = ($winScroll - $boxOffsetTop) / ($winHeight / 1.5),
									parse = parseInt(numBer),
									addCur = $winScroll >= $boxOffsetTop ? parse : 0;
							parse >= $lengthArr[index] && (addCur = $lengthArr[index] - 1), 
							$this.attr("data-index") !== addCur && ($this.find(".fullpage-slider-nav-item").removeClass("-active -animation").eq(addCur).addClass("-active -animation"), 
							$boxItems.removeClass("-active -animation").css({
									opacity: 0
							}).eq(addCur).addClass("-active -animation").css({
									opacity: 1
							}), $this.attr("data-index", addCur))
						}
					})
				};

				$(document).on("click", ".fullpage-slider-nav-item", function() {
					var $parent = $(this).parent(),
						$index = $(this).index(),
						$winDowh = $(window).height() / 1.5,
						$boxTop = $parent.parent().offset().top + 5;
					$("body, html").animate({
						scrollTop: $boxTop + $index * $winDowh
					}, 500)
				}), moveStart(), $(window).resize(moveStart), $(window).scroll(moveStart)
			}

		}(jQuery), $(function() {
			if ($(window).width() > 991) {
				$(".js-fullpage-slider").wangfullpage()
			}
		})

		$(window).resize(function() {
			if ($(window).width() > 991) {
				$(".js-fullpage-slider").wangfullpage()
			}
		});
	}

	// FULLPAGE SLIDER END ==============================================================

	// CONTACT FORM

	// validate
	$("#contact-form").validate({
		submitHandler: function() {
			// e-mail ajax send
			var th = $('#contact-form');
			$.ajax({
				type: "POST",
				url: "../mail.php",
				data: th.serialize()
			}).done(function() {

				$('#contact-form .successful-text').addClass('-show');

				setTimeout(function() {
					$('#contact-form .successful-text').removeClass('-show');
				}, 2000);

				setTimeout(function() {
					// Done Functions
					th.trigger("reset");
				}, 1000);
			});
			return false;
		}
	});

});

}(jQuery));