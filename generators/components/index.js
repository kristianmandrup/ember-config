'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var S = require('string');

var EmberConfigComponentsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'components',
      message: 'Choose your components framework',
      choices: ['bootstrap for ember', 'ember components'],
      default: ['ember components']
    }];

    this.prompt(prompts, function (props) {
      this.components = props.components;

      done();
    }.bind(this));
  },

  writing: {
    configureBrocfileForBootstrap: function () {
      // if bootstrap_for_ember
      generator.sourceRoot('../templates/bootstrap_for_ember');
      this.src.template('bootstrap_for_ember/Brocfile.js.tmp', 'Brocfile_boostrap_ember.js.tmp');
    },
  },

  install: {
    bootstrapComponents: function () {
      // if bootstrap_for_ember
      var done = this.async();
      this.npmInstall(['ember-cli-bootstrap'], { 'saveDev': true }, done);      
    }
  }
});

module.exports = EmberConfigComponentsGenerator;
