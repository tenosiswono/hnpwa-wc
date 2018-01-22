// Common Webpack configuration used by webpack.config.development and webpack.config.production

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  output: {
    filename: "js/[name].[chunkhash].js",
    path: path.resolve(__dirname, "../build"),
    publicPath: "/"
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      src: path.join(__dirname, "../src")
    },
    extensions: [".js", ".json", ".scss"]
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
    new webpack.ProvidePlugin({
      fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch" // fetch API
    }),
    // Shared code
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "js/[name].[hash].js",
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      inject: false
    })
  ],
  module: {
    rules: [
      // JavaScript / ES6
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, "../src"),
        use: "babel-loader"
      },
      //HTML
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, "../src/client")],
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      // Images
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "images/[name].[ext]?[hash]"
          }
        }
      }
    ]
  }
};
