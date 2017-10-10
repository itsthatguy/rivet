import runCommand from '../runCommand';
import { log } from '../../lib/log';
import versionHandler from './version';
import { IHandlerArgs } from './types';

export default (argv: IHandlerArgs): void => {
  versionHandler(argv);
  log('Publishing package');
  runCommand('npm publish');
};
