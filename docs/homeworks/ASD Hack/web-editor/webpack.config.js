const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const defaultDevURLs = {
  libApp: 'http://localhost:3000/',
  webEditorURL: 'http://localhost:3005/',
};

const defaultProdURLs = {
  libApp: 'http://84.201.148.234/droptableusers-project/lib_app/',
  webEditorURL: 'http://84.201.148.234/droptableusers-project/web_editor/',
};

module.exports = (_, { mode }) => {
  const urlsObj = mode === 'development' ? defaultDevURLs : defaultProdURLs;

  return {
    entry: "./index.js",
    mode: "development",
    devtool: "hidden-source-map",
    output: {
      publicPath: urlsObj.webEditorURL,
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
          "lib-app": `lib_app@${urlsObj.libApp}remoteEntry.js`,
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
};
