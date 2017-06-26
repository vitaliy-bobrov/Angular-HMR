var loaderUtils = require('loader-utils');
var SourceNode = require('source-map').SourceNode;
var SourceMapConsumer = require('source-map').SourceMapConsumer;
var makeIdentitySourceMap = require('./makeIdentitySourceMap');

var angularModule = /[_]?angular[0-9]?[\\n]*[\s]*[\.\n\s]+(?:default[\.\n\s]+)?module\(([\'\"\w\.\/\\\(\)\n\-\,\[\] ]+)\)/g;

var logger = require('./logger');
var message = '';

function transform(source, map) {
  const options = loaderUtils.getOptions(this) || {};
  let config = {
    rootElement: '[ng-app]',
    log: false
  };

  if (this.cacheable) {
    this.cacheable();
  }

  Object.keys(options).forEach(function(attr) {
    if (config.hasOwnProperty(attr)) {
      config[attr] = options[attr];
    }
  });

  if (!source.match(angularModule)) {
    return this.callback(null, source, map);
  }

  const separator = '\n\n';
  var resolved = require.resolve('./angular-hot-loader').replace(/\\/g, '\\\\'); // Replace for Windows path fix.

  const prependText = `
    if (module.hot) {
      module.hot.accept();
      var hotAngular = require('${resolved}')(${JSON.stringify(config)});
    }
  `;

  var processedSource = source.replace(angularModule, 'hotAngular.test(module).module($1)');

  if (this.sourceMap === false) {
    return this.callback(null, [
      prependText,
      processedSource
    ].join(separator));
  }

  if (!map) {
    map = makeIdentitySourceMap(source, this.resourcePath);
  }

  if (config.log) {
    message = `[AHL] Replacement Matched: ${map.sources.join(', ')}`;

    logger(message, 'info');
  }

  const node = new SourceNode(null, null, null, [
    new SourceNode(null, null, this.resourcePath, prependText),
    SourceNode.fromStringWithSourceMap(processedSource, new SourceMapConsumer(map))
  ]).join(separator);

  const result = node.toStringWithSourceMap();
  return this.callback(null, result.code, result.map.toString());
};

module.exports = transform;
