$(document).ready(function() {

	function showOverlay() {
		$('.js-categories-navigation-overlay').fadeIn(300);
	}

	function hideOverlay() {
		$('.js-categories-navigation-overlay').fadeOut(300);
	}

	function showCategoriesNavigation() {
		$('.js-categories-navigation').addClass('-show');
	}

	function hideCategoriesNavigation() {
		$('.js-categories-navigation').removeClass('-show');
	}

	function openCategoriesNavigation() {
		$(document).on('click', '.js-hamburger-icon:not(.-active)', function() {
			$(this).addClass('-active');
			$('body').addClass('-overflow-hidden');

			showOverlay();
			showCategoriesNavigation();
		});
	}

	function closeCategoriesNavigation() {
		$(document).on('click', '.js-hamburger-icon.-active, .js-categories-navigation-overlay', function(){
			$('.js-hamburger-icon').removeClass('-active');
			$('body').removeClass('-overflow-hidden');

			hideOverlay();
			hideCategoriesNavigation();
		});
	}

	openCategoriesNavigation();
	closeCategoriesNavigation();
});