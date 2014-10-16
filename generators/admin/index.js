'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
require('sugar');

var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigAdminGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.eqSelector(this, 'maps');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'admin',
      message: 'Select your admin addon',
      choices: ['admin'],
      default: 'admin'
    }];

    this.prompt(prompts, function (props) {
      this.admin = props.admin;

      done();
    }.bind(this));
  },

  install: {
    leaflet: function () {      
      if (!selected('admin')) return;
      aid.install('admin', 'ember-admin');
    },  
  },

  end: function () {    
  }
});

module.exports = EmberConfigAdminGenerator;
