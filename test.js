import childProcess from 'child_process';
import test from 'ava';
import cliCursor from './';

const write = process.stderr.write;
const SHOW = '\u001b[?25h';
const HIDE = '\u001b[?25l';

process.stderr.isTTY = true;

function getStderr(fn) {
	let ret = '';

	process.stderr.setEncoding('utf8');
	process.stderr.write = str => {
		ret += str;
	};

	fn();
	process.stderr.write = write;
	return ret;
}

test('show', t => {
	t.is(getStderr(cliCursor.show), SHOW);
});

test('hide', t => {
	t.is(getStderr(cliCursor.hide), HIDE);
});

test('toggle', t => {
	cliCursor.hide();
	t.is(getStderr(cliCursor.toggle), SHOW);
});

test('toggle 2', t => {
	cliCursor.show();
	t.is(getStderr(cliCursor.toggle), HIDE);
});

test('toggle force', t => {
	cliCursor.show();
	t.is(getStderr(cliCursor.toggle.bind(null, true)), SHOW);
});

test('toggle force 2', t => {
	cliCursor.hide();
	t.is(getStderr(cliCursor.toggle.bind(null, true)), SHOW);
});

test('toggle force 3', t => {
	cliCursor.show();
	t.is(getStderr(cliCursor.toggle.bind(null, false)), HIDE);
});

// used to fail, see sindresorhus/log-update#2
test('require', t => {
	t.is(childProcess.execSync('node index.js', {encoding: 'utf8'}), '');
});
