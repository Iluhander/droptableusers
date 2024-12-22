const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const publicPath = process.env.MAIN_URL ?? 'http://localhost:3002/';
const libAppURL = process.env.LIB_APP_URL ?? 'http://localhost:3000/';
const webEditorURL = process.env.WEB_EDITOR_URL ?? 'http://localhost:3005/';
const visualizerURL = process.env.VISUALIZER_URL ?? 'http://localhost:3006/';

module.exports = {
  entry: "./index.js",
  mode: "development",
  devtool: "hidden-source-map",
  output: {
    publicPath,
    clean: true,
  },
  resolve: {
    extensions: [
      ".jsx",
      ".js",
      ".json",
      ".css",
      ".scss",
      ".jpg",
      "jpeg",
      "png",
    ],
  },
  cache: false,
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: "url-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "main_app",
      remotes: {
        "lib-app": `lib_app@${libAppURL}/remoteEntry.js`,
        "web-editor": `web_editor@${webEditorURL}/remoteEntry.js`,
        "visualizer": `visualizer@${visualizerURL}/remoteEntry.js`,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
