const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const publicPath = process.env.WEB_EDITOR_URL ?? 'http://84.201.148.234/droptableusers-project/web_editor/';
const libAppURL = process.env.LIB_APP_URL ?? 'http://84.201.148.234/droptableusers-project/lib_app';
const visualizerURL = process.env.VISUALIZER_URL ?? 'http://84.201.148.234/droptableusers-project/visualizer';

module.exports = {
  entry: "./index.js",
  mode: "development",
  devtool: "hidden-source-map",
  output: {
    publicPath,
    clean: true,
  },
  cache: false,
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
      name: "web_editor",
      filename: "remoteEntry.js",
      exposes: {
        "./WebEditor": "./src/WebEditor.jsx",
      },
      remotes: {
        "lib-app": `lib_app@${libAppURL}/remoteEntry.js`,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
