// Home Work #5 (26.01.2018)

// Task 1 (Fibonacci series) =========================

var n = 5;
var fibonacci = [0, 1];

for (i = 2; i < n; i++) {
	fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
}

console.log(fibonacci);

// Task 2 (block movement) =========================

// creating an element
var div = document.createElement('div');
div.className = "square-block";
document.body.insertBefore(div, document.body.firstChild);

// css properties of element
document.body.style.margin = '0px';
document.body.style.position = 'relative';
document.body.style.height = '100vh';

var square = document.getElementsByClassName('square-block')[0];
square.style.width = '200px';
square.style.height = '200px';
square.style.background = 'red';
square.style.position = 'absolute';
square.style.top = '0';
square.style.left = '0';

// movement of element

function move() {
	var changeLeft = 1;
	var changeTop = 1;
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	setInterval(function() {
		square.style.top = parseInt(square.style.top.slice(0, -2)) + changeTop + 'px'
		square.style.left = parseInt(square.style.left.slice(0, -2)) + changeLeft + 'px'

		if (parseInt(square.style.top.slice(0, -2)) > height - 200) {
			changeTop = -1;
			square.style.background = 'green';
			square.style.transform = 'rotate(-90deg)';
		}

		if (parseInt(square.style.top.slice(0, -2)) < 0) {
			changeTop = 1;
			square.style.background = 'blue';
			square.style.transform = 'rotate(90deg)';
		}

		if (parseInt(square.style.left.slice(0, -2)) > width - 201) {
			changeLeft = -1;
			square.style.background = 'pink';
			square.style.transform = 'rotate(-90deg)';
		}

		if (parseInt(square.style.left.slice(0, -2)) < 0) {
			changeLeft = 1;
			square.style.background = 'brown';
			square.style.transform = 'rotate(90deg)';
		}

	}, 1);
}

move();