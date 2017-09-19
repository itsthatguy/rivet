import runCommand from '../../src/lib/runCommand';
import * as path from 'path';
import { CONFIG } from '../../src/lib/config';

jest.mock('child_process');

describe('runCommand', () => {
  it('executes the command with the passed options', () => {
    const result = runCommand('dude', {
      NODE_ENV: 'nahp',
      cwd: 'cwd',
      PATH: 'PATH',
      SHELL: '/usr/bin/bash'
    });

    expect(result).toEqual({
      command: 'dude',
      options: {
        cwd: 'cwd',
        env: {
          NODE_ENV: 'nahp',
          PATH: 'PATH',
          SHELL: '/usr/bin/bash',
        },
        stdio: [ 0, 1, 2 ]
      }
    });
  });

  it('has defaults when options are not specified', () => {
    const result = runCommand('dude');

    expect(result).toEqual({
      command: 'dude',
      options: {
        cwd: path.resolve(CONFIG.contractsRoot),
        env: {
          NODE_ENV: 'test',
          PATH: process.env.PATH,
          SHELL: process.env.SHELL,
        },
        stdio: [ 0, 1, 2 ]
      }
    });
  });
});
