import * as path from 'path';
import * as glob from 'glob';
import { APP_ROOT } from './paths';

const PREFIX = 'proco';

const POSSIBLE_EXTENSIONS = [
  '*.ts',
  '*.js',
  '*.json',
  'rc',
];

const globOptions = {
  cwd: APP_ROOT,
  dot: true,
  ignore: [ '**/node_modules/**/*' ],
};

export const getFiles = (prefix: string, extensions: string[]): string[] => {
  const combinedPaths: string = extensions.map((extension: string): string => {
    return `${prefix}${extension}`;
  }).join('|');

  const globPath: string = `?(.)*(${combinedPaths})`;
  return glob.sync(globPath, globOptions);
};

export const getPkgConfig = (): any => {
  const fullFilePath = path.resolve(APP_ROOT, 'package.json');
  delete require.cache[fullFilePath];
  return require(fullFilePath).proco || {};
};

export const loadFiles = (paths: string[]): any[] => {
  const configs = paths.map((filePath: string): any => {
    try {
      const fullFilePath = path.resolve(APP_ROOT, filePath);
      delete require.cache[fullFilePath];
      const config = require(fullFilePath);
      return config;
    } catch (error) {
      throw new Error(error);
    }
  });

  return configs;
};

export const loadConfig = (): any => {
  const configFiles: string[] = getFiles(PREFIX, POSSIBLE_EXTENSIONS);
  const configs: any = [
    ...loadFiles(configFiles),
    ...getPkgConfig(),
  ].reduce((result: any, config: any): any => {
    return Object.assign({},
      result,
      config
    );
  }, {});
  return configs;
};
