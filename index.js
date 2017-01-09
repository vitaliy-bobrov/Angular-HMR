var path = require('path');
var loaderUtils = require('loader-utils');
var SourceNode = require('source-map').SourceNode;
var SourceMapConsumer = require('source-map').SourceMapConsumer;
var makeIdentitySourceMap = require('./makeIdentitySourceMap');


var angularModule = /(angular|_angular2\.default)[\.\n\s]+module\(([\'\"\w\.\/\(\)\n\-\,\[\] ]+)\)/g;

module.exports = function(source, map) {
  var query = loaderUtils.parseQuery(this.query);
  var config = {
    rootElement: '[ng-app]',
    log: false
  };

  Object.keys(query).forEach(function(attr) {
    if (config.hasOwnProperty(attr)) {
      config[attr] = query[attr];
    }
  });

  if (this.cacheable) {
    this.cacheable();
  }

  if (!source.match(angularModule)) {
    return this.callback(null, source, map);
  }

  if (config.log) {
    console.log('[AHL] Replacement Matched');
  }

  var separator = '\n\n';
  var prependText;
  var appendText;
  var node;
  var result;

  prependText = [
    'if (module.hot) {',
    'module.hot.accept();',
    'var hotAngularLoader = require(' + JSON.stringify(require.resolve('./angular-hot-loader')) + ');',
    'var hotAngular = new hotAngularLoader(' + JSON.stringify(config) + ');',
    '}'
  ].join(' ');

  appendText = [
    //'module.hot.dispose(function(data) {console.log(\'[SBOS] Reloaded\')})'
  ].join(' ');

  var processedSource = source.replace(angularModule, 'hotAngular.test(module).module($2)');

  if (this.sourceMap === false) {
    return this.callback(null, [
      prependText,
      processedSource,
      appendText
    ].join(separator));
  }

  if (!map) {
    map = makeIdentitySourceMap(source, this.resourcePath);
  }

  node = new SourceNode(null, null, null, [
    new SourceNode(null, null, this.resourcePath, prependText),
    SourceNode.fromStringWithSourceMap(processedSource, new SourceMapConsumer(map))
  ]).join(separator);

  result = node.toStringWithSourceMap();

  this.callback(null, result.code, result.map.toString());
};
