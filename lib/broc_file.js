var fm = require('string-mutator').file;

module.exports = function(fun) {
  return fm.readFile('Brocfile.js').perform(fun).write();
}