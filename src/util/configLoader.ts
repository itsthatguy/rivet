import * as path from 'path';
import * as glob from 'glob';

const PREFIX = 'rivet';

const POSSIBLE_EXTENSIONS = [
  '*.ts',
  '*.js',
  '*.json',
  'rc',
];

export const getFiles = (prefix: string, extensions: string[], options: any): string[] => {
  const globOptions = {
    cwd: path.resolve(options.cwd),
    dot: true,
    ignore: [ '**/node_modules/**/*' ],
  };

  const combinedPaths: string = extensions.map((extension: string): string => {
    return `${prefix}${extension}`;
  }).join('|');

  const globPath: string = `?(.)*(${combinedPaths})`;
  return glob.sync(globPath, globOptions);
};

export const getPkgConfig = (options: any): any => {
  const fullFilePath = path.resolve(options.cwd, 'package.json');
  delete require.cache[fullFilePath];
  return require(fullFilePath).rivet || {};
};

export const loadFiles = (paths: string[], options: any): any[] => {
  const configs = paths.map((filePath: string): any => {
    try {
      const fullFilePath = path.resolve(options.cwd, filePath);
      delete require.cache[fullFilePath];
      const config = require(fullFilePath);
      return config;
    } catch (error) {
      throw new Error(error);
    }
  });

  return configs;
};

export const load = (cwd: string): any => {
  const configFiles: string[] = getFiles(PREFIX, POSSIBLE_EXTENSIONS, { cwd });
  const configs: any = [
    ...loadFiles(configFiles, { cwd }),
    ...getPkgConfig({ cwd }),
  ].reduce((result: any, config: any): any => {
    return Object.assign({},
      result,
      config
    );
  }, {});
  return configs;
};
