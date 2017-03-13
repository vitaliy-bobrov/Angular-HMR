module.exports = function(name, factoryFunction) {
  this.logger(`FILTER "${name}":
    ${factoryFunction}`, 'info');

  return this;
};
