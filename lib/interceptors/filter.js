module.exports = function(name, filterFunction) {
  var exists = this.MODULE_CACHE[name];
  this.filterCache[name] = filterFunction;

  this.logger(`FILTER "${name}":
    ${filterFunction}`, 'info');

  if (exists) {
    this.filterInject = filterFunction;

    this.bootstrapElement.injector().invoke([name, function(filter) {
      filter = this.filterInject;
    }], this);

    this.reloadState();
  } else {
    this.MODULE_CACHE[name] = true;
    this.ANGULAR_MODULE.filter(name, this.filterCache[name]);
  }

  return this;
};
