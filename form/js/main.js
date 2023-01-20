'use strict';function _createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;}

var searchInput = document.getElementsByClassName('js-search-input')[0],
	switcher = document.getElementsByClassName('js-show-only-selected')[0],
	btnClearAll = document.getElementsByClassName('js-clear-all')[0],
	checkboxItems = document.getElementsByClassName('js-checkbox-item'),
	alertText = document.getElementsByClassName('js-no-selected-elements')[0];

document.addEventListener('DOMContentLoaded', function (event) {
	clearAllSelection();
	showOnlySelected();
	searchInit();
});

var clearAllSelection = function clearAllSelection() {
	btnClearAll.addEventListener('click', function (e) {
		e.preventDefault();

		searchInput.value = '';
		switcher.checked = false;
		alertText.classList.add('d-none');

		for (var i = 0; i < checkboxItems.length; i++) {
			var checkbox = checkboxItems[i].querySelectorAll('input')[0];

			if (checkbox.hasAttribute('disabled')) {
				continue;
			}

			checkbox.checked = false;

			checkboxItems[i].classList.remove('d-none');
		}
	});
};

var showOnlySelected = function showOnlySelected() {
	var selectedOnly = switcher.checked;var _iterator = _createForOfIteratorHelper(

		checkboxItems),_step;try {var _loop = function _loop() {var checkboxItem = _step.value;
			checkboxItem.querySelectorAll('input')[0].addEventListener('change', function () {
				if (!this.checked && selectedOnly) {
					checkboxItem.classList.add('d-none');
				}
			});
		};for (_iterator.s(); !(_step = _iterator.n()).done;) {_loop();}} catch (err) {_iterator.e(err);} finally {_iterator.f();}

	switcher.addEventListener('change', function () {
		selectedOnly = this.checked;

		if (selectedOnly) {
			var selectedCount = 0;

			searchInput.value = '';

			for (var i = 0; i < checkboxItems.length; i++) {
				var checkbox = checkboxItems[i].querySelectorAll('input')[0];

				if (!checkbox.checked) {
					checkboxItems[i].classList.add('d-none');
				} else {
					checkboxItems[i].classList.remove('d-none');
					selectedCount++;
				}
			}

			if (selectedCount === 0) {
				alertText.classList.remove('d-none');
			} else {
				alertText.classList.add('d-none');
			}
		} else {
			alertText.classList.add('d-none');

			for (var _i = 0; _i < checkboxItems.length; _i++) {
				checkboxItems[_i].classList.remove('d-none');
			}
		}
	});
};

var searchInit = function searchInit() {
	searchInput.addEventListener('input', function (e) {
		var typedText = e.target.value.toLowerCase(),
			foundResults = 0;

		switcher.checked = false;

		for (var i = 0; i < checkboxItems.length; i++) {
			var checkbox = checkboxItems[i].querySelectorAll('input')[0];

			if (checkbox.getAttribute('name').toLowerCase().includes(typedText)) {
				foundResults++;
				checkboxItems[i].classList.remove('d-none');
			} else {
				checkboxItems[i].classList.add('d-none');
			}
		}

		if (foundResults === 0) {
			alertText.classList.remove('d-none');
		} else {
			alertText.classList.add('d-none');
		}
	});
};