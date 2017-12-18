var path = require('path'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    "hMarquee": "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js"
  },

  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    })
  ]
};
