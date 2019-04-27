const loaderUtils = require('loader-utils');
const { SourceNode, SourceMapConsumer } = require('source-map');
const makeIdentitySourceMap = require('./makeIdentitySourceMap');
const logger = require('./logger');

const angularModule = /(?:_?angular[0-9]?\s*(?:\.\s*default)?)?[.\s]+module\((["']?[\w.\-\/\\]+['"]?\s*,\s*\[(?:[\w.,\s()\[\]'"@\/\\]*)\]\s*)\)/g;

function transform(source, map) {
  const options = loaderUtils.getOptions(this) || {};
  const config = {
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
  const resolved = require.resolve('./angular-hot-loader')
    .replace(/\\/g, '\\\\'); // Replace for Windows path fix.

  const prependText = `
    if (module.hot) {
      module.hot.accept();
      var hotAngular = require('${resolved}')(${JSON.stringify(config)});
    }
  `;

  const processedSource = source.replace(angularModule, 'hotAngular.module($1)');

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
    const message = `[AHL] Replacement Matched: ${map.sources.join(', ')}`;

    logger(message, 'info');
  }

  this.async();
  Promise.resolve(new SourceMapConsumer(map))
    .then((consumer) => new SourceNode(null, null, null, [
      new SourceNode(null, null, this.resourcePath, prependText),
      SourceNode.fromStringWithSourceMap(processedSource, consumer)
    ]).join(separator))
    .then((node) => node.toStringWithSourceMap())
    .then((result) => this.callback(null, result.code, result.map.toString()))
    .catch((err) => this.callback(err));
}

module.exports = transform;
