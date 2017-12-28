//
//	jballands/aoc17
//	readFile.js
//
//	© 2017 Jonathan Ballands
//

const fs = require('fs');
const process = require('process');
const makeIterator = require('./iterate').makeIterator;

const readFile = (file, cb) => {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) {
			console.error(`There was a problem reading ${file}: ${err}`);
			process.exit(-1);
		}

		cb(data);
	});
};

const readFileAndStartIterating = (file, cb, modulo = null) => {
	readFile(file, input => {
		return cb(makeIterator(input, 0, modulo));
	});
};

module.exports = {
	readFile,
	readFileAndStartIterating
};
