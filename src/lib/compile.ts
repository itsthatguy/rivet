#!/usr/bin/env node

// TODO: make this configurable
const DEFAULT_BASE_DIR = '__contracts__/';

import glob from 'glob'
import { join, parse, resolve } from 'path'
import fs from 'fs-extra'
import { existsSync } from 'fs'
import { log, warn, error } from './log'

const saveToFile = (data, filename, dir = 'data/') => {
  const projectRoot = resolve(process.cwd());
  const dirpath = resolve(projectRoot, dir);
  fs.ensureDirSync(dirpath);

  const outputPath = resolve(dirpath, filename);
  log(`Saving JSON contract: ${dir}/${filename}`);
  return fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
};

const attemptClean = (clean) => {
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

const globOptions = (ignore, out) => {
  const options = (!ignore[0])
  ? {
      ignore: [
        '**/node_modules/**/*',
        `${out}**/*`,
      ],
    }
  : { ignore };

  return options;
};


export function compileHandler (argv) {
  log('Compiling contracts to JSON');
  const { clean, out, src, ignore } = argv;
  const pathGlob = src || '**/*.contract.js';

  if (clean) attemptClean(out);

  const options = globOptions(ignore, out);

  glob(pathGlob, options, function (err, src) {
    src.forEach(function (file) {
      const { dir, name } = parse(file);

      // clear cache to rebuild the JSON
      const contractPath = resolve(process.cwd(), file);
      delete require.cache[require.resolve(contractPath)];
      const data = require(contractPath);

      const targetDir = dir.replace(DEFAULT_BASE_DIR, '');
      saveToFile(data, `${name}.json`, join(out, targetDir));
    });
  });
}
