const { ModuleFederationPlugin } = require("@module-federation/enhanced");

const defaultDevURLs = {
  libApp: 'http://localhost:3000/',
};

const defaultProdURLs = {
  libApp: 'http://84.201.148.234/droptableusers-project/lib_app/',
};

module.exports = (_, { mode }) => {
  const urlsObj = mode === 'development' ? defaultDevURLs : defaultProdURLs;

  return {
    entry: "./index.js",
    mode: "development",
    devtool: "hidden-source-map",
    output: {
      publicPath: urlsObj.libApp,
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
        ".jpeg",
        ".png",
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
          "./octokit": "@octokit/rest",
          "./buffer": "buffer",
        },
      }),
    ],
  };
};
