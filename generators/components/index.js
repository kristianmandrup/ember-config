'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;
var selected;

var EmberConfigComponentsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'componentLib');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'componentLib',
      message: 'Choose your components framework',
      choices: ['bootstrap for ember', 'ember components'],
      default: ['ember components']
    }];

    this.prompt(prompts, function (props) {
      this.componentLib = props.componentLib;

      done();
    }.bind(this));
  },

  install: {
    bootstrapComponents: function () {
      if (selected('bootstrap for ember'))
        aid.install('bootstrap');
    },
    emberComponents: function() {
      if (selected('ember components'))
        aid.install('components');  
    }    
  },
  end: {
    bootstrap: function() {
      if (!selected('bootstrap for ember')) return;
      this.composeWith('ember-config:bsember');
    },
    components: function() {
      if (!selected('ember components')) return;      

      // assumess install (see above)
      aid.success('You successfully installed Ember Components');
      aid.info('For docs, see: http://indexiatech.github.io/ember-components');
      aid.info('For more info on Ember Components, be sure to check: http://ember-components.com');    
    }
  }
});

module.exports = EmberConfigComponentsGenerator;
