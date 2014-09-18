'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigMobileGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'frameworks');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'confirm',
      name: 'cordova',
      message: 'Do you want Cordova device APIs installed?',
      default: false
    },      
    {
      type: 'list',
      name: 'frameworks',
      message: 'Which mobile frameworks would you like?',
      choices: ['ratchet', 'kik app'],
      default: ['ratchet']
    }];

    this.prompt(prompts, function (props) {
      this.cordova      = props.cordova;
      this.frameworks    = props.frameworks;

      done();
    }.bind(this));
  },

  writing: {
  },

  install: {
    ratchet: {
      if (!selected('ratchet')) return;        
      this.composeWith('ember-config:ratchet');
    },
    kikApp: {
      if (!selected('kik app')) return;        
      this.composeWith('ember-config:kikapp');
    }    
  },
  end: function () {
    cordova: function () {
      if (!this.cordova) return;
      this.composeWith('ember-config:cordova');
    },    
  }
});

module.exports = EmberConfigMobileGenerator;


