jest.mock('child_process');

import {
  publishHandler,
  versionHandler,
} from '../../src/bin/handlers';

describe('versionHandler', () => {
  afterEach(process.resetLog);

  it('does not try to bump the version if none is specified', () => {
    const fn = versionHandler({ version: false });
    expect(fn).toBeNull();
  });

  it('bumps the version if one is specified', () => {
    const fn = versionHandler({ version: 'patch' });
    expect(process.out).toEqual('rivet info Bumping package version\n' +
                                'rivet cmd npm version patch --no-git-tag-version\n');
  });
});

describe('publishHandler', () => {
  afterEach(process.resetLog);

  it('does not try to bump the version if none is specified', () => {
    const fn = publishHandler({ version: false });
    expect(fn).toBeUndefined();
  });

  it('bumps the version if one is specified', () => {
    const fn = publishHandler({ version: 'patch' });
    expect(process.out).toEqual('rivet info Bumping package version\n' +
                                'rivet cmd npm version patch --no-git-tag-version\n' +
                                'rivet info Publishing package\n' +
                                'rivet cmd npm publish\n');
  });
});
