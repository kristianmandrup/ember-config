'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var S = require('string');

var EmberConfigLayoutGenerator = yeoman.generators.Base.extend({
  initializing: function () {
  },

  // Choose test framework
  prompting: {
    first: function () {
      var done = this.async();

      var prompts = [{
        type: 'list',
        name: 'layout',
        message: 'Choose your layout framework(s)',
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
        message: 'Choose your layout framework:',
        choices: ['semantic-ui', 'flat-ui', 'ui-kit', 'bootflat' , 'cascade', 'skeleton'],
        default: 'semantic-ui'
      }];  

      this.prompt(prompts, function (props) {
        this.layout = props.layout;

        done();
      }.bind(this));
    }      
  }
});

module.exports = EmberConfigLayoutGenerator;
