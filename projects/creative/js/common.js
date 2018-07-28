(function ($) {

"use strict";

// PRELOADER CLICK - CLOSE
$('.preloader-wrap').on('click' , function(){
	$('.preloader-wrap').fadeOut(700);
});

$(window).on('load', function () {

	// MASONRY GRID IN TESTIMONIALS
	if ($('.grid').length){
		var $masonry = $('.grid').masonry({
			horizontalOrder: true,
		});
	}

	// PRELOADER
	setTimeout(function() {
		$('.preloader-wrap').fadeOut(500, function() {});

		// TITLE ANIMATION
		$('.js-main-title-of-site').addClass('reveal-animation');

		// LOGO ANIMATION
		$('#main-logo').addClass('logo-animation');

		// COUNT UP NUMBERS
		$.each($('.count-item .title-cube-section'), function () {
			var count = $(this).data('count'),
				numAnim = new CountUp(this, 0, count, 0, 5);

			var waypoints = $('.count-item').waypoint({
				handler: function(direction) {
					numAnim.start();
				},
				offset: '80%'
			})
		});

	}, 2000);

});

$(document).ready(function() {

	// WIDTH OF SCROLLBAR
	var widthOfScrollbar;

	function getScrollBarWidth() {
		var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
			widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		$outer.remove();
		widthOfScrollbar = 100 - widthWithScroll;
		return 100 - widthWithScroll;
	};

	getScrollBarWidth();

	$(window).on('resize', function() {
		getScrollBarWidth();
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

	// OPEN / CLOSE MENU
	$("#menu_btn--js").on( "click", function() {
		// open/close hamburger-btn
		$(this).toggleClass('open');
		// open menu
		$('#fullPageMenu').toggleClass('-open-menu');

		$('body').toggleClass('no-scroll');

		// WHEN MENU OPEN
		if ($('#fullPageMenu').hasClass('-open-menu')) {

			// hidden logo
			$(".header .main-logo").css({"visibility": "hidden", "opacity": '0'});

			// transparent header
			$(".header").addClass("-transparent-bg");

			// scrollbar compensation
			if (!$('body').hasClass('fullpage-page') && !$('body').hasClass('cube-page')) {
				$('body, .header-wrap').css('padding-right', widthOfScrollbar);

				if (!$('body').hasClass('flat-page')) {
					$('.bg-grid, .bg_letter.-page').css('right', widthOfScrollbar);
				}
			}

			// DISABLE SCROLLING WHEN MENU IS OPENED
			if ($('#fullpage').length) {
				$.fn.fullpage.setAllowScrolling(false);
			}

			// HIDE PAGE NAVIGATION
			$('.page-helper').hide();
		}

		// WHEN MENU CLOSE
		else {
			// show logo
			setTimeout(function() {
				$(".header .main-logo").css({"visibility": "visible", "opacity": '1'});
			} , 600);

			// transparent header
			$(".header").removeClass("-transparent-bg");

			// scrollbar compensation
			if (!$('body').hasClass('fullpage-page') && !$('body').hasClass('cube-page')) {
				$('body, .header-wrap').css('padding-right', '0');

				if (!$('body').hasClass('flat-page')) {
					$('.bg-grid, .bg_letter.-page').css('right', '0');
				}
			}

			// ENABLED SCROLLING WHEN MENU IS OPENED
			if ($('#fullpage').length) {
				$.fn.fullpage.setAllowScrolling(true);
			}

			// HIDE PAGE NAVIGATION
			$('.page-helper').show();
		}
	});

	// PHOTO POP-UP
	$('.portfolio--cube, .section-portfolio').slickLightbox({
		itemSelector: '.portfolio-item-hover-block',
		navigateByKeyboard: true,
	})

	// disable scrolling + compensation
	.on({
		'show.slickLightbox': function(){
			$('body').addClass('no-scroll');

			// scrollbar compensation
			if (!$('body').hasClass('fullpage-page') && !$('body').hasClass('cube-page')) {
				$('body, .header-wrap').css('padding-right', widthOfScrollbar);
			}

			if (navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1)) {
				$('body, .header-wrap').css('padding-right', widthOfScrollbar);
			}
		},
		'hide.slickLightbox': function(){
			$('body').removeClass('no-scroll');

			// scrollbar compensation
			if (!$('body').hasClass('fullpage-page') && !$('body').hasClass('cube-page')) {
				$('body, .header-wrap').css('padding-right', '0');
			}

			if (navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1)) {
				$('body, .header-wrap').css('padding-right', '0');
			}
		}
	});

	// TESTIMONIALS SLIDER
	$('.testimonials-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrows: false,
		draggable: false,
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 4000,
	});

	// FORM NOT EMTY CHECK
	$('input:not([type="submit"]) , textarea').on('blur', function() {
		if( !$(this).val() ) {
			$(this).removeClass('active'); 
		} else {
			$(this).addClass('active');
		}
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
	$('.js-arrow-down-cube').on('click' , function(e) {
		if ($(window).width() <= 991) {
			arrowScroll();
			e.stopPropagation();
		}
	});

	// ARROW LINK SCROLL ON FLAT PAGE
	$('.js-arrow-down-flat').on('click' , function() {
		arrowScroll();
	});

	// ARROW LINK SCROLL ON FULLPAGE
	$('.js-arrow-down-fullpage').on('click' , function() {
		if ($(window).width() <= 991) {
			arrowScroll();
		}

		if ($(window).width() > 991 && $('#fullpage').length) {
			$.fn.fullpage.moveSectionDown();
		}
	});

	// TEXT SIDE ANIMATION
	function textAnimation() {
		var waypoints = $('.wrap-for-animation').waypoint({
			handler: function() {
				$(this.element).find(".side-animation-item").addClass("side-animation-action")
			},
			offset: '90%'
		})
	}

	if ($('body').hasClass('flat-page')) {
		textAnimation();
	}

	// DYNAMIC ADDITION OF A BG LETTER
	var sections = $('.-section');
	for (var i = 0; i < sections.length; i++) {
		var tooltip = sections[i].getAttribute("data-tooltip");
		var child = $(sections[i]).children(".bg_letter");
		if(child.length !== 0)
		{
			child.text(tooltip.charAt(0));
		}
	}

	// DYNAMIC ADDITION OF A SMALL! BG LETTER
	var sections = $('.indicators-section .count-item');
	for (var i = 0; i < sections.length; i++) {
		var tooltip = $(sections[i]).find(".js-count-title").text();
		var child = $(sections[i]).children(".bg_letter");
		if(child.length !== 0)
		{
			child.text(tooltip.charAt(0));
		}
	}

	// SCROLL ON TOP
	$('.btn-top').on('click' , function() {
		$('body, html').animate({
			scrollTop: 0
		}, 1000);
		return false;
	});

	// SKILLS BARS
	var stopFunction = false;

	function barsAnimation() {
		if (stopFunction === false) {
			var barsDuration = 3500;
			stopFunction = true;

			$('.bars-block-wrap .bar-item').each(function(){
				var $percent = $(this).find(".bar-strip").attr('data-percentage');

				// tooltip animation
				$(this).find('.tooltip-item').animate({
					left: $percent + "%"
				}, barsDuration);

				// number count animation
				var $numberItem = $(this).find(".percent");

				$({ Counter: 0 }).animate({ Counter: $percent }, {
					duration: barsDuration,
					easing: 'swing',
					step: function () {
						$numberItem.text(Math.ceil(this.Counter));
					}
				});
			});
		}
	}

	// SKILLS BARS ON PAGE
	var waypoints = $('.main-content-page .bars-block-wrap, .flat-page .bars-block-wrap').waypoint({
		handler: function() {
			barsAnimation();
		},
		offset: '80%'
	})

	// SKILLS BARS ON CUBE MOBILE
	if (screen.width <= 991) {
		var waypoints = $('.cube-page .bars-block-wrap').waypoint({
			handler: function() {
				barsAnimation();
			},
			offset: '80%'
		})
	}

	$(window).on('resize', function() {
		if (screen.width <= 991) {
			var waypoints = $('.cube-page .bars-block-wrap').waypoint({
				handler: function() {
					barsAnimation();
				},
				offset: '80%'
			})
		}
	});

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

	// FULLPAGE ANIMATION =================================
	if ($('#fullpage').length) {
		$('#fullpage').fullpage({
			scrollingSpeed: 1000,
			responsiveWidth: 992,
			responsiveHeight: 600,
			verticalCentered: false,
			navigation: true,
			navigationTooltips: true,
			showActiveTooltip: true,
			sectionSelector: '.page',
			fixedElements: '#fullPageModal, .btn-top',

			onLeave: function(index, nextIndex, direction) {
				// CHANGE ACTIVE CLASS
				$('#fp-nav > ul > li').removeClass('active-item');
				$('#fp-nav > ul > li')[nextIndex - 1].classList.add('active-item');

				// TEXT SIDE ANIMATION
				$(".-section[data-index=" + nextIndex + "] .side-animation-item").addClass('side-animation-action');

				// BARS ANIMATION
				barsAnimation();
			}
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
		$('#fp-nav > ul > li').append($('<span class="stick"></span>'));
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

	// SCRIPTS FOR IE ! =================================
	if (navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1)) {

		// text-animation on cube
		textAnimation();

		// bars-animation on cube
		var waypoints = $('.cube-page .bars-block-wrap').waypoint({
			handler: function() {
				barsAnimation();
			},
			offset: '80%'
		})

		// ARROW DOWN SCROLL
		$('.js-arrow-down-cube').on('click' , function(e) {
			arrowScroll();
			e.stopPropagation();
		});

		$("#menu_btn--js").on( "click", function() {
			// WHEN MENU OPEN
			if ($('#fullPageMenu').hasClass('-open-menu')) {
				$('body, .header-wrap').css('padding-right', widthOfScrollbar);
			}
			// WHEN MENU CLOSE
			else {
				$('body, .header-wrap').css('padding-right', '0');
			}
		});
	}

});

}(jQuery));