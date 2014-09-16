'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;

var EmberConfigComponentsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'componentLib',
      message: 'Choose your components framework',
      choices: ['none', 'bootstrap for ember', 'ember components'],
      default: ['ember components']
    }];

    this.prompt(prompts, function (props) {
      this.componentLib = props.componentLib;

      done();
    }.bind(this));
  },

  install: {
    bootstrapComponents: function () {
      if (this.componentLib == 'bootstrap for ember')
        aid.install('bootstrap');
    },
    emberComponents: function() {
      if (this.componentLib == 'ember components')
        aid.install('components');  
    }    
  },
  end: {
    switch (this.componentLib) {
      case 'none':
        aid.success("You can run ember-config:components later ;)")
        return;
      case 'bootstrap for ember':
        this.composeWith('ember-config:bootstrap_for_ember')
        break;
      case 'ember components':                
        aid.success('You successfully installed Ember Components');
        aid.info('For docs, see: http://indexiatech.github.io/ember-components');        
    }    
  }
});

module.exports = EmberConfigComponentsGenerator;
