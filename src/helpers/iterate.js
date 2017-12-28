//
//	jballands/aoc17
//	iterate.js
//
//	© 2017 Jonathan Ballands
//

const process = require('process');

const makeIterator = (iterable, startIndex, modulo = null) => ({
	data: iterable[startIndex],
	index: startIndex,
	iterable,
	modulo
});

const iterate = iterator => {
	const { index, iterable, modulo } = iterator;

	if (!iterable.length) {
		console.error('Can only iterate over an iterable');
		process.exit(-1);
	}

	const length = iterable.length;

	if (modulo) {
		return {
			data: iterable[index + 1 % length],
			index: index + 1,
			iterable,
			modulo
		};
	} else if (length > index + 1) {
		return {
			data: iterable[index + 1],
			index: index + 1,
			iterable,
			modulo
		};
	}
	return {
		data: null,
		index: index + 1,
		iterable,
		modulo
	};
};

module.exports = {
	makeIterator,
	iterate
};
