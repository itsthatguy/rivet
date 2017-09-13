jest.mock('child_process');

import {
  publishHandler,
  versionHandler,
} from '../../src/lib/handlers';
import * as strip from 'strip-color';

let out = '';

const newConsole: any = {
  log: (stuff) => {
    out += strip(stuff + '\n');
  },
  error: console.error,
};

global.console = newConsole;

describe('versionHandler', () => {
  afterEach(() => out = '' );

  it('does not try to bump the version if none is specified', () => {
    const fn = versionHandler({ version: false });
    expect(fn).toBeNull();
  });

  it('bumps the version if one is specified', () => {
    const fn = versionHandler({ version: 'patch' });
    expect(out).toEqual('apic info Bumping package version\n' +
                        'apic cmd npm version patch --no-git-tag-version\n');
  });
});

describe('publishHandler', () => {
  afterEach(() =>  out = '' );

  it('does not try to bump the version if none is specified', () => {
    const fn = publishHandler({ version: false });
    expect(fn).toBeUndefined();
  });

  it('bumps the version if one is specified', () => {
    const fn = publishHandler({ version: 'patch' });
    expect(out).toEqual('apic info Bumping package version\n' +
                        'apic cmd npm version patch --no-git-tag-version\n' +
                        'apic info Publishing package\n' +
                        'apic cmd npm publish\n');
  });
});
