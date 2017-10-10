import runCommand from '../runCommand';
import { log } from '../../lib/log';
import { IHandlerArgs } from './types';

export default (argv: IHandlerArgs): void => {
  const { version } = argv;
  if (!version) { return null; }
  log('Bumping package version');
  runCommand(`npm version ${version} --no-git-tag-version`);
};
