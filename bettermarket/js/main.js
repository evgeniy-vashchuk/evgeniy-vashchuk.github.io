'use strict';function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;}

$(function () {
	initTooltip();
	initMasonryGrid();
	initFiltering();
});

var initTooltip = function initTooltip() {
	var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

	var tooltipList = _toConsumableArray(tooltipTriggerList).map(function (tooltipTriggerEl) {
		new bootstrap.Tooltip(tooltipTriggerEl);

		tooltipTriggerEl.addEventListener("mouseenter", function () {
			var tooltip = bootstrap.Tooltip.getOrCreateInstance(tooltipTriggerEl);

			if (tooltipTriggerEl.classList.contains('active')) return;

			tooltipTriggerEl.classList.add('active');
			tooltip.show();

			setTimeout(function () {
				tooltip.hide();
				tooltipTriggerEl.classList.remove('active');
			}, 3000);
		});
	});
};

var initMasonryGrid = function initMasonryGrid() {
	var masonryGrid = $('.js-masonry-grid');

	if (masonryGrid.length) {
		setTimeout(function () {
			masonryGrid.masonry({
				percentPosition: true
			});
		}, 100);
	}
};

var initFiltering = function initFiltering() {
	var filter = {
		config: {
			filter: '.js-filter',
			filterOverlay: '.js-filter-overlay',
			filterItem: '.js-filter-item',
			filterDropdown: '.js-filter-item-dropdown',
			filterCounter: '.js-filter-counter',
			filterCheckbox: '.js-filter-checkbox'
		},

		open: function open() {
			$(this.config.filter).addClass('active');
			$(this.config.filterOverlay).addClass('active');
		},

		close: function close() {
			$(this.config.filter).removeClass('active');
			$(this.config.filterOverlay).removeClass('active');
		},

		countFilters: function countFilters(filterItem) {
			var checkedFilters = [];

			filterItem.find(this.config.filterCheckbox).each(function () {
				if ($(this).is(':checked')) {
					checkedFilters.push($(this).attr('name'));
				}
			});

			filterItem.find(this.config.filterCounter).text(checkedFilters.length);

			return checkedFilters;
		}
	};

	$(filter.config.filterCheckbox).on('change', function () {
		var filterItem = $(this).closest(filter.config.filterItem);

		filter.countFilters(filterItem);
	});

	$(filter.config.filterDropdown).on('show.bs.dropdown', function () {
		filter.open();
	});

	$(filter.config.filterDropdown).on('hide.bs.dropdown', function () {
		filter.close();
	});
};