var path = require('path');
var webpack = require('webpack');

var paths = {
  ASSETS: path.resolve(__dirname, './assets'),
  SRC: path.resolve(__dirname),
  DIST: path.resolve(__dirname, './build')
};

module.exports = {

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?stage=0&loose',
        exclude: [ paths.ASSETS ],
        include: [ paths.SRC, /buildo-react-components/ ]
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