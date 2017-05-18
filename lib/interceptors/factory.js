module.exports = function(name, factoryFunction) {
  var exists = this.MODULE_CACHE[name];
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
    this.MODULE_CACHE[name] = true;
    this.ANGULAR_MODULE.factory(name, this.factoryCache[name]);
  }

  return this;
};
