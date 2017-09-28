import { load, Config } from '../../src';
import { configDefaults } from '../../src/bin/config';

describe('config', () => {
  afterEach(() => {
    Config.set(configDefaults);
  });

  it('returns project config', () => {
    expect(Config).toMatchObject({
      contractsRoot: 'contracts/',
      contractsPath: '**/*.contract.js',
      compiledContractsRoot: 'contracts/json/',
      aliases: {}
    });
    expect(Config).toHaveProperty('appRoot');
  });

  it('can set new config programatically', () => {
    const newConfig = Config.set({
      appRoot: 'awesome/',
    });

    expect(Config).toEqual(newConfig);
  });

  it('returns contracts from an alias lookup', () => {
    Config.set({
      aliases: {
        sub: 'example/consumer/contracts/subfolder/',
      }
    });

    const contract = load('sub/nested.contract');
    expect(contract).toEqual({
      title: 'Nested Contract',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      }
    });
  });
});
