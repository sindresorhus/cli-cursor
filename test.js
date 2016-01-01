import childProcess from 'child_process';
import test from 'ava';
import cliCursor from './';

const write = process.stdout.write;
const SHOW = '\u001b[?25h';
const HIDE = '\u001b[?25l';

function getStdout(fn) {
	let ret = '';

	process.stdout.setEncoding('utf8');
	process.stdout.write = str => {
		ret += str;
	};

	fn();
	process.stdout.write = write;
	return ret;
}

test('show', t => {
	t.is(getStdout(cliCursor.show), SHOW);
});

test('hide', t => {
	t.is(getStdout(cliCursor.hide), HIDE);
});

test('toggle', t => {
	cliCursor.hide();
	t.is(getStdout(cliCursor.toggle), SHOW);
});

test('toggle 2', t => {
	cliCursor.show();
	t.is(getStdout(cliCursor.toggle), HIDE);
});

test('toggle force', t => {
	cliCursor.show();
	t.is(getStdout(cliCursor.toggle.bind(null, true)), SHOW);
});

test('toggle force 2', t => {
	cliCursor.hide();
	t.is(getStdout(cliCursor.toggle.bind(null, true)), SHOW);
});

test('toggle force 3', t => {
	cliCursor.show();
	t.is(getStdout(cliCursor.toggle.bind(null, false)), HIDE);
});

// used to fail, see sindresorhus/log-update#2
test('require', t => {
	t.is(childProcess.execSync('node index.js', {encoding: 'utf8'}), '');
});
