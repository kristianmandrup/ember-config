var fm = require('string-mutator').fm;

module.exports = {
  app: function(fun) {
    return fm.readFile('app/styles/app.scss').perform(fun).write();
  }
}