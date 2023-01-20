'use strict';

const searchInput = document.getElementsByClassName('js-search-input')[0],
			switcher = document.getElementsByClassName('js-show-only-selected')[0],
			btnClearAll = document.getElementsByClassName('js-clear-all')[0],
			checkboxItems = document.getElementsByClassName('js-checkbox-item'),
			alertText = document.getElementsByClassName('js-no-selected-elements')[0];

document.addEventListener('DOMContentLoaded', function(event) {
	clearAllSelection();
	showOnlySelected();
	searchInit();
});

let clearAllSelection = () => {
	btnClearAll.addEventListener('click', (e) => {
		e.preventDefault();

		searchInput.value = '';
		switcher.checked = false;
		alertText.classList.add('d-none');

		for (let i = 0; i < checkboxItems.length; i++) {
			let checkbox = checkboxItems[i].querySelectorAll('input')[0];

			if (checkbox.hasAttribute('disabled')) {
				continue;
			}

			checkbox.checked = false;

			checkboxItems[i].classList.remove('d-none');
		}
	});
}

let showOnlySelected = () => {
	let selectedOnly = switcher.checked;

	for (let checkboxItem of checkboxItems) {
		checkboxItem.querySelectorAll('input')[0].addEventListener('change', function() {
			if (!this.checked && selectedOnly) {
				checkboxItem.classList.add('d-none');
			}
		});
	}

	switcher.addEventListener('change', function() {
		selectedOnly = this.checked;

		if (selectedOnly) {
			let selectedCount = 0;

			searchInput.value = '';

			for (let i = 0; i < checkboxItems.length; i++) {
				let checkbox = checkboxItems[i].querySelectorAll('input')[0];

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

			for (let i = 0; i < checkboxItems.length; i++) {
				checkboxItems[i].classList.remove('d-none');
			}
		}
	});
}

let searchInit = () => {
	searchInput.addEventListener('input', (e) => {
		let typedText = e.target.value.toLowerCase(),
				foundResults = 0;

		switcher.checked = false;

		for (let i = 0; i < checkboxItems.length; i++) {
			let checkbox = checkboxItems[i].querySelectorAll('input')[0];

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
}