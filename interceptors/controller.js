var toFactory = require('to-factory');

module.exports = function(name, controllerFunction) {

  var _that = this;
  var exists = this.MODULE_CACHE[name];
  this.controllerCache[name] = this.settings.es2015class ? toFactory(controllerFunction) : controllerFunction;

  if (this.settings.log) {
    console.log('CONTROLLER', name, controllerFunction);
  }

  if (!exists) {
    this.MODULE_CACHE[name] = true;
    this.ANGULAR_MODULE.controller(name, ['$injector', '$scope', function($injector, $scope) {
        return $injector.invoke(_that.controllerCache[name], this, {
            '$scope': $scope
        });
    }]);
  }

  if (exists) {
    this.reloadState();
  }

  return this;

};
