import {
  log,
  warn,
  error,
} from '../../src/bin/log';

describe('log', () => {
  afterEach(process.resetLog);

  it('.log()', () => {
    log('info', 'dude');
    expect(process.out).toEqual('api-contracts info dude\n');
  });

  it('.warn()', () => {
    warn('dude');
    expect(process.out).toEqual('api-contracts warn dude\n');
  });

  it('.error()', () => {
    log('error', 'dude');
    expect(process.out).toEqual('api-contracts error dude\n');
  });
});
