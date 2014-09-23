'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
require('sugar');

var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigRoutingGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'routing');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'maps',
      message: 'Select your map library',
      choices: [
        'auto router',
        'state composer'
      ],
      default: ['auto router']
    }];

    this.prompt(prompts, function (props) {
      this.routing = props.routing;

      done();
    }.bind(this));
  },

  install: {
    routing: function () {      
      if (selected('auto router')) {
        aid.install('auto-router');
        aid.info('https://www.npmjs.org/package/ember-cli-auto-router');
      }

      if (selected('state composer')) {
        aid.install('state composer', 'ember-state-composer');
      }
    },  
  },

  end: function () {    
  }
});

module.exports = EmberConfigRoutingGenerator;


