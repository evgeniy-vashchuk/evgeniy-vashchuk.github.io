'use strict';

gsap.registerEffect({
	name: 'swapText',
	effect: function effect(targets, config) {
		var tl = gsap.timeline({ delay: config.delay });

		tl.to(targets, { opacity: 0, duration: config.duration / 2 });
		tl.add(function () {return targets[0].innerText = config.text;});
		tl.to(targets, { opacity: 1, duration: config.duration });

		return tl;
	},
	defaults: { duration: 0.5 },
	extendTimeline: true
});

jQuery(window).on('load', function ($) {
	portfolio.initPreloader();
});

jQuery(function ($) {
	portfolio.init();
});

var portfolio = {
	scrollingAnimationId: undefined,

	config: {
		preloader: '.js-preloader',
		preloaderText: '.js-preloader-text',
		portfolioTabs: '.js-portfolio-tabs',
		portfolioTabsContent: '.js-portfolio-tabs-content',
		portfolioNavigation: '.js-portfolio-navigation',
		portfolioAuthorBadge: '.js-portfolio-author-badge',
		featuredTabBtn: '.js-featured-btn',
		featuredTabIndex: $('.js-featured-btn').closest('li').index(),
		indexBlock: '.js-index-block',
		indexBlockCloseBtn: '.js-index-block-close-btn',
		indexBlockCategoryName: '.js-index-block-category-name',
		indexList: '.js-index-list',
		indexListLink: '.js-index-list-link',
		indexBtn: '.js-index-btn',
		indexAnimationDuration: 1.5,
		carouselFrame: '.js-carousel-frame',
		carouselFrameList: '.js-carousel-frame-list',
		fancyboxLink: '.js-fancybox',
		indexBtnForLightbox: '.js-index-btn-for-lightbox',
		lightboxCloseMenuBtn: '.js-lightbox-close-menu-btn',
		lightboxCaption: '.js-lightbox-caption',
		lightboxTextSlide: '.js-lightbox-text-slide',
		lightboxLastSlide: '.js-fancybox-last-slide',
		headerForLightbox: '.js-header-for-lightbox',
		tabWithCarousel: '.js-tab-with-carousel',
		goToNextCategory: '.js-go-to-next-category'
	},

	fancyboxOptions: {
		toolbar: true,
		buttons: ['goToNextCategory'],
		keyboard: false,
		animationDuration: 1200,
		transitionEffect: 'slide',
		transitionDuration: 600,
		hash: false,
		wheel: false,
		zoomOpacity: false,
		clickContent: false,
		infobar: false,
		idleTime: false,
		touch: false,
		clickSlide: false,
		backFocus: false,
		btnTpl: {
			arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left"></button>',
			arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right"></button>'
		}
	},

	status: {
		categoryChange: false,
		currentActiveTab: null,
		currentActiveTabIsFeatured: null,
		currentCategory: '',
		itIsLastTextSlide: false,
		lightboxTextIsShown: false,
		nextCategoryIndex: 0,
		nextCategoryId: 0,
		indexIsShown: false
	},

	instances: {
		current: null,
		zoomAnimation: []
	},

	// helper functions
	isTouchDevice: function isTouchDevice() {
		return 'ontouchstart' in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0;
	},
	// helper functions END

	initPreloader: function initPreloader() {
		var preloaderTimeline = gsap.timeline({ paused: true }),
			$this = this;

		function onComplete() {
			$this.openLightbox('featured', 0);
			$this.lightboxAppearanceAnimation($.fancybox.getInstance(), 'fromBottom');
		}

		preloaderTimeline.
		to(this.config.preloaderText + '.second', { ease: Power4.easeNone, display: 'flex', opacity: 1, duration: 0.75 }, '+=2').
		to(this.config.preloader, { ease: Power4.easeNone, display: 'none', opacity: 0, duration: 0.75 }, '+=2').
		add(onComplete, '<-0.5');

		preloaderTimeline.play();
	},

	blockHorizontalScroll: function blockHorizontalScroll() {
		$(this.config.portfolioTabs).addClass('disable');
	},

	unblockHorizontalScroll: function unblockHorizontalScroll() {
		$(this.config.portfolioTabs).removeClass('disable');
	},

	openIndex: function openIndex() {
		var $this = this;

		var openIndexTimeline = gsap.timeline({
			onStart: onStart,
			onComplete: onComplete
		});

		function onStart() {
			$this.status.indexIsShown = true;

			$this.blockHorizontalScroll();
			$this.hideLightboxHeader();
			$this.hideLastLightboxTextSlide();
			$this.changeTabOnIndex();
		}

		function onComplete() {
			$this.unblockHorizontalScroll();

			$($this.config.carouselFrame).scrollLeft(0);
			$($this.config.indexBlock).addClass('open');
			gsap.to($this.config.portfolioTabs, { ease: Power1.easeInOut, opacity: 1, duration: 0.75 });

			if ($('body').hasClass('fancybox-active')) $this.hideZoomLightboxes();
			$.fancybox.close(true);
		}

		openIndexTimeline.add('start');
		openIndexTimeline.to('body', { ease: Power4.easeNone, backgroundColor: '#000000', duration: this.config.indexAnimationDuration }, 'start');
		openIndexTimeline.to(this.config.indexBlock, { ease: Power4.easeInOut, y: 0, duration: this.config.indexAnimationDuration }, 'start');
		openIndexTimeline.to(this.config.portfolioTabs, { ease: Power4.easeInOut, y: '-100%', duration: this.config.indexAnimationDuration }, 'start');
		if ($('body').hasClass('fancybox-active')) {
			openIndexTimeline.to(this.instances.current.$refs.container.find('.fancybox-inner'), { ease: Power4.easeInOut, y: '-100%', duration: this.config.indexAnimationDuration }, 'start');
		}
		openIndexTimeline.to(this.config.indexBlockCloseBtn, { ease: Power4.easeInOut, opacity: 1, duration: 1 }, '-=1');
	},

	closeIndex: function closeIndex() {
		var $this = this;

		var closeIndexTimeline = gsap.timeline({
			onStart: onStart,
			onComplete: onComplete
		});

		function onStart() {
			$this.status.indexIsShown = false;

			$this.blockHorizontalScroll();
			$this.resetHorizontalScrolling();
			$this.initHorizontalScrollOnHover();
			$($this.config.indexBlock).removeClass('open');
		}

		function onComplete() {
			$this.unblockHorizontalScroll();
			$($this.config.indexBlock).scrollTop(0);
		}

		closeIndexTimeline.
		add('start').
		to(this.config.indexBlock, { ease: Power4.easeInOut, y: '100%', duration: this.config.indexAnimationDuration }, 'start').
		to(this.config.portfolioTabs, { ease: Power4.easeInOut, y: 0, duration: this.config.indexAnimationDuration }, 'start').
		to(this.config.indexBlockCloseBtn, { ease: Power4.easeInOut, opacity: 0, duration: 1 }, 'start');

		this.setBackgroundColor();
	},

	initTabs: function initTabs() {
		var $this = this;

		var options = {
			history: false,
			keyboard: false,
			breakpoint: false,
			transitionDuration: 0
		};

		var classes = {
			tabGroup: 'portfolio-navigation',
			tabItem: 'portfolio-navigation__item',
			tab: 'portfolio-navigation__btn',
			panelGroup: 'portfolio-tabs-content',
			panel: 'portfolio-tabs-content__item',
			active: 'active'
		};

		$(portfolio.config.portfolioTabs).on('skeletabs:init', function (event, info) {
			$this.status.currentActiveTab = info.currentIndex;
			$this.status.currentActiveTabIsFeatured = $this.status.currentActiveTab === $this.config.featuredTabIndex ? true : false;

			if (!$this.status.indexIsShown) $this.setBackgroundColor();
			// $this.detectIsInViewport(info.$currentPanel);
			$this.detectIsInViewport();
		});

		$(this.config.portfolioTabs).skeletabs(options, classes);

		$(portfolio.config.portfolioTabs).on('skeletabs:move', function (event, info) {
			$this.status.currentActiveTab = info.nextIndex;
			$this.status.currentActiveTabIsFeatured = $this.status.currentActiveTab === $this.config.featuredTabIndex ? true : false;

			if (!$this.status.indexIsShown) $this.setBackgroundColor();
			info.$currentPanel.find($this.config.carouselFrame).scrollLeft(0);
			$this.blockHorizontalScroll();
		});

		$(portfolio.config.portfolioTabs).on('skeletabs:moved', function (event, info) {
			$this.resetHorizontalScrolling();
			$this.initHorizontalScrollOnHover();
			$this.unblockHorizontalScroll();
			// $this.detectIsInViewport(info.$currentPanel);
		});

		$(this.config.indexBtn).on('click', function () {
			portfolio.openIndex();

			return false;
		});

		$(this.config.indexBlockCloseBtn).on('click', function () {
			$this.closeIndex();
		});
	},

	changeTab: function changeTab(index) {
		$(this.config.portfolioTabs).skeletabs('goTo', index);
	},

	changeTabOnIndex: function changeTabOnIndex() {
		var $this = this,
			currentTabIndex = this.status.currentActiveTab;

		$(this.config.indexListLink).on({
			mouseenter: function mouseenter() {
				var categoryName = $(this).attr('data-category'),
					categoryIndex = $this.getCurrentCategoryIndex(categoryName);

				if ($this.status.indexIsShown) {
					$this.changeTab(categoryIndex);
				}
			},
			mouseleave: function mouseleave() {
				if ($this.status.indexIsShown) {
					$this.changeTab(currentTabIndex);
				}
			}
		});
	},

	setBackgroundColor: function setBackgroundColor() {
		if (this.status.currentActiveTabIsFeatured) {
			gsap.to('body', { ease: Power4.easeNone, backgroundColor: '#DDDDDD', duration: this.config.indexAnimationDuration });
		} else {
			gsap.to('body', { ease: Power4.easeNone, backgroundColor: '#FFFFFF', duration: this.config.indexAnimationDuration });
		}
	},

	initHoverOnIndex: function initHoverOnIndex() {
		var indexList = $(this.config.indexList),
			indexBlockCategoryName = $(this.config.indexBlockCategoryName);

		$(this.config.indexListLink).on({
			mouseenter: function mouseenter() {
				var category = $(this).attr('data-category');

				indexBlockCategoryName.text(category);
				indexBlockCategoryName.addClass('show');

				indexList.addClass('hover-active');
			},
			mouseleave: function mouseleave() {
				indexBlockCategoryName.removeClass('show');
				indexList.removeClass('hover-active');
			}
		});
	},

	detectIsInViewport: function detectIsInViewport(activeTab) {
		$(this.config.fancyboxLink).removeClass('is-in-viewport');

		// activeTab.find(this.config.fancyboxLink).each(function() {
		$(this.config.fancyboxLink).each(function () {
			if (ScrollTrigger.isInViewport($(this)[0], 0.5, true)) {
				$(this).addClass('is-in-viewport');
			} else {
				$(this).removeClass('is-in-viewport');
			}
		});
	},

	initHorizontalScrollOnHover: function initHorizontalScrollOnHover() {
		var isTouch = this.isTouchDevice(),
			$this = this;

		$.fn.makeCarousel = function () {
			var speed = 0,
				scroll = 0,
				container = $(this),
				container_w = container.width(),
				max_scroll = container[0].scrollWidth - container.outerWidth(),
				prev_frame = new Date().getTime();

			container.on('mousemove', function (e) {
				var mouse_x = e.pageX - container.offset().left,
					mouseperc = 100 * mouse_x / container_w;

				speed = mouseperc - 50;
			});

			container.on('mouseleave', function (e) {
				speed = 0;
			});

			function updateScroll() {
				var cur_frame = new Date().getTime();
				var time_elapsed = cur_frame - prev_frame;

				prev_frame = cur_frame;

				if (speed !== 0) {
					scroll += speed * time_elapsed / 50;

					if (scroll < 0) scroll = 0;
					if (scroll > max_scroll) scroll = max_scroll;

					container.scrollLeft(scroll);
				}

				$this.scrollingAnimationId = requestAnimationFrame(updateScroll);
			}

			$this.scrollingAnimationId = requestAnimationFrame(updateScroll);
		};

		if (!isTouch) {
			// $(this.config.carouselFrame).each(function() {
			// 	$(this).makeCarousel();
			// });

			var activeTabCarouselFrame = $($this.config.tabWithCarousel + '.active ').find($this.config.carouselFrame);

			if (activeTabCarouselFrame.length) {
				activeTabCarouselFrame.makeCarousel();
			}
		}

		// $(this.config.carouselFrame).on('scroll', function() {
		// 	// $this.detectIsInViewport($($this.config.tabWithCarousel + '.active '));
		// 	$this.detectIsInViewport();
		// });
	},

	updateIsInViewportOnScroll: function updateIsInViewportOnScroll() {
		var $this = this;

		$(this.config.carouselFrame).on('scroll', function () {
			// $this.detectIsInViewport($($this.config.tabWithCarousel + '.active '));
			$this.detectIsInViewport();
		});
	},

	resetHorizontalScrolling: function resetHorizontalScrolling() {
		cancelAnimationFrame(this.scrollingAnimationId);
	},

	openSliderLightbox: function openSliderLightbox() {
		var openSliderLightboxTimeline = gsap.timeline();

		openSliderLightboxTimeline.
		add('start').
		to(this.config.portfolioNavigation, { ease: Power1.easeInOut, opacity: 0, duration: 0.75 }, 'start').
		to(this.config.portfolioAuthorBadge, { ease: Power1.easeInOut, opacity: 0, duration: 0.75 }, 'start');
	},

	closeSliderLightbox: function closeSliderLightbox() {
		var openSliderLightboxTimeline = gsap.timeline();

		openSliderLightboxTimeline.
		add('start').
		to(this.config.portfolioNavigation, { ease: Power1.easeInOut, opacity: 1, duration: 0.75 }, 'start').
		to(this.config.portfolioAuthorBadge, { ease: Power1.easeInOut, opacity: 1, duration: 0.75 }, 'start');

		$('.fancybox-container').css('transform', 'translateX(0)');
	},

	getCurrentCategoryIndex: function getCurrentCategoryIndex(category) {
		return +$(this.config.fancyboxLink + '[data-fancybox="' + category.replace(' ', '-'), +'"]').eq(0).closest(this.config.tabWithCarousel).attr('data-category-index');
	},

	getNextCategoryIndex: function getNextCategoryIndex(instance) {
		var currentCategoryName = instance.current.opts.fancybox,
			currentCategoryIndex = this.getCurrentCategoryIndex(currentCategoryName);

		return +currentCategoryIndex + 1 === $(this.config.tabWithCarousel).length ? 1 : +currentCategoryIndex + 1;
	},

	getNextCategoryId: function getNextCategoryId(index) {
		return $(this.config.tabWithCarousel + '[data-category-index="' + index + '"]').find(this.config.fancyboxLink).attr('data-fancybox');
	},

	openLightbox: function openLightbox(category, photoIndex) {
		return $.fancybox.open($('[data-fancybox="' + category + '"'), this.fancyboxOptions, photoIndex);
	},

	hideLightbox: function hideLightbox() {
		var hideLightboxTimeline = gsap.timeline({
			onStart: onStart,
			onComplete: onComplete
		});

		function onStart() {
			$('body').addClass('lightbox-text-transition');
		}

		function onComplete() {
			$('body').removeClass('lightbox-text-transition');
		}

		hideLightboxTimeline.
		to(this.instances.current.$refs.container, { ease: Power4.easeNone, display: 'none', opacity: 0, duration: 1 });
	},

	showLightbox: function showLightbox() {
		var showLightboxTimeline = gsap.timeline({
			onStart: onStart,
			onComplete: onComplete
		});

		function onStart() {
			$('body').addClass('lightbox-text-transition');
		}

		function onComplete() {
			$('body').removeClass('lightbox-text-transition');
		}

		showLightboxTimeline.
		to(this.instances.current.$refs.container, { ease: Power4.easeNone, display: 'block', opacity: 1, duration: 1 });
	},

	lightboxAppearanceAnimation: function lightboxAppearanceAnimation(instance, direction) {var _this = this;
		var appearanceAnimationTimeline = gsap.timeline(),
			lightbox = instance.$refs.container.find('.fancybox-inner'),
			transform = 0;

		if (direction === 'fromTop') {
			transform = '-100%';
		} else if (direction === 'fromBottom') {
			transform = '100%';
		}

		setTimeout(function () {
			_this.hideZoomLightboxes();
		});

		appearanceAnimationTimeline.
		add('start').
		to(lightbox, { opacity: 0, duration: 0 }, 'start').
		to(lightbox, { y: transform, duration: 0 }, 'start').
		to(lightbox, { opacity: 1, duration: 0 }, 'start').
		to(lightbox, { ease: Power4.easeInOut, y: 0, duration: 2 }, 'start');
	},

	showLightboxHeader: function showLightboxHeader() {
		gsap.to(this.config.headerForLightbox, { ease: Power4.easeNone, display: 'flex', opacity: 1, duration: 1 });
	},

	hideLightboxHeader: function hideLightboxHeader() {
		gsap.to(this.config.headerForLightbox, { ease: Power4.easeNone, display: 'none', opacity: 0, duration: 1 });
	},

	isLastSlide: function isLastSlide(instance) {
		return instance.currIndex === instance.group.length - 1 && !this.status.currentActiveTabIsFeatured ? true : false;
	},

	insertLightboxLastSlideText: function insertLightboxLastSlideText(text) {
		if ($(this.config.lightboxTextSlide).text() !== text) {
			$(this.config.lightboxTextSlide).text(text);
		}
	},

	showLightboxTextSlide: function showLightboxTextSlide() {
		this.status.lightboxTextIsShown = true;
		gsap.to(this.config.lightboxTextSlide, { ease: Power4.easeNone, display: 'flex', opacity: 1, duration: 1 });
	},

	hideLastLightboxTextSlide: function hideLastLightboxTextSlide() {
		this.status.lightboxTextIsShown = false;
		gsap.to(this.config.lightboxTextSlide, { ease: Power4.easeNone, display: 'none', opacity: 0, duration: 1 });
	},

	setZoomTransforms: function setZoomTransforms() {
		var beforeInstancesList = this.instances.zoomAnimation.filter(function (instance) {return instance.position === 'before';}),
			afterInstancesList = this.instances.zoomAnimation.filter(function (instance) {return instance.position === 'after';}),
			centerInstance = this.instances.zoomAnimation.find(function (instance) {return instance.position === 'center';});

		setTimeout(function () {
			beforeInstancesList.forEach(function (beforeInstance, index) {
				var transformValue = '-' + (beforeInstancesList.length - index) + '00%';
				beforeInstance.obj.$refs.container.css('transform', 'translateX(' + transformValue + ')');
			});

			afterInstancesList.forEach(function (afterInstance, index) {
				var transformValue = index + 1 + '00%';
				afterInstance.obj.$refs.container.css('transform', 'translateX(' + transformValue + ')');
			});

			centerInstance.obj.$refs.container.css('transform', 'translateX(0)');
		});
	},

	hideZoomLightboxes: function hideZoomLightboxes() {
		this.instances.zoomAnimation.forEach(function (instance) {
			gsap.to(instance.obj.$refs.container.find('.fancybox-inner'), { opacity: '0', duration: '0' });
		});
	},

	showZoomLightboxes: function showZoomLightboxes() {
		this.instances.zoomAnimation.forEach(function (instance) {
			if (!instance.initial) {
				gsap.to(instance.obj.$refs.container.find('.fancybox-inner'), { opacity: '1', duration: '0' });
			};
		});
	},

	createZoomInstances: function createZoomInstances(initialImage) {
		var $this = this,
			currentCategoryId = this.status.currentActiveTabIsFeatured ? 'featured' : this.status.currentCategory,
			instancesList = [];

		$(this.config.fancyboxLink + '.is-in-viewport' + '[data-fancybox="' + currentCategoryId + '"]').each(function () {var _this2 = this;
			var thisIndex = $(this).index() - 1,
				thisIsInitialImage = initialImage.is($(this)),
				instance = { index: thisIndex, obj: null, initial: false, position: null };

			setTimeout(function () {
				gsap.to($(_this2), { ease: Power1.easeInOut, opacity: 0, duration: 0 });
				gsap.to($($this.config.fancyboxLink + ':not(.is-in-viewport)'), { ease: Power1.easeInOut, opacity: 0, duration: 0.5 });
			}, 50);

			instance.obj = $this.openLightbox(currentCategoryId, thisIndex);
			instance.obj.forZoomAnimations = true;
			instance.obj.$refs.container.addClass('for-zoom-animation');

			if (thisIsInitialImage) {
				instance.initial = true;
				instance.position = 'center';
				gsap.to(instance.obj.$refs.container.find('.fancybox-inner'), { opacity: '0', duration: '0' });
			} else {
				instance.position = instancesList.some(function (instance) {return instance['initial'] === true;}) ? 'after' : 'before';
			}

			instancesList.push(instance);
		});

		this.instances.zoomAnimation = instancesList;
		this.setZoomTransforms();
	},

	updateZoomInstances: function updateZoomInstances(currentInstance) {
		if (!currentInstance.forZoomAnimations && currentInstance.current.opts.$orig.hasClass('is-in-viewport')) {
			var currentActiveSlideIndex = currentInstance.current.opts.$orig.index() - 1,
				inTheInstancesIndex = this.instances.zoomAnimation.findIndex(function (instance) {return instance.index === currentActiveSlideIndex;}),
				gotToActive = false;

			this.instances.zoomAnimation.map(function (instance) {instance.initial = false;instance.position = undefined;});
			this.instances.zoomAnimation[inTheInstancesIndex].initial = true;
			this.instances.zoomAnimation[inTheInstancesIndex].position = 'center';
			this.instances.zoomAnimation.map(function (instance) {
				if (instance.initial) gotToActive = true;

				if (!instance.initial) {
					instance.position = !gotToActive ? "before" : "after";
				}
			});
		}
	},

	initSliderLightbox: function initSliderLightbox() {
		var $this = this,
			init = false;

		// init fancybox
		$.fancybox.defaults.btnTpl.goToNextCategory = '<button data-fancybox-index-menu class="fancybox-button fancybox-button--go-to-next-category ' + $this.config.goToNextCategory.substring(1) + '">Next category</button>';
		$(this.config.fancyboxLink).fancybox(this.fancyboxOptions);

		// fancybox events
		$(document).on('onInit.fb', function (e, instance, slide) {
			init = true;
		});

		$(document).on('afterLoad.fb', function (e, instance, slide) {
			if (init && !instance.forZoomAnimations) {
				$this.createZoomInstances(slide.opts.$orig);

				$this.instances.current = instance;
				$this.instances.current.activate();

				init = false;
			}
		});

		$(document).on('beforeShow.fb', function (e, instance, slide) {
			setTimeout(function () {
				if (instance.forZoomAnimations) return;

				$this.showLightboxHeader();
				$this.openSliderLightbox();

				if ($($this.config.lightboxCaption).text() !== slide.opts.caption) {
					gsap.effects.swapText($this.config.lightboxCaption, { text: slide.opts.caption });
				}

				if ($this.isLastSlide(instance)) {
					$this.status.itIsLastTextSlide = true;
					$($this.config.lightboxCaption).addClass('disabled');
					$this.insertLightboxLastSlideText(slide.src.innerText);
					$this.showLightboxTextSlide();
				} else {
					$this.status.itIsLastTextSlide = false;
					$($this.config.lightboxCaption).removeClass('disabled');
				}

				$this.status.currentCategory = slide.opts.caption.replace(' ', '-');
			});
		});

		$(document).on('afterShow.fb', function (e, instance, slide) {
			if (instance.forZoomAnimations) return;

			$this.status.nextCategoryIndex = $this.getNextCategoryIndex(instance);
			$this.status.nextCategoryId = $this.getNextCategoryId($this.status.nextCategoryIndex);

			$('body').addClass('fancybox-disable-transform-transition');

			if (instance.group.length - 1 === instance.currIndex && slide.opts.fancybox !== 'featured') {
				instance.$refs.navigation.addClass('d-none');
			} else {
				instance.$refs.navigation.removeClass('d-none');
			}

			if ($this.isLastSlide(instance)) {
				$this.status.categoryChange = true;
				$.fancybox.close(true);
				$this.changeTab($this.status.nextCategoryIndex);
				gsap.to($($this.config.tabWithCarousel + '.active ').find($this.config.fancyboxLink), { ease: Power1.easeInOut, opacity: 0, duration: 0 });
			}

			$this.hideZoomLightboxes();
			$this.updateZoomInstances(instance);
			$this.setZoomTransforms();
		});

		$(document).on('beforeClose.fb', function (e, instance, slide) {
			if (instance.forZoomAnimations || $this.status.categoryChange) return;
			$('body').removeClass('fancybox-disable-transform-transition');

			$this.hideLightboxHeader();
			$this.closeSliderLightbox();

			if (!instance.current.opts.$orig.hasClass('is-in-viewport')) {
				$this.hideZoomLightboxes();
				gsap.to($($this.config.fancyboxLink), { ease: Power1.easeInOut, opacity: 1, duration: 1 });
			} else {
				$this.showZoomLightboxes();
			}

			gsap.to($($this.config.fancyboxLink + ':not(.is-in-viewport)'), { ease: Power1.easeInOut, opacity: 1, duration: 0.5, delay: 0.75 });

			if ($this.status.lightboxTextIsShown) {
				$this.hideLastLightboxTextSlide();
				$this.hideZoomLightboxes();
				gsap.to($($this.config.fancyboxLink), { ease: Power1.easeInOut, opacity: 1, duration: 1 });
			}
		});

		$(document).on('afterClose.fb', function (e, instance, slide) {
			if (instance.forZoomAnimations || $this.status.categoryChange) return;

			gsap.to($($this.config.fancyboxLink + '.is-in-viewport'), { ease: Power1.easeInOut, opacity: 1, duration: 0 });
			$this.status.categoryChange = false;
		});

		// additional

		// close menu btn
		$(this.config.lightboxCloseMenuBtn).on('click', function () {
			$.fancybox.close(true);

			if ($this.status.itIsLastTextSlide) {
				$('body').removeClass('fancybox-disable-transform-transition');

				$this.hideLightboxHeader();
				$this.closeSliderLightbox();
				$this.hideLastLightboxTextSlide();
				gsap.to($($this.config.fancyboxLink), { ease: Power1.easeInOut, opacity: 1, duration: 1 });
				$this.status.categoryChange = false;
			}
		});

		// show last slide text
		$(this.config.lightboxCaption).on('click', function () {
			var currentCategory = $this.status.currentCategory,
				lastSlideText = $($this.config.lightboxLastSlide + '[data-fancybox="' + currentCategory + '"]').text();

			if (!$this.status.lightboxTextIsShown) {
				$this.insertLightboxLastSlideText(lastSlideText);
				$this.showLightboxTextSlide();
				$this.hideLightbox();
			} else {
				$this.hideLastLightboxTextSlide();
				$this.showLightbox();
			}
		});

		// open index
		$(this.config.indexBtn).on('click', function () {
			$this.openIndex();
		});

		// category change
		$(this.config.lightboxTextSlide).on('click', function () {
			$this.status.categoryChange = true;

			$this.hideLastLightboxTextSlide();
			$this.instances.current = $this.openLightbox($this.status.nextCategoryId, 0);
			$this.lightboxAppearanceAnimation($this.instances.current, 'fromBottom');

			$this.status.categoryChange = false;
		});

		// open lightbox on index
		$(this.config.indexListLink).on('click', function (e) {
			e.preventDefault();

			var categoryName = $(this).attr('data-category'),
				category = categoryName.replace(' ', '-'),
				index = $($this.config.indexListLink + '[data-category="' + categoryName + '"]').index($(this));

			$this.instances.current = $this.openLightbox(category, index);
			$this.lightboxAppearanceAnimation($this.instances.current, 'fromTop');
			$this.closeIndex();
		});
	},

	init: function init() {var _this3 = this;
		this.initHoverOnIndex();
		this.initSliderLightbox();
		this.updateIsInViewportOnScroll();

		setTimeout(function () {
			_this3.initTabs();
			_this3.initHorizontalScrollOnHover();
		}, 100);
	}
};