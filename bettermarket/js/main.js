'use strict';function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;}

$(function () {
	initTooltip();
	initMasonryGrid();
	initFiltering();
});

var initTooltip = function initTooltip() {
	var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]'),
		timeout = undefined,
		timeoutTime = 2000;

	var tooltipList = _toConsumableArray(tooltipTriggerList).map(function (tooltipTriggerEl) {
		new bootstrap.Tooltip(tooltipTriggerEl);
		var tooltip = bootstrap.Tooltip.getOrCreateInstance(tooltipTriggerEl);

		tooltipTriggerEl.addEventListener('mouseenter', function () {
			// if (tooltipTriggerEl.classList.contains('active')) return;

			// tooltipTriggerEl.classList.add('active');
			// tooltip.show();

			// setTimeout(() => {
			// 	tooltip.hide();
			// 	// tooltipTriggerEl.classList.remove('active');
			// }, 3000)

			timeout = setTimeout(function () {
				tooltip.show();
			}, timeoutTime);
		});

		tooltipTriggerEl.addEventListener('mouseleave', function () {
			clearTimeout(timeout);

			setTimeout(function () {
				tooltip.hide();
			}, 1000);
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
				columnWidth: '.js-masonry-grid-column-sizer',
				itemSelector: '.js-masonry-grid-card',
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
			onlySelected: false,
			type: ''
		},
		filterDataTotal: [],
		config: {
			filter: '.js-filter',
			filterOverlay: '.js-filter-overlay',
			filterItem: '.js-filter-item',
			filterDropdown: '.js-filter-item-dropdown',
			filterCounter: '.js-filter-counter',
			filterCheckbox: '.js-filter-checkbox',
			filterCheckboxItem: '.js-filter-checkbox-item',
			filterSearch: '.js-filter-search',
			filterOnlySelected: '.js-filter-only-selected',
			filterClearBtn: '.js-filters-clear-btn',
			filterSaveBtn: '.js-filters-save-btn',
			filterCard: '.js-filter-card',
			filterNoItems: '.js-filter-no-items',
			filterEmptyBlock: '.js-filter-empty-block',
			preloader: '.js-preloader',
			grid: '.js-masonry-grid'
		},

		open: function open() {
			$(this.config.filter).addClass('active');
			$(this.config.filterOverlay).addClass('active');
		},

		removeOverlay: function removeOverlay() {
			$(this.config.filter).removeClass('active');
			$(this.config.filterOverlay).removeClass('active');
		},

		close: function close(filterItem) {
			this.removeOverlay();

			var dropdownItem = filterItem.find(this.config.filterDropdown);

			setTimeout(function () {
				dropdownItem.dropdown('hide');
			});
		},

		clearFilterData: function clearFilterData() {
			this.filterData.checkedFilters = [];
			this.filterData.searchRequest = '';
			this.filterData.onlySelected = false;
			this.filterData.type = '';
		},

		clearFilterDataTotal: function clearFilterDataTotal() {
			this.filterDataTotal = [];
		},

		clearFilter: function clearFilter(filterItem) {
			this.clearFilterData();
			this.hideNoItemsNotification(filterItem);

			var searchInput = filterItem.find(this.config.filterSearch),
				checkboxes = filterItem.find(this.config.filterCheckbox),
				checkboxItems = filterItem.find(this.config.filterCheckboxItem),
				onlySelected = filterItem.find(this.config.filterOnlySelected);

			searchInput.val('').trigger('input');
			checkboxes.each(function () {
				$(this).prop('checked', false);
			});
			checkboxItems.removeClass('d-none');
			onlySelected.prop('checked', false);
		},

		getFilterArray: function getFilterArray(filterItem) {
			var filterArray = {
				type: this.getFilterType(filterItem),
				array: []
			};

			filterItem.find(this.config.filterCheckbox).each(function () {
				if ($(this).is(':checked')) {
					var name = $(this).attr('name').toLowerCase().replace(/ /g, '-');

					filterArray.array.push(name);
				}
			});

			return filterArray;
		},

		setFilterCheckboxesToData: function setFilterCheckboxesToData(filterItem) {
			this.clearFilterData();
			this.filterData.checkedFilters = this.getFilterArray(filterItem).array;
		},

		setFilterCheckboxesTotalToData: function setFilterCheckboxesTotalToData() {
			var thisObject = this;

			this.clearFilterDataTotal();

			$(this.config.filterItem).each(function () {
				var filterArray = thisObject.getFilterArray($(this));

				thisObject.filterDataTotal.push(filterArray);
			});
		},

		setSelectedOnly: function setSelectedOnly(filterItem) {
			var filterOnlySelected = filterItem.find(this.config.filterOnlySelected);

			if (filterOnlySelected.is(':checked')) {
				this.filterData.onlySelected = true;
			} else {
				this.filterData.onlySelected = false;
			}
		},

		setSearch: function setSearch(filterItem) {
			var filterSearch = filterItem.find(this.config.filterSearch);

			this.filterData.searchRequest = filterSearch.val();
		},

		getFilterType: function getFilterType(filterItem) {
			return filterItem.attr('data-filter-type');
		},

		setFilterTypeToData: function setFilterTypeToData(filterItem) {
			this.filterData.filterType = this.getFilterType(filterItem);
		},

		showPreloader: function showPreloader() {
			$(this.config.preloader).addClass('active');
		},

		hidePreloader: function hidePreloader() {
			$(this.config.preloader).removeClass('active');
		},

		setFilterData: function setFilterData(filterItem) {
			this.setFilterCheckboxesToData(filterItem);
			this.setFilterCheckboxesTotalToData();
			this.setSelectedOnly(filterItem);
			this.setSearch(filterItem);
			this.setFilterTypeToData(filterItem);
		},

		setCountOfFilters: function setCountOfFilters(filterItem) {
			filterItem.find(filter.config.filterCounter).text(filter.filterData.checkedFilters.length);
		},

		reloadCards: function reloadCards() {
			var masonryInstance = $(this.config.grid).data('masonry').$element;

			masonryInstance.masonry('layout');
		},

		showOnlySelected: function showOnlySelected(filterItem) {
			this.setFilterCheckboxesToData(filterItem);
			this.setSelectedOnly(filterItem);

			var filterCheckboxItem = this.config.filterCheckboxItem;

			if (this.filterData.onlySelected) {
				if (this.filterData.checkedFilters.length === 0) {
					this.showNoItemsNotification(filterItem);
					return;
				}

				filterItem.find(this.config.filterCheckbox).each(function () {
					if (!$(this).is(':checked')) {
						$(this).closest(filterCheckboxItem).addClass('d-none');
					}
				});
			} else {
				filterItem.find(filterCheckboxItem).removeClass('d-none');
				this.hideNoItemsNotification(filterItem);
			}
		},

		showNoItemsNotification: function showNoItemsNotification(filterItem) {
			filterItem.find(this.config.filterNoItems).removeClass('d-none');
		},

		hideNoItemsNotification: function hideNoItemsNotification(filterItem) {
			filterItem.find(this.config.filterNoItems).addClass('d-none');
		},

		searchFilters: function searchFilters(filterItem, event) {
			var filterCheckbox = filterItem.find(this.config.filterCheckbox),
				filterCheckboxItem = this.config.filterCheckboxItem,
				typedText = event.target.value.toLowerCase().replace(/ /g, '-'),
				noItems = true,
				thisObject = this;

			if (typedText === '') {
				filterItem.find(filterCheckboxItem).removeClass('d-none');

				return;
			}

			filterCheckbox.each(function () {
				var checkboxName = $(this).attr('name').toLowerCase().replace(/ /g, '-');

				if (checkboxName.includes(typedText)) {
					$(this).closest(filterCheckboxItem).removeClass('d-none');
					noItems = false;
				} else {
					$(this).closest(filterCheckboxItem).addClass('d-none');
				}

				if (noItems) {
					thisObject.showNoItemsNotification(filterItem);
				} else {
					thisObject.hideNoItemsNotification(filterItem);
				}
			});
		},

		filterByCheckboxes: function filterByCheckboxes() {
			var thisObject = this,
				shownCards = 0;

			$(this.config.filterCard).each(function () {
				var card = $(this),
					cardHasPassedTheFiltration = [];var _loop = function _loop()

				{
					var type = thisObject.filterDataTotal[i].type,
						array = thisObject.filterDataTotal[i].array,
						cardFilterValues = card.attr('data-filter-' + type).toLowerCase().trim().replace(/ /g, '-').split(',-'),
						showCard = array.some(function (filterValue) {return cardFilterValues.includes(filterValue);});

					if (array.length === 0) return "continue";
					cardHasPassedTheFiltration.push(showCard);
				};for (var i = 0; i < thisObject.filterDataTotal.length; i++) {var _ret = _loop();if (_ret === "continue") continue;}

				cardHasPassedTheFiltration = cardHasPassedTheFiltration.every(function (element) {return element === true;});

				if (cardHasPassedTheFiltration) {
					card.removeClass('d-none');
					shownCards++;
				} else {
					card.addClass('d-none');
				}
			});

			if (shownCards > 0) {
				$(thisObject.config.filterEmptyBlock).addClass('d-none');
			} else {
				$(thisObject.config.filterEmptyBlock).removeClass('d-none');
			}
		},

		init: function init(filterItem) {var _this = this;
			this.showPreloader();
			this.setFilterData(filterItem);
			this.filterByCheckboxes();
			this.reloadCards();

			setTimeout(function () {
				_this.hidePreloader();
			}, 500);
		}
	};

	$(filter.config.filterCheckbox).on('change', function () {
		var filterItem = $(this).closest(filter.config.filterItem);

		filter.setFilterData(filterItem);
		filter.setCountOfFilters(filterItem);
		filter.showOnlySelected(filterItem);
	});

	$(filter.config.filterDropdown).on('show.bs.dropdown', function () {
		filter.open();
	});

	$(filter.config.filterDropdown).on('hide.bs.dropdown', function (e) {
		var filterItem = $(this).closest(filter.config.filterItem);

		filter.close(filterItem);
		filter.init(filterItem);
	});

	$(filter.config.filterClearBtn).on('click', function (e) {
		e.preventDefault();

		var filterItem = $(this).closest(filter.config.filterItem);

		filter.clearFilter(filterItem);
		filter.setCountOfFilters(filterItem);
	});

	$(filter.config.filterOnlySelected).on('change', function () {
		var filterItem = $(this).closest(filter.config.filterItem);

		filter.showOnlySelected(filterItem);
	});

	$(filter.config.filterSearch).on('input', function (event) {
		var filterItem = $(this).closest(filter.config.filterItem);

		filter.searchFilters(filterItem, event);
	});

	$(filter.config.filterSaveBtn).on('click', function (e) {
		e.preventDefault();

		var filterItem = $(this).closest(filter.config.filterItem);

		filter.close(filterItem);
	});
};