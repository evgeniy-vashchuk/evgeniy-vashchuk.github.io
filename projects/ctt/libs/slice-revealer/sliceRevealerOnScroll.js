'use strict';

function revealerAnimationInit(speed) {
	{
		var uncoverOpts = [{
			slicesTotal: 6,
			slicesColor: '#fff',
			orientation: 'horizontal',
			slicesOrigin: { show: 'left', hide: 'left' }
		}, {
			slicesTotal: 6,
			slicesColor: '#fff',
			orientation: 'horizontal',
			slicesOrigin: { show: 'right', hide: 'right' }
		}];

		var uncoverAnimation = [{
			show: {
				slices: { duration: speed, delay: function delay(_, i, t) {
						return (t - i - 1) * 100;
					}, easing: 'easeInOutCirc' }
			}
		}];

		var items = Array.from(document.querySelectorAll('.js-scroll-img-wrap'));

		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.intersectionRatio > 0.5) {
					uncoverArr[items.indexOf(entry.target)].show(true, uncoverAnimation[0].show);
				}
			});
		}, { threshold: 0.5 });

		var uncoverArr = [];

		imagesLoaded(document.querySelectorAll('.js-scroll-img'), { background: true }, function () {
			items.forEach(function (item, pos) {
				var animationDirection;

				if ($(item).find('.js-scroll-img').hasClass('-to-left')) {
					animationDirection = 0;
				} else if ($(item).find('.js-scroll-img').hasClass('-to-right')) {
					animationDirection = 1;
				}

				uncoverArr.push(new Uncover(item.querySelector('.js-scroll-img'), uncoverOpts[animationDirection]));
				observer.observe(item);
			});
		});
	}
}