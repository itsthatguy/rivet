import runCommand from './runCommand'
import { log } from './log'
import { compileHandler } from './compile'

export function versionHandler (argv) {
  const { version } = argv;
  if (!version) return null;
  log('Bumping package version');
  runCommand(`npm version ${version} --no-git-tag-version`);
}

export function publishHandler (argv) {
  versionHandler(argv);
  log('Publishing package');
  runCommand('npm publish');
}

export function linkHandler (argv) {
  const { pkg } = argv;
  log('Linking package');
  if (!pkg) return runCommand('npm link');
  runCommand(`npm link ${pkg}`, { cwd: process.cwd() });
}

export function watchHandler (argv) {
  log('Watching for changes...');
  var chokidar = require('chokidar');

  const compile = (path) => {
    return compileHandler({ src: path, ignore: [false], out: '__contracts__/contracts/' });
  };

  chokidar.watch(argv.src, {ignored: '**/node_modules/**/*'})
  .on('add', compile)
  .on('change', compile);
}

export { compileHandler }
