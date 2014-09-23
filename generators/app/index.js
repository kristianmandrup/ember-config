'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var helper = require ('../../lib/aid');
var aid;
var selected;

var availableConfigs = ['script', 'css', 'templating', 'layout', 'routing', 'test', 'sails', 'adapters', 
  'mobile', 'fonts', 'components', 'auth', 'addons', 'libs', 'animations', 'upload', 'charts', 'maps'];

var endScripts = {};
availableConfigs.forEach(function(config) {
  endScripts[config] = function() {
    console.log('config', selected(config));
    if (!selected(config)) return;    
    this.composeWith('ember-config:' + config);
  }  
});


var EmberConfigGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'configs');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to Ember Configurator'
    ));

    var prompts = [{
      type: 'checkbox',
      name: 'configs',
      message: 'Select configurations:',
      choices: availableConfigs,
      default: availableConfigs.slice(0, 4)
    }];

    this.prompt(prompts, function (props) {
      this.configs  = props.configs;

      done();
    }.bind(this));
  },

  end: endScripts
});


module.exports = EmberConfigGenerator;
