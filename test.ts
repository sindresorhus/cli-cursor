import {show, hide, toggle} from '..';
declare const process: {stdout: WritableStream};
const out = process.stdout;

hide();
hide(out);

show();
show(out);

toggle(false);
toggle(false, out);

toggle(true);
toggle(true, out);
