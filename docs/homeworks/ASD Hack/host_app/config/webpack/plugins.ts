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
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        editor: "editor@http://localhost:7437/remoteEntry.js"
      },
      exposes: {},
      shared: []
    }),
    new HtmlWebpackPlugin({
      template: htmlPath,
      inject: true,
    }),
    new ProgressPlugin(),
    new MiniCssExtractPlugin()
  ];
}
