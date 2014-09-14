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

      this.npmInstall(['ember-cli-fireplace'], { 'saveDev': true }, done);      
      // run generator
      // this.spawnCommand('fireplace', ['generate']);
    },
  }

  end: function () {
    this.installDependencies();
  }
});

module.exports = EmberConfigFirebaseGenerator;
