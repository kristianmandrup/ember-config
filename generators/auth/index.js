'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;

var EmberConfigAuthGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);    
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'auth',
      message: 'Choose your auth framework:',
      choices: ['simple-auth'],
      default: 'simple-auth'
    }];

    this.prompt(prompts, function (props) {
      this.auth = props.auth;

      done();
    }.bind(this));
  },

  writing: {
    configureSimpleAuth: function () {
      // TODO: ...
    }
  },

  install: {
    simpleAuth: function () {
      if (!selected('simple-auth')) return;

      aid.install('simple-auth')
    }
  }
});

module.exports = EmberConfigAuthGenerator;
