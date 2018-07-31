(function ($) {

'use strict';

// MOBILE / DESKTOP
var mainBreakpoint = 1150,
		desktop,
		winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

if (winWidth >= mainBreakpoint) {
	desktop = true;
} else {
	desktop = false;
}

$(window).on("resize",function(){
	winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	if (winWidth >= mainBreakpoint) {
		desktop = true;
	} else {
		desktop = false;
	}
});

// SCROLL TRIGGER FOR CUSTOM SCROLLBAR
function scrollTrigger(target, offset, handler){
	var viewportHeight = $(window).height(),
			onePercent = viewportHeight/100;

	for (var i = 0; i < target.length; i++) {
		var targetElements = target[i],
				targetElements = $(targetElements),
				targetPosition = targetElements.offset().top;

		if (targetPosition < (100 - offset)*onePercent) {
			if (!target[i].animationInit) {
				target[i].animationInit = true;

				handler($(target[i]));
			}
		}
	}
}

// PROGRESS BARS
function progressBars(progressBarsBlock, duration) {
	if (!progressBarsBlock[0].progressBarsInit) {
		progressBarsBlock[0].progressBarsInit = true;

		if (duration === undefined) {
			duration = 3000;
		}

		var barsDuration = duration;

		progressBarsBlock.find('.progress-item').each(function(index) {
			var percent = $(this).find('.js-progress-strip').attr('data-percentage');

			// bar fill animation
			$(this).find('.js-progress-strip').animate({
				width: percent + '%'
			}, barsDuration);

			// count up animation
			var options = {
				useEasing: true,
				useGrouping: true,
				suffix: '%'
			};

			var countUpElement = $(this).find('.js-progress-percentage').get(0),
					numAnim = new CountUp(countUpElement, 0, percent, 0, 4, options);

			numAnim.start();
		})
	}
}

// PROGRESS BARS ANIMATION
function progressBarsInit(target) {
	if (desktop) {
		progressBars(target, 4000);
	}
}

// SLIDE UP TEXT ANIMATION
function slideUpTextAnimation(target) {
	if (desktop) {
		target.addClass('-is-visible');
	}
}

// REVEAL ANIMATION
function revealAnimation(target) {
	if (desktop) {
		target.addClass('-animate');
	}
}

// BOTTOM CIRCLE BUTTON ANIMATION
function bottomCircleButtonAnimation(target) {
	if (desktop) {
		TweenMax.to(target, 1.5, {y: 0, ease: Power4.easeInOut});
	}
}

// ======================================
// WINDOW ON LOAD SCRIPTS ======================================
// ======================================

function windowOnLoadScripts() {
	// PRELOADER FOR HOME
	if ($('.js-preloader-for-home').length) {
		var loadingTextItemIndex = 0;

		var preloaderStrip = $('.js-preloader-strip'),
				preloaderPercentage = $('.js-preloader-percentage'),
				preloaderLoadingText = $('.js-preloader-loading-text'),
				preloaderForHomeStripAnimation = new TimelineMax({
					onUpdate: function() {
						var preloaderPercentageValue = preloaderStrip[0].style.height;
								preloaderPercentageValue = preloaderPercentageValue.split('.')[0];
								preloaderPercentageValue = preloaderPercentageValue.replace(/\%$/, '');

						// set percent text
						preloaderPercentage.text(preloaderPercentageValue);

						function reduceOpacity() {
							var loadingTextItem = preloaderLoadingText.find('li');

							for (var i = 0; i <= loadingTextItemIndex; i++) {
								var currentOpacity = +$(loadingTextItem[i]).css('opacity');
										currentOpacity = currentOpacity.toFixed(1);

								$(loadingTextItem[i]).css('opacity', currentOpacity - 0.1);
							}

							loadingTextItemIndex++;
						}

						function loadingTextShowing() {
							var loadingTextItemHeight = 36,
									// loadingTextItemHeight = Math.round($(preloaderLoadingText.find('li')[0]).outerHeight(true)),
									loadingTextTranslateValue = Math.round(preloaderLoadingText.css('transform').split(',')[5].replace(/\)$/, ''));

									preloaderLoadingText.css('transform', 'translate(0, '+(loadingTextTranslateValue - loadingTextItemHeight)+'px)');
						}

						if (+preloaderPercentageValue >= 5 && +preloaderPercentageValue <= 20 && !document.preloaderPercentageValue0) {
							document.preloaderPercentageValue0 = true;

							reduceOpacity();
							loadingTextShowing();

							//console.log('dfdf');
						}

						if (+preloaderPercentageValue >= 20 && +preloaderPercentageValue <= 30 && !document.preloaderPercentageValue20) {
							document.preloaderPercentageValue20 = true;

							reduceOpacity();
							loadingTextShowing();
						}

						if (+preloaderPercentageValue >= 38 && +preloaderPercentageValue <= 45 && !document.preloaderPercentageValue38) {
							document.preloaderPercentageValue38 = true;

							reduceOpacity();
							loadingTextShowing();
						}

						if (+preloaderPercentageValue >= 65 && +preloaderPercentageValue <= 70 && !document.preloaderPercentageValue65) {
							document.preloaderPercentageValue65 = true;

							reduceOpacity();
							loadingTextShowing();
						}

						if (+preloaderPercentageValue >= 90 && !document.preloaderPercentageValue90) {
							document.preloaderPercentageValue90 = true;

							reduceOpacity();
							loadingTextShowing();
						}
					},

					onComplete: function() {
						$('.js-swipe-component-wrap').fadeIn(800);
						swipeToEnter.reflow();
					}
				});

		preloaderForHomeStripAnimation
			// strip animation
			.to(preloaderStrip, 2, {height: '37%', ease: Sine.easeOut})
			.to(preloaderStrip, 2, {height: '76%', ease: Sine.easeOut, delay: 1})
			.to(preloaderStrip, 0.5, {height: '100%', ease: Sine.easeOut, delay: 1})

			// hide loading text
			.staggerTo(preloaderLoadingText.find('li'), 0.5, {ease: Expo.easeInOut, opacity: '0'}, 0.1, '-=0.7')
			.set(preloaderLoadingText, {display:'none', delay: 1});
	}

	// swipe to enter
	if($('#swipe-to-enter').length) {
		var swipeToEnter = new Dragdealer('swipe-to-enter', {
			steps: 2,
			handleClass: 'swipe-component__handle-wrap',

			callback: function(x, y) {
				if (x) {
					this.disable();
					enterToSiteAnimation();
					$('body').removeClass('-overflow-hidden');
				}
			},

			dragStartCallback: function(x, y) {
				$('.js-swipe-component-wrap .swipe-component__handle').addClass('-active');
			},

			dragStopCallback: function(x, y) {
				$('.js-swipe-component-wrap .swipe-component__handle').removeClass('-active');
			}
		});
	}

	// ENTER ANIMATION
	function enterToSiteAnimation() {
		$('.js-swipe-component-wrap').fadeOut(500);

		enterToSiteAnimation = new TimelineMax({
			onComplete: function() {
				$('body').removeClass('preloader-for-home-init');
			}
		});

		enterToSiteAnimation
			// hide preloader
			.to($('.js-preloader-for-home'), 1.3, {width: 0, ease: Expo.easeInOut, onComplete: function() {
				$('.js-preloader-for-home').hide();

				// SLIDE UP TEXT ANIMATION
				scrollTrigger($('.js-slide-up-text'), 10, slideUpTextAnimation);

				// REVEAL ANIMATION
				scrollTrigger($('.js-reveal-animation'), 10, revealAnimation);

				// ANIMATIONS ON MOBILE
				// slide up text
				if (desktop === false) {
					$('.js-slide-up-text').waypoint({
						handler: function() {
							$(this.element).addClass('-is-visible');
						},

						offset: '90%'
					})
				}

				// progress bars
				if ($('.js-progress-bars').length && desktop === false) {
					$('.js-progress-bars').waypoint({
						handler: function() {
							progressBars($(this.element), 4000);
						},

						offset: '90%'
					})
				}

				if (desktop === false) {
					// reveal animation
					$('.js-reveal-animation').waypoint({
						handler: function() {
							$(this.element).addClass('-animate');
						},

						offset: '90%'
					})

					// bottom circle button
					$('.js-bottom-circle-link').waypoint({
						handler: function() {
							TweenMax.to($(this.element), 1.5, {y: 0, ease: Power4.easeInOut});
						},

						offset: '120%'
					})
				}

				document.firstInitAnimations = true;
			}})
			.to($('.js-preloader-strip'), 0.5, {x: '-100%', ease: Power1.easeInOut}, 0.5)

			// main slider text animation
			.staggerTo($('.slider-text-item[data-text-position="0"] .js-main-title [class^="char"]'), 1, {ease: Power4.easeOut, y: '0%'}, 0.07, 'all-animations')
			.staggerTo($('.slider-text-item[data-text-position="0"] .js-description [class^="char"]'), 1, {ease: Power4.easeOut, y: '0%'}, 0.01, 'all-animations')

			// bg strip
			.to($('.js-background-strip'), 1, {width: '87%', ease: Expo.easeInOut}, 0.5)
			// bg block
			.to($('.js-background-block'), 2, {width: backgroundBlockWidth, ease: Expo.easeInOut}, 0)
			// image slider
			.to($('.js-image-slider'), 1, {width: '100%', ease: Expo.easeInOut}, 0.5);
	}

	// SCROLL INDICATOR
	// colors
	var scrollIndicatodFillColor,
			scrollIndicatorEmptyFill;

	if($('.js-scroll-indicator').hasClass('-purple')) {
		scrollIndicatodFillColor = '#231453';
		scrollIndicatorEmptyFill = 'rgba(35,20,83, 0.27)';
	}

	if($('.js-scroll-indicator').hasClass('-white')) {
		scrollIndicatodFillColor = 'rgba(255,255,255, 0.5)';
		scrollIndicatorEmptyFill = 'rgba(255,255,255, 0.1)';
	}
	// init
	$('.js-scroll-indicator').circleProgress({
		size: 30,
		thickness: 2,
		startAngle: -Math.PI/2,
		fill: scrollIndicatodFillColor,
		emptyFill: scrollIndicatorEmptyFill,
		animation: false
	});

	// CUSTOM SCROLL
	var scrollProgress = 0;
	var disableScrolling;
	document.bottomCircleLinkAnimation = true;

	if($('.js-disable-scrolling').length) {
		disableScrolling = false;
	}

	function customScrollInit() {
		$('.js-custom-scrollbar').mCustomScrollbar({
			mouseWheel:{ enable: true },
			scrollInertia: 800,
			scrollButtons: false,
			theme:"custom-scrollbar",
			callbacks:{
				whileScrolling: function(){
					// progress bars init
					scrollTrigger($('.js-progress-bars'), 20, progressBarsInit);

					// slide up text animation init
					scrollTrigger($('.js-slide-up-text'), 10, slideUpTextAnimation);

					// reveal animation init
					scrollTrigger($('.js-reveal-animation'), 10, revealAnimation);

					// scroll indicator
					$('.js-scroll-indicator').circleProgress('value', this.mcs.topPct/100);

					// bottom circle button (detect scroll direction)
					if (scrollProgress < this.mcs.topPct) {
						// scroll down
						if (this.mcs.topPct > 85 && document.bottomCircleLinkAnimation === true) {
							document.bottomCircleLinkAnimation = false;

							TweenMax.to($('.js-bottom-circle-link'), 1.5, {y: 0, ease: Power4.easeInOut});
						}

					} else if (scrollProgress > this.mcs.topPct) {
						// scroll up
					}

					scrollProgress = this.mcs.topPct;
				}
			}
		});
	}

	if (desktop) {
		customScrollInit();
	} else {
		$('.js-custom-scrollbar').mCustomScrollbar("destroy");
	}

	$(window).on("resize",function(){
		if (desktop) {
			customScrollInit();
		} else {
			$('.js-custom-scrollbar').mCustomScrollbar("destroy");
		}
	});

	if (!document.firstInitAnimations && !$('body').hasClass('preloader-for-home-init')) {
		document.firstInitAnimations = true;

		// PROGRESS BARS ANIMATION
		scrollTrigger($('.js-progress-bars'), 20, progressBarsInit);

		// BOTTOM CIRCLE BUTTON ANIMATION
		scrollTrigger($('.js-bottom-circle-link'), 10, bottomCircleButtonAnimation);

		// SLIDE UP TEXT ANIMATION
		setTimeout(function(){
			scrollTrigger($('.js-slide-up-text'), 10, slideUpTextAnimation);
		}, 1);

		// REVEAL ANIMATION
		setTimeout(function(){
			scrollTrigger($('.js-reveal-animation'), 10, revealAnimation);
		}, 1);

		// ANIMATIONS ON MOBILE
		// slide up text
		if (desktop === false) {
			$('.js-slide-up-text').waypoint({
				handler: function() {
					$(this.element).addClass('-is-visible');
				},

				offset: '90%'
			})
		}

		// progress bars
		if ($('.js-progress-bars').length && desktop === false) {
			$('.js-progress-bars').waypoint({
				handler: function() {
					progressBars($(this.element), 4000);
				},

				offset: '90%'
			})
		}

		if (desktop === false) {
			// reveal animation
			$('.js-reveal-animation').waypoint({
				handler: function() {
					$(this.element).addClass('-animate');
				},

				offset: '90%'
			})

			// bottom circle button
			$('.js-bottom-circle-link').waypoint({
				handler: function() {
					TweenMax.to($(this.element), 1.5, {y: 0, ease: Power4.easeInOut});
				},

				offset: '120%'
			})
		}
	}
}

// ======================================
// WINDOW ON LOAD SCRIPTS END ======================================
// ======================================

// SIDE FIXED BLOCK WIDTH
var sideFixedBlockWidth;

// BACKGROUND BLOCK WIDTH
var backgroundBlockWidth;

// SPEED OF ANIMATION PRELOADER PART
var partOfPreloaderSpeed;

// ======================================
// DOCUMENT READY SCRIPTS ======================================
// ======================================

function documentReadyScripts() {
	// CUSTOM CURSOR
	var documentBind = document.querySelector.bind(document);
	var documentOn = document.addEventListener.bind(document);

	var xMouse, yMouse,
			xMouseDelay, yMouseDelay,
			xTooltip, yTooltip;

	documentOn('mousemove', function(e) {
		xMouse = e.clientX || e.pageX;
		yMouse = e.pageY;

		xMouseDelay = e.clientX || e.pageX;
		yMouseDelay = e.pageY;

		xTooltip = e.clientX || e.pageX;
		yTooltip = e.pageY;
	});

	// get mouse coordinates when scrolling
	var xMousePos = 0;
	var yMousePos = 0;
	var lastScrolledLeft = 0;
	var lastScrolledTop = 0;

	$(document).mousemove(function(event) {
		captureMousePosition(event);
	})

	$(window).scroll(function(event) {
		if(lastScrolledLeft != $(document).scrollLeft()){
			xMousePos -= lastScrolledLeft;
			lastScrolledLeft = $(document).scrollLeft();
			xMousePos += lastScrolledLeft;
		}
		if(lastScrolledTop != $(document).scrollTop()){
			yMousePos -= lastScrolledTop;
			lastScrolledTop = $(document).scrollTop();
			yMousePos += lastScrolledTop;
		}
		window.status = "x = " + xMousePos + " y = " + yMousePos;
	});

	function captureMousePosition(event){
		xMousePos = event.pageX;
		yMousePos = event.pageY;
		window.status = "x = " + xMousePos + " y = " + yMousePos;
	}

	documentOn('scroll', function() {
		xMouse = xMousePos;
		yMouse = yMousePos;

		xMouseDelay = xMousePos;
		yMouseDelay = yMousePos;

		xTooltip = xMousePos;
		yTooltip = yMousePos;
	});
	// get mouse coordinates when scrolling END

	// creating elements
	if(!$('#tooltip').length) {
		var tooltipBlock = document.createElement('div');
		tooltipBlock.setAttribute("id", "tooltip");
		document.body.insertBefore(tooltipBlock, document.body.firstChild);
	}

	if(!$('#ball').length) {
		var ballBlock = document.createElement('div');
		ballBlock.setAttribute("id", "ball");
		document.body.insertBefore(ballBlock, document.body.firstChild);
	}

	if(!$('#ballWithDelay').length) {
		var ballWithDelayBlock = document.createElement('div');
		ballWithDelayBlock.setAttribute("id", "ballWithDelay");
		document.body.insertBefore(ballWithDelayBlock, document.body.firstChild);
	}

	var ball = documentBind('#ball');
	var ballWithDelay = documentBind('#ballWithDelay');
	var tooltip = documentBind('#tooltip');

	var x1, y1, dx1, dy1, tx1 = 0, ty1 = 0, key1 = -1,
			x2, y2, dx2, dy2, tx2 = 0, ty2 = 0, key2 = -1,
			x3, y3, dx3, dy3, tx3 = 0, ty3 = 0, key3 = -1;

	var followMouse = function() {
		key1 = requestAnimationFrame(followMouse);
		if (!x1 || !y1) {
			x1 = xMouse;
			y1 = yMouse;
		} else {
			dx1 = (xMouse - x1);
			dy1 = (yMouse - y1);
			if (Math.abs(dx1) + Math.abs(dy1) < 0.1) {
				x1 = xMouse;
				y1 = yMouse;
			} else {
				x1 += dx1;
				y1 += dy1;
			}
		}

		ball.style.left = x1 + 'px';
		ball.style.top = y1 + 'px';
	};

	var followMouseWithDelay = function() {
		key2 = requestAnimationFrame(followMouseWithDelay);
		if (!x2 || !y2) {
			x2 = xMouseDelay;
			y2 = yMouseDelay;
		} else {
			dx2 = (xMouseDelay - x2) * 0.05;
			dy2 = (yMouseDelay - y2) * 0.05;
			if (Math.abs(dx2) + Math.abs(dy2) < 0.1) {
				x2 = xMouseDelay;
				y2 = yMouseDelay;
			} else {
				x2 += dx2;
				y2 += dy2;
			}
		}

		ballWithDelay.style.left = x2 + 'px';
		ballWithDelay.style.top = y2 + 'px';
	};

	var tooltipePositionBr,
			tooltipePositionTr,
			tooltipePositionBl;

	var followTooltip = function(position) {
		key3 = requestAnimationFrame(followTooltip);

		if (!x3 || !y3) {
			x3 = xTooltip;
			y3 = yTooltip;
		} else {
			dx3 = (xTooltip - x3) * 0.1;
			dy3 = (yTooltip - y3) * 0.1;
			if (Math.abs(dx3) + Math.abs(dy3) < 0.1) {
				x3 = xTooltip;
				y3 = yTooltip;
			} else {
				x3 += dx3;
				y3 += dy3;
			}
		}

		// tooltipe position
		if (position === 'bottom-right') {
			tooltipePositionBr = true;
			tooltipePositionTr = false;
			tooltipePositionBl = false;
		}

		if (tooltipePositionBr) {
			tooltip.style.left = x3 + 20 + 'px';
			tooltip.style.top = y3 + 20 + 'px';
		}

		//===========================

		if (position === 'top-right') {
			tooltipePositionTr = true;
			tooltipePositionBr = false;
			tooltipePositionBl = false;
		}

		if (tooltipePositionTr) {
			tooltip.style.left = x3 + 20 + 'px';
			tooltip.style.top = y3 - 50 + 'px';
		}

		//===========================

		if (position === 'bottom-left') {
			tooltipePositionTr = false;
			tooltipePositionBr = false;
			tooltipePositionBl = true;
		}

		if (tooltipePositionBl) {
			tooltip.style.left = x3 - 70 + 'px';
			tooltip.style.top = y3 + 20 + 'px';
		}
	};

	var stopFollowMouse = function() {
		if (key1 > -1) {
			cancelAnimationFrame(key1);
			tx1 = ty1 = 0;
		}

		if (key2 > -1) {
			cancelAnimationFrame(key2);
			tx2 = ty2 = 0;
		}

		if (key3 > -1) {
			cancelAnimationFrame(key3);
			tx3 = ty3 = 0;
		}
	};

	followMouse();
	followMouseWithDelay();

	if (desktop === false) {
		stopFollowMouse();
	}

	var initCustomCursor = false;
	var stopCustomCursor = true;

	$(window).resize(function() {
		if (desktop === false && stopCustomCursor) {
			stopCustomCursor = false;
			initCustomCursor = true;

			stopFollowMouse();
		} else if (desktop && initCustomCursor) {
			initCustomCursor = false;
			stopCustomCursor = true;

			followMouse();
			followMouseWithDelay();
		}
	});

	// hide custom cursor when hover on link
	/*$(document).on("mousemove", function(event) {
		if (!$(event.target).closest('.js-hover-item').length) {
			$('#ball, #ballWithDelay').fadeIn(200);
		} else {
			$('#ball, #ballWithDelay').fadeOut(200);
		}
	});*/

	$('.js-hover-item').on({
		mouseenter: function (event){
			if (followTooltipStop) return

			$('#ball, #ballWithDelay').fadeOut(200);
		},
		mouseleave: function (event){
			if (followTooltipStop) return

			$('#ball, #ballWithDelay').fadeIn(200);
		}
	});
	// hide custom cursor when hover on link END

	// follow tooltip
	var followTooltipText;
	var followTooltipInterval;
	var followTooltipStop;

	if (desktop === false) {
		followTooltipStop = true;
	} else {
		followTooltipStop = false;
	}

	$(window).resize(function() {
		if (desktop === false) {
			followTooltipStop = true;
		} else {
			followTooltipStop = false;
		}
	});

	$('.js-tooltip-cursor').on({
		mouseenter: function (){
			if (followTooltipStop) return

			var self = $(this);
			followTooltipInterval = setTimeout(function(){
				if(self.attr('data-tooltipe-position') === 'bottom-right') {
					var bottomRight = self.attr('data-tooltipe-position');
					followTooltip(bottomRight);
				}

				if(self.attr('data-tooltipe-position') === 'top-right') {
					var topRight = self.attr('data-tooltipe-position');
					followTooltip(topRight);
				}

				if(self.attr('data-tooltipe-position') === 'bottom-left') {
					var bottomLeft = self.attr('data-tooltipe-position');
					followTooltip(bottomLeft);
				}

				followTooltipText = self.attr('data-tooltipe-text');
				$('#tooltip').text(followTooltipText);

				$('#tooltip').fadeIn(1000);

				var baffleHoverText = baffle('#tooltip', {
					characters: ["█", "▓", "▒", "░", "█", "▓", "▒", "░", "█", "▓", "▒", "░", "<", ">", "/"],
					speed: 100
				});

				baffleHoverText.start();

				setTimeout(function() {
					baffleHoverText.reveal(500);
				}, 500);
			}, 200);
		},

		mouseleave: function (){
			if (followTooltipStop) return

			clearInterval(followTooltipInterval);
			followTooltipText = '';

			$('#tooltip').stop(true, true).fadeOut(500);
		}
	});
	// follow tooltip END

	// change color
	/*$(document).on("mousemove", function(event) {
		if (!$(event.target).closest('.js-cursor-yellow').length) {
			$('#ball').removeClass('-cursor-yellow');
			$('#ballWithDelay').removeClass('-cursor-yellow');

			$('#tooltip').addClass('-text-purple');
		} else {
			$('#ball').addClass('-cursor-yellow');
			$('#ballWithDelay').addClass('-cursor-yellow');

			$('#tooltip').removeClass('-text-purple');
		}
	});*/

	$('.js-cursor-yellow').on({
		mouseover: function (){
			if (followTooltipStop) return

			$('#ball').addClass('-cursor-yellow');
			$('#ballWithDelay').addClass('-cursor-yellow');

			$('#tooltip').addClass('-text-white');
		},
		mouseout: function (e){
			if (followTooltipStop) return

			if (e.relatedTarget !== null) {
				$('#ball').removeClass('-cursor-yellow');
				$('#ballWithDelay').removeClass('-cursor-yellow');

				$('#tooltip').removeClass('-text-white');
			}
		}
	});

	// color in preloader for home
	if ($('body').hasClass('preloader-for-home-init')) {
		$('#ball').addClass('-cursor-yellow');
		$('#ballWithDelay').addClass('-cursor-yellow');
	}

	// color for out of the window
	$(document).on({
		mouseenter: function(e) {
			if (!$(e.target).hasClass('js-cursor-yellow') && $('#ball').hasClass('-cursor-yellow')) {
				$('#ball').removeClass('-cursor-yellow');
				$('#ballWithDelay').removeClass('-cursor-yellow');
			}
		},

		mouseleave: function(e) {
			$('#tooltip').removeClass('-text-white');
		}
	});
	// change cursor color END

	// FULLPAGE MENU
	var menuAnimationInit = true;

	// GRID ICON
	$('.js-grid-icon').on('click', function() {
		if(menuAnimationInit) {
			menuAnimationInit = false;

			$(this).toggleClass('-open');

			if (!$(this).hasClass('-open')){
				if ($.i18n().locale === 'en') {
					$(this).attr('data-tooltipe-text', 'open');
					$('#tooltip').text('menu');
				} else if ($.i18n().locale === 'ru') {
					$(this).attr('data-tooltipe-text', 'открыть');
					$('#tooltip').text('меню');
				}

				// HIDE SCROLL INDICATOR
				$('.js-scroll-indicator').addClass('-hide');

				// reset value
				setTimeout(function(){
					$('.js-scroll-indicator').circleProgress('value', 0);
				}, 1000)

				// CLOSE FULLPAGE MENU
				var closeFullpageMenuTimeline = new TimelineMax({
					onComplete: function() {
						menuAnimationInit = true;
					}
				});

				closeFullpageMenuTimeline
					// bg parallax bloxs
					.to($('.js-fullpage-menu-content .js-parallax-item'), 1, {opacity: '0', ease: Power1.easeInOut})
					// title animation
					.staggerTo($('.js-fullpage-menu-title [class^="char"]'), 0.1, {ease: Power4.easeOut, y: '100%'}, 0.01, 0)
					// items animation
					.staggerTo($('.js-my-work-item'), 1, {ease: Expo.easeOut, opacity: '0', y: '50px'}, 0.1, 0)
					// hide main content
					.set($('.js-fullpage-menu-content'), {display: 'none'})
					// bg cols animation
					.staggerTo($('.js-bg-menu-cols .item-col'), 1, {ease: Expo.easeOut, height: '0'}, 0.25, '-=0.5');
			} else {
				if ($.i18n().locale === 'en') {
					$(this).attr('data-tooltipe-text', 'close');
					$('#tooltip').text('close');
				} else if ($.i18n().locale === 'ru') {
					$(this).attr('data-tooltipe-text', 'закрыть');
					$('#tooltip').text('закрыть');
				}

				// SHOW SCROLL INDICATOR
				$('.js-scroll-indicator').removeClass('-hide');

				// OPEN FULLPAGE MENU
				var openFullpageMenuTimeline = new TimelineMax({
					onComplete: function() {
						menuAnimationInit = true;
					}
				});

				openFullpageMenuTimeline
					// bg cols animation
					.staggerTo($('.js-bg-menu-cols .item-col'), 1, {ease: Expo.easeOut, height: '100vh'}, 0.25)
					// show main content
					.set($('.js-fullpage-menu-content'), {display: 'block'}, 0)

					// title animation
					.set($('.js-fullpage-menu-title'), {transitionDelay: '0'}, '-=1')
					.set($('.js-fullpage-menu-title'), {opacity: '1'}, '-=1')
					.staggerTo($('.js-fullpage-menu-title [class^="char"]'), 0.1, {ease: Power4.easeOut, y: '0%'}, 0.01, '-=0.5')

					// items animation
					.staggerTo($('.js-my-work-item'), 2, {ease: Expo.easeOut, opacity: '1', y: '0px'}, 0.1, '-=0.5')

					// bg parallax bloxs
					.to($('.js-fullpage-menu-content .js-parallax-item'), 1, {opacity: '1', ease: Power1.easeInOut}, '-=2');
			}

			var baffleHoverText = baffle('#tooltip', {
				characters: ["█", "▓", "▒", "░", "█", "▓", "▒", "░", "█", "▓", "▒", "░", "<", ">", "/"],
				speed: 100
			});

			baffleHoverText.start();

			setTimeout(function() {
				baffleHoverText.reveal(500);
			}, 500);
		}
	});

	// MOBILE MENU
	var mobileMenuOpen = new TimelineMax(),
			mobileMenuClose = new TimelineMax(),
			mobileMenu = $('.js-mobile-menu'),
			mobileMenuOverlay = $('.js-mobile-menu-overlay');

	$('.js-grid-icon-mobile-menu').on('click', function() {
		$(this).toggleClass('-open');

		if ($(this).hasClass('-open')) {
			$('body').addClass('-overflow-hidden');

			mobileMenuOpen
				.set(mobileMenuOverlay, {display:'block'})
				.to(mobileMenuOverlay, 0.5, {opacity: 0.6, ease: Power1.easeOut})
				.to(mobileMenu, 0.5, {x: "0%", ease: Power2.easeOut}, '-=0.5')
		} else {
			$('body').removeClass('-overflow-hidden');

			mobileMenuClose
				.to(mobileMenuOverlay, 0.5, {opacity: 0, ease: Power1.easeOut})
				.to(mobileMenu, 0.5, {x: '100%', ease: Power2.easeOut}, '-=0.5')
				.set(mobileMenuOverlay, {display:'none'})
		}
	})

	mobileMenuOverlay.on('click', function() {
		$('.js-grid-icon-mobile-menu').removeClass('-open');
		$('body').removeClass('-overflow-hidden');

		mobileMenuClose
				.to(mobileMenuOverlay, 0.5, {opacity: 0, ease: Power1.easeOut})
				.to(mobileMenu, 0.5, {x: '100%', ease: Power2.easeOut}, '-=0.5')
				.set(mobileMenuOverlay, {display:'none'})
	});

	// SIDE FIXED BLOCK WIDTH
	function getSideFixedBlockWidth() {
		var containerWidth = $('.js-container-block').outerWidth(),
				sideColWidth = $('.js-side-col').outerWidth() - 15,
				windowWidth = $(window).width(),
				sideDistance = (windowWidth - containerWidth) / 2;

		sideFixedBlockWidth = sideDistance + sideColWidth;
		sideFixedBlockWidth = Math.round(sideFixedBlockWidth);
	}

	if (desktop) {
		getSideFixedBlockWidth();
		$('.js-side-fixed-block').css('width', sideFixedBlockWidth);
	} else {
		sideFixedBlockWidth = "0";
		$('.js-side-fixed-block').css('width', '100%');
	}

	$(window).on('resize', function() {
		if (desktop) {
			getSideFixedBlockWidth();
			$('.js-side-fixed-block').css('width', sideFixedBlockWidth);
		} else {
			sideFixedBlockWidth = "0";
			$('.js-side-fixed-block').css('width', '100%');
		}
	});

	// BACKGROUND BLOCK WIDTH
	function getBgBlockWidth() {
		var windowWidth = $(window).width();

		backgroundBlockWidth = windowWidth - sideFixedBlockWidth;
	}

	getBgBlockWidth();
	if (!$('body').hasClass('preloader-for-home-init')) {
		$('.js-background-block').css('width', backgroundBlockWidth);
	}

	$(window).on('resize', function() {
		getBgBlockWidth();
		if (!$('body').hasClass('preloader-for-home-init')) {
			$('.js-background-block').css('width', backgroundBlockWidth);
		}
	});

	// BACKGROUND STRIP
	if (!$('body').hasClass('preloader-for-home-init')) {
		$('.js-background-strip').css('width', '87%');
	}

	// ADDITIANAL TEXT
	$('.js-additional-text').css('right', backgroundBlockWidth);
	$(window).on('resize', function() {
		$('.js-additional-text').css('right', backgroundBlockWidth);
	});

	// LETTERING INIT
	function letteringWords(preloaderInit) {
		$('.js-lettering').lettering('words').children('span').lettering();

		if (!preloaderInit) {
			$('.js-deep-lettering').lettering().children('span').lettering();
		}
	}

	// REMOVE LETTERING
	function removeLettering() {
		$('.js-lettering, .js-deep-lettering').each(function() {
			var textValue = $(this).attr('aria-label');
			$(this).empty();
			$(this).text(textValue);
		});
	}

	// STANDART GOOGLE MAP
	function initMap() {

		// custom html marker
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
				div.style.left = (point.x - 4) + 'px';
				div.style.top = (point.y - 8) + 'px';
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
		// custom html marker END

		var coordinates = new google.maps.LatLng(49.997360, 36.229653),
		zoom = 14;

		var map = new google.maps.Map(document.getElementById('js-map'), {
			center: coordinates,
			zoom: zoom,
			disableDefaultUI: true,
			zoomControl: false,
			fullscreenControl: false,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			styles: [{"featureType":"all","elementType":"all","stylers":[{"saturation":"0"},{"visibility":"on"},{"color":"#231453"}]},{"featureType":"all","elementType":"geometry","stylers":[{"saturation":"0"},{"lightness":"0"},{"color":"#231453"}]},{"featureType":"all","elementType":"labels","stylers":[{"color":"#231453"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":"0"},{"color":"#5b507f"},{"lightness":"0"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#130a32"},{"lightness":"0"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#231453"},{"lightness":"0"},{"saturation":"0"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#231453"},{"lightness":"0"},{"weight":"1"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"on"},{"gamma":"1"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#110a2d"},{"lightness":"0"},{"saturation":"0"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#110a2d"},{"lightness":"0"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#7f7797"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"lightness":"0"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"lightness":"0"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#231453"},{"lightness":"0"},{"saturation":"0"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#231453"},{"lightness":"0"},{"weight":"0.20"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#231453"},{"lightness":"0"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"lightness":"0"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"lightness":"0"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#231453"},{"lightness":"0"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"color":"#231453"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"lightness":"0"},{"gamma":"1"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"lightness":"0"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#231453"},{"lightness":"0"}]},{"featureType":"transit","elementType":"labels","stylers":[{"color":"#231453"},{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#231453"},{"lightness":"0"},{"gamma":"1"}]}]
		});

		var overlay = new CustomMarker(
			coordinates,
			map,
			{
				marker_id: '123'
			}
		);
	}

	if ($('#js-map').length) {
		initMap();
	}

	// disable scrolling, when mouseenter to map
	var disableScrolling = true;
	var enableScrolling = true;

	/*$(document).on("mousemove", function(event) {
		if (!$(event.target).closest('#js-map').length) {
			if(enableScrolling) {
				enableScrolling = false;
				disableScrolling = true;

				$('.js-custom-scrollbar').mCustomScrollbar("update");
			}
		} else {
			if(disableScrolling) {
				disableScrolling = false;
				enableScrolling = true;

				$('.js-custom-scrollbar').mCustomScrollbar("disable");
			}
		}
	});*/

	$('#js-map').on({
		mouseover: function(){
			if(disableScrolling) {
				disableScrolling = false;
				enableScrolling = true;

				$('.js-custom-scrollbar').mCustomScrollbar("disable");
			}
		},
		mouseout: function(){
			if(enableScrolling) {
				enableScrolling = false;
				disableScrolling = true;

				$('.js-custom-scrollbar').mCustomScrollbar("update");
			}
		}
	});

	// FORM NOT EMTY CHECK
	$('.js-not-emty-check').blur(function() {
		if( !$(this).val() ) {
			$(this).closest('.animated-input').removeClass('-active'); 
		} else {
			$(this).closest('.animated-input').addClass('-active');
		}
	});

	$('.js-not-emty-check').on('focus', function() {
		$(this).closest('.animated-input').addClass('-active');
	});

	// MAIN SLIDER INIT
	if ($('.js-image-slider').length) {
		sliceRevealer();
		uncover();
	}

	// BACKGROUND SQUARES BLOCK PARALLAX
	var targetElements = $('.js-parallax-scene').get();
	var scenes = [];

	for (var i = 0; i < targetElements.length; i++) {
		scenes.push(new Parallax(targetElements[i], {
			selector : '.js-parallax-item'
		}));
	}

	// LANGUAGE SWITCHING
	setTimeout(function() {
		var set_locale_to = function(locale) {
			if (locale) {
				$.i18n().locale = locale;
			}

			$('body').i18n();
		};

		// set language switching in attributes
		function setLanguageSwitchingToAtrr() {
			$('.js-prev-slide').attr('data-tooltipe-text', $.i18n('portfolio-home-prev-slide'));
			$('.js-next-slide').attr('data-tooltipe-text', $.i18n('portfolio-home-next-slide'));

			$('.js-grid-icon').attr('data-tooltipe-text', $.i18n('portfolio-global-grid-icon-tooltipe-open'));
			$('.grid-icon:not(.js-grid-icon)').attr('data-tooltipe-text', $.i18n('portfolio-global-grid-icon-tooltipe-close'));

			$('.js-submit-button').attr('value', $.i18n('portfolio-contacts-form-submit-text'));

			$('.js-thanks-text-name').attr('data-tooltipe-text', $.i18n('portfolio-contacts-thanks-tooltipe'));

			$('.js-preview-tooltipe').attr('data-tooltipe-text', $.i18n('portfolio-project-section-preview-tooltipe'));

			$.extend($.validator.messages, {
				required: $.i18n('portfolio-contacts-form-validation-required-text'),
				email: $.i18n('portfolio-contacts-form-validation-email-text'),
				minlength: $.validator.format($.i18n('portfolio-contacts-form-validation-minlength-text')),
			});
		}

		$.i18n().load({
			'en': './libs/i18n/en.json',
			'ru': './libs/i18n/ru.json'
		}).done(function() {
			set_locale_to($.i18n().locale);

			// first init
			letteringWords(document.preloaderForPagesInit);

			setLanguageSwitchingToAtrr();

			// for preloader
			$('.js-preloader-for-pages .js-deep-lettering').removeAttr('data-i18n');

			// language switching
			$('.js-switch-locale').on('click', 'a', function(e) {
				e.preventDefault();
				var lang = $(this).data('locale');

				function onClickLanguageSwitching() {
					$('.js-preloader-for-pages .js-deep-lettering').attr('data-i18n', 'portfolio-preloader-text');

					removeLettering();

					// switching language
					set_locale_to(lang);

					letteringWords();
					setLanguageSwitchingToAtrr();
					// for trigger translation of validation errors
					$('#js-contact-form').find('input:not([type="submit"])').trigger('keyup');

					TweenMax.set($('.js-main-slider-text .slider-text-item.-current .js-main-title [class^="char"]'), {y: 0})
					TweenMax.set($('.js-main-slider-text .slider-text-item.-current .js-description [class^="char"]'), {y: 0})
				}

				var languageSwitching = new TimelineMax();

				languageSwitching
					.set($('.js-preloader-switch-lang'), {display:'block'})
					.to($('.js-preloader-switch-lang'), 0.5, {opacity: 0.9, ease: Power1.easeInOut, onComplete: onClickLanguageSwitching })
					.to($('.js-preloader-switch-lang'), 0.5, {opacity: 0, ease: Power1.easeInOut}, '+=0.5')
					.set($('.js-preloader-switch-lang'), {display:'none'})
			});
		})
	}, 100);

	// SET CURRENT YEAR IN COPYRIGHT
	var currentYear = (new Date()).getFullYear();
	$('.js-set-current-year').text(currentYear);

	if (desktop) {
		partOfPreloaderSpeed = 0.5;
	} else {
		partOfPreloaderSpeed = 0;
	}

	$(window).on('resize', function() {
		if (desktop) {
			partOfPreloaderSpeed = 0.5;
		} else {
			partOfPreloaderSpeed = 0;
		}
	});

	// SCROLL TOP BUTTON
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 100) {
			$('.js-scroll-top-btn').addClass('-show');
		} else {
			$('.js-scroll-top-btn').removeClass('-show');
		}
	});

	if ($(document).scrollTop() > 100) {
		$('.js-scroll-top-btn').addClass('-show');
	}

	// 2) сlick event to scroll to top
	var scrollingComplete = true;

	$('.js-scroll-top').on('click', function() {

		if (scrollingComplete) {
			scrollingComplete = false;

			$('body, html').animate({
				scrollTop: 0
			}, 1000 ).promise().done(function() {
				scrollingComplete = true;
			});

			return false;
		}
	});

	// CONTACT FORM
	$('#js-contact-form .js-submit-button.-disabled').on('click', function(e) {
		e.preventDefault();
	});

	$('#js-contact-form').submit(function(e) {
		e.preventDefault();
	});

	$('#js-contact-form').validate({
		submitHandler: function(form) {
			$.ajax({
				url:'https://formspree.io/evgeniy.vashchuk.mail@gmail.com',
				method: 'POST',
				data: $(form).serialize(),
				dataType: 'json',

				beforeSend: function() {
					// show loading animation
					$(form).find('.js-ajax-loading').css('opacity', 1);

					// disable submit button
					$(form).find('.js-submit-button').addClass('-disabled');
				},

				success: function(data) {
					// hide loading animation
					$(form).find('.js-ajax-loading').css('opacity', 0);

					// cleaning fields
					$(form).find('input:not([type="submit"]), textarea').val('');
					$(form).find('.animated-input').removeClass('-active');

					$(form).find('.js-success-message > p').addClass('-is-visible');

					setTimeout(function() {
						$(form).find('.js-success-message > p').removeClass('-is-visible');

						setTimeout(function() {
							$(form).find('.js-submit-button').removeClass('-disabled');
						}, 1500)
					}, 4000)
				},

				error: function(err) {
					// hide loading animation
					$(form).find('.js-ajax-loading').css('opacity', 0);

					$(form).find('.js-success-message').addClass('d-none');
					$(form).find('.js-error-message').removeClass('d-none');

					setTimeout(function() {
						$(form).find('.js-error-message > p').addClass('-is-visible');
					}, 100)

					setTimeout(function() {
						$(form).find('.js-error-message > p').removeClass('-is-visible');

						setTimeout(function() {
							$(form).find('.js-success-message').removeClass('d-none');
							$(form).find('.js-error-message').addClass('d-none');

							$(form).find('.js-submit-button').removeClass('-disabled');
						}, 1500)
					}, 4000)
				}
			});
		}
	});

	// custom validation pattern for email field
	$.validator.methods.email = function( value, element ) {
		return this.optional( element ) || /[a-z]+@[a-z]+\.[a-z]+/.test( value );
	}




	$('#someForm').on('submit', function(e) {
		e.preventDefault();
		
		//get the name field value
		var name = $('#name').val();
		//get the name field value
		var email = $('#email').val();
		//get the comments
		var comments = $('#comments').val();
					
		//pretend we don't need validation
		
		//send to formspree
		$.ajax({
			url:'https://formspree.io/evgeniy.vashchuk.mail@gmail.com',
			method:'POST',
			data:{
				name:name,
				_replyto:email,
				 email:email,
				comments:comments,
				_subject:'My Form Submission',
			},
			dataType:"json",

			success:function() {
				console.log('success');	
				$('#formBlock').hide();
				$('#thankyouBlock').show();
			}	

		});		
		
	});
}

// ======================================
// DOCUMENT READY SCRIPTS END ======================================
// ======================================

$(window).on('load',function(){
	windowOnLoadScripts();
});

$(document).ready(function(){

	documentReadyScripts();

	Barba.Pjax.start();

	Barba.Dispatcher.on('transitionCompleted', function() {
		windowOnLoadScripts();
		documentReadyScripts();
	});

	var preloaderBlock = $('.js-preloader-for-pages');

	document.preloaderForPagesInit = false;

	var pageTransition = Barba.BaseTransition.extend({
		start: function() {
			Promise
				.all([this.newContainerLoading, this.fadeOut()])
				.then(this.fadeIn.bind(this));
		},

		fadeOut: function() {
			var deferred = Barba.Utils.deferred();

			var fadeOutTimeline = new TimelineMax({
				onStart: function() {
					// for preloader text switching language
					document.preloaderForPagesInit = true;
					$('.js-preloader-for-pages .js-deep-lettering').removeAttr('data-i18n');
				},

				onComplete: function() {
					deferred.resolve();
				}
			});

			fadeOutTimeline
				// disable link clicking
				.set($('a'), {className: '+=-disable-link'})
				// show preloader text
				.set($('.js-preloader-for-pages .preloader-for-pages__text'), {display:'block'})
				// preloader animation
				.set(preloaderBlock, {width: sideFixedBlockWidth})
				.to(preloaderBlock, partOfPreloaderSpeed, {height: '100%', ease: Power1.easeInOut})
				.to(preloaderBlock, 1, {width: '100%', ease: Expo.easeInOut})
				.staggerTo($('.js-preloader-for-pages > .deep-slide-up-text > span > span'), 0.01, {ease: Expo.easeInOut, x: '0%'}, 0.04, '-=0.6');

			return deferred.promise;
		},

		fadeIn: function() {
			$(this.oldContainer).hide();

			var fadeInTimeline = new TimelineMax({
				delay: 0.5,

				onComplete: function() {
					// for preloader text switching language
					document.preloaderForPagesInit = false;
					$('.js-preloader-for-pages .js-deep-lettering').attr('data-i18n', 'portfolio-preloader-text');
				}
			});

			if (desktop === false) {
				// scroll to top
				jQuery('html,body').animate({scrollTop:0},0);

				// remove overflow hidden
				$('body').removeClass('-overflow-hidden');
			}

			function initPageAnimations() {
				// PROGRESS BARS ANIMATION
				scrollTrigger($('.js-progress-bars'), 20, progressBarsInit);

				// BOTTOM CIRCLE BUTTON ANIMATION
				scrollTrigger($('.js-bottom-circle-link'), 10, bottomCircleButtonAnimation);

				// SLIDE UP TEXT ANIMATION
				setTimeout(function(){
					scrollTrigger($('.js-slide-up-text'), 10, slideUpTextAnimation);
				}, 1);

				// REVEAL ANIMATION
				setTimeout(function(){
					scrollTrigger($('.js-reveal-animation'), 10, revealAnimation);
				}, 1);

				// ANIMATIONS ON MOBILE
				// slide up text
				if (desktop === false) {
					$('.js-slide-up-text').waypoint({
						handler: function() {
							$(this.element).addClass('-is-visible');
						},

						offset: '90%'
					})
				}

				// progress bars
				if ($('.js-progress-bars').length && desktop === false) {
					$('.js-progress-bars').waypoint({
						handler: function() {
							progressBars($(this.element), 4000);
						},

						offset: '90%'
					})
				}

				if (desktop === false) {
					// reveal animation
					$('.js-reveal-animation').waypoint({
						handler: function() {
							$(this.element).addClass('-animate');
						},

						offset: '90%'
					})

					// bottom circle button
					$('.js-bottom-circle-link').waypoint({
						handler: function() {
							TweenMax.to($(this.element), 1.5, {y: 0, ease: Power4.easeInOut});
						},

						offset: '120%'
					})
				}

				// MAIN SLIDER TEXT ANIMATION
				TweenMax.staggerTo($('.slider-text-item[data-text-position="0"] .js-main-title [class^="char"]'), 1, {ease: Power4.easeOut, y: '0%'}, 0.07);
				TweenMax.staggerTo($('.slider-text-item[data-text-position="0"] .js-description [class^="char"]'), 1, {ease: Power4.easeOut, y: '0%'}, 0.01);
			}

			fadeInTimeline
				// preloader animation
				.staggerTo($('.js-preloader-for-pages > .deep-slide-up-text > span > span'), 0.01, {ease: Expo.easeInOut, x: '-100%'}, 0.04)
				.to(preloaderBlock, 1, {width: sideFixedBlockWidth, ease: Expo.easeInOut, onComplete: initPageAnimations})
				.to(preloaderBlock, 0.4, {height: 0, ease: Power1.easeInOut})
				// hide preloader text
				.set($('.js-preloader-for-pages .preloader-for-pages__text'), {display:'none'});

			this.done();
		}
	});

	Barba.Pjax.getTransition = function() {
		return pageTransition;
	};

});

}(jQuery));