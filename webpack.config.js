const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'client/js/Index.jsx'),
    path.resolve(__dirname, 'client/css/style.scss')
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, './client/css/'),
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, './client/'),
        exclude: path.resolve(__dirname, 'node_modules/'),
        query: { presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.scss']
  },
  watch: true
};
