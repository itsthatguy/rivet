import { resolve } from 'path';

import * as configLoader from '../../src/util/configLoader';

const options = {
  cwd: 'example/consumer/'
};

describe('configLoader', () => {
  describe('.getFiles()', () => {
    it('return names of matching files', () => {
      const prefix = 'proco';
      const extensions = [
        '*.js',
        '*.json',
        'rc',
      ];
      const files = configLoader.getFiles(prefix, extensions, options);

      expect(files).toEqual(expect.arrayContaining([
        '.proco.js',
        '.procorc.js',
        'procorc.js',
        '.procorc',
        'procorc'
      ]));

    });
  });

  describe('.getPkgConfig()', () => {
    it('returns config', () => {
      const pkgConfig = configLoader.getPkgConfig(options);
      expect(pkgConfig).toEqual({
        compiledContractsPath: 'contracts/json/'
      });
    });
  });

  describe('.loadFiles()', () => {
    it('returns contents of config files', () => {
      const prefix = 'proco';
      const extensions = [
        '*.js',
        '*.json',
        'rc',
      ];
      const files = configLoader.getFiles(prefix, extensions, options);
      const pkgConfig = configLoader.loadFiles(files, options);
      expect(pkgConfig).toEqual([
        {}, {}, {}, {}, {
          contractsRoot: 'contracts/'
        }
      ]);
    });
  });

  it('loads configs from project files', () => {
    const config = configLoader.load(options.cwd);

    expect(config).toEqual({
      contractsRoot: 'contracts/',
      compiledContractsPath: 'contracts/json/'
    });
  });
});
