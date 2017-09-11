jest.mock('child_process');

const {
  publishHandler,
  versionHandler,
} = require('../lib');
const strip = require('strip-color');

let out = '';

global.console = {
  log: function (stuff) {
    out += strip(stuff + '\n');
  },
  error: console.error,
};

describe('versionHandler', function () {
  afterEach(function () {
    out = '';
  });

  it('does not try to bump the version if none is specified', function () {
    const fn = versionHandler({
      version: false,
    });
    expect(fn).toBeNull();
  });

  it('bumps the version if one is specified', function () {
    const fn = versionHandler({
      version: 'patch',
    });
    expect(out).toEqual('jss info Bumping package version\n' +
                        'jss cmd npm version patch --no-git-tag-version\n');

  });
});

describe('publishHandler', function () {
  afterEach(function () {
    out = '';
  });

  it('does not try to bump the version if none is specified', function () {
    const fn = publishHandler({
      version: false,
    });
    expect(fn).toBeUndefined();
  });

  it('bumps the version if one is specified', function () {
    const fn = publishHandler({
      version: 'patch',
    });
    expect(out).toEqual('jss info Bumping package version\n' +
                        'jss cmd npm version patch --no-git-tag-version\n' +
                        'jss info Publishing package\n' +
                        'jss cmd npm publish\n');
  });
});
