import * as strip from 'strip-color';

interface IFauxLogger {
  out: string;
  resetLog
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
  public dog = (...args): void => console.log(args);
}

global.console = new FauxLogger();
