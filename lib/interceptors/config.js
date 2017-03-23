module.exports = function(configFunction) {
  this.logger(`CONFIG "${this.ANGULAR_MODULE.name}"
    ${configFunction}`, 'info');
  this.ANGULAR_MODULE.config(configFunction);

  return this;
};
