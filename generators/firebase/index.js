'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var S = require('string');

var EmberConfigFirebaseGenerator = yeoman.generators.Base.extend({
  initializing: function () {
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    // TODO: We also need a fireplace model generator!!!
    // https://github.com/rlivsey/fireplace

    var prompts = [{
      type: 'list',
      name: 'firebaseAdapter',
      message: 'Choose firebase adapter:',
      choices: ['emberfire', 'fireplace'],
      default: 'emberfire'
    }, {
      type: 'input',
      name: 'account',
      message: 'What is the name of your firebase account?',
      default: 'unknown'     
    }, {
      type: 'confirm',
      name: 'rewriteModels',
      message: 'Do you want to automatically rewrite models if required?',
      default: true
    }    
    ];

    this.prompt(prompts, function (props) {
      this.firebaseAdapter = props.firebaseAdapter;
      this.account = props.account;

      done();
    }.bind(this));
  },

  writing: {
    removeOldFiles: function() {
      // this.spawnCommand('rm', ['app/templates/application.*']);      
    },

    copyFiles: function () {
      // generator.sourceRoot('../templates/' + this.hbs);
      // this.src.template(this.hbs + 'handlebars/application.' + this.hbs, 'templates/application.' + this.hbs);
    },
  },

  install: {    
    installEmberFire: {
      // if emberfire

      var done = this.async();
      // https://www.npmjs.org/package/ember-cli-emberfire
      this.npmInstall(['ember-cli-emberfire'], { 'saveDev': true }, done);      
      // run generator
      this.spawnCommand('emberfire', ['generate']);
    },

    installFireplace: {
      // if fireplace

      // http://jaketrent.com/post/convert-app-from-emberfire-to-fireplace/
      this.npmInstall(['ember-cli-fireplace'], { 'saveDev': true }, done);      

      // add ember-inflector
      // https://github.com/stefanpenner/ember-inflector

      // Remove ember-data
      this.spawnCommand('npm', ['uninstall', 'ember-data']);
    },
  }

  end: {
    rewriteModels: function () {
      // Your models will need to change, but not by much. 
      // DS.Model becomes FP.Model. DS.attr becomes FP.attr. The changes are pretty much one-to-one in requiring just a namespace change.
    }
    
  }
});

module.exports = EmberConfigFirebaseGenerator;
