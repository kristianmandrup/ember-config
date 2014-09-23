'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
require('sugar');

var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigChartsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'charts');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'charts',
      message: 'Select your chart libraries',
      choices: ['chart'],
      default: ['chart']
    }];

    this.prompt(prompts, function (props) {
      this.charts = props.charts;

      done();
    }.bind(this));
  },

  install: {
    leaflet: function () {      
      if (!selected('chart')) return;
      aid.install('chart', 'ember-cli-chart');
      aid.info('https://www.npmjs.org/package/ember-cli-chart');
    },  
  },

  end: function () {    
  }
});

module.exports = EmberConfigChartsGenerator;
