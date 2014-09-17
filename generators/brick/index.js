'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var broc_file = require ('../../lib/broc_file');
// var sass_file = require('../../lib/sass_file');
require('sugar');

var helper    = require('../../lib/aid');
var aid;

var EmberConfigBrickGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    this.brocFileContent = aid.fileContent('Brocfile.js');
  },

  // https://github.com/mozbrick/brick/blob/master/bower.json
  writing: {
    configureWebComponents: function () {          
      aid.warning("Not sure if this is possible in Ember yet or how to add Web Components!!!");
      aid.info("app.import('bower_components/brick/dist/brick.html');");
      aid.thickline();
      aid.log('Instead for now just add the following to your <head> in app/index.html');
      aid.bold('<link rel="import" href="bower_components/brick/dist/brick.html">');
      return;

      var wc_import = "app.import('bower_components/brick/dist/brick.html');";

      if (this.brocFileContent.has(wc_import)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(wc_import + '\n');
      }).write();

      aid.info('Brick Web Components configured');
    },

    configureJs: function () {  
      if (!selected('javascript')) return;
      
      var js_import = "app.import('bower_components/brick/dist/platform/platform.js');";   

      if (this.brocFileContent.has(js_import)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(js_import + '\n');  
      }).write();
      aid.info('Brick js configured');
    }
  },
  install: function () {
    aid.installBower('brick');
    aid.info('https://github.com/mozbrick/brick');
    aid.success('Brick successfully installed :)');
  },
});

module.exports = EmberConfigBrickGenerator;



