'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
require('sugar');

var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigMapsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.eqSelector(this, 'maps');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'maps',
      message: 'Select your map library',
      choices: ['leaflet'],
      default: 'leaflet'
    }];

    this.prompt(prompts, function (props) {
      this.maps = props.maps;

      done();
    }.bind(this));
  },

  install: {
    leaflet: function () {      
      if (!selected('leaflet')) return;
      aid.install('Leaflet', 'ember-leaflet');
      aid.info('http://leafletjs.com/');
    },  
  },

  end: function () {    
  }
});

module.exports = EmberConfigMapsGenerator;
