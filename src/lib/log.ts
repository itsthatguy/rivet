import * as colors from 'colors';

export const textHelpers = {
  pkg: 'rivet',
  cmd: colors.green('cmd'),
  info: colors.green('info'),
  warn: colors.yellow('warn'),
  error: colors.red('error'),
};

const print = (logger: any, type: string, message: string, fallbackType: string) => {
  const msg = message || type;
  const msgType = textHelpers[type] || textHelpers[fallbackType || message];

  logger(`${textHelpers.pkg} ${msgType} ${msg}`);
};

export const log = (type, message?) => print(process.stdout.write.bind(process.stdout), type, message, 'info');
export const warn = (type, message?) => print(process.stdout.write.bind(process.stdout), type, message, 'warn');
export const error = (type, message?) => print(process.stderr.write.bind(process.stderr), type, message, 'error');
