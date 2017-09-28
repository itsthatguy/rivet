import * as stream from 'stream';
import * as strip from 'strip-color';

function FauxLogger() {
  let out = '';

  const write = (stuff) => {
    out += strip(stuff + '\n');
  };

  const logger = { write };

  return {
    get out() { return out; },
    stdout: logger,
    stderr: logger,

    resetLog() { out = ''; }
  };
}
const originalProcess = process;
const fauxLogger = FauxLogger();

process = new Proxy(fauxLogger, {
  get(target, name) {
  if (!target[name]) {
      return originalProcess[name];
    }
    return fauxLogger[name];
  },

  set(target, name, value) {
    if (!target[name]) {
      return originalProcess[name] = value;
    }

    return target[name] = value;
  }
});
