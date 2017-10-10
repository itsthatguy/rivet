import runCommand from '../runCommand';
import { log } from '../../lib/log';
import { IHandlerArgs } from './types';

export default (argv: IHandlerArgs): void => {
  const { pkg } = argv;
  log('Linking package');
  if (!pkg) { return runCommand('npm link'); }
  runCommand(`npm link ${pkg}`, { cwd: process.cwd() });
};
