const defaults    = require('lodash/defaults');
const packageFile = require('../package.json');

const stageRegions = {
  development: 'us-east-1',
  staging:     'us-east-2',
  production:  'eu-central-1',
};

const config = defaults(process.env, {
  STAGE:      'development',
  SLS_DEBUG:  '*',
  IS_OFFLINE: 'true',

  NODE_ENGINE_VERSION: packageFile.engines.node,
  PROJECT_NAME:        packageFile.name,
});

config.AWS_REGION = stageRegions[config.STAGE] || stageRegions.development;

if (config.IS_OFFLINE !== 'false') {
  config.AWS_PROFILE = config.PROJECT_NAME;
}

process.env = {
  ...config,

  get STACK_NAME() {
    return `${this.PROJECT_NAME}-${this.STAGE}`;
  },

  get IS_DEV() {
    return this.STAGE === 'development' ? 'true' : 'false';
  },

  get IS_DEBUG_ENABLED() {
    return (this.IS_OFFLINE !== 'false' || this.IS_DEV === 'true') ? 'true' : 'false';
  },
};
