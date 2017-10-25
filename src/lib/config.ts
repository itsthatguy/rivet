import * as configLoader from '../lib/configLoader';
import * as fs from 'fs';
import { resolve } from 'path';

export interface IAlias {
  [alias: string]: string;
}

export interface IConfig {
  aliases?: IAlias;
  appRoot?: string;
  compiledContractsRoot?: string;
  contractsPath?: string;
  contractsRoot?: string;
  pkgRoot?: string;
  set?(any): IConfig;
}

export const configDefaults: IConfig = {
  aliases: {},
  appRoot: fs.realpathSync(process.cwd()),
  compiledContractsRoot: 'contracts/json/',
  contractsPath: '**/*.contract.js',
  contractsRoot: 'contracts/',
};

const userConfig = configLoader.load(configDefaults.appRoot);

export class Config implements IConfig {
  public aliases;
  public appRoot;
  public compiledContractsRoot;
  public contractsPath;
  public contractsRoot;
  public pkgRoot;

  constructor(options: IConfig = {}) {
    Object.assign(this, {
      ...configDefaults,
      ...userConfig,
      ...options,
      pkgRoot: resolve(__dirname, '../../'),
    });
  }

  public set(options) {
    return Object.assign(this, options);
  }
}

export default new Config();
