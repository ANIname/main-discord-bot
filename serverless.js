const importDir = require('directory-import');

const camelCase = require('lodash/camelCase');
const forEach   = require('lodash/forEach');
const pick      = require('lodash/pick');

const packageFile        = require('./package.json');
const setIfNotExists     = require('./utils/set-if-not-exists');
const consoleTableObject = require('./utils/console-table-object');

const { IS_OFFLINE, STAGE = 'development' } = process.env;

const isDebugEnabled = IS_OFFLINE !== 'false' || STAGE === 'development';

// Base configuration
(() => {
  const config = module.exports;

  config.service                             = packageFile.name;
  config.frameworkVersion                    = '2';
  config.configValidationMode                = 'error';
  config.deprecationNotificationMode         = 'error';
  config.unresolvedVariablesNotificationMode = 'error';

  config.plugins = [
    'serverless-deployment-bucket',
    'serverless-certificate-creator',
    'serverless-domain-manager',
    'serverless-iam-roles-per-function',
    'serverless-jetpack',
    'serverless-offline',
    'serverless-plugin-scripts',
    'serverless-prune-plugin',
    'serverless-webpack',
  ];

  consoleTableObject('⚡ Serverless Base Configuration:', config);
})();

// Provider Configuration
(() => {
  const config = setIfNotExists(module.exports, 'provider', {}).provider;

  config.name = 'aws';

  config.logRetentionInDays   = 7;
  config.lambdaHashingVersion = 20_201_221;

  config.stage  = STAGE;
  config.region = 'eu-central-1';

  config.runtime           = `nodejs${packageFile.engines.node}`;
  config.stackName         = `${packageFile.name}-${STAGE}`;
  config.apiName           = `${packageFile.name}-${STAGE}-http-api`;
  config.websocketsApiName = `${packageFile.name}-${STAGE}-websocket-api`;

  config.logs = {
    restApi:   { level: isDebugEnabled === 'true' ? 'INFO' : 'ERROR' },
    websocket: { level: isDebugEnabled === 'true' ? 'INFO' : 'ERROR' },
  };

  if (IS_OFFLINE !== 'false') config.profile = packageFile.name;

  consoleTableObject('⚡ Serverless Provider Configuration:', config);
})();

// Package configuration
(() => {
  const config = setIfNotExists(module.exports, 'package', {}).package;

  config.individually = true;

  consoleTableObject('⚡ Serverless Package Configuration:', config);
})();

// Scripts Configuration
(() => {
  const config = setIfNotExists(module.exports, 'custom.scripts', {}).custom.scripts;

  config.hooks = {
    'aws:common:validate:validate': 'sls create-cert', // Create certificate for api domain before deploy
    'aws:deploy:finalize:cleanup':  'sls prismaMigrateDeploy', // Migrate prisma migrations after deploy
  };

  config.commands = {
    jest:        'jest --silent',
    jestWatcher: 'jest --watch',
  };

  consoleTableObject('⚡ Serverless Scripts Configuration:', config);
})();

// Deployment Bucket Configuration
(() => {
  const providerConfig = setIfNotExists(module.exports, 'provider.deploymentBucket', {}).provider.deploymentBucket;
  const customConfig   = setIfNotExists(module.exports, 'custom.deploymentBucket', {}).custom.deploymentBucket;

  providerConfig.name = `${packageFile.name}-deployment-bucket`;

  providerConfig.maxPreviousDeploymentArtifacts = 1;
  customConfig.blockPublicAccess                = true;

  consoleTableObject(
    '⚡ Serverless Deployment Bucket Configuration:',
    { ...providerConfig, ...customConfig },
  );
})();

// Domain Configuration
(() => {
  // eslint-disable-next-line max-len
  const domainCertificateConfig = setIfNotExists(module.exports, 'custom.customCertificate', {}).custom.customCertificate;
  const domainConfig            = setIfNotExists(module.exports, 'custom.customDomain', {}).custom.customDomain;

  const hostedZone = 'discord.aniname.com';
  const domainName = STAGE === 'production'
    ? `api.${hostedZone}`
    : `api-${STAGE}.${hostedZone}`;

  domainCertificateConfig.certificateName = domainName;
  domainCertificateConfig.rewriteRecords  = true;
  domainCertificateConfig.hostedZoneNames = `${hostedZone}.`;

  domainConfig.domainName = domainName;
  domainConfig.autoDomain = true;

  consoleTableObject(
    '⚡ Serverless Domain Configuration:',
    { ...domainCertificateConfig, ...domainConfig },
  );
})();

// Webpack configuration
(() => {
  const config = setIfNotExists(module.exports, 'custom.webpack', {}).custom.webpack;

  config.keepOutputDirectory = true;
  config.includeModules      = { forceExclude: 'aws-sdk' };

  consoleTableObject('⚡ Serverless Webpack Configuration:', config);
})();

// Functions configuration
(() => {
  const config = setIfNotExists(module.exports, 'functions', {}).functions;

  const preparedToLogLambdaHandlersData = {};

  const importLambdaConfigurationOptions = {
    directoryPath: './lambda-functions',
    exclude:       /^((?!lambda-config.js).)*$/, // exclude everything that is not a lambda-config.js
  };

  importDir(importLambdaConfigurationOptions, (fileName, filePath, fileData) => {
    forEach(fileData, (functionConfig, functionName) => {
      config[functionName] = functionConfig;

      preparedToLogLambdaHandlersData[functionName] = pick(functionConfig, ['handler', 'description']);
    });
  });

  console.group('⚡', 'Serverless Prepared Lambda Handlers:');
  console.table(preparedToLogLambdaHandlersData);
  console.groupEnd();
})();

// Resources configuration
(() => {
  const config = setIfNotExists(module.exports, 'resources.Resources', {}).resources.Resources;

  importDir({ directoryPath: './resources' }, (resourceName, resourcePath, resourceConfig) => {
    const resourceCamelCaseName = camelCase(resourceName);

    config[resourceCamelCaseName] = resourceConfig;
  });

  console.group('⚡', 'Serverless Resources Configuration:');
  console.table(config);
  console.groupEnd();
})();
