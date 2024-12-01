import webpack from 'webpack';
import path from 'path';

import { deriveDevServer } from './devServer';
import { deriveLoaders } from './loaders';
import { derivePlugins } from './plugins';
import { BuildOptions } from './types';

export default function build(options: BuildOptions): webpack.Configuration {
  return {
    mode: options.isProd ? 'production' : 'development',
    entry: options.paths.entry,
    output: {
      path: options.paths.output,
      publicPath: '/',
      filename: path.join('scripts', '[name].[contenthash].js'),
      clean: true,
    },
    module: {
      rules: deriveLoaders(),
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@pages': path.join(options.paths.src, 'pages'),
        '@widgets': path.join(options.paths.src, 'widgets'),
        '@entities': path.join(options.paths.src, 'entities'),
        '@features': path.join(options.paths.src, 'features'),
        '@shared': path.join(options.paths.src, 'shared'),
        '@back-api': path.join(options.paths.back, 'dist'),
        '@back': path.join(options.paths.back, 'src', 'infra'),
        '@domain': path.join(options.paths.back, 'src', 'domain'),
      },
    },
    plugins: derivePlugins(options.isProd, options.paths.html),
    ...(options.isProd
      ? {}
      : {
          devServer: deriveDevServer(options.dev),
        }),
    optimization: {
      usedExports: true,
    },
  };
}
