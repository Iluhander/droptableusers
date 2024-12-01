import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import sass from 'sass';

export function deriveCSSLoaders() {
  return [
    {
      test: /\.(css|scss)$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]_[hash:base64:5]',
              exportLocalsConvention: 'camelCase',
            },
            importLoaders: 1,
            esModule: false,
          },
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: sass,
          },
        },
      ],
      include: /\.module\.(css|scss)$/,
    },
    {
      test: /\.(css|scss)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: sass,
          },
        },
      ],
      exclude: /\.module\.(css|scss)$/,
    },
  ];
}
