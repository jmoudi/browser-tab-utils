// @ts-check
/* const { 
  CopyWebpackPlugin,
  WebExtWebpackPlugin,
  TsconfigPathsPlugin, 
  HtmlWebpackPlugin,
  HotModuleReplacementPlugin,
} = require('@webpack-tools/plugins'); */
const { 
  merge, path
} = require('@webpack-tools/utils');
const { 
  baseConfig
} = require('@webpack-tools/configs');
import ChromeExtensionReloader from 'webpack-chrome-extension-reloader';
import Dotenv from 'dotenv-webpack';

const CONTEXT = process.cwd()

module.exports = merge(baseConfig, {
  entry: {
    page: './src/page.ts'
  },
  plugins:[
    new Dotenv(),
    // @ts-ignore
    new ChromeExtensionReloader()
  ]
});
