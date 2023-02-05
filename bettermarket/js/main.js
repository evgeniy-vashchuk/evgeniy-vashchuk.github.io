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
			}, 4000);
		});
	});
};

var initMasonryGrid = function initMasonryGrid() {
	var masonryGrid = $('.js-masonry-grid');

	if (masonryGrid.length) {
		setTimeout(function () {
			masonryGrid.masonry({
				isFitWidth: true,
				transitionDuration: 0,
				gutter: 40
			});
		}, 100);
	}
};

var initFiltering = function initFiltering() {
	var filter = {
		filterData: {
			checkedFilters: [],
			searchRequest: '',
			onlySelected: false
		},
		config: {
			filter: '.js-filter',
			filterOverlay: '.js-filter-overlay',
			filterItem: '.js-filter-item',
			filterDropdown: '.js-filter-item-dropdown',
			filterCounter: '.js-filter-counter',
			filterCheckbox: '.js-filter-checkbox',
			filterSearch: '.js-filter-search',
			filterOnlySelected: '.js-filter-only-selected',
			filterClearBtn: '.js-filters-clear-btn',
			filterSaveBtn: '.js-filters-save-btn'
		},

		open: function open() {
			$(this.config.filter).addClass('active');
			$(this.config.filterOverlay).addClass('active');
		},

		close: function close() {
			$(this.config.filter).removeClass('active');
			$(this.config.filterOverlay).removeClass('active');
		},

		clearFilterData: function clearFilterData() {
			this.filterData.checkedFilters = [];
			this.filterData.searchRequest = '';
			this.filterData.onlySelected = false;
		},

		clearFilter: function clearFilter(filterItem) {
			this.clearFilterData();

			var searchInput = filterItem.find(this.config.filterSearch),
				checkboxes = filterItem.find(this.config.filterCheckbox),
				onlySelected = filterItem.find(this.config.filterOnlySelected);

			searchInput.val('');
			checkboxes.each(function () {
				$(this).prop('checked', false);
			});
			onlySelected.prop('checked', false);
		},

		countCheckboxes: function countCheckboxes(filterItem) {
			this.clearFilterData();

			var checkedFilters = this.filterData.checkedFilters;

			filterItem.find(this.config.filterCheckbox).each(function () {
				if ($(this).is(':checked')) {
					var name = $(this).attr('name').toLowerCase().replace(/ /g, '_');

					checkedFilters.push(name);
				}
			});
		},

		getFilters: function getFilters() {

		}
	};

	$(filter.config.filterCheckbox).on('change', function () {
		var filterItem = $(this).closest(filter.config.filterItem);

		filter.countCheckboxes(filterItem);

		filterItem.find(filter.config.filterCounter).text(filter.filterData.checkedFilters.length);
	});

	$(filter.config.filterDropdown).on('show.bs.dropdown', function () {
		filter.open();
	});

	$(filter.config.filterDropdown).on('hide.bs.dropdown', function () {
		filter.close();
	});

	$(filter.config.filterSaveBtn).on('click', function (e) {
		e.preventDefault();

		var filterItem = $(this).closest(filter.config.filterItem);

		filter.countCheckboxes(filterItem);
	});

	$(filter.config.filterClearBtn).on('click', function (e) {
		e.preventDefault();

		var filterItem = $(this).closest(filter.config.filterItem);

		filter.clearFilter(filterItem);
	});
};