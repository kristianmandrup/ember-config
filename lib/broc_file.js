var fm = require('string-mutator').file;

module.exports = function(fun) {
   var fileObj = fm.readFile('Brocfile.js');
   return fileObj.perform(fun).write();
}