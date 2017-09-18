import { resolve } from 'path';

jest.mock('../../src/util/paths');

import * as configLoader from '../../src/util/config-loader';

describe('config-loader', () => {
  describe('.getFiles()', () => {
    it('return names of matching files', () => {
      const prefix = 'proco';
      const extensions = [
        '*.js',
        '*.json',
        'rc',
      ];
      const files = configLoader.getFiles(prefix, extensions);

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
      const pkgConfig = configLoader.getPkgConfig();
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
      const files = configLoader.getFiles(prefix, extensions);
      const pkgConfig = configLoader.loadFiles(files);
      expect(pkgConfig).toEqual([
        {}, {}, {}, {}, {
          contractsRoot: 'contracts/'
        }
      ]);
    });
  });

  it('returns project config', () => {
    expect(configLoader.load()).toEqual({
      contractsRoot: 'contracts/',
      compiledContractsPath: 'contracts/json/'
    });
  });
});
