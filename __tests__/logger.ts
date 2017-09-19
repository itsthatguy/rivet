import * as strip from 'strip-color';

const originalConsole = console;

interface IFauxLogger {
  out: string;
  log(any): void;
  warn(any): void;
  error(any): void;
  resetLog(): void;
}

class FauxLogger {
  public out: string = '';

  public resetLog = (): void => {
    this.out = '';
  }

  public log = (stuff): void => {
    this.out += strip(stuff + '\n');
  }

  public warn = (...args): void => this.log(args);
  public error = (...args): void => this.log(args);

  // for debugging
  public dog = (...args): void => originalConsole.log(...args);
}

global.console = new FauxLogger();
