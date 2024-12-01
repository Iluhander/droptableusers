export interface BuildPaths {
  src: string;
  entry: string;
  output: string;
  html: string;
  back: string;
}

export interface BuildDevOptions {
  port?: number;
}

export class BuildOptions {
  constructor(
    public paths: BuildPaths,
    public isProd = true,
    public dev: BuildDevOptions = {}
  ) {}
}
