$(document).ready(function() {
	// SHOW CODE BUTTON ARROW
	$('.collapse').on('show.bs.collapse', function () {
		$(this).parent('.component-block-usage').find('.btn').addClass('-open');
	})

	$('.collapse').on('hide.bs.collapse', function () {
		$(this).parent('.component-block-usage').find('.btn').removeClass('-open');
	})

	// PROGRESS BAR
	function progressBar() {
		var winScroll = document.body.scrollTop || document.documentElement.scrollTop,
				height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
				scrolled = (winScroll / height) * 100;
		document.getElementById('progress-bar').style.width = scrolled + "%";
	}

	window.onscroll = function() {
		progressBar()
	};

	// SEARCH
	$('.js-search-input').hideseek({
		highlight: true,
		nodata: 'No results found'
	});

	// scroll to element after search
	$('.js-search-input').on('_after', function() {
		$('.js-list-group > .list-group-item').each(function() {
			if ($(this).is(':visible')) {

				$('html, body').animate({
					scrollTop: $($(this).attr("href")).offset().top
				}, 0);

				return false;
			}
		});
	});

	// SCROLL TOP BUTTON HIDE ON < 1500
	function scrollTopButtonHide() {
		if ($(window).width() < 1500) {

			$(window).on('scroll', function() {
				if ($(this).scrollTop() > 100) {
					$('.js-scroll-top-button').addClass('-show');
				} else {
					$('.js-scroll-top-button').removeClass('-show');
				}
			});

			if ($(document).scrollTop() > 100) {
				$('.js-scroll-top-button').addClass('-show');
			}

		}
	}

	scrollTopButtonHide();

	$(window).on('resize', function() {
		scrollTopButtonHide();
	});

	// SCROLL TOP BUTTON WITH FOOTER
	function scrollTopBtnWithFooter() {
		$(window).on('scroll', function() {
			if ($(window).width() < 1500) {
					var pageHeight = $(document).height(),
							bottomOfPage = $(document).scrollTop() + $(window).height(),
							footerHeight = $('.js-footer').outerHeight();

					if (pageHeight === bottomOfPage) {
						$('.js-scroll-top-button').css('bottom', footerHeight);
					} else {
						$('.js-scroll-top-button').css('bottom', 0);
					}
			} else {
				$('.js-scroll-top-button').css('bottom', 0);
			}
		});
	}

	scrollTopBtnWithFooter();

	$(window).on('resize', function() {
		scrollTopBtnWithFooter()
	});

});