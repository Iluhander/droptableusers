import { Configuration } from 'webpack-dev-server';
import { BuildDevOptions } from './types';

export function deriveDevServer({ port }: BuildDevOptions): Configuration {
  return {
    port: port ? port : 7437,
    open: true,
    historyApiFallback: true,
    proxy: [],
    // setupMiddlewares: (middlewares, devServer) => {
    //   if (!devServer?.app) {
    //     throw new Error('webpack-dev-server is not defined');
    //   }

    //   return [
    //     devServer.app.use(
    //       '/trpc',
    //       createProxyMiddleware({
    //         target: 'http://localhost:8765',
    //         changeOrigin: true,
    //       })
    //     ),
    //     ...middlewares,
    //   ];
    // },
  };
}
