'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
require('sugar');

var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigFormsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'forms');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'forms',
      message: 'Select your map library',
      choices: ['easy forms', 'validations'],
      default: ['easy forms', 'validations']
    }];

    this.prompt(prompts, function (props) {
      this.maps = props.maps;

      done();
    }.bind(this));
  },

  install: {
    easyForms: function () {      
      if (!selected('easy forms')) return;
      aid.install('easy forms', 'ember-easyforms-cli');
    },
    validations: function () {      
      if (!selected('validations')) return;
      aid.install('validations', 'ember-validations-cli');
    }    
  },

  end: function () {    
    // aid.info('Ember google maps: https://gist.github.com/ZogStriP/5684983');
    // aid.info('Ember map demo app: https://github.com/samwich/ember-map-demo');
    // aid.thinline();
    // aid.log('Writing Ember google maps component: http://strongpoint.io/blog/2014/07/28/ember-js-writing-google-maps-component-part-1');
    // aid.log('http://strongpoint.io/blog/2014/08/27/ember-js-writing-google-maps-component-part-2');
  }
});

module.exports = EmberConfigFormsGenerator;
