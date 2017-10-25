import { createPromptModule } from 'inquirer';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { saveToFile } from './compile';
import { log } from '../../lib/log';
import { IHandlerArgs } from './types';
import Config, { IConfig } from '../../lib/config';

const useDefaultsPrompt = async (): Promise<boolean> => {
  const prompt = createPromptModule();
  const responses = await prompt([{
    type: 'confirm',
    name: 'useDefault',
    message: 'Do you want to use the default configuration?'
  }]);

  return responses.useDefault;
};

const configPrompt = async (useDefaults: boolean): Promise<IConfig> => {
  if (useDefaults) return Config;

  const prompt = createPromptModule();
  const config = await prompt([
    {
      type: 'input',
      name: 'appRoot',
      message: 'appRoot:',
      default: Config.appRoot,
    },
    {
      type: 'input',
      name: 'contractsRoot',
      message: 'contractsRoot:',
      default: Config.contractsRoot,
    },
    {
      type: 'input',
      name: 'contractsPath',
      message: 'contractsPath:',
      default: Config.contractsPath,
    },
    {
      type: 'input',
      name: 'compiledContractsRoot',
      message: 'compiledContractsRoot:',
      default: Config.compiledContractsRoot,
    },
  ]);

  return config;
};

export default async (argv: IHandlerArgs): Promise<any> => {
  log('Initializing Rivet...\n');

  const useDefaults = await useDefaultsPrompt();
  const config = await configPrompt(useDefaults);

  saveToFile(`module.exports = ${JSON.stringify(config, null, 2)};`, '.rivet.config.js', config.appRoot);
  const exampleContract = readFileSync(resolve(Config.pkgRoot, './example/consumer/contracts/example.contract.js'), 'utf8');
  saveToFile(exampleContract, 'example.contract.js', config.contractsRoot);
};
