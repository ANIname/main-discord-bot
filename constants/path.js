const path = require('path');

exports.ROOT_DIRECTORY_PATH             = path.resolve(__dirname, '..');
exports.SERVICES_DIRECTORY_PATH         = path.join(exports.ROOT_DIRECTORY_PATH, 'services');
exports.NODE_MODULES_DIRECTORY_PATH     = path.join(exports.ROOT_DIRECTORY_PATH, 'node_modules');
exports.WEBPACK_OUTPUT_DIRECTORY_PATH   = path.join(exports.ROOT_DIRECTORY_PATH, '.webpack-output');
exports.LAMBDA_FUNCTIONS_DIRECTORY_PATH = path.join(exports.ROOT_DIRECTORY_PATH, 'lambda-functions');
