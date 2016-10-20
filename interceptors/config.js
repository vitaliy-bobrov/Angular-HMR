module.exports = function(configFunction) {

  var _that = this;
  var name;

  if (this.settings.log) {
    console.log('CONFIG', configFunction);
  }

  this.ANGULAR_MODULE.config(configFunction);

  return this;
};
