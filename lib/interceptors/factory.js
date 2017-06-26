module.exports = function(name, factoryFunction) {
  const cacheKey = `factory:${name}`;
  const exists = this.MODULE_CACHE[cacheKey];
  this.factoryCache[name] = factoryFunction;

  this.logger(`FACTORY "${name}":
    ${factoryFunction}`, 'info');

  if (exists) {
    this.factoryInject = factoryFunction();

    this.bootstrapElement.injector().invoke([name, function(factory) {
      factory.loadSessions = this.factoryInject.loadSessions;
    }], this);

    this.reloadState();
  } else {
    this.MODULE_CACHE[cacheKey] = true;
    this.ANGULAR_MODULE.factory(name, this.factoryCache[name]);
  }

  return this;
};
