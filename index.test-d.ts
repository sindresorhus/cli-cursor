import * as cliCursor from '.';

cliCursor.hide();
cliCursor.hide(process.stderr);

cliCursor.show();
cliCursor.show(process.stderr);

cliCursor.toggle();
cliCursor.toggle(false);
cliCursor.toggle(false, process.stderr);
