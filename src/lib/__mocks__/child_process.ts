interface IChildProcess {
  execSync(command: string, options: any): any;
}

class ChildProcess implements IChildProcess {
  public execSync = (command, options) => ({
    command,
    options,
  })
}

module.exports = new ChildProcess();
