const { ModuleFederationPlugin } = require("@module-federation/enhanced");

const publicPath = process.env.LIB_APP_URL ?? 'http://84.201.148.234/droptableusers-project/lib_app/';
const webEditorURL = process.env.WEB_EDITOR_URL ?? 'http://84.201.148.234/droptableusers-project/web_editor';
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
