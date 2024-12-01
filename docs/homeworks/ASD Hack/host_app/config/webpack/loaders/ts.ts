export function deriveTSLoaders() {
  return {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: '/node_modules',
  };
}
