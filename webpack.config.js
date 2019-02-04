const path = require('path');

module.exports = {
  entry: './public/js/main.js',
  mode: 'development',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, './public/dist'),
  },
  resolve: {
    extensions: ['.json', '.js'],
  },
};