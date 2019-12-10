//@ts-check 
import {
    mergeOptions, 
} from 'rollup-tools';
import path from 'path'
import { onWarn, defaultConfig } from './rollup.base';
import { getPlugins } from './rollup.utils';


/** @type {RollupOptions} */
const config = {
    context: process.cwd(),
    input: './src/background.ts',
    output: {
        file: './dist/background.js',
        name: path.basename('./dist/background.js')
    },
    // @ts-ignore
    plugins: getPlugins()

}

export default () => mergeOptions([ 
    defaultConfig, 
    //@ts-ignore
    config 
]);