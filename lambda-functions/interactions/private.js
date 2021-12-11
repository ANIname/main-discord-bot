import tweetnacl from 'tweetnacl';

import { DISCORD_PUBLIC_KEY } from '../../constants/application';
import consoleDebug           from '../../utils/console-debug';

/**
 * @param {object} payload Task payload
 * @param {Function} next The Next resolver
 * @returns {*} Next resolver
 */
export function verifyRequestSignature(payload, next) {
  const [request] = payload.arguments;

  const {
    'x-signature-ed25519': signature,
    'x-signature-timestamp': timestamp,
  } = request.headers;

  payload.context.isVerifiedRequestSignature = tweetnacl.sign.detached.verify(
    Buffer.from(timestamp + request.body),
    Buffer.from(signature, 'hex'),
    Buffer.from(DISCORD_PUBLIC_KEY, 'hex'),
  );

  consoleDebug.group('🔑', 'Verify request signature');
  consoleDebug.info('*', 'Signature:', signature);
  consoleDebug.info('*', 'Timestamp:', timestamp);
  consoleDebug.info('*', 'Result:', payload.context.isVerifiedRequestSignature);
  consoleDebug.info('*', 'VariablePath:', 'payload.context.isVerifiedRequestSignature');
  consoleDebug.groupEnd();

  console.info('test', request);

  return next();
}

/**
 * @param {object} payload Task payload
 * @param {Function} next The Next resolver
 * @returns {*|object} Next resolver or bad HTTP Response
 */
export function errorIfInvalidRequestSignature(payload, next) {
  const { isVerifiedRequestSignature } = payload.context;

  return isVerifiedRequestSignature
    ? next()
    : { statusCode: 401, body: 'invalid request signature' };
}

/**
 * @param {object} payload Task payload
 * @param {Function} next The Next resolver
 * @returns {*} Next resolver
 */
export function parseRequestBody(payload, next) {
  const [request] = payload.arguments;

  payload.context.parsedRequestBody = JSON.parse(request.body);

  consoleDebug.group('Parse request body');
  consoleDebug.info('*', 'raw body:', request.body);
  consoleDebug.info('*', 'Result:', payload.context.parsedRequestBody);
  consoleDebug.info('*', 'VariablePath:', 'payload.context.parsedRequestBody');
  consoleDebug.groupEnd();

  return next();
}

/**
 * @param {object} payload Task payload
 * @param {Function} next The Next resolver
 * @returns {*|object} Next resolver or good HTTP Response
 */
export function resolveIfIsPingRequest(payload, next) {
  const { parsedRequestBody } = payload.context;

  return parsedRequestBody.type === 1
    ? { statusCode: 200, body: JSON.stringify({ type: 1 }) }
    : next();
}

/**
 * @param {object} payload Task payload
 * @returns {object} good HTTP Response
 */
export function test(payload) {
  console.info('event', payload.arguments[0]);

  return {
    statusCode: 200,
    body:       JSON.stringify({ type: 1 }),
  };
}
