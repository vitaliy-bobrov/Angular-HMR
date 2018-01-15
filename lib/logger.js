module.exports = function(message, level) {
  level = level || 'log';

  /* eslint-disable */
  if (console[level]) {
    console[level](message);
  } else {
    console.log(message);
  }
  /* eslint-enable */
};
