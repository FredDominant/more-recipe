const path = require('path');

module.exports = {
  entry: [path.resolve(__dirname, 'client/js/app.js'), path.resolve(__dirname, 'client/js/react.js')],
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style.loader!css-loader' },
      { test: /\.(js|jsx)$/, loader: 'babel-loader', query: { presets: ['es2015', 'react'] } }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  watch: true
};
