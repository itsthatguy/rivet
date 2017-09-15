import {
  log,
  warn,
  error,
} from '../../src/lib/log';

describe('log', () => {
  afterEach(console.resetLog);

  it('.log()', () => {
    log('info', 'dude');
    expect(console.out).toEqual('proco info dude\n');
  });

  it('.warn()', () => {
    warn('dude');
    expect(console.out).toEqual('proco warn dude\n');
  });

  it('.error()', () => {
    log('error', 'dude');
    expect(console.out).toEqual('proco error dude\n');
  });
});
