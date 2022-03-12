'use strict';

document.addEventListener("DOMContentLoaded", function (event) {
	initActiveHeaderAfterScroll();
});

// ACTIVE HEADER AFTER SCROLL
function initActiveHeaderAfterScroll() {
	var header = document.getElementsByClassName('js-header')[0];

	window.addEventListener('scroll', function (e) {
		if (window.scrollY > 10) {
			header.classList.add('active');
		} else {
			header.classList.remove('active');
		}
	});

	if (window.scrollY > 10) {
		header.classList.remove('active');
	}
}