(function($) {

"use strict";

cubeInit();

function cubeInit (){
	// DISABLE ON IE ========
if (navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1))
{
	console.log('This browser is IE');
} else {

	function animationOut(i){}
	function animationIn(i){}

	$('body').addClass("not-ie");

	var length = $('#cubeTransition .page').length,
		current = 1,
		next = 1,
		outClass, inClass, onGoing = false;
		$('#cubeTransition>div:eq(0)').addClass('visible');

	var list = $('.page');

	// BULLETS MENU CONSTRUCTOR
	for (var i = 0; i < length; i++) {
		var tooltip_text = $(list[i]).attr('data-tooltip');
		var bullet = $("<li><span class='page-title' data-section="+ (+[i] + 1) +">" + tooltip_text +"</span><span class='hover-title' data-section="+ (+[i] + 1) +">" + tooltip_text +"</span></li>");
		if (i === 0) bullet.addClass('active-item');
		$("#bullets").append(bullet);
	}

	function openIndex(index) {
		var i = parseInt(index);
		if (!onGoing && next !== i) {
			onGoing = true;
			next = i;
			outClass = current > i ? 'rotateCubeBottomOut' : 'rotateCubeTopOut';
			inClass = current > i ? 'rotateCubeBottomIn' : 'rotateCubeTopIn';
			show();
		}
	}

	// ANIMATION OF CUBE + STOP FIRST & LAST TRANSITION
	function trans(direction) {
		var totalSections = $('.page').length;
		if (!onGoing) {
			onGoing = true;
			if (direction === 'up') {
				if(current !== 1){
					next = current > 1 ? current - 1 : length;
					outClass = 'rotateCubeBottomOut';
					inClass = 'rotateCubeBottomIn';
					show();
				} else {
					onGoing = false;
				}
			} else {
				if(totalSections !== current){
					next = current < length ? current + 1 : 1;
					outClass = 'rotateCubeTopOut';
					inClass = 'rotateCubeTopIn';
					show();
				} else {
					onGoing = false;
				}
			}
		}
	}

	function show() {
		$('#cubeTransition>div:eq(' + (next - 1) + ')').addClass('visible');
		$('#cubeTransition>div:eq(' + (current - 1) + ')').addClass(outClass);
		$('#cubeTransition>div:eq(' + (next - 1) + ')').addClass(inClass);	
		$('#bullets>li:eq(' + (current - 1) + ')').removeClass('active-item');
		$('#bullets>li:eq(' + (next - 1) + ')').addClass('active-item');

		animationOut(current - 1)

		setTimeout(function() {
			$('#cubeTransition>div:eq(' + (current - 1) + ')').removeClass('visible');
		}, 500)

		setTimeout(function() {
			$('#cubeTransition>div:eq(' + (current - 1) + ')').removeClass(outClass);
			$('#cubeTransition>div:eq(' + (next - 1) + ')').removeClass(inClass);

			animationIn(next - 1)
			current = next;
			onGoing = false;
		}, 600)
	}

	$(document).ready(function() {

		// for scroll by mouse or MAC track pad
		var indicator = new WheelIndicator({
			callback: function(e) {
				// disable scroll when menu open
				if(!$('body').hasClass('no-scroll')) {
					if (e.direction === 'down') {
						trans('down')
					} else {
						trans('up')
					}
				}
			}
		});

		// ON/OFF scroll on mobile/desktop
		if ($(window).width() <= 992) {
			indicator.turnOff();
		}

		$(window).on('resize', function() {
			if ($(window).width() < 992) {
				indicator.turnOff();
			}
			else {
				indicator.turnOn();
			}
		});

		// ON SCROLL BY MOUSE ON MENU
		$(".cube-page .meny").on({
			mouseenter: function () {
				indicator.turnOff();
			},
			mouseleave: function () {
				indicator.turnOn();
			}
		});

		// on scrolling when open page navigation
		$('.-JS_helper_click').on('click' , function() {
			if ($(window).width() > 991) {
				if ($(this).parents('.page-helper').hasClass('-open')) {
					indicator.turnOn();
				} else {
					indicator.turnOff();
				}
			}
		});

		// indicator.getOption('preventMouse'); // true

		$(document).on('keydown' , function(e) {
			if (e.keyCode === 38 || e && e.keyCode === 37) {
				trans('up')
			}
			if (e.keyCode === 39 || e && e.keyCode === 40) {
				trans('down')
			}
		});

		// BULLETS CLICK
		$('#bullets .page-title').on('click', function() {
			var idSection = $(this).attr('data-section');
			openIndex(idSection);
		});

		// ARROW DOWN 
		$('.js-cube-mouse').on('click', function() {
			trans('down');
		});

		$(window).on('resize', function() {
			$('.js-cube-mouse').on('click', function() {
				trans('down');
			});
		});

	});

}
}

})(jQuery);