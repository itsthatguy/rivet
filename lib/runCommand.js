const { log } = require('./log');

const runCommand = function (command, options) {
  const execSync = require('child_process').execSync;
  const defaultOptions = {
    NODE_ENV: process.env.NODE_ENV,
    cwd: process.cwd() + '/__contracts__',
    PATH: process.env.PATH,
    SHELL: process.env.SHELL || '/usr/bin/bash'
  };

  const opts = Object.assign({}, defaultOptions, options);

  log('cmd', command);

  execSync(command, {
    cwd: opts.cwd,
    env: {
      NODE_ENV: opts.NODE_ENV,
      PATH: opts.PATH,
      SHELL: opts.SHELL,
    },
    stdio:[0, 1, 2],
  });
};

module.exports = runCommand;
