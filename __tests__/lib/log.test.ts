import {
  log,
  warn,
  error,
} from '../../src/bin/log';

describe('log', () => {
  afterEach(process.resetLog);

  it('.log()', () => {
    log('info', 'dude');
    expect(process.out).toEqual('proco info dude\n');
  });

  it('.warn()', () => {
    warn('dude');
    expect(process.out).toEqual('proco warn dude\n');
  });

  it('.error()', () => {
    log('error', 'dude');
    expect(process.out).toEqual('proco error dude\n');
  });
});
