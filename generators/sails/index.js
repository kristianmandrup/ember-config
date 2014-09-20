'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');

var aid, adapter, stack, serverFeature;

var EmberConfigSailsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid 			= helper(this);
    stack 			= aid.eqSelector(this, 'stackEnd');
    adapter 		= aid.eqSelector(this, 'adapter');
    serverFeature 	= aid.containsSelector(this, 'serverFeatures');
  },

  prompting: {

  	// TODO: Skip if coming from Sails proj generator!
		newProject: function () {
		    var done = this.async();

	  		// TODO: If coming from Sails project generator, pass argument to skip this step!
	  		// ===============================================================================
		    var prompts = [{
		      type: 'confirm',
		      name: 'project',
		      message: 'Do you want to create a new Sails + Ember client/server project?',
		      choices: ['client', 'server'],
		      default: false
		    }];

		    this.prompt(prompts, function (props) {
		      this.project   	= props.project;

		      if (this.project)
		      	this.composeWith('ember-config:sailsproj');

		      done();
		    }.bind(this));		
		},	

  	clientOrServer: function() {
	    var done = this.async();

	    var prompts = [{
	      type: 'list',
	      name: 'stackEnd',
	      message: 'Do you want to configure the Client or the Server?',
	      choices: ['client', 'server'],
	      default: 'client'
	    }];

	    this.prompt(prompts, function (props) {
	      this.stackEnd   	= props.stackEnd;
	      	      
	      done();
	    }.bind(this));
	},
  	client: function() {
  		if(!stack('client')) return;

	    var done = this.async();

	    var prompts = [{
	      type: 'confirm',
	      name: 'blueprints',
	      message: 'Install Ember blueprints for Sails?',
	      default: true
	    }, {
	      type: 'confirm',
	      name: 'useAdapter',
	      message: 'Do you want to install an Ember Sails ember-data adapter?',
	      default: true
	    }];

	    this.prompt(prompts, function (props) {
	      this.useAdapter   = props.useAdapter;
	      	      
	      done();
	    }.bind(this));		
	},	    

	adapter: function() {
		if (!this.useAdapter) return;
	    
	    var prompts = [{
	      type: 'list',
	      name: 'adapter',
	      message: 'Which Sails adapter would you like?',
	      choices: ['standard', 'with custom serializer'],
	      default: 'standard'
	    }];

	    this.prompt(prompts, function (props) {
	      this.adapter   = props.adapter;
	      	      
	      done();
	    }.bind(this));		
  	},

  	server: function() {
  		if(!stack('server')) return;

	    var done = this.async();

	    aid.bold('You should run this generator from the root of your full-stack project:');
	    aid.info('  /client (ember app)');
	    aid.info('  /server (sails app)');

	    var prompts = [{
	      type: 'confirm',
	      name: 'appRoot',
	      message: 'Confirm you are standing in the project root and want to configure the Sails server app?',
	      default: true
	    }, {
	      type: 'input',
	      name: 'clientAppDir',
	      message: 'What is the name of your Ember (client) app folder?',
	      default: 'client'
	    }, {
	      type: 'input',
	      name: 'serverAppDir',
	      message: 'What is the name of your Sails (server) app folder?',
	      default: 'server'
	    }
	    ];

	    this.prompt(prompts, function (props) {
	      this.appRoot 		= props.appRoot;
	      this.clientAppDir = props.clientAppDir;
	      this.serverAppDir = props.serverAppDir;
	      done();
	    }.bind(this));

	},	    
	
	serverInstall: function() {
		if(!stack('server')) return;

		if(!this.appRoot) return;

	    var done = this.async();		
	    
	    var prompts = [{
	      type: 'checkbox',
	      name: 'serverFeatures',
	      message: 'What server features do you wish to install?',
	      choices: ['API blueprints', 'Ember service'],
	      default: ['API blueprints']
	    }, {
	      type: 'confirm',
	      name: 'serverInstall',
	      message: 'Do you wish to install Sails server API blueprints and Ember service?',
	      default: true
	    }];

	    this.prompt(prompts, function (props) {
	      this.serverInstall 	= props.serverInstall;
	      this.serverFeatures	= props.serverFeatures;
	      	      
	      done();
	    }.bind(this));
	}
  },

  writing: {
  	client: function () {
  		if (!stack('client')) return;
		if (adapter('standard'))
			this.copy('client/adapters/application.js', 'client/app/adapters/application.js');		

		if (adapter('with custom serializer')) {
			this.copy('client/vendor/rest-serializer.js', 'client/app/serializers/sails-rest.js');		
			this.copy(this.clientAppDir + '/vendor/sails-adapter.js', 'client/app/adapters/sails.js');				
		} 
  	},
  	server: function() {
  		if (!this.serverInstall) return;

		var blueprintsConfig = aid.FileContent('server/config/blueprints.js');
		
		var fileConfigurator = function(file, fun) {
			var fm = require('string-mutator').file;
		   	return fm.readFile(file).perform(fun).write();
		};

		// In myproject/config/blueprints.js set pluralize: true		  		
		fileConfigurator(this.serverAppDir + '/config/blueprints.js', function() {
			return this.first(/pluralize:\s*\w+/).replaceWith('pluralize : true');
		}).write();		
  	}
  },

  // TODO: Should Sails adapter install be moved/integrated with adapters generator!?
  install: {
  	client: function () {
			if (!stack('client')) return;
			
			if (this.blueprints)
				aid.install('Sails Ember blueprints', 'sails-ember-blueprints');

			if (this.useAdapter)
				aid.install('Ember Sails adapter', 'ember-data-sails-adapter');
		},
		server: function() {
			if (this.serverFeature('API blueprints'))
				// Copy blueprints into api/blueprints
				this.directory('blueprints/api', this.serverAppDir + '/blueprints/api')

			if (this.serverFeature('Ember service'))
				// Drop the Ember service from this repository in myproject/api/services		
				this.copy('server/services/Ember.js', this.serverAppDir + '/api/services/Ember.js');
		}	
  },
  end: function() {
		// TODO: ensure only executed when install is complete
		// aid.info('Please use generator: ember generate cordova-init ' + this.revDomain);	
		aid.success('Congratz! You have successfully installed Sails with Ember :)');
		aid.thickline();
		//	this.log('For info on dealing with nested resources:');
		//	this.log('http://answersresource.wordpress.com/tag/sails-js-and-ember-js-nested-associations/');	
  }
});

module.exports = EmberConfigSailsGenerator;
