var toFactory = require('to-factory');
var logger = require('./logger');

var hotAngular;

/**
 * Angular Hot Loader.
 * @param {Object} settings - hot loader setiings.
 */
var HotAngular = function(settings) {
  this.ANGULAR_MODULE;

  this.settings = settings || {};

  // Create cahing objects.
  this.MODULE_CACHE = {};
  this.cache = {};
  this.configCache = function() {};
  this.constantCache = {};
  this.controllerCache = {};
  this.decoratorCache = {};
  this.factoryCache = {};
  this.filterCache = {};
  this.serviceCache = {};
  this.valueCache = {};
  this.templateCache = {};

  this.name;
  this.bootstrapElement;

  var toString = Function.prototype.toString;

  /**
   * Gets transpiled function body.
   * @param {Function} fn - transpiled function source.
   */
  function fnBody(fn) {
    return toString.call(fn).replace(/^[^{]*{\s*/,'').replace(/\s*}[^}]*$/,'');
  }

  /**
   * Checks if function is es6 or Babel class.
   * @param {Function} fn - transpiled function source.
   */
  function isClass(fn) {
    return (typeof fn === 'function' &&
    (/^class\s/.test(toString.call(fn)) ||
    // babel class definition.
    (/.*classCallCheck\(?/.test(fnBody(fn)))));
  }

  /**
   * Wraps class functions in factory.
   */
  this.classTransform = function(fn) {
    return isClass(fn) ? toFactory(fn) : fn;
  };

  this.logger = this.settings.log ? logger : function() {};

  /**
   * Document load handler.
   */
  function loadHandler() {
    this.element = document.querySelector(this.settings.rootElement);
    this.originalContent = this.element.innerHTML;
  }

  // Module may have been lazy loaded after document load.
  if (document.readyState === 'complete') {
    loadHandler.call(this);
  } else {
    document.addEventListener('DOMContentLoaded', loadHandler.bind(this), false);
  }
};

// Angular functions to replace
HotAngular.prototype.animation = require('./interceptors/animation');
HotAngular.prototype.component = require('./interceptors/component');
HotAngular.prototype.config = require('./interceptors/config');
HotAngular.prototype.constant = require('./interceptors/constant');
HotAngular.prototype.controller = require('./interceptors/controller');
HotAngular.prototype.decorator = require('./interceptors/decorator');
HotAngular.prototype.directive = require('./interceptors/directive');
HotAngular.prototype.factory = require('./interceptors/factory');
HotAngular.prototype.filter = require('./interceptors/filter');
HotAngular.prototype.module = require('./interceptors/module');
HotAngular.prototype.provider = require('./interceptors/provider');
HotAngular.prototype.run = require('./interceptors/run');
HotAngular.prototype.service = require('./interceptors/service');
HotAngular.prototype.value = require('./interceptors/value');

HotAngular.prototype.reloadState = function() {
  var elm = this.bootstrapElement;

  if (elm) {
    if (elm.injector().has('$state')) {
      this.logger('Reloading UI Router State', 'info');

      var $state = elm.injector().get('$state');

      $state.transitionTo($state.current, $state.params, {
        reload: true,
        inherit: false,
        notify: true
      });
    } else {
      this.logger('Recompile App', 'info');
      elm.injector().get('$compile')(elm.contents())(elm.scope());
    }
  }
};

HotAngular.prototype.recompile = function() {
  var elm = this.bootstrapElement;

  if (elm) {
    this.logger('Recompile App', 'info');
    elm.injector().get('$compile')(elm.contents())(elm.scope());
  } else {
    this.logger('Reloadpage', 'info');
    window.location.reload();
  }
};


HotAngular.prototype.test = function(webpackModule) {
  this.webpackModule = webpackModule;

  return this;
}

// HotAngular must be a singleton so the cache remains the
// same across consecutive updates.
module.exports = function (settings) {
  if (!hotAngular) {
    hotAngular = new HotAngular(settings);
  }
  return hotAngular;
};
