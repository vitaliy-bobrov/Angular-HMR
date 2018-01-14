const transform = require('../utils/transform');
const hasChanged = require('../utils/hasChanged');

module.exports = function (name, directive) {
  let def, directiveFn, dependencies;
  const cacheKey = `directive:${name}`;

  if (Array.isArray(directive)) {
    dependencies = directive.slice(0, -1);
    directiveFn = directive[directive.length - 1];
  } else if (typeof directive === 'function') {
    dependencies = directive.$inject || [];
    directiveFn = directive;
  } else {
    throw new Error('Malformed directive function');
  }

  def = directiveFn();

  this.logger(`DIRECTIVE "${name}":
    ${JSON.stringify(def)}`, 'info');

  const exists = this.MODULE_CACHE[cacheKey];
  const changed = hasChanged.call(this, name, def);

  if (def.template) {
    this.templateCache[name] = def.template;
  }

  if (def.controller) {
    this.controllerCache[name] = def.controller;
  }

  if (exists && changed) {
    this.reloadState();
  }

  if (!exists) {
    this.MODULE_CACHE[cacheKey] = true;
    const transformedDirective = (...args) => {
      const directive = directiveFn.apply(null, args);
      const transformedDef = transform.call(this, name, directive);
      directive.controller = transformedDef.controller;

      return directive;
    };
    transformedDirective.$inject = dependencies;

    this.ANGULAR_MODULE.directive(name, transformedDirective);
  }

  return this;
};
