import * as colors from 'colors';

const textHelpers = {
  pkg: 'apic',
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

export const log = (type, message?) => print(console.log, type, message, 'info');
export const warn = (type, message?) => print(console.warn, type, message, 'warn');
export const error = (type, message?) => print(console.error, type, message, 'error');
