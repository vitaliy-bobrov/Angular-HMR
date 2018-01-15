module.exports = function(name, constant) {
  const exists = !!this.constantCache[name];

  this.constantCache[name] = constant;

  this.logger(`CONSTANT "${name}"
    ${constant}`, 'info');

  if (exists) {
    /* eslint-disable no-unused-vars */
    this.constantInject = this.constantCache[name];

    this.bootstrapElement.injector().invoke([name, function(constant) {
      constant = this.constantInject;
    }], this);
    /* eslint-enable */

    this.reloadState();
  } else {
    this.ANGULAR_MODULE.constant(name, this.constantCache[name]);
  }

  return this;
};
