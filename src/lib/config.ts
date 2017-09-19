import * as configLoader from '../util/config-loader';
import * as fs from 'fs';
export const APP_ROOT = fs.realpathSync(process.cwd());

interface IConfig {
  appRoot: string;
  contractsRoot: string;
  contractsPath: string;
  compiledContractsRoot: string;
  producersContractsRoots: any[];
}

const configDefaults: IConfig = {
  appRoot: APP_ROOT,
  contractsRoot: 'contracts/',
  contractsPath: '**/*.contract.js',
  compiledContractsRoot: 'contracts/json/',
  producersContractsRoots: [
    // example:
    // 'node_modules/producer-one-contracts/contracts/',
    // 'node_modules/producer-two-contracts/contracts/',
  ],
};

const userConfig = configLoader.load(APP_ROOT);

export const Config = {
  ...configDefaults,
  ...userConfig,
};
