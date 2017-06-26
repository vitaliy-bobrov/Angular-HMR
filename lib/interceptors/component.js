const transform = require('../utils/transform');
const hasChanged = require('../utils/hasChanged');

module.exports = function(name, component) {
  let def = component;
  const cacheKey = `component:${name}`;

  this.logger(`COMPONENT "${name}":
    ${JSON.stringify(component)}`, 'info');

  const exists = this.MODULE_CACHE[cacheKey];
  const changed = hasChanged.call(this, name, def);

  if (def.template) {
    this.templateCache[name] = def.template;
  }

  if (def.controller) {
    this.controllerCache[name] = def.controller;
  }

  if (changed && exists) {
    this.reloadState();
  }

  if (!exists) {
    this.MODULE_CACHE[cacheKey] = true;
    this.ANGULAR_MODULE.component(name, transform.call(this, name, def));
  }

  return this;
};
