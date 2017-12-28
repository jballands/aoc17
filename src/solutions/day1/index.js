//
//	jballands/aoc17
//	day1
//
//	© 2017 Jonathan Ballands
//

const readFileAndStartIterating = require('../../helpers/readFile')
	.readFileAndStartIterating;
const iterate = require('../../helpers/iterate').iterate;

// Part 1
const sumAdjacent = (iterator, prevNumber = null, currSum = 0) => {
	const data = parseInt(iterator.data);
	prevNumber = parseInt(prevNumber);

	// Last number
	if (!data) {
		return currSum;
	} else if (prevNumber === data) {
		// Sum because previous number was the same
		return sumAdjacent(iterate(iterator), data, currSum + data);
	}
	// Don't sum
	return sumAdjacent(iterate(iterator), data, currSum);
};

readFileAndStartIterating(process.argv[2], iterator =>
	console.log(
		sumAdjacent(iterator, iterator.iterable[iterator.iterable.length - 1])
	)
);

// Part 2
const sumMod = (iterator, currSum = 0) => {
	const data = parseInt(iterator.data);
	const compare = parseInt(
		iterator.iterable[
			(iterator.index + iterator.iterable.length / 2) %
				iterator.iterable.length
		]
	);

	// Last number
	if (!data) {
		return currSum;
	} else if (compare === data) {
		return sumMod(iterate(iterator), currSum + data);
	}
	// Don't sum
	return sumMod(iterate(iterator), currSum);
};

readFileAndStartIterating(process.argv[2], iterator =>
	console.log(sumMod(iterator))
);
