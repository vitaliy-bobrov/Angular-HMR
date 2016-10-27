var toFactory = require('to-factory');

/* Angular Hor Module Replacement */
var HotAngular = function(settings) {
  this.ANGULAR_MODULE;
  this.MODULE_CACHE;

  this.settings = settings || {};
  this.cache = {};
  this.configCache = {};
  this.factoryCache = {};
  this.serviceCache = {};
  this.templateCache = {};
  this.controllerCache = {};

  this.name;
  this.bootstrapElement;

  var toString = Function.prototype.toString;

  function fnBody(fn) {
    return toString.call(fn).replace(/^[^{]*{\s*/,'').replace(/\s*}[^}]*$/,'');
  }

  function isClass(fn) {
    return (typeof fn === 'function' &&
            (/^class\s/.test(toString.call(fn)) ||
            (/.*classCallCheck\(/.test(fnBody(fn)))) // babel.js
          );
  }

  this.classTransform = function(fn) {
    return isClass(fn) ? toFactory(fn) : fn;
  };

  var _rootElement = this.settings.rootElement || '[ng-app]';
  var _that = this;

  document.addEventListener('DOMContentLoaded', function() {
    _that.element = document.querySelector(_rootElement);
    _that.originalContent = _that.element.innerHTML;
  }, false);
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
      if (this.settings.log) {
        console.log('Reloading UI Router State');
      }

      var $state = elm.injector().get('$state');

      $state.transitionTo($state.current, $state.params, {
        reload: true,
        inherit: false,
        notify: true
      });
    } else {
      elm.injector().get('$compile')(elm.contents())(elm.scope());
    }
  }
};

HotAngular.prototype.recompile = function() {
  var elm = this.bootstrapElement;

  if (this.settings.log) {
    console.log('Recompile App');
  }

  //elm.injector().get('$compile')(this.originalContent)(elm.scope());

  window.location.reload();
};


HotAngular.prototype.test = function(webpackModule) {
  this.webpackModule = webpackModule;

  return this;
}

module.exports = HotAngular;
