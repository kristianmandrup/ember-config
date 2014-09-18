'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;
var selected;

var EmberConfigCordovaGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'confirm',
      name: 'cordova',
      message: 'Do you agree to install/update Cordova device APIs on your system?',
      default: false
    },    
    {
      type: 'input',
      name: 'revDomain',
      message: 'Enter identifier/reverse style domain name',
      default: 'com.reverse.domain'
    },
    {
      type: 'confirm',
      name: 'android',
      message: 'Install android platform',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.cordova   	= props.cordova;
      this.revDomain   	= props.revDomain;
      this.android     	= props.android;
      done();
    }.bind(this));
  },

  writing: {
  	installCordova: function () {
	  	if (!this.cordova) return;
		// TODO: only install if none (or old) version present
		aid.installGlobalNpm('cordova');  		
  	}
  },

  install: {
  	android: function () {
		// aid.generate('cordova-init', [domain]);
		if (!this.android) return;
		
		// TODO: aid.spawn	  
		this.spawnCommand('ember', ['cordova', 'platform', 'add', 'android']);
	}	
  },
  end: function() {
	// TODO: ensure only executed when install is complete
	// aid.info('Please use generator: ember generate cordova-init ' + this.revDomain);	
	aid.generate('ember', ['cordova-init', this.revDomain]);
  }
});

module.exports = EmberConfigMobileGenerator;


