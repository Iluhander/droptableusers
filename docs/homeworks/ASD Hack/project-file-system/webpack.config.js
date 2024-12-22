const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = true;
const defaultURLs = {
  libApp: isDev ? 'http://localhost:3000/' : 'http://84.201.148.234/droptableusers-project/lib_app/',
  public: isDev ? 'http://localhost:3007/' : 'http://84.201.148.234/droptableusers-project/project_file_system/'
}

module.exports = {
  entry: "./index.js",
  mode: "development",
  devtool: "hidden-source-map",
  output: {
    publicPath: defaultURLs.public,
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
      name: "project_fs",
      filename: "remoteEntry.js",
      exposes: {
        "./ProjectFS": "./src/ProjectFS.js",
      },
      remotes: {
        "lib-app": `lib_app@${defaultURLs.libApp}remoteEntry.js`,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
