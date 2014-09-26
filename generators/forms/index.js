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
    selected   = aid.containsSelector(this, 'forms');
  },

  prompting: { 
    forms: function () {
      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'forms',
        message: 'Select your forms library',
        choices: [
          'easy forms', 
          'forms'
        ],
        default: ['easy forms']
      }];

      this.prompt(prompts, function (props) {
        this.forms = props.forms;

        done();
      }.bind(this));
    },
  },

  install: {
    forms: function () {      
      if (selected('easy forms'))      
        aid.install('easy forms', 'ember-easyforms-cli');

      if (selected('forms'))
        aid.installBow('forms', 'ember-forms');
    }
  },

  end: function () {    
    this.composeWith('ember-config:validations');
  }
});

module.exports = EmberConfigFormsGenerator;
