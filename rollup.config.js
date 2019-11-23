//@ts-check 
import {
    baseConfig, build, mergeOptions, AliasPlugin,RollupOptions,
     createTsPlugin ,CommonjsPlugin,ResolvePlugin,SourcemapsPlugin,
    ReplacePlugin,TsPathsPlugins
} from 'rollup-tools';
import path from 'path'
import { onWarn, defaultConfig } from './rollup.base';

const lodashpath = path.resolve('/home/jm/Projects/Modules/ts/core/fp', 'node_modules', 'lodash');
const lodashpath2 = path.resolve('/home/jm/Projects/Modules/ts/core/fp', 'dist/index.js');



const getPlugins = () => {
    const plugins = [
    
        //TsPathsPlugins(),
        ResolvePlugin({
            //jsnext: true, main: true,
            //modulesOnly: true,
            extensions: ['.ts', '.tsx', '.js', '.mjs', '.json', '.jsx', '.node' ],
            preferBuiltins: false
          }), // so Rollup can find 'ms'
          createTsPlugin({
            appRoot: process.cwd() }, {}),
        CommonjsPlugin({
            include: [
                
                lodashpath2,
                /node_modules/,
                "node_modules" //
            ],
            // When 'rollup-plugin-commonjs' fails to properly convert the CommonJS modules to ES6 one has to manually name the exports
            // https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
            namedExports: {
                [lodashpath2]: [
                  'flatten',
                  'find',
                  'upperFirst',
                  'debounce',
                  'isNil',
                  'isNumber',
                  'flattenDeep',
                  'map',
                  'groupBy',
                  'chunk',
                  'sortBy',
                  'uniqueId',
                  'zip',
                  'omit',
                ],
            }
        }),

/*         createTsPlugin({
            appRoot: process.cwd() }, {}), */
      SourcemapsPlugin({ 
        include: [
            lodashpath2,
            /node_modules/
        ]
      }) //SourcemapsPlugin({include: [/node_modules/]}),

 /*        ReplacePlugin({
            '@std/fp': () => '/home/jm/Projects/Modules/ts/core/fp'
        }) */
    ]
    return plugins;
}

    


/** @type {RollupOptions} */
const c = {
    context: process.cwd(),
    input: './src/background.ts',
    output: {
        file: './dist/background.js',
        name: path.basename('./dist/background.js')
    },
    // @ts-ignore
    plugins: getPlugins()

}
const crconf = () => {
    const conf = mergeOptions([
        defaultConfig, 
    c]);
    console.log(`conf`, conf)
    return conf
}

export default crconf();