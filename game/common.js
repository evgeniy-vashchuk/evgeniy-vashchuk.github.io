// Home Work #6 (29.01.2018)

document.addEventListener('DOMContentLoaded', function() {
	// variables for the game
	var color = ['blue', 'black', 'pink', 'green', 'yellow', 'orange'],
		size = 200,
		speed = 1;

	var numberOfColors = color.length - 1;

	// get random number
	var prevRandomNumber = -1;
	function getRandomNumber(min, max, prevRandomNumber) {
		while (true) {
			var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
				if (prevRandomNumber !== randomNumber) {
					prevRandomNumber = randomNumber;
					return prevRandomNumber;
				}
		}
	}

	var square = document.getElementsByClassName('square-block')[0];
	square.style.top = '0';
	square.style.left = '0';
	square.style.height = size + 'px';
	square.style.width = size + 'px';

	// move the block
	function move() {
		var changeLeft = speed;
		var changeTop = speed;

		var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

		setInterval (function() {
			square.style.top = parseInt(square.style.top.slice(0, -2)) + changeTop + 'px'
			square.style.left = parseInt(square.style.left.slice(0, -2)) + changeLeft + 'px'

			// bottom
			if (parseInt(square.style.top.slice(0, -2)) > height - size) {
				changeTop = -speed;
			}

			// top
			if (parseInt(square.style.top.slice(0, -2)) < 0) {
				changeTop = speed;
			}

			// right
			if (parseInt(square.style.left.slice(0, -2)) > width - size) {
				changeLeft = -speed;
			}

			// left
			if (parseInt(square.style.left.slice(0, -2)) < 0) {
				changeLeft = speed;
			}

		}, 7);
	}

	var startBlock = document.getElementsByClassName('start-block')[0];

	// start game
	startBlock.onclick = function() {
		var сountdownNumber = 1;
		this.innerHTML = сountdownNumber;

		var сountdown = setInterval(function() {
			сountdownNumber = сountdownNumber + 1;
			startBlock.innerHTML = сountdownNumber;

			if (сountdownNumber === 4){
				startBlock.innerHTML = 'go!';
			}

		}, 1000);

		setTimeout (function() {
			move();
			startBlock.style.display = 'none';

			clearInterval(сountdown);
		}, 4000);
	};

	var quantityOfclicks = 0;
	var levelNumber = 1;

	var level = document.getElementById('level');
	level.innerHTML = levelNumber;

	var click = document.getElementById('click');
	click.innerHTML = quantityOfclicks;

	// game mechanism
	square.onclick = function() {
		// count clicks
		quantityOfclicks = quantityOfclicks + 1;
		click.innerHTML = quantityOfclicks;

		// when quantity of clicks is 5
		if (quantityOfclicks === 5) {
			// level rise
			levelNumber++;
			level.innerHTML = levelNumber;

			if (levelNumber === 5) {
				var final = document.getElementById('final');
				final.style.opacity = 1;
			}

			// click clearing
			quantityOfclicks = 0;
			click.innerHTML = quantityOfclicks;

			if (levelNumber === 6) {
				startBlock.style.display = 'flex';
				startBlock.innerHTML = 'The End';
			}

			// change color
			prevRandomNumber = getRandomNumber(0, numberOfColors, prevRandomNumber);
			square.style.background = color[prevRandomNumber];

			// change size
			size -= 20;
			square.style.height = size + 'px';
			square.style.width = size + 'px';

			// change speed
			speed++;
		}

	};

});