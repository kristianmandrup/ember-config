'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
require('sugar');

var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigValidationsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'validations');
  },

  prompting: { 
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


  install: {
    validations: function () {      
      if (selected('easy validations'))
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

module.exports = EmberConfigValidationsGenerator;
