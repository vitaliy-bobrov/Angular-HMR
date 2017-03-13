module.exports = function(name, value) {
  var exists = !!this.valueCache[name];

  this.valueCache[name] = value;

  this.logger(`VALUE "${name}":
    ${value}`, 'info');

  if (exists) {
    /* eslint-disable */
    this.valueInject = this.valueCache[name];

    this.bootstrapElement.injector().invoke([name, function(value) {
      value = this.valueInject;
    }], this);
    /* eslint-enable */

    this.reloadState();
  } else {
    this.ANGULAR_MODULE.value(name, this.valueCache[name]);
  }

  return this;
};
