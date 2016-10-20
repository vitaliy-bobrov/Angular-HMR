module.exports = function(moduleName, injectorArray) {

  this.strapped = false;

  if (this.strapped) {
    return this;
  }

  if (injectorArray) {
    injectorArray.push(require('../module').name);
    this.ANGULAR_MODULE = angular.module(moduleName, injectorArray);
  } else {
    angular.module(moduleName);
  }

  if (this.settings.log) {
    console.log(this.webpackModule);
  }

  this.cache[moduleName] = this.cache[moduleName] || {};
  this.MODULE_CACHE = this.cache[moduleName];

  this.name = this.ANGULAR_MODULE.name;

  this.bootstrapElement = angular.element(this.element);

  this.strapped = true;

  return this;
};
