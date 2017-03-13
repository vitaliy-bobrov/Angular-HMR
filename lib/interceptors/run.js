module.exports = function(runFunction) {
  this.logger(`RUN "${this.ANGULAR_MODULE}":
     ${runFunction}`, 'info');

  this.ANGULAR_MODULE.run(runFunction);

  return this;
};
