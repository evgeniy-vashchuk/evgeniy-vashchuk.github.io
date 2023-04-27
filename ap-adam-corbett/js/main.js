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
	config: {
		preloader: '.js-preloader',
		preloaderText: '.js-preloader-text',
		portfolioTabs: '.js-portfolio-tabs',
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

	status: {
		categoryChange: false,
		currentActiveTab: null,
		currentActiveTabIsFeatured: null,
		currentCategory: '',
		lightboxTextIsShown: false
	},

	instances: {
		previous: null,
		current: null
	},

	initPreloader: function initPreloader() {
		var preloaderTimeline = gsap.timeline({ paused: true }),
			$this = this;

		function onComplete() {
			$this.openLightbox(0, 0);
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
			$this.blockHorizontalScroll();
			$this.hideLightboxHeader();
			$this.hideLastLightboxTextSlide();
		}

		function onComplete() {
			$this.unblockHorizontalScroll();

			$($this.config.carouselFrame).scrollLeft(0);
			$($this.config.indexBlock).addClass('open');
			gsap.to($this.config.portfolioTabs, { ease: Power1.easeInOut, opacity: 1, duration: 0.75 });

			$.fancybox.close();
		}

		openIndexTimeline.add('start');
		openIndexTimeline.to('body', { ease: Power4.easeNone, backgroundColor: '#000000', duration: this.config.indexAnimationDuration }, 'start');
		openIndexTimeline.to(this.config.indexBlock, { ease: Power4.easeInOut, y: 0, duration: this.config.indexAnimationDuration }, 'start');
		openIndexTimeline.to(this.config.portfolioTabs, { ease: Power4.easeInOut, y: '-100%', duration: this.config.indexAnimationDuration }, 'start');
		if ($('body').hasClass('fancybox-active')) {
			openIndexTimeline.to($.fancybox.getInstance().$refs.container.find('.fancybox-inner'), { ease: Power4.easeInOut, y: '-100%', duration: this.config.indexAnimationDuration }, 'start');
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
			$this.blockHorizontalScroll();
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
			transitionDuration: 1000
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

			portfolio.setBackgroundColor();
		});

		$(this.config.portfolioTabs).skeletabs(options, classes);

		$(portfolio.config.portfolioTabs).on('skeletabs:move', function (event, info) {
			$this.status.currentActiveTab = info.nextIndex;
			$this.status.currentActiveTabIsFeatured = $this.status.currentActiveTab === $this.config.featuredTabIndex ? true : false;

			$this.setBackgroundColor();
			info.$currentPanel.find($this.config.carouselFrame).scrollLeft(0);
			$this.blockHorizontalScroll();
		});

		$(portfolio.config.portfolioTabs).on('skeletabs:moved', function (event, info) {
			$this.initHorizontalScrollOnHover();
			$this.unblockHorizontalScroll();
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

	isTouchDevice: function isTouchDevice() {
		return 'ontouchstart' in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0;
	},

	initHorizontalScrollOnHover: function initHorizontalScrollOnHover() {
		var isTouch = this.isTouchDevice();

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

				window.requestAnimationFrame(updateScroll);
			}

			window.requestAnimationFrame(updateScroll);
		};

		if (!isTouch) {
			$(this.config.carouselFrame).each(function () {
				$(this).makeCarousel();
			});
		}

		// const $this = this;

		// $(this.config.carouselFrame).each(function() {
		// 	let carouselFrameWidth = $(this).innerWidth(),
		// 			carouselFrameList = $(this).find($this.config.carouselFrameList),
		// 			carouselFrameListWidth = carouselFrameList[0].scrollWidth;

		// 	if (carouselFrameWidth < carouselFrameListWidth) {
		// 		$($this.config.portfolioTabs).on('mousemove', function(e) {
		// 			let scrollValue = ((carouselFrameWidth - carouselFrameListWidth) * (e.pageX / carouselFrameWidth).toFixed(3)).toFixed(1);

		// 			carouselFrameList.scrollLeft(Math.abs(scrollValue))
		// 		});
		// 	}
		// });
	},

	openSliderLightbox: function openSliderLightbox() {
		var openSliderLightboxTimeline = gsap.timeline();

		openSliderLightboxTimeline.
		add('start').
		to(this.config.portfolioTabs, { ease: Power1.easeInOut, opacity: 0, duration: 0.75 }, 'start');
	},

	closeSliderLightbox: function closeSliderLightbox() {
		var openSliderLightboxTimeline = gsap.timeline();

		openSliderLightboxTimeline.
		add('start').
		to(this.config.portfolioTabs, { ease: Power1.easeInOut, opacity: 1, duration: 0.75 }, 'start');
	},

	getCurrentCategoryIndex: function getCurrentCategoryIndex(category) {
		return $(this.config.fancyboxLink + '[data-fancybox="' + category + '"]').eq(0).closest(this.config.tabWithCarousel).attr('data-category-index');
	},

	getNextCategoryIndex: function getNextCategoryIndex(instance) {
		var currentCategoryName = instance.current.opts.fancybox,
			currentCategoryIndex = this.getCurrentCategoryIndex(currentCategoryName);

		return +currentCategoryIndex + 1 === $(this.config.tabWithCarousel).length ? 1 : +currentCategoryIndex + 1;
	},

	openLightbox: function openLightbox(categoryIndex, photoIndex) {
		$(this.config.tabWithCarousel + '[data-category-index="' + categoryIndex + '"] ' + this.config.fancyboxLink + '').eq(photoIndex).trigger('click');
	},

	openLightboxOnIndex: function openLightboxOnIndex(indexListLink) {
		var category = indexListLink.attr('data-category'),
			categoryIndex = +this.getCurrentCategoryIndex(category.replace(' ', '-')),
			index = $(this.config.indexListLink + '[data-category="' + category + '"]').index(indexListLink);

		this.changeTab(categoryIndex);
		this.openLightbox(categoryIndex, index);
		this.lightboxAppearanceAnimation(this.instances.current, 'fromTop');
		this.closeIndex();
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

	lightboxAppearanceAnimation: function lightboxAppearanceAnimation(instance, direction) {
		var appearanceAnimationTimeline = gsap.timeline(),
			lightbox = instance.$refs.container.find('.fancybox-inner'),
			transform = 0;

		if (direction === 'fromTop') {
			transform = '-100%';
		} else if (direction === 'fromBottom') {
			transform = '100%';
		}

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

	initSliderLightbox: function initSliderLightbox() {
		var $this = this;

		$.fancybox.defaults.btnTpl.goToNextCategory = '<button data-fancybox-index-menu class="fancybox-button fancybox-button--go-to-next-category ' + $this.config.goToNextCategory.substring(1) + '">Next category</button>';

		$(this.config.fancyboxLink).fancybox({
			toolbar: true,
			buttons: ['goToNextCategory'],
			keyboard: false,
			animationDuration: 800,
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
			btnTpl: {
				arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left"></button>',
				arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right"></button>'
			},

			onInit: function onInit(instance) {
				$this.instances.previous = $this.instances.current;
				$this.instances.current = instance;
			},

			beforeShow: function beforeShow(instance, slide) {
				$this.showLightboxHeader();
				$this.openSliderLightbox();

				if ($($this.config.lightboxCaption).text() !== slide.opts.caption) {
					gsap.effects.swapText($this.config.lightboxCaption, { text: slide.opts.caption });
				}

				if ($this.isLastSlide(instance)) {
					$($this.config.lightboxCaption).addClass('disabled');
					$this.insertLightboxLastSlideText(slide.src.innerText);
					$this.showLightboxTextSlide();
				} else {
					$($this.config.lightboxCaption).removeClass('disabled');
				}

				$this.status.currentCategory = slide.opts.caption.replace(' ', '-');
			},

			beforeClose: function beforeClose(instance, slide) {
				if (!$this.config.categoryChange) $this.closeSliderLightbox();

				$this.config.categoryChange = false;
			},

			afterShow: function afterShow(instance, slide) {
				if (instance.group.length - 1 === instance.currIndex && slide.opts.fancybox !== 'featured') {
					instance.$refs.navigation.addClass('d-none');
				} else {
					instance.$refs.navigation.removeClass('d-none');
				}
			}
		});

		$(this.config.lightboxCloseMenuBtn).on('click', function () {
			$this.hideLightboxHeader();
			$this.hideLastLightboxTextSlide();
			$.fancybox.close();
		});

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

		$(this.config.indexBtn).on('click', function () {
			$this.openIndex();
		});

		$('body').on('click', this.config.goToNextCategory, function () {
			var instance = $.fancybox.getInstance(),
				nextCategoryIndex = $this.getNextCategoryIndex(instance);

			$this.config.categoryChange = true;
			$this.hideLastLightboxTextSlide();
			$this.changeTab(nextCategoryIndex);
			$this.openLightbox(nextCategoryIndex, 0);
			$this.lightboxAppearanceAnimation($this.instances.current, 'fromBottom');
			$this.instances.previous.close();
		});

		$($this.config.indexListLink).on('click', function (e) {
			e.preventDefault();

			$this.openLightboxOnIndex($(this));
		});
	},

	init: function init() {
		var $this = this;

		this.initHorizontalScrollOnHover();
		this.initHoverOnIndex();
		this.initSliderLightbox();

		setTimeout(function () {
			$this.initTabs();
		}, 100);
	}
};