/*function sliceRevealer(){
	{
		// duration
		var backgroundImageAnimation = 700,
				smallNumberingAnimation = 700,
				bigNumberingAnimation = 1400,
				mainTextAnimation = 600;

		var bigNumbering = document.getElementById('big-numbering'),
				bigNumberingWrap = document.getElementById('big-numbering-wrap'),
				smallNumbering = document.querySelector('.js-small-numbering');

		var quantityOfSlides;

		// the settings for each one of the slides uncover instances.
		const uncoverOpts = [
			{
				// total number of slices.
				slicesTotal: 8,
				// slices color.
				slicesColor: '#111',
				// 'vertical' || 'horizontal'.
				orientation: 'horizontal',
				// 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
				slicesOrigin: {show: 'left', hide: 'left'}
			}
		];

		class Slideshow {
			constructor(el) {
				this.DOM = {el: el};
				this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slide'));
				this.slidesTotal = this.DOM.slides.length;
				this.current = 0;
				this.uncoverItems = [];
				this.DOM.slides.forEach((slide,pos) => this.uncoverItems.push(new Uncover(slide.querySelector('.slide__img'), uncoverOpts[pos])));
				this.init();
			}
			init() {
				// small-numbering quantity of slides
				quantityOfSlides = this.DOM.slides.length - 1;
				document.querySelector('.js-quantity-of-slides').textContent = '0' + quantityOfSlides;

				// creating pagination
				var paginationWrapper = document.querySelector('.js-pagination');
				var paginationItemText = document.querySelectorAll('.js-main-title');

				for (var i = 0; i < quantityOfSlides + 1; i++) {
					var paginationItem = document.createElement('span');
							paginationItem.className = 'pagination__item slide-bg -from-left -gray';

					var paginationItemTextBlock = document.createElement('span');
							paginationItemTextBlock.className = 'pagination__text';

					if (i === 0) {
						paginationItemTextBlock.innerHTML = 'intro';
						paginationItemTextBlock.setAttribute('data-i18n', 'portfolio-home-intro-label');
					} else {
						paginationItemTextBlock.innerHTML = paginationItemText[i].innerText;
					}

					paginationItem.appendChild(paginationItemTextBlock);
					paginationWrapper.appendChild(paginationItem);
				}

				this.isAnimating = true;
				this.DOM.slides[this.current].classList.add('slide--current');
				this.isAnimating = false;

				this.uncoverItems[this.current].show(true, {
					image: {
						duration: 0,
						delay: 0,
						easing: 'easeOutCubic',
						scale: [1.6,1],
					},
					slices: {
						duration: 0
					}
				}).then(() => this.isAnimating = false);
			}
			navigate(pos) {
				// =======================
				// INTRO ANIMATION =======================
				// =======================

				if ( this.isAnimating || this.current === pos || pos < 0 || pos > this.slidesTotal - 1 ) return;
				this.isAnimating = true;
				const oldItem = this.uncoverItems[this.current];

				// bir numbering animation
				TweenMax.to(bigNumberingWrap, bigNumberingAnimation/1000, {y: '100%', ease: Expo.easeOut});

				// small numbering animation
				var slidingTop = new TimelineMax(),
						slidingBottom = new TimelineMax();

				function changeCurrentText() {
					smallNumbering.textContent = '0' + pos;
				}

				var difference = pos - this.current;

				if (difference < 0 && difference !== -quantityOfSlides || difference === quantityOfSlides) {
					// top direction
					slidingTop
						.to(smallNumbering, smallNumberingAnimation/1000, {y: '-100%', ease: Expo.easeOut, onComplete: changeCurrentText})
						.to(smallNumbering, smallNumberingAnimation/1000, {y: '0%', ease: Expo.easeOut, delay: 0.2,});
				} else if (difference > 0 || difference === -quantityOfSlides) {
					// bottom direction
					slidingBottom
						.to(smallNumbering, smallNumberingAnimation/1000, {y: '100%', ease: Expo.easeOut, onComplete: changeCurrentText})
						.to(smallNumbering, smallNumberingAnimation/1000, {y: '0%', ease: Expo.easeOut, delay: 0.2,});
				}

				// main text animation
				var slideMainTitle = new TimelineMax(),
						slideMainDescription = new TimelineMax(),

						currentSliderMainTitleChars = $('.slider-text-item[data-text-position='+pos+'] .js-main-title [class^="char"]'),
						currentSliderDescriptionChars = $('.slider-text-item[data-text-position='+pos+'] .js-description [class^="char"]'),

						previousSliderMainTitleChars = $('.slider-text-item[data-text-position='+this.current+'] .js-main-title [class^="char"]'),
						previousSliderDescriptionChars = $('.slider-text-item[data-text-position='+this.current+'] .js-description [class^="char"]');

				if (difference < 0 && difference !== -quantityOfSlides || difference === quantityOfSlides) {
					// top direction
					slideMainTitle
						.staggerTo(previousSliderMainTitleChars, mainTextAnimation/1000, {ease: Power4.easeOut, y: '-100%'}, 0.07);

					slideMainDescription
						.staggerTo(previousSliderDescriptionChars, mainTextAnimation/1000, {ease: Power4.easeOut, y: '-100%'}, 0.01);
				} else if (difference > 0 || difference === -quantityOfSlides) {
					// bottom direction
					slideMainTitle
						.staggerTo(previousSliderMainTitleChars, mainTextAnimation/1000, {ease: Power4.easeOut, y: '100%'}, 0.07);

					slideMainDescription
						.staggerTo(previousSliderDescriptionChars, mainTextAnimation/1000, {ease: Power4.easeOut, y: '100%'}, 0.01);
				}

				// =======================
				// INTRO ANIMATION END =======================
				// =======================

				this.uncoverItems[this.current].hide(true, {
						image: {
							duration: backgroundImageAnimation,
							delay: 100,
							easing: 'easeOutCubic',
							scale: [1,1.6]
						}
					}).then(() => {

					// =======================
					// OUTRO ANIMATION =======================
					// =======================

					this.DOM.slides[this.current].classList.remove('slide--current');
					this.current = pos;

					const newItem = this.uncoverItems[this.current];
					newItem.hide();

					this.DOM.slides[this.current].classList.add('slide--current');
					newItem.show(true, {
						image: {
							duration: backgroundImageAnimation,
							delay: 200,
							easing: 'easeOutCubic',
							scale: [1.6,1]
						}
					}).then(() => this.isAnimating = false);

					// big numbering animation
					bigNumbering.textContent = '0' + this.current;
					TweenMax.to(bigNumberingWrap, bigNumberingAnimation/1000, {y: '50%', ease: Expo.easeOut});

					// set explore button link
					var exploreButtonLink = $('.js-explore-button-links > li[data-project-link-position='+pos+']').attr('data-project-link');
					$('.js-explore-button').attr('href', exploreButtonLink);

					// main text animation
					// active class
					$('.js-main-slider-text .slider-text-item').removeClass('-current');
					$('.js-main-slider-text .slider-text-item[data-text-position='+pos+']').addClass('-current');

					if (difference < 0 && difference !== -quantityOfSlides || difference === quantityOfSlides) {
						// top direction
						slideMainTitle
							.to(currentSliderMainTitleChars, 0, {y: '-100%'})
							.staggerTo(currentSliderMainTitleChars, mainTextAnimation/1000, {ease: Power4.easeOut, y: '0%'}, 0.07);

						slideMainDescription
							.to(currentSliderDescriptionChars, 0, {y: '-100%'})
							.staggerTo(currentSliderDescriptionChars, mainTextAnimation/1000, {ease: Power4.easeOut, y: '0%'}, 0.01);
					} else if (difference > 0 || difference === -quantityOfSlides) {
						// bottom direction
						slideMainTitle
							.to(currentSliderMainTitleChars, 0, {y: '100%'})
							.staggerTo(currentSliderMainTitleChars, mainTextAnimation/1000, {ease: Power4.easeOut, y: '0%'}, 0.07);

						slideMainDescription
							.to(currentSliderDescriptionChars, 0, {y: '100%'})
							.staggerTo(currentSliderDescriptionChars, mainTextAnimation/1000, {ease: Power4.easeOut, y: '0%'}, 0.01);
					}

					// =======================
					// OUTRO ANIMATION END =======================
					// =======================
				});
			}
		}

		// Preload all the images in the page.
		imagesLoaded(document.querySelectorAll('.slide__img'), {background: true}, () => {
			document.body.classList.remove('loading');

			const slideshow = new Slideshow(document.querySelector('.slides'));

			const pagination = document.querySelector('.pagination');
			const triggers = Array.from(pagination.querySelectorAll('.pagination__item'));
			triggers.forEach((trigger,pos) => {
				if ( pos === 0 ) {
					trigger.classList.add('pagination__item--current');
				}
				trigger.addEventListener('click', () => {
					if ( slideshow.isAnimating ) return;
					slideshow.navigate(pos);
					pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
					trigger.classList.add('pagination__item--current');
				})
			});

			var initTriggersOfSlider;

			if ($(window).width() < 1150) {
				initTriggersOfSlider = false;
			} else {
				initTriggersOfSlider = true;
			}

			$(window).resize(function() {
				if ($(window).width() < 1150) {
					initTriggersOfSlider = false;
				} else {
					initTriggersOfSlider = true;
				}
			});

			// KEYDOWN TOP/DOWN
			$(document).unbind('keydown');

			$(document).bind('keydown', (ev) => {
				if ($('.js-grid-icon').hasClass('-open')) return
				if (initTriggersOfSlider === false) return;
				if ($('body').hasClass('preloader-for-home-init')) return

				if ( slideshow.isAnimating ) return;
				const keyCode = ev.keyCode || ev.which;
				let newpos;
				if ( keyCode === 38 ) {
					newpos = slideshow.current > 0 ? slideshow.current-1 : slideshow.slidesTotal-1;
					slideshow.navigate(newpos);
				}
				else if ( keyCode === 40 ) {
					newpos = slideshow.current < slideshow.slidesTotal-1 ? slideshow.current+1 : 0;
					slideshow.navigate(newpos);
				}
				else return;
				pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
				triggers[newpos].classList.add('pagination__item--current');
			});

			// SCROLL DIRECTION
			$('body').unbind('mousewheel');

			$('body').bind('mousewheel', function(event) {
				if ($('.js-grid-icon').hasClass('-open')) return
				if (initTriggersOfSlider === false) return;
				if ($('body').hasClass('preloader-for-home-init')) return

				if (slideshow.isAnimating) return;
				let newpos;

				if(event.deltaY > 0) {
					newpos = slideshow.current > 0 ? slideshow.current-1 : slideshow.slidesTotal-1;
					slideshow.navigate(newpos);
				}

				else if(event.deltaY < 0) {
					newpos = slideshow.current < slideshow.slidesTotal-1 ? slideshow.current+1 : 0;
					slideshow.navigate(newpos);
				}

				else return;
				pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
				triggers[newpos].classList.add('pagination__item--current');
			});

			// PREV / NEXT SLIDE
			$('.js-slider-navigation').unbind('click');

			$('.js-slider-navigation').bind('click', function() {
				if ( slideshow.isAnimating ) return;
				if (initTriggersOfSlider === false) return;
				if ($('body').hasClass('preloader-for-home-init')) return

				let newpos;

				if($(this).hasClass('js-prev-slide')) {
					newpos = slideshow.current > 0 ? slideshow.current-1 : slideshow.slidesTotal-1;
					slideshow.navigate(newpos);
				}

				else if($(this).hasClass('js-next-slide')) {
					newpos = slideshow.current < slideshow.slidesTotal-1 ? slideshow.current+1 : 0;
					slideshow.navigate(newpos);
				}

				else return;
				pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
				triggers[newpos].classList.add('pagination__item--current');
			});

		});
	}
}*/

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function sliceRevealer() {
	{
		// duration
		var backgroundImageAnimation = 700,
				smallNumberingAnimation = 700,
				bigNumberingAnimation = 1400,
				mainTextAnimation = 600;

		var bigNumbering = document.getElementById('big-numbering'),
				bigNumberingWrap = document.getElementById('big-numbering-wrap'),
				smallNumbering = document.querySelector('.js-small-numbering');

		var quantityOfSlides;

		// the settings for each one of the slides uncover instances.
		var uncoverOpts = [{
			// total number of slices.
			slicesTotal: 8,
			// slices color.
			slicesColor: '#111',
			// 'vertical' || 'horizontal'.
			orientation: 'horizontal',
			// 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
			slicesOrigin: { show: 'left', hide: 'left' }
		}];

		var Slideshow = function () {
			function Slideshow(el) {
				var _this = this;

				_classCallCheck(this, Slideshow);

				this.DOM = { el: el };
				this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slide'));
				this.slidesTotal = this.DOM.slides.length;
				this.current = 0;
				this.uncoverItems = [];
				this.DOM.slides.forEach(function (slide, pos) {
					return _this.uncoverItems.push(new Uncover(slide.querySelector('.slide__img'), uncoverOpts[pos]));
				});
				this.init();
			}

			_createClass(Slideshow, [{
				key: 'init',
				value: function init() {
					var _this2 = this;

					// small-numbering quantity of slides
					quantityOfSlides = this.DOM.slides.length - 1;
					document.querySelector('.js-quantity-of-slides').textContent = '0' + quantityOfSlides;

					// creating pagination
					var paginationWrapper = document.querySelector('.js-pagination');
					var paginationItemText = document.querySelectorAll('.js-main-title');

					for (var i = 0; i < quantityOfSlides + 1; i++) {
						var paginationItem = document.createElement('span');
						paginationItem.className = 'pagination__item slide-bg -from-left -gray';

						var paginationItemTextBlock = document.createElement('span');
						paginationItemTextBlock.className = 'pagination__text';

						if (i === 0) {
							paginationItemTextBlock.innerHTML = 'intro';
							paginationItemTextBlock.setAttribute('data-i18n', 'portfolio-home-intro-label');
						} else {
							paginationItemTextBlock.innerHTML = paginationItemText[i].innerText;
						}

						paginationItem.appendChild(paginationItemTextBlock);
						paginationWrapper.appendChild(paginationItem);
					}

					this.isAnimating = true;
					this.DOM.slides[this.current].classList.add('slide--current');
					this.isAnimating = false;

					this.uncoverItems[this.current].show(true, {
						image: {
							duration: 0,
							delay: 0,
							easing: 'easeOutCubic',
							scale: [1.6, 1]
						},
						slices: {
							duration: 0
						}
					}).then(function () {
						return _this2.isAnimating = false;
					});
				}
			}, {
				key: 'navigate',
				value: function navigate(pos) {
					var _this3 = this;

					// =======================
					// INTRO ANIMATION =======================
					// =======================

					if (this.isAnimating || this.current === pos || pos < 0 || pos > this.slidesTotal - 1) return;
					this.isAnimating = true;
					var oldItem = this.uncoverItems[this.current];

					// bir numbering animation
					TweenMax.to(bigNumberingWrap, bigNumberingAnimation / 1000, { y: '100%', ease: Expo.easeOut });

					// small numbering animation
					var slidingTop = new TimelineMax(),
							slidingBottom = new TimelineMax();

					function changeCurrentText() {
						smallNumbering.textContent = '0' + pos;
					}

					var difference = pos - this.current;

					if (difference < 0 && difference !== -quantityOfSlides || difference === quantityOfSlides) {
						// top direction
						slidingTop.to(smallNumbering, smallNumberingAnimation / 1000, { y: '-100%', ease: Expo.easeOut, onComplete: changeCurrentText }).to(smallNumbering, smallNumberingAnimation / 1000, { y: '0%', ease: Expo.easeOut, delay: 0.2 });
					} else if (difference > 0 || difference === -quantityOfSlides) {
						// bottom direction
						slidingBottom.to(smallNumbering, smallNumberingAnimation / 1000, { y: '100%', ease: Expo.easeOut, onComplete: changeCurrentText }).to(smallNumbering, smallNumberingAnimation / 1000, { y: '0%', ease: Expo.easeOut, delay: 0.2 });
					}

					// main text animation
					var slideMainTitle = new TimelineMax(),
							slideMainDescription = new TimelineMax(),
							currentSliderMainTitleChars = $('.slider-text-item[data-text-position=' + pos + '] .js-main-title [class^="char"]'),
							currentSliderDescriptionChars = $('.slider-text-item[data-text-position=' + pos + '] .js-description [class^="char"]'),
							previousSliderMainTitleChars = $('.slider-text-item[data-text-position=' + this.current + '] .js-main-title [class^="char"]'),
							previousSliderDescriptionChars = $('.slider-text-item[data-text-position=' + this.current + '] .js-description [class^="char"]');

					if (difference < 0 && difference !== -quantityOfSlides || difference === quantityOfSlides) {
						// top direction
						slideMainTitle.staggerTo(previousSliderMainTitleChars, mainTextAnimation / 1000, { ease: Power4.easeOut, y: '-100%' }, 0.07);

						slideMainDescription.staggerTo(previousSliderDescriptionChars, mainTextAnimation / 1000, { ease: Power4.easeOut, y: '-100%' }, 0.01);
					} else if (difference > 0 || difference === -quantityOfSlides) {
						// bottom direction
						slideMainTitle.staggerTo(previousSliderMainTitleChars, mainTextAnimation / 1000, { ease: Power4.easeOut, y: '100%' }, 0.07);

						slideMainDescription.staggerTo(previousSliderDescriptionChars, mainTextAnimation / 1000, { ease: Power4.easeOut, y: '100%' }, 0.01);
					}

					// =======================
					// INTRO ANIMATION END =======================
					// =======================

					this.uncoverItems[this.current].hide(true, {
						image: {
							duration: backgroundImageAnimation,
							delay: 100,
							easing: 'easeOutCubic',
							scale: [1, 1.6]
						}
					}).then(function () {

						// =======================
						// OUTRO ANIMATION =======================
						// =======================

						_this3.DOM.slides[_this3.current].classList.remove('slide--current');
						_this3.current = pos;

						var newItem = _this3.uncoverItems[_this3.current];
						newItem.hide();

						_this3.DOM.slides[_this3.current].classList.add('slide--current');
						newItem.show(true, {
							image: {
								duration: backgroundImageAnimation,
								delay: 200,
								easing: 'easeOutCubic',
								scale: [1.6, 1]
							}
						}).then(function () {
							return _this3.isAnimating = false;
						});

						// big numbering animation
						bigNumbering.textContent = '0' + _this3.current;
						TweenMax.to(bigNumberingWrap, bigNumberingAnimation / 1000, { y: '50%', ease: Expo.easeOut });

						// set explore button link
						var exploreButtonLink = $('.js-explore-button-links > li[data-project-link-position=' + pos + ']').attr('data-project-link');
						$('.js-explore-button').attr('href', exploreButtonLink);

						// main text animation
						// active class
						$('.js-main-slider-text .slider-text-item').removeClass('-current');
						$('.js-main-slider-text .slider-text-item[data-text-position=' + pos + ']').addClass('-current');

						if (difference < 0 && difference !== -quantityOfSlides || difference === quantityOfSlides) {
							// top direction
							slideMainTitle.to(currentSliderMainTitleChars, 0, { y: '-100%' }).staggerTo(currentSliderMainTitleChars, mainTextAnimation / 1000, { ease: Power4.easeOut, y: '0%' }, 0.07);

							slideMainDescription.to(currentSliderDescriptionChars, 0, { y: '-100%' }).staggerTo(currentSliderDescriptionChars, mainTextAnimation / 1000, { ease: Power4.easeOut, y: '0%' }, 0.01);
						} else if (difference > 0 || difference === -quantityOfSlides) {
							// bottom direction
							slideMainTitle.to(currentSliderMainTitleChars, 0, { y: '100%' }).staggerTo(currentSliderMainTitleChars, mainTextAnimation / 1000, { ease: Power4.easeOut, y: '0%' }, 0.07);

							slideMainDescription.to(currentSliderDescriptionChars, 0, { y: '100%' }).staggerTo(currentSliderDescriptionChars, mainTextAnimation / 1000, { ease: Power4.easeOut, y: '0%' }, 0.01);
						}

						// =======================
						// OUTRO ANIMATION END =======================
						// =======================
					});
				}
			}]);

			return Slideshow;
		}();

		// Preload all the images in the page.

		imagesLoaded(document.querySelectorAll('.slide__img'), { background: true }, function () {
			document.body.classList.remove('loading');

			var slideshow = new Slideshow(document.querySelector('.slides'));

			var pagination = document.querySelector('.pagination');
			var triggers = Array.from(pagination.querySelectorAll('.pagination__item'));
			triggers.forEach(function (trigger, pos) {
				if (pos === 0) {
					trigger.classList.add('pagination__item--current');
				}
				trigger.addEventListener('click', function () {
					if (slideshow.isAnimating) return;
					slideshow.navigate(pos);
					pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
					trigger.classList.add('pagination__item--current');
				});
			});

			var initTriggersOfSlider;

			if ($(window).width() < 1150) {
				initTriggersOfSlider = false;
			} else {
				initTriggersOfSlider = true;
			}

			$(window).resize(function() {
				if ($(window).width() < 1150) {
					initTriggersOfSlider = false;
				} else {
					initTriggersOfSlider = true;
				}
			});

			// KEYDOWN TOP/DOWN
			$(document).unbind('keydown');

			$(document).bind('keydown', function (ev) {
				if ($('.js-grid-icon').hasClass('-open')) return;
				if (initTriggersOfSlider === false) return;
				if ($('body').hasClass('preloader-for-home-init')) return;

				if (slideshow.isAnimating) return;
				var keyCode = ev.keyCode || ev.which;
				var newpos = void 0;
				if (keyCode === 38) {
					newpos = slideshow.current > 0 ? slideshow.current - 1 : slideshow.slidesTotal - 1;
					slideshow.navigate(newpos);
				} else if (keyCode === 40) {
					newpos = slideshow.current < slideshow.slidesTotal - 1 ? slideshow.current + 1 : 0;
					slideshow.navigate(newpos);
				} else return;
				pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
				triggers[newpos].classList.add('pagination__item--current');
			});

			// SCROLL DIRECTION
			$('body').unbind('mousewheel');

			$('body').bind('mousewheel', function (event) {

				if ($('.js-grid-icon').hasClass('-open')) return;
				if (initTriggersOfSlider === false) return;
				if ($('body').hasClass('preloader-for-home-init')) return;

				if (slideshow.isAnimating) return;
				var newpos = void 0;

				if (event.deltaY > 0) {
					newpos = slideshow.current > 0 ? slideshow.current - 1 : slideshow.slidesTotal - 1;
					slideshow.navigate(newpos);
				} else if (event.deltaY < 0) {
					newpos = slideshow.current < slideshow.slidesTotal - 1 ? slideshow.current + 1 : 0;
					slideshow.navigate(newpos);
				} else return;
				pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
				triggers[newpos].classList.add('pagination__item--current');
			});

			// PREV / NEXT SLIDE
			$('.js-slider-navigation').unbind('click');

			$('.js-slider-navigation').bind('click', function () {
				if (slideshow.isAnimating) return;
				if (initTriggersOfSlider === false) return;
				if ($('body').hasClass('preloader-for-home-init')) return;

				var newpos = void 0;

				if ($(this).hasClass('js-prev-slide')) {
					newpos = slideshow.current > 0 ? slideshow.current - 1 : slideshow.slidesTotal - 1;
					slideshow.navigate(newpos);
				} else if ($(this).hasClass('js-next-slide')) {
					newpos = slideshow.current < slideshow.slidesTotal - 1 ? slideshow.current + 1 : 0;
					slideshow.navigate(newpos);
				} else return;
				pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
				triggers[newpos].classList.add('pagination__item--current');
			});
		});
	}
}