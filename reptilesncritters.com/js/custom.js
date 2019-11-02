$(document).ready(function() {

	// CATEGORIES NAVIGATION
	function showCategoriesNavigation() {
		$('.js-categories-navigation').addClass('-show');
		$('html').addClass('-overflow-hidden');
		$('.js-categories-navigation-overlay').fadeIn(300);
	}

	function hideCategoriesNavigation() {
		$('.js-categories-navigation').removeClass('-show');
		$('html').removeClass('-overflow-hidden');
		$('.js-categories-navigation-overlay').fadeOut(300);
	}

	$('.js-hamburger-icon').on('click', function() {
		if (!$(this).hasClass('-active')) {
			// OPEN
			$(this).addClass('-active');
			showCategoriesNavigation();

		} else {
			// CLOSE
			$(this).removeClass('-active');
			hideCategoriesNavigation();
		}
	});

	$('.js-categories-navigation-overlay').on('click', function() {
		$('.js-hamburger-icon').removeClass('-active');
		hideCategoriesNavigation();
	});
	// CATEGORIES NAVIGATION END
});