/**
 * Simple function to check if requests are working
 *
 * @returns {object} HTTP Response
 */
export async function handler() {
  return {
    headers: {
      'Content-Type': 'application/json',
    },

    statusCode: 200,
    body:       JSON.stringify({ message: 'pong' }),
  };
}
