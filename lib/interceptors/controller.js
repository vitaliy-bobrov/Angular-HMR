module.exports = function(name, controllerFunction) {
  var _that = this;
  var exists = this.MODULE_CACHE[name];
  this.controllerCache[name] = controllerFunction;

  this.logger(`CONTROLLER: "${name}":
    ${controllerFunction}`, 'info');

  if (exists) {
    this.reloadState();
  } else {
    this.MODULE_CACHE[name] = true;
    this.ANGULAR_MODULE.controller(name, ['$injector', '$scope', function($injector, $scope) {
      return $injector.invoke(_that.classTransform(_that.controllerCache[name]), this, {
        '$scope': $scope
      });
    }]);
  }

  return this;
};
