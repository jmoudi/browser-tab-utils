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
  firefoxProfile: `/home/jm/.mozilla/firefox/c.test`,
  browserConsole: false
})




module.exports = merge(baseConfig(), {
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
/*   resolve: {
    alias: {
      "@std/fp": "'/home/jm/Projects/Modules/ts/core/fp" //require.resolve("@std/fp") //'/home/jm/Projects/Modules/ts/core/fp/dist/index.js'
    }
  }, */
/*   plugins:[
    new Dotenv(),
    // @ts-ignore
    new ChromeExtensionReloader()
  ] */
  plugins:[
/*     new TsconfigPathsPlugin({

    }), */
    webExt
  ]
});
