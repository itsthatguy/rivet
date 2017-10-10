import * as configLoader from '../lib/configLoader';
import * as fs from 'fs';

export interface IAlias {
  [alias: string]: string;
}

export interface IConfig {
  appRoot?: string;
  contractsRoot?: string;
  contractsPath?: string;
  compiledContractsRoot?: string;
  aliases?: IAlias;
  set?(any): IConfig;
}

export const configDefaults: IConfig = {
  appRoot: fs.realpathSync(process.cwd()),
  contractsRoot: 'contracts/',
  contractsPath: '**/*.contract.js',
  compiledContractsRoot: 'contracts/json/',
  aliases: {}
};

const userConfig = configLoader.load(configDefaults.appRoot);

export class Config implements IConfig {
  public appRoot;
  public contractsRoot;
  public contractsPath;
  public compiledContractsRoot;
  public aliases;

  constructor(options: IConfig = {}) {
    Object.assign(this, {
      ...configDefaults,
      ...userConfig,
      ...options,
    });
  }

  public set(options) {
    return Object.assign(this, options);
  }
}

export default new Config();
