'use strict';
const restoreCursor = require('restore-cursor');

let hidden = false;

exports.show = stream => {
	hidden = false;
	(stream || process.stderr).write('\u001b[?25h');
};

exports.hide = stream => {
	restoreCursor();
	hidden = true;
	(stream || process.stderr).write('\u001b[?25l');
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
