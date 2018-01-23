const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const config = require("./webpack.config.base");
const UglifyJs = require('uglifyjs-webpack-plugin');

const CopyWebpackPlugin = require("copy-webpack-plugin");

const GLOBALS = {
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "false"))
};

module.exports = merge(config, {
  devtool: "nosources-source-map",
  entry: {
    application: ["src/js/index"],
    vendor: [
      "@webcomponents/webcomponentsjs/custom-elements-es5-adapter",
      "@webcomponents/webcomponentsjs/webcomponents-loader",
      "@0xcda7a/redux-es6",
      "redux-thunk",
      "unfetch"
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "../src/assets"),
        to: "assets"
      }
    ]),
    // Avoid publishing files when compilation fails
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new UglifyJs()
  ],
  module: {
    noParse: /\.min\.js$/
  }
});
