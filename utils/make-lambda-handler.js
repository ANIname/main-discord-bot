const { compose } = require('simple-composer');

/**
 * Compose handlers to task with catching errors
 *
 * @param {object} options Compose task handlers options
 * @param {string} options.taskName - Name of the task
 * @param {Function[]} options.taskHandlers - Handlers run one by one, when this task called
 * @param {Function[]} options.abortHandlers - Handlers run one by one, when task throw exception
 * @returns {Function} Composed task handlers
 */
export default function makeLambdaHandler(options = {}) {
  const composedTask = compose(options);

  return async (...lambdaArguments) => composedTask(...lambdaArguments).catch(sendError);
}

/**
 * @param {object} error Exception error
 * @returns {object} HTTP Error Response
 */
function sendError(error) {
  const { message, stack } = error;

  console.error('Lambda exception error:', error);

  return {
    statusCode: 500,

    body:    JSON.stringify({ message, stack }),
    headers: { 'Content-Type': 'application/json' },
  };
}
