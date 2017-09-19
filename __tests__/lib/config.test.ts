import { Config } from '../../src/lib/config';

describe('config', () => {
  it('returns project config', () => {
    expect(Config).toEqual({
      contractsRoot: 'contracts/',
      contractsPath: '**/*.contract.js',
      compiledContractsRoot: 'contracts/json/',
      producersContractsRoots: [],
    });
  });
});
