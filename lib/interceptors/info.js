module.exports = function(info) {
  this.logger(`INFO:
    ${info}`, 'info');

  this.ANGULAR_MODULE.info(info);

  return this;
};
