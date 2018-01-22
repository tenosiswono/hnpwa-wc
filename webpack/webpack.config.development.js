const merge = require("webpack-merge");
const webpack = require("webpack");
const config = require("./webpack.config.base");

const GLOBALS = {
  "process.env": {
    NODE_ENV: JSON.stringify("development")
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "true"))
};

module.exports = merge(config, {
  devtool: "source-map",
  entry: {
    application: [
      "webpack-hot-middleware/client",
      "babel-polyfill",
      "src/js/index"
    ],
    vendor: [
      "@webcomponents/webcomponentsjs/custom-elements-es5-adapter",
      "@webcomponents/webcomponentsjs/webcomponents-loader",
      "@0xcda7a/redux-es6",
      "redux-thunk"
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      cache: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS)
  ]
});