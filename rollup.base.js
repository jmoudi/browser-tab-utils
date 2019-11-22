//@ts-check 
//@ts-check 
import {
    RollupOptions
} from 'rollup-tools';


export function onWarn(message) {
    console.log(message);
    const suppressed = [
      //'UNRESOLVED_IMPORT', 
    'THIS_IS_UNDEFINED'
    ];
    const isSuppressed = suppressed.find(code => message.code === code)
    if (!isSuppressed) {
        return console.warn(message.message);
    }
}

const baseConfigDefaults = {
  input: './src/index.ts',
  output: {

  }
}


/**
 * When creating an iife or umd bundle, you will need to provide global variable names to replace your external imports via the output.globals option.

If a relative import, i.e. starting with ./ or ../, is marked as "external", rollup will internally resolve the id to an absolute file system location so that different imports of the external module can be merged. When the resulting bundle is written, the import will again be converted to a relative import. Example:
 */

/** @type {RollupOptions} */
export const defaultConfig = {
    output: {
        format: 'umd',
        sourcemap: true,
        exports: 'named',
        interop: true,
    },

    onwarn: onWarn,
    // important for yarn link
    preserveSymlinks: true,
    perf: false,
};
