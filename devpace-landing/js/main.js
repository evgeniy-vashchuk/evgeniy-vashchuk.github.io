(function($) {
	"use strict";

	$(document).ready(function() {
		iniPreloader();
		initFullPage();
		initBackgroundVideo();
		initMenu();
		initParticleWave();
		initWhiteHeaderOnScrollForMobile();
		initSlider();
		initScene();
		initMap();
		initCustomCursor();
	});

	var mobileBreakpoint = 768,
			isMobile = $(window).width() < mobileBreakpoint,
			isDesktop = $(window).width() >= mobileBreakpoint;

	// INIT PRELOADER
	function iniPreloader(preloaderItem, hideTimeout) {
		function animationAfterHide() {
			var pluginContainer = $('.js-fullpage'),
					activeSection = pluginContainer.find('.js-fullpage-section.active'),
					animationItemsOnActiveSection = activeSection.find('.js-animation-item');

				if (animationItemsOnActiveSection.length && isDesktop) {
					animationItemsOnActiveSection.addClass('-animated');
				}
		}

		// hide preloader by click
		$('.js-preloader').on('click', function() {
			$(this).fadeOut('slow');

			animationAfterHide();
		});

		$(window).on('load', function() {
			// hide preloader
			setTimeout(function() {
				$('.js-preloader').fadeOut('slow');
				animationAfterHide();
			}, 2000);
		});
	}

	// FULL PAGE MENU
	function initFullPage() {
		if (!$('.js-fullpage').length) return;

		function showScrollTopButton(currentIndex, sectionNumber) {
			if (currentIndex >= sectionNumber) {
				$('.js-scroll-top-btn').addClass('-show');
			} else {
				$('.js-scroll-top-btn').removeClass('-show');
			}
		}

		$('.js-fullpage').fullpage({
			sectionSelector: '.js-fullpage-section',
			verticalCentered: false,
			responsiveWidth: mobileBreakpoint,
			responsiveHeight: 600,

			onLeave: function(origin, destination, direction) {
				var destinationSection = $(destination.item),
						animationItems = destinationSection.find('.js-animation-item'),
						destinationSectionColor = destinationSection.attr('data-section-color'),
						destinationSectionIndex = destination.index;

				if (isDesktop) {
					$('.js-animation-item').removeClass('-animated');
					$('.js-hamburger').removeClass('-white -black');
					$('.js-hamburger').addClass('-' + destinationSectionColor);

					if (destinationSectionColor === 'black') {
						$('.js-cursor').addClass('-cursor-black ');
					} else {
						$('.js-cursor').removeClass('-cursor-black ');
					}
				}

				if (animationItems.length && isDesktop) {
					animationItems.addClass('-animated');
				}

				showScrollTopButton(destinationSectionIndex, 3)
			},

			afterRender: function() {
				var pluginContainer = $(this),
						activeSection = $(pluginContainer[0].item),
						activeSectionColor = activeSection.attr('data-section-color');

				if (isDesktop) {
					$('.js-hamburger').removeClass('-white -black');
					$('.js-hamburger').addClass('-' + activeSectionColor);
				}
			}
		});

		// scroll down arrow
		$('.js-next-section').on('click', function(e) {
			e.preventDefault();

			var headerOffset = $('.js-header').outerHeight(),
					idOfTargetElement = $(this).attr('href'),
					top = $(idOfTargetElement).offset().top - headerOffset;

			if (headerOffset === undefined) {
				headerOffset = 0;
			}

			if (isDesktop) {
				fullpage_api.moveSectionDown();
			} else {
				$('body, html').animate({
					scrollTop: top
				}, 1000)
			}
		})

		// scroll top button
		$('.js-scroll-top-btn').on('click', function(e) {
			e.preventDefault();

			fullpage_api.moveTo(1);
		});
	}

	// BACKGROUND VIDEO
	function initBackgroundVideo() {
		if ($(".js-background-video").length) {
			$(".js-background-video").bgVideo({
				showPausePlay: false,
				pauseAfter: 0
			});
		}
	}

	// MENU
	function initMenu() {
		var menuBlock = $('.js-menu');
				menuBlock.get(0).menuInProcess = false;

		function setRoundOverlaySize() {
			var viewportWidth = $(window).width(),
					viewportHeight = $(window).height(),
					viewportDiagonal = Math.sqrt(Math.pow(viewportWidth, 2) + Math.pow(viewportHeight, 2)),
					roundOverlaySize = viewportDiagonal*2;

			$('.js-menu-round-overlay').css({
				"width": roundOverlaySize,
				"height": roundOverlaySize
			});
		}

		$(window).on('resize', function() {
			setRoundOverlaySize();
		});

		// round overlay
		function showRoundOverlay() {
			setRoundOverlaySize();

			$('.js-menu-round-overlay').addClass('-open');

			setTimeout(function() {
				$('.js-menu-round-overlay').fadeOut(500);
			}, 1000)
		}

		function hideRoundOverlay() {
			$('.js-menu-round-overlay').fadeIn(500);

			setTimeout(function() {
				$('.js-menu-round-overlay').removeClass('-open');
			}, 500)
		}

		// hamburger icon
		function openHamburgerIcon() {
			$('.js-hamburger').removeClass('-white').addClass('-active -black');
			$('.js-header').removeClass('-white');
		}

		function closeHamburgerIcon() {
			var activeSectionColor = $('.js-fullpage .js-fullpage-section.active').attr('data-section-color');

			if (isDesktop) {
				if (activeSectionColor === 'white') {
					$('.js-hamburger').removeClass('-black').addClass('-white');
				}
			} else {
				if ($(document).scrollTop() > 10) {
					setTimeout(function() {
						$('.js-header').addClass('-white');
					}, 500)
				} else {
					$('.js-hamburger').removeClass('-black').addClass('-white');
				}
			}

			$('.js-hamburger').removeClass('-active');
		}

		function showMenu() {
			menuBlock.addClass('-open');
		}

		function hideMenu() {
			setTimeout(function() {
				menuBlock.removeClass('-open');
			}, 500)
		}

		function openMenu() {
			menuBlock.get(0).menuInProcess = true;

			openHamburgerIcon();
			showRoundOverlay();
			fullpage_api.setAllowScrolling(false);

			setTimeout(function() {
				showMenu();
			}, 1000);

			setTimeout(function() {
				menuBlock.get(0).menuInProcess = false;
			}, 1500);
		}

		function closeMenu() {
			menuBlock.get(0).menuInProcess = true;

			hideMenu();
			closeHamburgerIcon();
			hideRoundOverlay();
			fullpage_api.setAllowScrolling(true);

			setTimeout(function() {
				menuBlock.get(0).menuInProcess = false;
			}, 1500);
		}

		$('.js-hamburger').on('click', function(e) {
			e.preventDefault();

			if (menuBlock.get(0).menuInProcess) return;

			if ($(this).hasClass('-active')) {
				closeMenu()
			} else {
				openMenu();
			}
		});
	}

	// WHITE MOBILE HEADER
	function initWhiteHeaderOnScrollForMobile() {
		var header = $('.js-header'),
				hamburger = $('.js-hamburger');

		$(window).on('scroll', function() {
			if (isMobile && !$('.js-menu').get(0).menuInProcess) {
				if ($(this).scrollTop() > 10) {
					header.addClass('-white');
					hamburger.addClass('-black');
				} else {
					header.removeClass('-white');
					hamburger.removeClass('-black');
				}
			}
		});

		if ($(document).scrollTop() > 10 && isMobile) {
			header.addClass('-white');
		}
	}

	// PARTICLE WAVE
	function initParticleWave() {
		if (isMobile) return;

		var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
		var container;
		var camera, scene, renderer;
		var backgroundColor, particleColor;
		var particles, particle, count = 0;
		var mouseX = 0, mouseY = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;

		function getHexFromRgb(colorVal) {
			var parts = colorVal.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

			delete(parts[0]);

			for (var i = 1; i <= 3; ++i) {
				parts[i] = parseInt(parts[i]).toString(16);

				if (parts[i].length == 1) parts[i] = '0' + parts[i];
			}

			return parts.join('');
		}

		function init() {
			container = document.getElementsByClassName('js-menu')[0];
			backgroundColor = parseInt('0x' + getHexFromRgb(window.getComputedStyle(container, null).getPropertyValue("background-color") , 16));
			particleColor = parseInt('0x' + container.getAttribute('data-particle-color').replace('#', ''), 16);
			camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
			camera.position.z = 1000; // Good var to change
			scene = new THREE.Scene();
			particles = new Array();
			var PI2 = Math.PI * 2;
			var geometry = new THREE.Geometry();
			var material = new THREE.SpriteCanvasMaterial({
				color: particleColor,
				opacity: 1,
				program: function ( context ) {
					context.beginPath();
					context.arc( 0, 0, 0.4, 0, PI2, true );
					context.fill();
				}
			});

			var i = 0;
			for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
				for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
					particle = particles[ i ++ ] = new THREE.Sprite( material );
					particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
					particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
					scene.add(particle);

					if (i > 0) {
						geometry.vertices.push( particle.position );
					}
				}
			}

			renderer = new THREE.CanvasRenderer();
			renderer.domElement.classList.add('menu__canvas');
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.addEventListener( 'touchstart', onDocumentTouchStart, false, { passive: false } );
			document.addEventListener( 'touchmove', onDocumentTouchMove, false );
			window.addEventListener( 'resize', onWindowResize, false );
		}

		function onWindowResize() {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		function onDocumentMouseMove(event) {
			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;
		}

		function onDocumentTouchStart(event) {
			if (event.touches.length === 1) {
				event.preventDefault();
				mouseX = event.touches[ 0 ].pageX - windowHalfX;
				mouseY = event.touches[ 0 ].pageY - windowHalfY;
			}
		}

		function onDocumentTouchMove( event ) {
			if (event.touches.length === 1) {
				event.preventDefault();
				mouseX = event.touches[ 0 ].pageX - windowHalfX;
				mouseY = event.touches[ 0 ].pageY - windowHalfY;
			}
		}

		function animate() {
			requestAnimationFrame( animate );
			render();
		}

		function render() {
			renderer.setClearColor( backgroundColor, 1);
			camera.position.x += ( mouseX - camera.position.x ) * .05;
			camera.position.y += ( - mouseY - camera.position.y ) * .05;
			camera.lookAt( scene.position );
			var i = 0;
			for (var ix = 0; ix < AMOUNTX; ix++) {
				for (var iy = 0; iy < AMOUNTY; iy++) {
					particle = particles[i++];
					particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
					particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
				}
			}
			renderer.render(scene, camera);
			count += 0.1;
		}

		init();
		animate();
	}

	// INIT SLIDER
	function initSlider() {
		var slider = $('.js-slider'),
				slideDelay,
				animationIsActive = false;

		var dotsIcons = {
			triangle : '<svg class="triangle-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.9 82.9"><path d="M73.8 7.4L78 74.7c.3 5.2-5.1 8.8-9.7 6.5L8.7 52.3C4 50 3.5 43.6 7.8 40.6L63.2 2.2c4.4-3 10.3-.1 10.6 5.2z" fill="none" stroke="#ff9100" stroke-width="2" stroke-miterlimit="10"/></svg>',
			pentagon : '<svg class="pentagon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><defs><clipPath id="a"><path d="M72.014 72.064l-49.337 7.803L0 35.422 35.32.151l44.508 22.645z"/></clipPath></defs><path fill="none" stroke="#ff9100" stroke-miterlimit="20" stroke-width="4" d="M72.014 72.064v0l-49.337 7.803v0L0 35.422v0L35.32.151v0l44.508 22.645v0z" clip-path="url(&quot;#a&quot;)"/></svg>',
			rectangle : '<svg class="rectangle-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 82"><defs><clipPath id="krpma"><path d="M76.399 53.364c-12.247 35.343-28.093 29.852-47.64 23.078C-6.635 64.178-1.151 48.354 5.612 28.835 17.86-6.508 33.706-1.018 53.253 5.756 88.646 18.021 83.163 33.845 76.4 53.364z"/></clipPath></defs><g><g><path fill="none" stroke="#ff9100" stroke-miterlimit="20" stroke-width="4" d="M76.399 53.364c-12.247 35.343-28.093 29.852-47.64 23.078C-6.635 64.178-1.151 48.354 5.612 28.835 17.86-6.508 33.706-1.018 53.253 5.756 88.646 18.021 83.163 33.845 76.4 53.364z" clip-path="url(&quot;#krpma&quot;)"/></g></g></svg>'
		}

		slider
		.on('init', onInit)
		.on('beforeChange', onBeforeChange)
		.on('afterChange', onAfterChange)
		.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: false,
			draggable: false,
			fade: true,
			swipe: false,
			touchMove: false,
			useCSS: true,
			useTransform: false,
			speed: 0,
			infinite: true,
			pauseOnFocus: false,
			pauseOnHover: false,
			responsive: [
				{
					breakpoint: mobileBreakpoint,
					settings: {
						adaptiveHeight: true,
					}
				}
			],
			customPaging : function(slider, i) {
				switch (i + 1) {
					case 1:
						return '<a href="javascript:void(0);" class="js-hover-item">' + dotsIcons.triangle + dotsIcons.triangle + '</a>';
					case 2:
						return '<a href="javascript:void(0);" class="js-hover-item">' + dotsIcons.pentagon + dotsIcons.pentagon + '</a>';
					case 3:
						return '<a href="javascript:void(0);" class="js-hover-item">' + dotsIcons.rectangle + dotsIcons.rectangle + '</a>';
				}
			},
		});

		function onInit(event, slick, direction) {
			slick.$slider.addClass('-add-delay');

			slideDelay = +$(slick.$slides[0]).css('transition-delay').slice(0, -1);
		}

		function onBeforeChange(event, slick, currentSlide, nextSlide) {
			animationIsActive = true;
			slick.$slider.find('.js-slider-animation-item').addClass('fade');
		}

		function onAfterChange(event, slick, currentSlide, nextSlide) {
			setTimeout(function() {
				animationIsActive = false;
				slick.$slider.find('.js-slider-animation-item').removeClass('fade');
			}, slideDelay * 1000);
		}
	}

	// INIT SCENE
	function initScene() {
		var container = $('.js-360-scene'),
				image360 = container.attr('data-img'),
				panorama = new PANOLENS.ImagePanorama( image360 );

		var viewer = new PANOLENS.Viewer({
			container: container.get(0),
			controlBar: false
		});

		viewer.OrbitControls.noZoom = true;
		viewer.add( panorama );
	}

	// INIT GOOGLE MAP
	function initMap() {
		var mapBlock = $('.js-map');

		if (!mapBlock.length) return;

		var coordinates = new google.maps.LatLng(40.712348, -74.006720),
		zoom = 12;

		var map = new google.maps.Map(mapBlock.get(0), {
			center: coordinates,
			zoom: zoom,
			disableDefaultUI: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			styles: [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#63b5e5"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"color":"#f7911d"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20},{"color":"#212121"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8},{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20},{"color":"#212121"}]}]
		});

		// custom icon
		var icon = {
			url: '../img/map-pin.svg',
			scaledSize: new google.maps.Size(42, 60)
		};

		var marker = new google.maps.Marker({
			position: coordinates,
			map: map,
			icon: icon
		});
	}

	// INIT CUSTOM CURSOR
	function initCustomCursor() {
		if (isMobile) return;

		$('body').append('<div class="cursor js-cursor"></div>');
		var cursor = $('.js-cursor');

		function moveCursor(e) {
			gsap.to(cursor, 0.23, {
				left: e.pageX,
				top: e.pageY,
				ease: Power4.easOut
			});
		}

		$('.js-hover-item').on({
			mouseenter: function (event){
				cursor.addClass('-hover-active');
			},
			mouseleave: function (event){
				cursor.removeClass('-hover-active');
			}
		});

		$(window).on('mousemove', moveCursor);
	}

})(jQuery);