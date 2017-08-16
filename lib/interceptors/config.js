module.exports = function(configFunction) {
  this.logger(`CONFIG "${this.ANGULAR_MODULE.name}"
    ${configFunction}`, 'info');

  const changed = this.configCache.toString() !== configFunction.toString();

  if (changed) {
    this.ANGULAR_MODULE.config(configFunction);
    this.reloadState();
  }

  return this;
};
