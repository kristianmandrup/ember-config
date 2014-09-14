'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var EmberConfigAdapterGenerator = yeoman.generators.Base.extend({
  initializing: function () {
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'adapters',
      message: 'Choose your db/storage adapters',
      choices: ['firebase', 'localstorage'],
      default: ['localstorage']
    }];

    this.prompt(prompts, function (props) {
      this.adapters = props.adapters;

      done();
    }.bind(this));


  },

  writing: {
  },

  install: {
  },

  end: {
    firebase: function () {
      if (!this.opts.contains('firebase')) return;
      
      this.composeWith('ember-config:firebase');

    },
    localStorage: function () {
      if (!this.opts.contains('localstorage')) return;
      
      console.log('install localstorage');
      // this.composeWith('ember-config:localstorage');
    }  
  }
});

module.exports = EmberConfigAdapterGenerator;
