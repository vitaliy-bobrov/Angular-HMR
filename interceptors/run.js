module.exports = function(runFunction) {
  if (this.settings.log) {
    console.log('RUN', runFunction);
  }

  this.ANGULAR_MODULE.run(runFunction);

  return this;
};
