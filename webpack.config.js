// @ts-check
const { 
  WebExtPlugin, TsconfigPathsPlugin, CopyWebpackPlugin
} = require('@webpack-tools/plugins'); 
const { 
  merge, path
} = require('@webpack-tools/utils');
const { 
  baseConfig
} = require('@webpack-tools/configs');
const { 
  MustacheReplacer
} = require('@std/string');
const { 
  readFileSync
} = require('fs');
const { 
  Yaml
} = require('@encoding/yaml');

const pkg = JSON.parse(readFileSync(path.resolve("./package.json"), "utf8"));
/* {
  name: "tab-utils",
  version: "1.0.1"

} */
const template = new MustacheReplacer({
    name: pkg.name,
    version: pkg.version
});
const CONTEXT = process.cwd();
const DIST = path.resolve(process.cwd(), "dist");


//const copyTransform = (content: string, path: string)

const copy = new CopyWebpackPlugin([
  { from: "assets/manifest.json",
   flatten: true,
    transform: (content, path) => {
      return template.exec(content.toString()) //Buffer.from(
  }
  }
  ],
  { 
    copyUnmodified: false, 
    //logLevel: "debug",
    context: 'src',
    
  }
);

const manifestDefaults = {
  manifest_version: 2
}

/* const ymlToJs = () => {
  const c = ctx[]
} */
const copy2 = () => {
  const p = new CopyWebpackPlugin([
  { from: "./manifest.yml",
   flatten: true,
    transform: (content) => {
      const manifestYml = Yaml.parse(content.toString());
      const manifestData = {
        name: pkg.name,
        version: pkg.version,
        applications: { gecko: { id: `${pkg.name}@jmoudi` }},
      }
      const manifestJson = {
        ...manifestDefaults,
        ...manifestYml,
        ...manifestData
      }
      console.log(`m`, manifestJson, JSON.stringify(manifestJson));
      return JSON.stringify(manifestJson)
      //return template.exec(content.toString()) //Buffer.from(
    },
    transformPath(){
      return 'manifest.json'
    }
  }
  ],
  { 
    copyUnmodified: false, 
    logLevel: "debug",
    context: 'src',
    
  }
);
 return p
}


const webExt = new WebExtPlugin({
  startUrl: [
    'about:devtools-toolbox?type=extension&id=duplicate-tabs%40jmoudi',
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


/* new ManifestPlugin({
  fileName: 'asset-manifest.json',
  publicPath: publicPath,
  generate: (seed, files) => {
    const manifestFiles = files.reduce(function(manifest, file) {
      manifest[file.name] = file.path;
      return manifest;
    }, seed);

    return {
      files: manifestFiles,
    };
  },
}), */


module.exports = merge(baseConfig(), {
  target: "web",
  devtool: "source-map",
  //context: process.cwd(),
  entry: {
    background: './src/background.ts'
  },
  output: {
    //We don't specify the library option so the library is exported to the root namespace.
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: '/',
    pathinfo: true,
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
    //copy,
    copy2()
    //webExt
  ]
});
