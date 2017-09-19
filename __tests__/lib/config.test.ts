import { CONFIG } from '../../src/bin/config';

describe('config', () => {
  it('returns project config', () => {
    expect(CONFIG).toMatchObject({
      contractsRoot: 'contracts/',
      contractsPath: '**/*.contract.js',
      compiledContractsRoot: 'contracts/json/',
      producersContractsRoots: []
    });
    expect(CONFIG).toHaveProperty('appRoot');
  });
});
