'use strict';

jQuery(function ($) {
	initAnimationOnScroll();
	initSplitting();
	init3DHover();

	// ANIMATION ON SCROLL
	function initAnimationOnScroll() {
		var target = $('.js-animation-item');

		if (target.length) {
			target.waypoint({
				handler: function handler() {
					if (!this.element.animationInit) {
						this.element.animationInit = true;

						$(this.element).addClass('active');
					}
				},
				offset: '80%' });

		}
	}

	// SPLITTING WORDS
	function initSplitting() {
		var target = document.getElementsByClassName('js-splitting');

		for (var i = 0; i < target.length; i++) {
			var results = Splitting({ target: target[i], by: 'chars' });
		}
	}

	// 3D HOVER
	function init3DHover() {
		if ($('.js-plate').length) {
			$('.js-plate').plate({
				element: '.js-plate-item' });

		}
	}
});