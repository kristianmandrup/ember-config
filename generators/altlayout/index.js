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

  prompting: {
    alternative: function () {
      var done = this.async();

      var prompts = [{
        type: 'list',
        name: 'layout',
        message: 'Choose an alternative layout framework',
        // TODO: 'ui-kit', 'bootflat' , 'cascade', 'skeleton'
        choices: ['flat-ui', 'brick'], 
        default: 'flat-ui'
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
    switch (this.layout) {
      case 'semantic-ui':
        this.composeWith('ember-config:semanticui');
        break;  
      case 'flat-ui':
        this.composeWith('ember-config:flatui');
        break;   
      case 'brick':
        this.composeWith('ember-config:brick');
        break;                   
      default:        
        aid.info('Sorry! generator for layout framework ' + this.layout + ' not yet implemented...');
    }    
  }
});

module.exports = EmberConfigAltLayoutGenerator;
