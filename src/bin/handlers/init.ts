import { createPromptModule } from 'inquirer';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { saveToFile } from './compile';
import { log } from '../../lib/log';
import { IHandlerArgs } from './types';
import Config from '../../lib/config';

export default async (argv: IHandlerArgs): Promise<any> => {
  log('Initializing Rivet...\n');
  const useDefaultsPrompt = createPromptModule();
  const useDefaultResponses = await useDefaultsPrompt([{
    type: 'confirm',
    name: 'useDefault',
    message: 'Do you want to use the default configuration?'
  }]);

  const useDefaults = useDefaultResponses.useDefault;

  let userConfig;

  if (!useDefaults) {
    const configPrompt = createPromptModule();
    userConfig = await configPrompt([
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
  }

  const config = userConfig || Config;
  saveToFile(`module.exports = ${JSON.stringify(config, null, 2)};`, '.rivet.config.js', config.appRoot);
  const exampleContract = readFileSync(resolve('./example/consumer/contracts/example.contract.js'), 'utf8');
  saveToFile(exampleContract, 'example.contract.js', config.contractsRoot);
};
