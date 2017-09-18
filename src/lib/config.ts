import * as configLoader from '../util/config-loader';

interface IConfig {
  contractsRoot: string;
  contractsPath: string;
  compiledContractsRoot: string;
  producersContractsRoots: any[];
}

const configDefaults: IConfig = {
  contractsRoot: 'contracts/',
  contractsPath: '**/*.contract.js',
  compiledContractsRoot: 'contracts/json/',
  producersContractsRoots: [
    // example:
    // 'node_modules/producer-one-contracts/contracts/',
    // 'node_modules/producer-two-contracts/contracts/',
  ],
};

const userConfig = configLoader.load();

export const Config = {
  ...configDefaults,
  ...userConfig,
};
