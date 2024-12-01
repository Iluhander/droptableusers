import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration, ProgressPlugin, container } from 'webpack';

const { ModuleFederationPlugin } = container;

export function derivePlugins(
  _: boolean,
  htmlPath: string
): Configuration['plugins'] {
  return [
    new ModuleFederationPlugin({
      name: "editor",
      filename: "remoteEntry.js",
      library: { type: "var", name: "editor" },
      remotes: {},
      exposes: {
        "./werender": "./src/werender.tsx"
      }
    }),
    new HtmlWebpackPlugin({
      template: htmlPath,
      inject: true,
    }),
    new ProgressPlugin(), 
    new MiniCssExtractPlugin(),
  ];
}
