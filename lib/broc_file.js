var fm = require('string-mutator').file;

module.exports = function(fun) {
   var fileObj = fm.readFile('Brocfile.js');
   console.log('fileObj', fileObj);
   return fileObj.perform(fun).write();
}