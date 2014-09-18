'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require('../../lib/aid');
var broc_file = require ('../../lib/broc_file');
require('sugar');

var aid;

var EmberConfigKickAppGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    this.brocFileContent = aid.fileContent('Brocfile.js');
    this.bowerDir = aid.bowerDir();
  },

  prompting: function () {
  },

  writing: {
  	imports: function()  {
  		if (this.sass) return;

  		var cssImport = "app.import('" + this.bowerDir + "/app/dist/app.css');\n";
      var jsImport  = "app.import('" + this.bowerDir + "/app/dist/app.js');\n";
      var imports   = cssImport + jsImport;

  		if (this.brocFileContent.has(imports)) return;

  		broc_file(function() {
  		  return this.last('module.exports').prepend(imports);
  		}).write();

  		aid.info('KikApp configured');
  	},  	
  },
  install: {
    ratchet: function () {
      aid.installBower('app.js', 'app.js');
    },
  },

  end: function() {
    aid.success('App.js successfully installed :)');    
    aid.thickline();

    aid.info('For Ember usage tips, see https://gist.github.com/kristianmandrup/de70085e910f359148eb');
  }
});

module.exports = EmberConfigKickAppGenerator;





