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

});

// replase '<' and '>' in html code examples
document.querySelectorAll(".js-replase-brackets").forEach(function(element) {
	element.innerHTML = element.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
});