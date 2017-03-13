module.exports = function(name, factoryFunction) {
  this.logger(`PROVIDER "${name}":
    ${factoryFunction}`, 'info');

  return this;
};
