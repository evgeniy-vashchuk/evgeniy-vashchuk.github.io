'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function sliceSlider() {
	{
		// the settings for each one of the slides uncover instances.
		var uncoverOpts = [{
			slicesTotal: 6,
			slicesColor: '#fff',
			orientation: 'horizontal',
			slicesOrigin: { show: 'left', hide: 'left' }
		}];

		var uncoverAnimation = {
			show: {
				slices: { duration: 400, easing: 'easeInOutCirc', delay: function delay(_, i) {
						return i * 50;
					} }
			},
			hide: {
				slices: { duration: 400, easing: 'easeInOutCirc', delay: function delay(_, i) {
						return i * 50;
					} }
			}
		};

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

				// creating pagination
				var paginationBlock = "<div class='slice-revealer-pagination'></div>";

				$('.js-welcome-slider').after(paginationBlock);

				for (var i = 1; i <= this.slidesTotal; i++) {
					$('.slice-revealer-pagination').append('<span class="slice-revealer-pagination__item"></span>');
				}
				// creating pagination END
			}

			_createClass(Slideshow, [{
				key: 'init',
				value: function init() {
					var _this2 = this;

					this.isAnimating = true;
					this.DOM.slides[this.current].classList.add('slide--current');
					this.uncoverItems[this.current].show(true, uncoverAnimation.show).then(function () {
						return _this2.isAnimating = false;
					});
				}
			}, {
				key: 'navigate',
				value: function navigate(pos) {
					var _this3 = this;

					// before
					if (this.isAnimating || this.current === pos || pos < 0 || pos > this.slidesTotal - 1) return;
					this.isAnimating = true;

					// DISCOUNT NUMBER ANIMATION
					var prevDiscountNumber = $('.js-discount-number-list .discount-number-list__item')[this.current];

					var hideToTop = new TimelineMax();

					hideToTop
						.to(prevDiscountNumber, 0.5, { y: '-100%', ease: Power1.easeOut })
						.set(prevDiscountNumber, { className: '-=-current' });

					// DISCOUNT NUMBER ANIMATION END

					// MAIN TEXT ANIMATION
					var prevMainText = $('.js-main-text-list .main-text-list__item')[this.current];

					var hideToLeft = new TimelineMax();

					var mainTextDirection = '';

					if ($(window).width() < 576) {
						mainTextDirection = '100%';
					} else {
						mainTextDirection = '-100%';
					}

					$(window).resize(function () {
						if ($(window).width() < 576) {
							mainTextDirection = '100%';
						} else {
							mainTextDirection = '-100%';
						}
					});

					hideToLeft
						.to(prevMainText, 0.5, { x: mainTextDirection, ease: Power1.easeOut })
						.set(prevMainText, { className: '-=-current' });

					// MAIN TEXT ANIMATION END

					this.uncoverItems[this.current].hide(true, uncoverAnimation.hide).then(function () {
						// after
						_this3.DOM.slides[_this3.current].classList.remove('slide--current');
						_this3.current = pos;

						var newItem = _this3.uncoverItems[_this3.current];
						newItem.hide();
						_this3.DOM.slides[_this3.current].classList.add('slide--current');
						newItem.show(true, uncoverAnimation.show).then(function () {
							return _this3.isAnimating = false;
						});

						// DISCOUNT NUMBER ANIMATION
						var currentDiscountNumber = $('.js-discount-number-list .discount-number-list__item')[pos];

						var showToTop = new TimelineMax();

						showToTop
							.set(currentDiscountNumber, { className: '+=-current' })
							.to(currentDiscountNumber, 1.2, { y: '0%', ease: Expo.easeOut });

						// DISCOUNT NUMBER ANIMATION END

						// MAIN TEXT ANIMATION
						var currentMainText = $('.js-main-text-list .main-text-list__item')[pos];

						var showToLeft = new TimelineMax();

						showToLeft
							.set(currentMainText, { className: '+=-current' })
							.to(currentMainText, 1.2, { x: '0%', ease: Expo.easeOut });

						// MAIN TEXT ANIMATION END
					});
				}
			}]);

			return Slideshow;
		}();

		imagesLoaded(document.querySelectorAll('.slide__img'), { background: true }, function () {

			var slideshow = new Slideshow(document.querySelector('.slides'));
			var pagination = document.querySelector('.slice-revealer-pagination');
			var triggers = Array.from(pagination.querySelectorAll('.slice-revealer-pagination__item'));

			triggers.forEach(function (trigger, pos) {
				if (pos === 0) {
					trigger.classList.add('slice-revealer-pagination__item--current');
				}
				trigger.addEventListener('click', function () {
					if (slideshow.isAnimating) return;
					slideshow.navigate(pos);
					pagination.querySelector('.slice-revealer-pagination__item--current').classList.remove('slice-revealer-pagination__item--current');
					trigger.classList.add('slice-revealer-pagination__item--current');
				});
			});
		});
	}
}