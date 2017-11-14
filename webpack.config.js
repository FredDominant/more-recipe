const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'client/js/index.js'),
    path.resolve(__dirname, 'client/js/components/App.js'),
    path.resolve(__dirname, 'client/js/components/Navbar.js'),
    path.resolve(__dirname, 'client/js/components/Search.js'),
    path.resolve(__dirname, 'client/js/components/Signup.js'),
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
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, './client/css/'),
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, './client/'),
        exclude: path.resolve(__dirname, 'node_modules/'),
        query: { presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  watch: true
};
