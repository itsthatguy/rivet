import { CommandModule } from 'yargs';
import runCommand from './runCommand';
import { log } from './log';
import { compileHandler } from './compile';
import Config from './config';

export interface IHandlerArgs {
  version?: string | boolean;
  clean?: string;
  out?: string;
  src?: string;
  cwd?: string;
  pkg?: string;
  ignore?: string[] | boolean[];
}

export const versionHandler = (argv: IHandlerArgs): void => {
  const { version } = argv;
  if (!version) { return null; }
  log('Bumping package version');
  runCommand(`npm version ${version} --no-git-tag-version`);
};

export const publishHandler = (argv: IHandlerArgs): void => {
  versionHandler(argv);
  log('Publishing package');
  runCommand('npm publish');
};

export const linkHandler = (argv: IHandlerArgs): void => {
  const { pkg } = argv;
  log('Linking package');
  if (!pkg) { return runCommand('npm link'); }
  runCommand(`npm link ${pkg}`, { cwd: process.cwd() });
};

export const watchHandler = (argv: IHandlerArgs): void => {
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

export { compileHandler };
