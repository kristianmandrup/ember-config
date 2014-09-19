'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
require('sugar'); // humanize
var aid, selected;

var EmberConfigSailsProjGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
  },

  prompting: {
  	project: function() {
	    var done = this.async();

	    var prompts = [{
	      type: 'input',
	      name: 'app',
	      message: 'What will be the name of your Ember + Sails fullstack app?',
	      default: 'my-ember-sails-app'
	    }, {
	      type: 'confirm',
	      name: 'sails',
	      message: 'Do you need to install Sails?',
	      default: false
	    },
	    {
	      type: 'checkbox',
	      name: 'generators',
	      message: 'Which ember-sails generators do you need to install on your system?',
	      choices: ['sails-generate-new-ember', 'sails-generate-frontend-ember', 'sails-generate-backend-ember'],
	      default: []
	    }]

	    this.prompt(prompts, function (props) {
	      this.app   		= props.app;
	      this.generators 	= props.generators;
	      this.sails 		= props.sails;

	      done();
	    }.bind(this));
  	}
  },
  configuring: {
  	sails: function () {
  		if (this.sails)
  			aid.installGlobal('Sails', 'sails');
  	},
  	generators: function() {
	  	aid.info('Installing Sails w Ember generators:')
	  	this.generators.forEach(function(name) {
	  		aid.installGlobal(name.spacify().humanize(), name);
	  	});  		
  	}
  },

  writing: function() {
  	aid.info('Configuring Sails blueprints for client/server app');
  	this.copy('sailsrc.json', '.sailsrc');
  },
  install: function () {
  	aid.info('Creating client/server app');

  	aid.generate('sails', ['ember-app']);
  },
  end: function() {
	// TODO: ensure only executed when install is complete
	// aid.info('Please use generator: ember generate cordova-init ' + this.revDomain);	
	aid.success('Congratz! You have successfully created a Sails + Ember app :)');
	aid.thickline();
	this.log('Please see: https://chiefy.github.io/2014/09/03/sails-generate-ember.html');
	aid.thinline();	
	this.composeWith('ember-config:sails');
  }
});

module.exports = EmberConfigSailsProjGenerator;



