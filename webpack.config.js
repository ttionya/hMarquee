var path = require('path'),
  webpack = require('webpack'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  packageConfig = require('./package.json');

module.exports = {
  entry: {
    "hMarquee": "./src/hMarquee.js"
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
    }),

    new webpack.BannerPlugin(`Author: ${packageConfig.author}\n\nVersion: ${packageConfig.version}\n\nGitHub: ${packageConfig.repository.url}\n\nLicense: ${packageConfig.license}`)
  ]
};
