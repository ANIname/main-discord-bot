import makeLambdaHandler from '../../utils/make-lambda-handler';

import {
  errorIfInvalidRequestSignature,
  verifyRequestSignature,
  resolveIfIsPingRequest,
  parseRequestBody,
  test, // TODO
} from './private';

export const handler = makeLambdaHandler({
  taskName: 'interactWithUser',

  taskHandlers: [
    verifyRequestSignature,
    errorIfInvalidRequestSignature,
    parseRequestBody,
    resolveIfIsPingRequest,
    test,
  ],
});
