module.exports = function(name, decoratorFunction) {
  var exists = this.MODULE_CACHE[name];
  this.decoratorCache[name] = decoratorFunction;

  this.logger(`DECORATOR "${name}":
    ${decoratorFunction}`, 'info');

  if (exists) {
    /* eslint-disable no-unused-vars */
    this.decoratorInject = decoratorFunction;

    this.bootstrapElement.injector().invoke([name, function(decorator) {
      decorator = this.decoratorInject;
    }], this);
    /* eslint-enable */

    this.reloadState();
  } else {
    this.MODULE_CACHE[name] = true;
    this.ANGULAR_MODULE.decorator(name, this.decoratorCache[name]);
  }

  return this;
};
