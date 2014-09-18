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
    selFeatures = aid.containsSelector(this, 'features');
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
      choices: ['ratchet', 'app.js'],
      default: ['ratchet']
    },{
      type: 'list',
      name: 'features',      
      message: 'What other features would you like?',
      choices: ['gestures', 'animations'],
      default: ['gestures', 'animations']      
    }    
    ];

    this.prompt(prompts, function (props) {
      this.cordova      = props.cordova;
      this.frameworks   = props.frameworks;
      this.features     = props.features;

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
      if (!selected('app.js')) return;        
      this.composeWith('ember-config:kikapp');
    }    
  },
  end: function () {
    cordova: function () {
      if (!this.cordova) return;
      this.composeWith('ember-config:cordova');
    },    
    animations: function () {
      if (!selFeature('animations')) return;
      this.composeWith('ember-config:animations');
    },
    gestures: function () {
      if (!selFeature('gestures')) return;
      this.composeWith('ember-config:gestures');
    }    
  }
});

module.exports = EmberConfigMobileGenerator;


