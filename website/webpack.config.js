var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  // resolve: {
  //   alias: {
  //     'redux-devtools/lib': path.join(__dirname, '..', '..', 'src'),
  //     'redux-devtools': path.join(__dirname, '..', '..', 'src'),
  //     'react': path.join(__dirname, 'node_modules', 'react')
  //   },
  //   extensions: ['', '.js']
  // },
  // resolveLoader: {
  //   'fallback': path.join(__dirname, 'node_modules')
  // },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [
        'babel?stage=0' // enable es7 experiment features
      ],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.s?css$/,
      loaders: [
        'style',
        'css?modules&localIdentName=[name]__[local]___[hash:base64:5]',
        'sass'
      ],
      include: [
        path.join(__dirname, 'styles'),
        path.join(__dirname, 'routes'),
        path.join(__dirname, 'shared')
      ]
    }]
  }
};
