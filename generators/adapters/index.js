'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
require('sugar');

var helper = require ('../../lib/aid');
var aid;
var selected;

var EmberConfigAdapterGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'adapters');
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

  // TODO: ???
  writing: {
  },

  install: {
    localStorage: function () {
      if (!selected('localstorage')) return;
      
      aid.installBow('localstorage', 'ember-localstorage-adapter');
    }  
  },

  end: {
    firebase: function () {
      if (!selected('firebase')) return;
      
      this.composeWith('ember-config:firebase');

    },
    localStorage: function () {
      if (!selected('localstorage')) return;
      aid.info('no localstorage pkg integrated');
      // this.composeWith('ember-config:localstorage');
    }  
  }
});

module.exports = EmberConfigAdapterGenerator;
