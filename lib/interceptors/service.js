module.exports = function(name, serviceFunction) {
  var exists = this.MODULE_CACHE[name];
  this.serviceCache[name] = serviceFunction;

  this.logger(`SERVICE "${name}":
    ${serviceFunction}`, 'info');

  var intercept = function($provide) {
    $provide.decorator(name, function($delegate) {
      return $delegate;
    });
  };

  if (exists) {
    /* eslint-disable no-unused-vars */
    this.serviceInject = serviceFunction;

    this.bootstrapElement.injector().invoke([name, function(service) {
      service = this.serviceInject;
    }], this);
    /* eslint-enable */

    this.reloadState();
  } else {
    this.MODULE_CACHE[name] = true;
    this.ANGULAR_MODULE.service(name, this.serviceCache[name]);
    this.ANGULAR_MODULE.config(intercept);
  }

  return this;
};
