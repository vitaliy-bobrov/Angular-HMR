module.exports = function(name, factoryFunction) {
  this.logger(`ANIMATION "${name}":
    ${factoryFunction}`, 'info');

  return this;
};
