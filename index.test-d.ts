/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import process from 'node:process';
import cliCursor from './index.js';

cliCursor.hide();
cliCursor.hide(process.stderr);

cliCursor.show();
cliCursor.show(process.stderr);

cliCursor.toggle();
cliCursor.toggle(false);
cliCursor.toggle(false, process.stderr);
