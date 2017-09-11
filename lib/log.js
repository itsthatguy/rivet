require('colors');

const textHelpers = {
  pkg: 'jss',
  cmd: 'cmd'.green,
  info: 'info'.green,
  warn: 'warn'.yellow,
  error: 'info'.red,
};

const print = (logger, type, message, fallbackType) => {
  const msg = message || type;
  const msgType = textHelpers[type] || textHelpers[fallbackType];

  logger(`${textHelpers.pkg} ${msgType} ${msg}`);
};

module.exports = exports = {
  log: (type, message) => print(console.log, type, message, 'info'),
  warn: (type, message) => print(console.warn, type, message, 'warn'),
  error: (type, message) => print(console.error, type, message, 'error'),
};

exports.pkg = textHelpers.pkg;
exports.cmd = textHelpers.cmd;
exports.info = textHelpers.info;
exports.error = textHelpers.error;
