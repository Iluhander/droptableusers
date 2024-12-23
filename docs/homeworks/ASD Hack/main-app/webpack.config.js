const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const defaultDevURLs = {
  mainApp: 'http://localhost:3002/',
  libApp: 'http://localhost:3000/',
  webEditorURL: 'http://localhost:3005/',
  visualizerURL: 'http://localhost:3006/',
  projectFSURL: 'http://localhost:3007/'
};

const defaultProdURLs = {
  mainApp: 'http://84.201.148.234/droptableusers-project/main_app/',
  libApp: 'http://84.201.148.234/droptableusers-project/lib_app/',
  webEditorURL: 'http://84.201.148.234/droptableusers-project/web_editor/',
  visualizerURL: 'http://84.201.148.234/droptableusers-project/visualizer/',
  projectFSURL: 'http://84.201.148.234/droptableusers-project/project_file_system/'
};

module.exports = (_, { mode }) => {
  const urlsObj = mode === 'development' ? defaultDevURLs : defaultProdURLs;

  return {
    entry: "./index.js",
    mode: "development",
    devtool: "hidden-source-map",
    output: {
      publicPath: urlsObj.mainApp,
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
          "lib-app": `lib_app@${urlsObj.libApp}remoteEntry.js`,
          "web-editor": `web_editor@${urlsObj.webEditorURL}remoteEntry.js`,
          "visualizer": `visualizer@${urlsObj.visualizerURL}remoteEntry.js`,
          "project-fs": `project_fs@${urlsObj.projectFSURL}remoteEntry.js`,
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  }
};
