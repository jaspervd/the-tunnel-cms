'use strict';

let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let path = require('path');

let config = require('./_config'); //paths config..

let NODE_ENV = '\'development\'';
let localHostUrl = path.join(__dirname, '/').replace('/Applications/MAMP/htdocs/', '');

process.argv.forEach(arg => {
  if(arg === '-p' || arg === '-d'){
    NODE_ENV = '\'production\'';
  }
});

module.exports = {
  entry: [
    config.build('js', 'src'), //JavaScript entry point
    config.build('css', 'src') //CSS entry point
    ],

    output: {
      path: config.js.dest.path,
    filename: config.js.dest.file //JavaScript end point
  },

  node: {
    fs: "empty"
  },

  //quickest, webpack -d -p for production
  devtool: 'eval',

  eslint: {
    formatter: require('eslint-formatter-pretty'),
    fix: true
  },

  module: {

    loaders: [
    {
      test: /\.(hbs|handlebars)$/,
      exclude: /node_modules/,
      loader: 'handlebars-template-loader'
    },

    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        babelrc: path.join(__dirname, '.babelrc')
      }
    },

    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint'
    },

    {
      test: /\.csv?$/,
      loader: 'dsv',
      query: {
        delimiter: ';'
      }
    },

    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!postcss!sass?outputStyle=expanded')
    }
    ]
  },

  postcss: function(){
    return [
    require('postcss-will-change'),
    require('postcss-cssnext')({
      browsers: ['IE >= 10', 'last 2 version'],
      features: {
        autoprefixer: {
          cascase: false
        }
      }
    })
    ];
  },

  //webpack plugins
  plugins: [
  new webpack.optimize.DedupePlugin(),
    //extract CSS into seperate file
    new ExtractTextPlugin(
      config.build('css', 'dest')
      ),
    //react smaller build
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: NODE_ENV}
    }),
    new BrowserSyncPlugin({
      proxy: path.join('localhost:8888', localHostUrl)
    })
    ],
    resolve: {
      extensions: ['', '.json', '.js', '.css', '.jsx', '.csv'],
      fallback: path.join(__dirname, 'node_modules'),
      root: __dirname,
      modulesDirectories: ['_js', 'views', 'dependencies'],

      alias: {
        'underscore': 'lodash'
      }
    },

    resolveLoader: {
      fallback: path.join(__dirname, 'node_modules')
    }
  };
