module.exports = function(name, controllerFunction) {
  const _that = this;
  const cacheKey = `ctrl:${name}`;
  const exists = this.MODULE_CACHE[cacheKey];
  this.controllerCache[name] = controllerFunction;

  this.logger(`CONTROLLER: "${name}":
    ${controllerFunction}`, 'info');

  if (exists) {
    this.reloadState();
  } else {
    this.MODULE_CACHE[cacheKey] = true;
    this.ANGULAR_MODULE.controller(name, ['$injector', '$scope', function($injector, $scope) {
      return $injector.invoke(_that.classTransform(_that.controllerCache[name]), this, {
        '$scope': $scope
      });
    }]);
  }

  return this;
};
