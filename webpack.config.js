// @ts-check
const { 
  WebExtPlugin, TsconfigPathsPlugin
} = require('@webpack-tools/plugins'); 
const { 
  merge, path
} = require('@webpack-tools/utils');
const { 
  baseConfig
} = require('@webpack-tools/configs');


const CONTEXT = process.cwd();
const DIST = path.resolve(__dirname, "dist");


/* const copy = new CopyWebpackPlugin([
  { from: "src/assets/manifest.json", flatten: false },
  { from: "src/assets", flatten: false },
 ],
  { copyUnmodified: false, logLevel: "debug" }
); */



const webExt = new WebExtPlugin({
  startUrl: [
    'about:debugging',
    //'https://danbooru.donmai.us/posts'
    //'dist/browser-action.html',
    //`https://rabe.ch/player/`
    //`https://www.reddit.com/r/AskProgramming/comments/baxzwe/what_is_the_ethical_thing_to_do_if_ive_found_a/`
    //`https://github.com/andreicristianpetcu/google_translate_this`
  ], //, `https://github.com/`], //['__tests__/playground.html'],
  firefox: `/usr/lib/firefox-developer-edition/firefox`,
  sourceDir: DIST,
  firefoxProfile: `/home/jm/.mozilla/firefox/xlpeu8gb.test`,
  browserConsole: false
})


const c = {
  bail: true,
  optimization: {
      // Without this, function names will be garbled and enableFeature won't work
      concatenateModules: true,
      //removeAvailableModules: true,
      //removeEmptyChunks: true,
      namedModules: true,
      //splitChunks: { chunks: 'async' }
  },
  mode: 'development',
  devtool: "inline-source-map", //'cheap-module-source-map', // 'cheap-module-eval-source-map' devtool: "inline-source-map",
  stats: {
      children: false,
      //env: true,
      modules: false,
      moduleTrace: true,
      //publicPath:true,
      errors: true,
      errorDetails: true,
      //warningsFilter: [/export.*wa.not.found.in/],
      performance: false,
      providedExports: true,
  },
    performance: false,
    watch: false,
    watchOptions: {
        poll: false, //1000, //false,
        aggregateTimeout: 5000,
        //ignored: IGNORED
    }
}

module.exports = merge(
  //@ts-ignore
  c, {
  target: "web",
  context: process.cwd(),
  entry: {
    page: './src/background.ts'
  },
  output: {
    //We don't specify the library option so the library is exported to the root namespace.
    filename: '[name].js',
    //chunkFilename: '[name].chunk.js',
    //library: '[name]',
    libraryTarget: 'umd',
    //umdNamedDefine: true,
    //publicPath: '/',
    //pathinfo: false,
    devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
},

resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js', '.jsx' ], //'.config.js', '.conf.js', 
    plugins: [
        new TsconfigPathsPlugin({
            //source: './src',
            //target: './dist',
            //configFile: path.resolve(process.cwd(), "tsconfig.json"),
            baseUrl: ".",
            //mainFields: "*", context
            //logLevel: "INFO",
            //logInfoToStdOut: true
        }),

    ],
    modules: [
      "./node_modules",
      "./src",
      path.join(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname), //localRoots
      path.resolve(__dirname, "node_modules"), // force absolute path
      path.resolve(process.cwd(), "node_modules")
    ],
    //modules: getModulePaths(),
    //mainFields: ['main:h5', 'main', 'module'],
    symlinks: true,
/*     alias: {
      "@std/fp": "'/home/jm/Projects/Modules/ts/core/fp" //require.resolve("@std/fp") //'/home/jm/Projects/Modules/ts/core/fp/dist/index.js'
    } */
  },
  module: {
    //strictExportPresence: true,
    rules: [
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
                loader: "ts-loader",
                options: {
                    transpileOnly: true, // ignore TS typings. Wichtig?
                    compilerOptions: {
                        // Enables ModuleConcatenation. It must be in here to avoid conflic with ts-node
                        module: 'es2015',
                        sourceMap: true,
                        //...CompilerOpts,
                        noEmit: true,
                        // With this, TS will error but the file will still be generated (on watch only)
                        noEmitOnError: false //process.argv.watch === false
                    } //, "declaration":true }
                }
            }
        },

        // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
        {
            test: /\.jsx?$/,
            //exclude: /node_modules/,
            enforce: "pre",
            use: { loader: 'source-map-loader' }
        },
    ]
},
/*   plugins:[
    new Dotenv(),
    // @ts-ignore
    new ChromeExtensionReloader()
  ] */

/*   plugins:[
    new TsconfigPathsPlugin({

    }), 
    webExt 
  ],*/
 
});
