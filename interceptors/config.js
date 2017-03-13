module.exports = function(configFunction) {
  this.logger(`COFIG "${this.ANGULAR_MODULE}"
    ${configFunction}`, 'info');
  this.ANGULAR_MODULE.config(configFunction);

  return this;
};
