//
//	jballands/aoc17
//	day2
//
//	© 2017 Jonathan Ballands
//

const concat = require('lodash.concat');
const max = require('lodash.max');
const min = require('lodash.min');

const readFileAndStartIterating = require('../../helpers/readFile')
	.readFileAndStartIterating;
const iterate = require('../../helpers/iterate').iterate;

const digitsToNumber = digits => parseInt(digits.join(''));

const checksum = (rows, formula) =>
	rows.reduce((acc, row) => acc + formula(row), 0);

const readSpreadsheet = (
	iterator,
	formula,
	rows = [],
	currRow = [],
	currNum = []
) => {
	const { data } = iterator;

	// End of file, push this number and process and return
	if (data === null) {
		const newRows = concat(rows, [
			concat(currRow, [digitsToNumber(currNum)])
		]);
		const cs = checksum(newRows, formula);
		return console.log(cs);
	}

	const next = iterate(iterator);
	const parsedData = parseInt(data);

	// Still a number, push the number and continue
	if (!isNaN(parsedData)) {
		return readSpreadsheet(
			next,
			formula,
			rows,
			currRow,
			concat(currNum, [parsedData])
		);
	}

	// Parse the number so we know the number is done right now
	const number = currNum.length > 0 ? digitsToNumber(currNum) : null;

	// If it's a new line...
	if (data === '\n') {
		// ...and there was a number in the buffer, push the number, then the row
		if (number) {
			return readSpreadsheet(
				next,
				formula,
				concat(rows, [concat(currRow, [number])])
			);
		}
		// Otherwise, just push the row
		return readSpreadsheet(next, formula, concat(rows, [currRow]));
	}

	// At this point it's a space, so if there's a number, we push it, otherwise
	// we just continue with the next char
	if (number) {
		return readSpreadsheet(next, formula, rows, concat(currRow, [number]));
	}
	return readSpreadsheet(next, formula, rows, currRow);
};

// Part 1

const difference = row => {
	const mx = max(row);
	const mn = min(row);
	return mx - mn;
};

readFileAndStartIterating(process.argv[2], input =>
	readSpreadsheet(input, difference)
);

// Part 2

const divisible = row =>
	row.reduce((acc, num, i) => {
		const div = row.filter((compare, j) => {
			if (i === j) {
				return false;
			} else if (compare % num === 0 || num % compare === 0) {
				return true;
			}
			return false;
		});

		if (div.length <= 0) {
			return acc;
		}
		if (div[0] % num === 0) {
			return div[0] / num;
		}
		return num / div[0];
	}, 0);

readFileAndStartIterating(process.argv[2], input =>
	readSpreadsheet(input, divisible)
);
