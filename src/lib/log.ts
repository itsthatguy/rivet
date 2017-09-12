import colors from 'colors'

const textHelpers = {
  pkg: 'jss',
  cmd: colors.green('cmd'),
  info: colors.green('info'),
  warn: colors.yellow('warn'),
  error: colors.red('info'),
};

const print = (logger, type, message, fallbackType) => {
  const msg = message || type;
  const msgType = textHelpers[type] || textHelpers[fallbackType];

  logger(`${textHelpers.pkg} ${msgType} ${msg}`);
};

export const log = (type, message?) => print(console.log, type, message, 'info')
export const warn = (type, message?) => print(console.warn, type, message, 'warn')
export const error = (type, message?) => print(console.error, type, message, 'error')
