const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const path = require("path");
module.exports = {
  entry: "./index.js",
  mode: "development",
  devtool: "hidden-source-map",
  output: {
    publicPath: "http://localhost:3000/",
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
      name: "lib_app",
      filename: "remoteEntry.js",
      exposes: {
        "./react": "react",
        "./react-dom": "react-dom",
        "./reactflow": "reactflow",
        "./js-yaml": "js-yaml",
        "./monaco-editor": "@monaco-editor/react",
      },
    }),
  ],
};
