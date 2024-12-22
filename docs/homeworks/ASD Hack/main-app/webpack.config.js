const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = true;
const defaultURLs = {
  public: isDev ? 'http://localhost:3002/' : 'http://84.201.148.234/droptableusers-project/main_app/',
  libApp: isDev ? 'http://localhost:3000/' : 'http://84.201.148.234/droptableusers-project/lib_app/',
  webEditorURL: isDev ? 'http://localhost:3005/' : 'http://84.201.148.234/droptableusers-project/web_editor/',
  visualizerURL: isDev ? 'http://localhost:3006/' : 'http://84.201.148.234/droptableusers-project/visualizer/'
}

module.exports = {
  entry: "./index.js",
  mode: "development",
  devtool: "hidden-source-map",
  output: {
    publicPath: defaultURLs.public,
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
        "lib-app": `lib_app@${defaultURLs.libApp}remoteEntry.js`,
        "web-editor": `web_editor@${defaultURLs.webEditorURL}remoteEntry.js`,
        "visualizer": `visualizer@${defaultURLs.visualizerURL}remoteEntry.js`,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
