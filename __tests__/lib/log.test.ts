import {
  log,
  warn,
  error,
} from '../../src/lib/log';

describe('log', () => {
  afterEach(console.resetLog);

  it('.log()', () => {
    log('info', 'butt');
    expect(console.out).toEqual('apic info butt\n');
  });

  it('.warn()', () => {
    warn('butt');
    expect(console.out).toEqual('apic warn butt\n');
  });

  it('.error()', () => {
    log('error', 'butt');
    expect(console.out).toEqual('apic error butt\n');
  });
});
