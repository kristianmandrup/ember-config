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
    selected = aid.containsSelector(this, 'uploaders');

    this.bowerDir = aid.bowerDir();
    this.brocFileContent = aid.fileContent('Brocfile.js');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'uploaders',
      message: 'Choose one or more uploader addons',
      choices: ['uploader', 'droplet', 'upload'],
      default: ['uploader']
    }];

    this.prompt(prompts, function (props) {
      this.uploaders = props.uploaders;

      done();
    }.bind(this));
  },

  writing: {
    droplet: function () {  
      if (!selected('droplet')) return;
	  // And import the library by editing Brocfile.js      
      var js_import = "app.import('" + this.bowerDir + "/ember-droplet/dist/ember-droplet.min.js');";   

      if (this.brocFileContent.has(js_import)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(js_import + '\n');  
      }).write();
      aid.info('Droplet js configured');
    },
    uploader: function() {
    	if (!selected('uploader')) return;
		
		var js_import = "app.import('" + this.bowerDir + "/ember-uploader/dist/ember-uploader.js');";   

		if (this.brocFileContent.has(js_import)) return;

		broc_file(function() {
		return this.last('module.exports').prepend(js_import + '\n');  
		}).write();
		aid.info('Broccoli configured to app.import uploader :)');

    	aid.info('Copying uploader components...');	
    	this.copy('uploader/file-upload.js', 'app/components/file-upload.js');
    	this.copy('uploader/file-upload-multi.js', 'app/components/file-upload-multi.js');
    	this.copy('uploader/s3-uploader.js', 'app/components/s3-uploader.js');
    }
  },
  install: {
  	droplet: function () {
  		if (!selected('droplet')) return;
    	aid.installBow('Droplet', 'ember-droplet');   
    },
    uploader: function() {
    	if (!selected('uploader')) return;
    	// bower install ember-uploader --save	
    	aid.installBow('Uploader', 'ember-uploader');   
    }    
  },
  end: {
    droplet: function() {
	  	if (!selected('droplet')) return;
	    aid.success('Droplet successfully installed :)');  	
	    aid.thickline();
	    aid.info(' - https://github.com/Wildhoney/EmberDroplet');		    
    },
    upload: function () {
		if (!selected('upload')) return;		    	
    	aid.log('Please see https://github.com/kelonye/ember-upload')
    	aid.log('with bower file: https://github.com/kristianmandrup/ember-upload');   
    	aid.warning('currently no installer...');
    },

  	uploader: function() {
  	  	if (!selected('uploader')) return;		
  		aid.info('https://github.com/benefitcloud/ember-uploader');
  	},
  	general: function() {
  		aid.thinline();
  		this.log(' - http://spin.atomicobject.com/2014/01/15/client-side-file-processing-ember-js/');
      this.log(' - https://medium.com/@ryakh/drag-and-drop-file-uploads-with-ember-js-e5483e1544d');
      this.log(' - https://github.com/workmanw/embernati-upload-demo');
      this.log(' - https://www.youtube.com/watch?v=7Z3HCTFFCKc'); 
  	}
  }
});

module.exports = EmberConfigUploadGenerator;


