'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;
require('sugar');

var EmberConfigAltLayoutGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
  },

  // Choose test framework
  prompting: {
    alternative: function () {
      var done = this.async();

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
  },

  default: {

  },
  writing: {
  },

  install: {
  },
  end: function () {
    aid.info('Sorry! generator for layout framework ' + this.layout + ' not yet implemented...');
  }
});

module.exports = EmberConfigAltLayoutGenerator;
