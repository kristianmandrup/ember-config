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
      aid.install('ember-leaflet');
      aid.info('http://leafletjs.com/');
      aid.log('https://www.devmynd.com/blog/2014-1-using-emberleaflet-with-google-maps')
    }
  },

  end: function () {    
    aid.info('Ember google maps: https://gist.github.com/ZogStriP/5684983');
    aid.info('Ember map demo app: https://github.com/samwich/ember-map-demo');
    aid.thinline();
    aid.log('Writing Ember google maps component: http://strongpoint.io/blog/2014/07/28/ember-js-writing-google-maps-component-part-1');
    aid.log('http://strongpoint.io/blog/2014/08/27/ember-js-writing-google-maps-component-part-2');
  }
});

module.exports = EmberConfigMapsGenerator;
