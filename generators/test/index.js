'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;

var EmberConfigTestGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    // TODO: add list of test frameworks to choose from when available...
    var prompts = [{
      type: 'confirm',
      name: 'qunit',
      message: 'Would you like to use Qunit?',
      default: true
    }, {
      type: 'confirm',
      name: 'generate',
      message: 'Would you like to run the Qunit generator?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.qunit    = props.qunit;
      this.generate = props.generate;

      done();
    }.bind(this));
  },

  writing: {
  },

  install: {
    installQunit: function () {
      if (!this.qunit) return;

      // https://github.com/jakecraige/ember-cli-qunit
      aid.install('qunit');  

      if (this.generate)
        this.spawnCommand('ember', ['generate', 'ember-cli-qunit']);
    }

  }
});

module.exports = EmberConfigTestGenerator;
