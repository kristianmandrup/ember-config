'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var EmberConfigAdapterGenerator = yeoman.generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly setup
    yeoman.generators.Base.apply(this, arguments);    
  },

  initializing: function () {
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Choose your adapters'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'emberfire',
      message: 'Would you like to use emberfire adapter?',
      default: true
    }, {
      type: 'input',
      name: 'account',
      message: 'What is the name of your firebase account?',
      default: 'unknown'     
    }
    ];

    this.prompt(prompts, function (props) {
      this.emberfire = props.emberfire;
      this.account = props.account;

      done();
    }.bind(this));


  },

  writing: {
    emberFiles: function () {
    }
  },

  install: {
    installEmberFire: {
      // if emberfire selected ?
      var done = this.async();

      this.bowerInstall(['firebase', '>=1.0.0'], { 'saveDev': true }, done);
      this.bowerInstall(['emberfire', '>=1.2.0'], { 'saveDev': true }, done);       

      this.npmInstall(['emberfire', 'git://github.com/firebase/emberfire#v1.2.1'], { 'saveDev': true }, done);      
      // run generator
      this.spawnCommand('ember', ['generate', 'ember-cli-qunit']);
    }

  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = EmberConfigAdapterGenerator;
