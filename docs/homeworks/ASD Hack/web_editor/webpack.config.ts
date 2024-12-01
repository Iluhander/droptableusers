import webpack from 'webpack';

import build from './config/webpack/build';
import { BuildOptions } from './config/webpack/types';
import path from 'path';

export default function (env: any): webpack.Configuration {
  const options = new BuildOptions(
    {
      src: path.resolve(__dirname, 'src'),
      output: path.resolve(__dirname, './production', 'build'),
      entry: path.resolve(__dirname, 'src', 'App.tsx'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      back: path.resolve(__dirname, 'srm_back'),
    },
    env.mode === 'production',
    { port: env.port } // Dev server
  );

  return build(options);
}
