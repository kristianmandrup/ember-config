var fm = require('string-mutator').file;

module.exports = function(fun) {
  return fm.readFile('app/index.html').perform(fun).write();
};