import * as configLoader from '../util/config-loader';
import * as fs from 'fs';

interface IConfig {
  appRoot: string;
  contractsRoot: string;
  contractsPath: string;
  compiledContractsRoot: string;
  producersContractsRoots: any[];
}

const configDefaults: IConfig = {
  appRoot: fs.realpathSync(process.cwd()),
  contractsRoot: 'contracts/',
  contractsPath: '**/*.contract.js',
  compiledContractsRoot: 'contracts/json/',
  producersContractsRoots: [
    // example:
    // 'node_modules/producer-one-contracts/contracts/',
    // 'node_modules/producer-two-contracts/contracts/',
  ],
};

const userConfig = configLoader.load(configDefaults.appRoot);

export const CONFIG = {
  ...configDefaults,
  ...userConfig,
};
