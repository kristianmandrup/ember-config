'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var EmberConfigLayoutGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
  },

  // Choose test framework
  prompting: {
    first: function () {
      var done = this.async();

      var prompts = [{
        type: 'list',
        name: 'layout',
        message: 'Choose a popular layout framework',
        choices: ['bootstrap', 'foundation', 'ink', 'pure', 'brick', 'gumby', 'other'],
        default: 'bootstrap'
      }];

      this.prompt(prompts, function (props) {
        this.layout = props.layout;

        done();
      }.bind(this));
    },

    second: function () {
      if (!this.layout == 'other') return;

      var prompts = [{
        type: 'list',
        name: 'layout',
        message: 'Choose an alternative layout framework',
        choices: ['semantic-ui', 'flat-ui', 'ui-kit', 'bootflat' , 'cascade', 'skeleton'],
        default: 'semantic-ui'
      }];  

      this.prompt(prompts, function (props) {
        this.layout = props.layout;

        done();
      }.bind(this));
    }  

    // semantic-ui
    // <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.12.0/css/semantic.min.css ">   
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
      default:
        aid.warning('Generator not yet implemented for : ' + this.layout);
    }    
  }

});

module.exports = EmberConfigLayoutGenerator;
