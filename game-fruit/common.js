// Home Work #7 (02.02.2018)

// Task 1 (game) =========================

document.addEventListener('DOMContentLoaded', function() {

	// MAIN VARS
	var x,
		width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		mainBlock = document.getElementById('main-block'),
		topBlocks = document.getElementsByClassName('top-block'),
		topBlocksQuantity = topBlocks.length - 1,
		randomSpeed,
		randomNumberLeft,
		numberOfCaught = 0,
		myStorage = localStorage;

	// set initial value of best result
	var bestResult = myStorage.getItem('bestResult');

	if (bestResult === null) {
		myStorage.setItem('bestResult', numberOfCaught);
	}

	// GET RANDOM
	function getTrueRandom(min, max, trueRandom) {
		var random = Math.floor(Math.random() * (max - min + 1) + min);
		if (trueRandom !== random) {
			trueRandom = random;
			return trueRandom;
		}

		getTrueRandom(min, max, trueRandom);
	}

	// random speed
	function fallingBlocks(selectedItem) {
		var topBlockItem = topBlocks[selectedItem];
		topBlockItem.style.top = '-50px';
		topBlockItem.style.left = '0';

		// random left
		randomNumberLeft = getTrueRandom(0, width, randomNumberLeft);
		topBlockItem.style.left = randomNumberLeft + 'px';
		// right space compensation
		if (parseInt(topBlockItem.style.left.slice(0, -2)) >= width - topBlockItem.offsetWidth) {
			topBlockItem.style.left = (width - topBlockItem.offsetWidth) + 'px';
		}

		// random speed
		randomSpeed = getTrueRandom(0, 10, randomSpeed);

		var topBlocksMove = function() {
			var changeTop = 1;

			if (parseInt(topBlockItem.style.top.slice(0, -2)) === height) {
				// loop
				topBlockItem.style.top = '-50px';

				randomNumberLeft = getTrueRandom(0, width, randomNumberLeft);
				topBlockItem.style.left = randomNumberLeft + 'px';

				clearInterval(topBlocksMoveInterval);
				randomSpeed = getTrueRandom(0, 10, randomSpeed);
				topBlocksMoveInterval = setInterval (topBlocksMove, randomSpeed);
			}

			// right space compensation
			if (parseInt(topBlockItem.style.left.slice(0, -2)) >= width - topBlockItem.offsetWidth) {
				topBlockItem.style.left = (width - topBlockItem.offsetWidth) + 'px';
			}

			topBlockItem.style.top = parseInt(topBlockItem.style.top.slice(0, -2)) + changeTop + 'px';


			var leftBlocksPosition = parseInt(topBlockItem.style.left.slice(0, -2));
			var topBlocksPosition = parseInt(topBlockItem.style.top.slice(0, -2));

			// CATCHING BLOCKS
			if (x <= leftBlocksPosition && x >= leftBlocksPosition - 150 && topBlocksPosition === height - 100) {
				numberOfCaught += 1;
				document.getElementById('points').innerHTML = 'Points: ' + numberOfCaught;
				topBlockItem.style.top = '-50px';

				topBlockItem.style.left = randomNumberLeft + 'px';
				// right space compensation
				if (parseInt(topBlockItem.style.left.slice(0, -2)) >= width - topBlockItem.offsetWidth) {
					topBlockItem.style.left = (width - topBlockItem.offsetWidth) + 'px';
				}

				// best result
				if (bestResult < numberOfCaught) {
					myStorage.setItem('bestResult', numberOfCaught);
					document.getElementById('best-result').innerHTML = 'Best result: ' + myStorage.getItem('bestResult');
				}

			}

			// FILLING THE BASKET
			if (numberOfCaught === 10) {
				mainBlock.style.background = 'url(img/basket_2.png)';
			}

			if (numberOfCaught === 20) {
				mainBlock.style.background = 'url(img/basket_3.png)';
			}

			if (numberOfCaught === 30) {
				mainBlock.style.background = 'url(img/basket_4.png)';
			}

			if (numberOfCaught === 40) {
				mainBlock.style.background = 'url(img/basket_5.png)';
			}

		};

		var topBlocksMoveInterval = setInterval (topBlocksMove, randomSpeed);
	}

	// FALLING BLOCKS
	for (var i = 0; i <= topBlocksQuantity; i++) {
		fallingBlocks(i);
	}

	// MOUSE COORDINATES
	function onhover(evt){ 
		evt = window.event ? window.event : evt;
		x = evt.clientX;
	}

	// MAIN BLOCK MOVEMENT
	function move() {
		if (x <= width - mainBlock.offsetWidth) {
			mainBlock.style.left = x + 'px';
		}

		if (x >= width - mainBlock.offsetWidth) {
			mainBlock.style.left = '1720px';
		}
	}

	document.addEventListener("mousemove", function() {
		onhover();
		move();
	});

	// best result save
	document.getElementById('best-result').innerHTML = 'Best result: ' + myStorage.getItem('bestResult');

	// best result clear
	document.getElementById('best-result-clear').onclick = function() {
		myStorage.clear();
		numberOfCaught = 0;
		document.getElementById('best-result').innerHTML = 'Best result: ' + numberOfCaught;
		document.getElementById('points').innerHTML = 'Points: ' + numberOfCaught;
	};

});