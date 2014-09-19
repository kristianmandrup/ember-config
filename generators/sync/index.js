'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
require('sugar');

var helper = require ('../../lib/aid');
var aid;
var selected;

var EmberConfigSyncGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'adapters');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'store',
      message: 'What is the name of your offline store for sync',
      default: ['_offline-store']
    }];

    this.prompt(prompts, function (props) {
      this.store = props.store;

      done();
    }.bind(this));
  },

  writing: function() {
  	this.template('initializers/ember-sync.js');
  	this.template('initializers/online-store.js');
  	this.template('routes/application.js');
  },

  install: {
    sync: function () {      
      aid.install('Ember sync', 'ember-sync');
    },  
  },

  end: function () {
  	aid.info('For more info, please see: https://github.com/kurko/ember-sync');
  }
});

module.exports = EmberConfigSyncGenerator;

