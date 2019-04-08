'use strict';
const restoreCursor = require('restore-cursor');

let hidden = false;

exports.show = stream => {
	const writableStream = stream || process.stderr;

	if (!writableStream.isTTY) {
		return;
	}

	hidden = false;
	writableStream.write('\u001B[?25h');
};

exports.hide = stream => {
	const writableStream = stream || process.stderr;

	if (!writableStream.isTTY) {
		return;
	}

	restoreCursor();
	hidden = true;
	writableStream.write('\u001B[?25l');
};

exports.toggle = (force, stream) => {
	if (force !== undefined) {
		hidden = force;
	}

	if (hidden) {
		exports.show(stream);
	} else {
		exports.hide(stream);
	}
};
