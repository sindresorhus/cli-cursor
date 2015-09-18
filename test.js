'use strict';
var childProcess = require('child_process');
var test = require('ava');
var cliCursor = require('./');
var write = process.stdout.write;
var SHOW = '\u001b[?25h';
var HIDE = '\u001b[?25l';

function getStdout(fn) {
	var ret = '';

	process.stdout.setEncoding('utf8');
	process.stdout.write = function (str) {
		ret += str;
	};

	fn();
	process.stdout.write = write;
	return ret;
}

test('show', function (t) {
	t.plan(1);
	t.assert(getStdout(cliCursor.show) === SHOW);
});

test('hide', function (t) {
	t.plan(1);
	t.assert(getStdout(cliCursor.hide) === HIDE);
});

test('toggle', function (t) {
	cliCursor.hide();
	t.plan(1);
	t.assert(getStdout(cliCursor.toggle) === SHOW);
});

test('toggle 2', function (t) {
	cliCursor.show();
	t.plan(1);
	t.assert(getStdout(cliCursor.toggle) === HIDE);
});

test('toggle force', function (t) {
	cliCursor.show();
	t.plan(1);
	t.assert(getStdout(cliCursor.toggle.bind(null, true)) === SHOW);
});

test('toggle force 2', function (t) {
	cliCursor.hide();
	t.plan(1);
	t.assert(getStdout(cliCursor.toggle.bind(null, true)) === SHOW);
});

test('toggle force 3', function (t) {
	cliCursor.show();
	t.plan(1);
	t.assert(getStdout(cliCursor.toggle.bind(null, false)) === HIDE);
});

// Used to fail, see sindresorhus/log-update#2.
test('require', function (t) {
	t.plan(1);
	t.assert(childProcess.execSync('node index.js', {
		encoding: 'utf8'
	}) === '');
});
