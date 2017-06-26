module.exports = function(name, decoratorFunction) {
  const cacheKey = `decorator:${name}`;
  const exists = this.MODULE_CACHE[cacheKey];
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
    this.MODULE_CACHE[cacheKey] = true;
    this.ANGULAR_MODULE.decorator(name, this.decoratorCache[name]);
  }

  return this;
};
