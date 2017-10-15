const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/js/app.js'),
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style.loader!css-loader' }
    ]
  }
};
