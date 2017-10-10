import { CommandModule } from 'yargs';
import * as glob from 'glob';
import { join, parse, resolve } from 'path';
import * as fs from 'fs-extra';
import { existsSync } from 'fs';
import { log, warn, error } from '../../lib/log';
import { IHandlerArgs } from './types';

import Config from '../../lib/config';

export const saveToFile = (data: any, filename: string, dir: string = 'data/'): Promise<any> => {
  const dirpath = resolve(dir);
  fs.ensureDirSync(dirpath);

  const outputPath = resolve(dirpath, filename);
  log(`Saving JSON contract: ${dirpath}/${filename}`);
  return fs.writeFileSync(outputPath, data);
};

const attemptClean = (clean: string): void => {
  if (clean) {
    try {
      if (existsSync(clean)) {
        fs.removeSync(clean);
        log(`Cleaned directory: ${clean}`);
      } else {
        warn(`Directory '${clean}' does not exist, nothing to clean.`);
      }
    } catch (error) {
      error(`Error cleaning directory: ${clean}`);
      console.error(error);
    }
  }
};

const globOptions = (ignore: string[] | boolean[] = [], out: string, cwd: string): glob.IOptions => {
  const options: glob.IOptions = (ignore.length > 0 && !ignore[0])
  ? {
      ignore: [
        '**/node_modules/**/*',
        `${out}**/*`,
      ],
    }
  : { ignore };

  return Object.assign({},
    { cwd: join(Config.appRoot, cwd) },
    options
  );
};

export default (argv: IHandlerArgs): any[] => {
  log('Compiling contracts to JSON');
  const { clean, out, src: argSrc, ignore, cwd } = argv;
  const pathGlob = argSrc || '**/*.contract.js';

  if (clean) { attemptClean(out); }

  const options = globOptions(ignore, out, cwd);

  const paths = glob.sync(pathGlob, options);

  return paths.reduce((result: any[], file: string): any[] => {
    const { dir, name } = parse(file);

    // clear cache to rebuild the JSON for watch
    const contractPath = resolve(cwd, file);
    delete require.cache[require.resolve(contractPath)];
    const data = require(contractPath);

    const dirpath = resolve(Config.compiledContractsRoot, dir);
    const object = saveToFile(JSON.stringify(data, null, 2), `${name}.json`, dirpath);
    result.push(object);

    return result;
  }, []);
};
