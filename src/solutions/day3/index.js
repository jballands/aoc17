//
//	jballands/aoc17
//	day3
//
//	© 2017 Jonathan Ballands
//

// Part 1

const input = 368078;

const getStartCoordinates = n => {
	let x = 1;

	// Get the first odd square bigger than n
	while (x * x < n) {
		x = x + 2;
	}

	return (x - 1) / 2;
};

const manhattanDistance = (x, n) => {
	let a = Math.pow(x * 2 + 1, 2);
	do {
		a = a - (x * 2 + 1) + 1;
	} while (n < a);

	let b = Math.abs(x - (n - a));
	return x + b;
};

const start = getStartCoordinates(input);
console.log(manhattanDistance(start, input));

// Part 2
