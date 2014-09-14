'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var S = require('string');

var EmberConfigAuthGenerator = yeoman.generators.Base.extend({
  initializing: function () {
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Choose your authentication framework :)'
    ));

    var prompts = [{
      type: 'checkbox',
      name: 'auth',
      message: 'Choose your auth framework:',
      choices: ['simple-auth', 'other (todo: add more...)'],
      default: ['simple-auth']
    }];

    this.prompt(prompts, function (props) {
      this.auth = props.auth;

      done();
    }.bind(this));
  },

  writing: {
    configureSimpleAuth: function () {
      // if bootstrap_for_ember
      // generator.sourceRoot('../templates/bootstrap_for_ember');
      // this.src.template('bootstrap_for_ember/Brocfile.js.tmp', 'Brocfile_boostrap_ember.js.tmp');
    },
  },

  install: {
    simpleAuth: function () {
      // if bootstrap_for_ember
      var done = this.async();
      this.npmInstall(['ember-cli-simple-auth'], { 'saveDev': true }, done);      
    }
  }
});

module.exports = EmberConfigAuthGenerator;
