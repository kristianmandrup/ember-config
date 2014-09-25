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

    aid.info('chart:  - https://www.npmjs.org/package/ember-cli-chart');
    aid.info('charts: - https://github.com/Addepar/ember-charts');
    aid.info('dc:     - https://github.com/andrewreedy/ember-dc');

    var prompts = [{
      type: 'checkbox',
      name: 'charts',
      message: 'Select your chart libraries',
      choices: ['chart', 'charts', 'dc'],
      default: ['chart', 'dc']
    }];

    this.prompt(prompts, function (props) {
      this.charts = props.charts;

      done();
    }.bind(this));
  },

  install: {
    chart: function () {      
      if (!selected('chart')) return;
      aid.install('chart', 'ember-cli-chart');
      
    },  

    charts: function () {      
      if (!selected('charts')) return;
      aid.installBow('charts', 'ember-charts');
    },

    dc: function () {      
      if (!selected('dc')) return;
      aid.installBow('dc', 'ember-dc');
    }    
  },

  end: function () {    
  }
});

module.exports = EmberConfigChartsGenerator;
