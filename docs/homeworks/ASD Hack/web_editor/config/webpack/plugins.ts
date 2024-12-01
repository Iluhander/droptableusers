import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration, ProgressPlugin } from 'webpack';

export function derivePlugins(
  _: boolean,
  htmlPath: string
): Configuration['plugins'] {
  return [
    new HtmlWebpackPlugin({
      template: htmlPath,
      inject: true,
    }),
    new ProgressPlugin(),
    new MiniCssExtractPlugin(),
  ];
}
