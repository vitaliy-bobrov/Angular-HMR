
/* Angular Hor Module Replacement */
var HotAngular = function(settings) {
  console.log(settings);
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

  document.addEventListener('DOMContentLoaded', function() {
    this.element = this.settings.rootElement ? document.querySelector(this.settings.rootElement) : document.querySelector('[ng-app]');
    this.originalContent = this.element.innerHTML;
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
