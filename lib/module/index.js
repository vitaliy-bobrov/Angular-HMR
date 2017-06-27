const logger = require('../logger');

module.exports = angular
  .module('angular-hot-loader', [])
  .config(function() {
    logger('[AHL] Angular Hot Loader module config phase', 'info');
  });
