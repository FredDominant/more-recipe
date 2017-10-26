const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'client/js/components/app.js'),
    path.resolve(__dirname, 'client/js/components/Navbar.js'),
    path.resolve(__dirname, 'client/js/components/search.js'),
    path.resolve(__dirname, 'client/js/components/signup.js'),
    path.resolve(__dirname, 'client/css/style.css')
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: './client/js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
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
