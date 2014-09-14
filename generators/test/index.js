'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var EmberConfigTestGenerator = yeoman.generators.Base.extend({
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
      'Choose your test framework'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'qunit',
      message: 'Would you like to use Qunit?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.qunit = props.qunit;

      done();
    }.bind(this));
  },

  writing: {
    testfiles: function () {
      // this.dest.mkdir('app');
      // this.src.copy('jshintrc', '.jshintrc');
    }
  },

  install: {
    installQunit: {
      // if qunit selected ?

      // https://github.com/jakecraige/ember-cli-qunit
      this.npmInstall(['ember-cli-qunit'], { 'saveDev': true }, this.async());      
      // run generator
      this.spawnCommand('ember', ['generate', 'ember-cli-qunit']);
    }

  }

  end: function () {
    this.installDependencies();
  }
});

module.exports = EmberConfigTestGenerator;
