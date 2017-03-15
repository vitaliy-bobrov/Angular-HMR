var toFactory = require('to-factory');
var logger = require('./logger');

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
  this.configCache = {};
  this.constantCache = {};
  this.controllerCache = {};
  this.factoryCache = {};
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
      (/.*classCallCheck\(/.test(fnBody(fn)))));
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

  document.addEventListener('DOMContentLoaded', loadHandler.bind(this), false);
};

// Angular functions to replace
HotAngular.prototype.run = require('./interceptors/run');
HotAngular.prototype.value = require('./interceptors/value');
HotAngular.prototype.module = require('./interceptors/module');
HotAngular.prototype.config = require('./interceptors/config');
HotAngular.prototype.filter = require('./interceptors/filter');
HotAngular.prototype.factory = require('./interceptors/factory');
HotAngular.prototype.service = require('./interceptors/service');
HotAngular.prototype.constant = require('./interceptors/constant');
HotAngular.prototype.provider = require('./interceptors/provider');
HotAngular.prototype.animation = require('./interceptors/animation');
HotAngular.prototype.directive = require('./interceptors/directive');
HotAngular.prototype.component = require('./interceptors/component');
HotAngular.prototype.controller = require('./interceptors/controller');

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
  // var elm = this.bootstrapElement;
  this.logger('Recompile App', 'info');

  //elm.injector().get('$compile')(this.originalContent)(elm.scope());

  window.location.reload();
};


HotAngular.prototype.test = function(webpackModule) {
  this.webpackModule = webpackModule;

  return this;
}

module.exports = HotAngular;
