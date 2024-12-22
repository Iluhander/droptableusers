const { ModuleFederationPlugin } = require("@module-federation/enhanced");

const isDev = true;
const defaultURLs = {
  public: isDev ? 'http://localhost:3000/' : 'http://84.201.148.234/droptableusers-project/lib_app/',
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
