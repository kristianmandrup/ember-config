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
    form       = aid.containsSelector(this, 'forms');
    validation = aid.containsSelector(this, 'validations');
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
          'forms',
        ],
        default: ['easy forms']
      }];

      this.prompt(prompts, function (props) {
        this.forms = props.forms;

        done();
      }.bind(this));
    },
    // TODO: separate generator initiated from here?
    validations: function () {
      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'validations',
        message: 'Select your validations library',
        choices: [
          'easy validations'
          'validations', 
          'validatable',         
        ],
        default: ['easy validations']
      }];

      this.prompt(prompts, function (props) {
        this.validations = props.validations;

        done();
      }.bind(this));
    }
  },

  install: {
    forms: function () {      
      if (form('easy forms'))      
        aid.install('easy forms', 'ember-easyforms-cli');

      if (form('forms'))
        aid.installBow('forms', 'ember-forms');
    },
    validations: function () {      
      if (validation('easy validations'))
        aid.install('easy validations', 'ember-validations-cli');

      if (selected('validations'))    
        aid.install('ember-validations');

      if (selected('validatable'))    
        aid.install('validatable', 'ember-validatable');

    }    
  },

  end: function () {    
  }
});

module.exports = EmberConfigFormsGenerator;
