// @ts-check
const { 
  WebExtWebpackPlugin
} = require('/home/jm/Projects/Tools/node/webpack/packages/plugins'); 
const { 
  merge, path
} = require('/home/jm/Projects/Tools/node/webpack/packages/utils');
const { 
  baseConfig
} = require('/home/jm/Projects/Tools/node/webpack/packages/configs');


const CONTEXT = process.cwd();
const DIST = path.resolve(__dirname, "dist");


/* const copy = new CopyWebpackPlugin([
  { from: "src/assets/manifest.json", flatten: false },
  { from: "src/assets", flatten: false },
 ],
  { copyUnmodified: false, logLevel: "debug" }
); */
// @ts-ignore
const webExt = new WebExtWebpackPlugin({
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




module.exports = merge(baseConfig, {
  entry: {
    page: './src/background.ts'
  },
/*   plugins:[
    new Dotenv(),
    // @ts-ignore
    new ChromeExtensionReloader()
  ] */
  plugins:[
    webExt
  ]
});
