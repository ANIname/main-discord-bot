const { IS_DEBUG_ENABLED } = process.env;

exports.interactions = {
  description: 'Function for interacting with the user slash commands',
  handler:     'lambda-functions/interactions/index.handler',

  environment: {
    IS_DEBUG_ENABLED,
  },

  events: [
    { http: { path: 'interactions', method: 'POST', cors: { origin: '*' } } },
  ],
};
