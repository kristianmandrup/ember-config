'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var broc_file = require ('../../lib/broc_file');
require('sugar');

var helper    = require('../../lib/aid');
var aid, selected;

var EmberConfigUploadGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    this.bowerDir = aid.bowerDir();
    this.brocFileContent = aid.fileContent('Brocfile.js');
  },

  // https://github.com/mozbrick/brick/blob/master/bower.json
  writing: {
    configureJs: function () {  
	  // And import the library by editing Brocfile.js      
      var js_import = "app.import('" + this.bowerDir + "/ember-droplet/dist/ember-droplet.min.js');";   

      if (this.brocFileContent.has(js_import)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(js_import + '\n');  
      }).write();
      aid.info('Droplet js configured');
    }
  },
  install: function () {
    aid.installBow('Droplet', 'ember-droplet');   
  },
  end: function() {
    aid.success('Droplet successfully installed :)');  	
    aid.thickline();
    aid.info(' - https://github.com/Wildhoney/EmberDroplet');
    aid.thinline();
    this.log(' - https://github.com/workmanw/embernati-upload-demo');
    this.log(' - https://www.youtube.com/watch?v=7Z3HCTFFCKc'); 
  }
});

module.exports = EmberConfigUploadGenerator;


