import { Config } from '../../src/lib/config';

describe('config', () => {
  it('returns project config', () => {
    expect(Config).toMatchObject({
      contractsRoot: 'contracts/',
      contractsPath: '**/*.contract.js',
      compiledContractsRoot: 'contracts/json/',
      producersContractsRoots: []
    });
    expect(Config).toHaveProperty('appRoot');
  });
});
