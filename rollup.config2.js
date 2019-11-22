//@ts-check 
import {
    baseConfig, build, mergeOptions, AliasPlugin,RollupOptions,
     createTsPlugin ,CommonjsPlugin,ResolvePlugin,
    ReplacePlugin,TsPathsPlugins
} from 'rollup-tools';
import path from 'path'

const lodashpath = path.resolve('/home/jm/Projects/Modules/ts/core/fp', 'node_modules', 'lodash');
const lodashpath2 = path.resolve('/home/jm/Projects/Modules/ts/core/fp', 'dist/index.js');

console.log(`fdsf`, lodashpath2)

/** @type {RollupOptions} */
const c = {
    input: './src/background.ts',
    output: {
        file: './dist/background.js',
        name: path.basename('./dist/background.js')
    },
    plugins: [
        createTsPlugin({appRoot: process.cwd() }, {}),
        //TsPathsPlugins(),
        ResolvePlugin({
            //mainFields
            modulesOnly: true
        }),
        CommonjsPlugin({
            include: [
                lodashpath2,
                "node_modules" ///node_modules/
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

 /*        ReplacePlugin({
            '@std/fp': () => '/home/jm/Projects/Modules/ts/core/fp'
        }) */
    ]

}
const conf = mergeOptions([baseConfig(), c]);
console.log(`r`, conf)

export default {...conf};