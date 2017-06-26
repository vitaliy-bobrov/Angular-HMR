module.exports = function(name, filterFunction) {
  const cacheKey = `filter:${name}`;
  const exists = this.MODULE_CACHE[cacheKey];
  this.filterCache[name] = filterFunction;

  this.logger(`FILTER "${name}":
    ${filterFunction}`, 'info');

  if (exists) {
    /* eslint-disable no-unused-vars */
    this.filterInject = filterFunction;

    this.bootstrapElement.injector().invoke([name, function(filter) {
      filter = this.filterInject;
    }], this);
    /* eslint-enable */

    this.reloadState();
  } else {
    this.MODULE_CACHE[cacheKey] = true;
    this.ANGULAR_MODULE.filter(name, this.filterCache[name]);
  }

  return this;
};
