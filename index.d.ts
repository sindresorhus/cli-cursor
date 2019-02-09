/**
 * Shows the cursor.
 * 
 * @param stream (Default: process.stderr)
 */
declare function show(stream?: WritableStream): void;

/**
 * Hides the cursor.
 * 
 * @param stream (Default: process.stderr)
 */
declare function hide(stream?: WritableStream): void;

/**
 * Toggles the cursor visibility.
 * 
 * @param force Useful to show or hide the cursor based on a boolean
 * @param stream (Default: process.stderr)
 */
declare function toggle(force?: boolean, stream?: WritableStream): void;

export {show, hide, toggle};
