'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
require('sugar');

var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigAdapterGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'adapters');
  },

  // Choose test framework
  prompting: {
    adapters: function () {
      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'adapters',
        message: 'Choose your db/storage adapters',
        choices: ['firebase', 'localstorage', 'sync', 'mongoose'],
        default: ['localstorage']
      }];

      this.prompt(prompts, function (props) {
        this.adapters = props.adapters;

        done();
      }.bind(this));
    },
    namespace: function() {
      if (!selected('sync')) return;

      var done = this.async();

      var prompts = [{
        type: 'input',
        name: 'namespace',
        message: 'What is your local storage namespace',
        default: 'my-local-storage'
      }];

      this.prompt(prompts, function (props) {
        this.namespace = props.namespace;

        done();
      }.bind(this));
    }
  },

  // TODO: ???
  writing: {
    localstorage: function() {
      this.copy('localstorage/application.js', 'app/adapters/application.js');
    }
  },

  install: {
    localStorage: function () {
      if (!selected('localstorage')) return;
      
      aid.installBow('localstorage', 'ember-localstorage-adapter');
    },
    mongoose: function() {
      if (!selected('mongoose')) return;

      aid.install('ember-mongoose');
    }    
  },

  end: {
    sync: function () {
      if (!selected('sync')) return;      

      this.composeWith('ember-config:sync');      
    },  
    firebase: function () {
      if (!selected('firebase')) return;
      
      this.composeWith('ember-config:firebase');
    }
  }
});

module.exports = EmberConfigAdapterGenerator;
