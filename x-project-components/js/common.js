$(document).ready(function() {
	// show code button arrow
	$('.collapse').on('show.bs.collapse', function () {
		$(this).parent('.component-block-usage').find('.btn').addClass('-open');
	})

	$('.collapse').on('hide.bs.collapse', function () {
		$(this).parent('.component-block-usage').find('.btn').removeClass('-open');
	})

	// scroll line
	window.onscroll = function() {
		myFunction()
	};

	function myFunction() {
		var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		var scrolled = (winScroll / height) * 100;
		document.getElementById("myBar").style.width = scrolled + "%";
	}

	// search
	$('.js-search-input').hideseek({
		highlight: true,
		nodata: 'No results found'
	});

	// scroll to element after search
	$('.js-search-input').on("_after", function() {
		$('.js-list-group > .list-group-item').each(function() {
			if ($(this).is(':visible')) {

				$("html, body").animate({
					scrollTop: $($(this).attr("href")).offset().top
				}, 0);

				return false;
			}
		});
	});

	// scroll top button hide on < 1200
	function scrollTopButtonHide() {
		if ($(window).width() < 1200) {

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

	$(window).resize(function() {
		scrollTopButtonHide();
	});

	// scroll top button with footer
	$(window).on('scroll', function() {
		var pageHeight = $(document).height(),
				bottomOfPage = $(document).scrollTop() + $(window).height(),
				footerHeight = $('.js-footer').outerHeight();

		if (pageHeight === bottomOfPage) {
			$('.js-scroll-top-button').css('bottom', footerHeight);
		} else {
			$('.js-scroll-top-button').css('bottom', 0);
		}
	});

});

// replase '<' and '>' in html code examples
document.querySelectorAll(".js-replase-brackets").forEach(function(element) {
	element.innerHTML = element.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
});