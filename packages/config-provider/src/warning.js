import rcWarning, { resetWarned } from 'rc-util/lib/warning';

export { resetWarned };
export function noop() {}

// eslint-disable-next-line import/no-mutable-exports
let warning = noop;
if (process.env.NODE_ENV !== 'production') {
  warning = (valid, component, message) => {
    rcWarning(valid, `[antd: ${component}] ${message}`);
    if (process.env.NODE_ENV === 'test') {
      resetWarned();
    }
  };
}

export default warning;
