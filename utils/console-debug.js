/**
 * This util will log data if process.env.IS_DEBUG_ENABLED equal true
 */

const forEach = require('lodash/forEach');
const noop    = require('lodash/noop');

const consoleTableObject = require('./console-table-object');

const { IS_DEBUG_ENABLED } = process.env;

exports.consoleTableObject = consoleTableObject;

forEach(console, (methodFunction, methodName) => {
  module.exports[methodName] = IS_DEBUG_ENABLED
    // eslint-disable-next-line no-console
    ? (...consoleMethodArguments) => console[methodName](...consoleMethodArguments)
    : noop;
});
