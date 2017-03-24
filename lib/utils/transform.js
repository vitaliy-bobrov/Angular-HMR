module.exports = function (name, def) {
  if (def.template) {
    def.template = () => {
      return this.templateCache[name];
    };
  }

  if (def.controller && typeof def.controller === 'function') {
    def.controller = ($injector, $scope) => {
      return $injector.invoke(
        this.classTransform(this.controllerCache[name]),
        this,
        { $scope: $scope }
      );
    };
  }

  return def;
};
