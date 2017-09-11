#!/usr/bin/env node

// TODO: make this configurable
const DEFAULT_BASE_DIR = '__contracts__/';

const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
const { existsSync } = require('fs');
const { log, warn, error } = require('./log');

const saveToFile = (data, filename, dir = 'data/') => {
  const projectRoot = path.resolve(process.cwd());
  const dirpath = path.resolve(projectRoot, dir);
  fs.ensureDirSync(dirpath);

  const outputPath = path.resolve(dirpath, filename);
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


const compileHandler = (argv) => {
  log('Compiling contracts to JSON');
  const { clean, out, src, ignore } = argv;
  const pathGlob = src || '**/*.contract.js';

  if (clean) attemptClean(out);

  const options = globOptions(ignore, out);

  glob(pathGlob, options, function (err, src) {
    src.forEach(function (file) {
      const { dir, name } = path.parse(file);

      // clear cache to rebuild the JSON
      const contractPath = path.resolve(process.cwd(), file);
      delete require.cache[require.resolve(contractPath)];
      const data = require(contractPath);

      const targetDir = dir.replace(DEFAULT_BASE_DIR, '');
      saveToFile(data, `${name}.json`, path.join(out, targetDir));
    });
  });
}

module.exports = compileHandler;
