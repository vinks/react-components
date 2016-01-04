var path = require('path');
var webpack = require('webpack');

var paths = {
  ASSETS: path.resolve(__dirname, './assets'),
  SRC: path.resolve(__dirname),
  COMPONENTS: path.resolve(__dirname, '../src'),
  DIST: path.resolve(__dirname, './build')
};

module.exports = {

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?stage=0&loose',
        exclude: [ paths.ASSETS ],
        include: [ paths.COMPONENTS, paths.SRC, /rc-datepicker/, /react-input-link/, /react-autosize-textarea/ ]
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: paths.SRC,
        exclude: paths.ASSETS
      }
    ]
  }

};