import runCommand from '../runCommand';
import { log } from '../../lib/log';
import compileHandler from './compile';
import { IHandlerArgs } from './types';

export default (argv: IHandlerArgs): void => {
  log('Watching for changes...');
  const chokidar = require('chokidar');
  const { cwd, ignore, out } = argv;

  const compile = (path: string): any[] => {
    return compileHandler({ src: path, ignore, cwd, out });
  };

  chokidar.watch(argv.src, {ignored: '**/node_modules/**/*'})
  .on('add', compile)
  .on('change', compile);
};
