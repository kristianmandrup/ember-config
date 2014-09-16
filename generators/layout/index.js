'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;
require('sugar');

var EmberConfigLayoutGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
  },

  // Choose test framework
  prompting: {
    popular: function () {
      var done = this.async();

      var prompts = [{
        type: 'list',
        name: 'layout',
        message: 'Choose a popular layout framework',
        choices: ['bootstrap', 'foundation', 'ink', 'pure', 'brick', 'gumby', '*alternative*'],
        default: 'bootstrap'
      }];

      this.prompt(prompts, function (props) {
        this.layout = props.layout;

        done();
      }.bind(this));
    },
  },

  writing: {
  },

  install: {
  },
  end: function () {
    switch (this.layout) {
      case 'bootstrap':
        this.composeWith('ember-config:bootstrap');
        break;  
      case 'foundation':
        this.composeWith('ember-config:foundation');
        break;
      case '*alternative*':
        this.composeWith('ember-config:altlayout');
        break;
      default:        
        aid.info("Sorry! Generator for " + this.layout + ' has yet to be implemented...');
    }    
  }

});

module.exports = EmberConfigLayoutGenerator;
