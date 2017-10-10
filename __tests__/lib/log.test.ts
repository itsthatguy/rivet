import {
  log,
  warn,
  error,
} from '../../src/lib/log';

describe('log', () => {
  afterEach(process.resetLog);

  it('.log()', () => {
    log('info', 'dude');
    expect(process.out).toEqual('rivet info dude\n');
  });

  it('.warn()', () => {
    warn('dude');
    expect(process.out).toEqual('rivet warn dude\n');
  });

  it('.error()', () => {
    log('error', 'dude');
    expect(process.out).toEqual('rivet error dude\n');
  });
});
