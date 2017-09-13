// TODO: make this configurable
const DEFAULT_BASE_DIR = '__contracts__/';

import { CommandModule } from 'yargs';
import * as glob from 'glob';
import { join, parse, resolve } from 'path';
import fs from 'fs-extra';
import { existsSync } from 'fs';
import { log, warn, error } from './log';
import { IHandlerArgs } from './handlers';

const saveToFile = (data: any, filename: string, dir: string = 'data/'): Promise<any> => {
  const projectRoot = resolve(process.cwd());
  const dirpath = resolve(projectRoot, dir);
  fs.ensureDirSync(dirpath);

  const outputPath = resolve(dirpath, filename);
  log(`Saving JSON contract: ${dir}/${filename}`);
  return fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
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

const globOptions = (ignore: string[] | boolean[], out: string): glob.IOptions => {
  const options: glob.IOptions = (!ignore[0])
  ? {
      ignore: [
        '**/node_modules/**/*',
        `${out}**/*`,
      ],
    }
  : { ignore };

  return options;
};

export const compileHandler = (argv: IHandlerArgs): void => {
  log('Compiling contracts to JSON');
  const { clean, out, src: argSrc, ignore } = argv;
  const pathGlob = argSrc || '**/*.contract.js';

  if (clean) { attemptClean(out); }

  const options = globOptions(ignore, out);

  glob(pathGlob, options, (err: Error, src: string[]): void => {
    src.forEach((file: string): void => {
      const { dir, name } = parse(file);

      // clear cache to rebuild the JSON
      const contractPath = resolve(process.cwd(), file);
      delete require.cache[require.resolve(contractPath)];
      const data = require(contractPath);

      const targetDir = dir.replace(DEFAULT_BASE_DIR, '');
      saveToFile(data, `${name}.json`, join(out, targetDir));
    });
  });
};
