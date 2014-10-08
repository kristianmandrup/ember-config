'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid, selected;

var links = {
  'impulse': 'https://github.com/luster-io/impulse',
  'velocity': 'https://github.com/julianshapiro/velocity',
  'liquid fire': 'http://ef4.github.io/liquid-fire'
};


var info = {
  'impulse': 'Animations -..',
  'velocity': 'Animations...',
  'liquid fire': 'Animations bla bla'
};

// TODO: Should use a config file for each generator to handle most settings such as main choices, info, links, what type of
// library/component, names/alias etc.

var EmberConfigAnimationsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'frameworks');

    this.choices = ['liquid fire', 'velocity', 'impulse'];
  },

  prompting: function () {
    var done = this.async();

    aid.displayInfo(this.choices, info, links);

    var prompts = [
    {
      type: 'checkbox',
      name: 'frameworks',
      message: 'Which animation frameworks would you like?',
      choices: this.choices,
      default: ['liquid fire']
    }];

    this.prompt(prompts, function (props) {
      this.frameworks    = props.frameworks;

      done();
    }.bind(this));
  },

  writing: {
  },

  install: {
    // TODO: set bower path
    impulse: function() {
      if (!selected('impulse')) return;   

      aid.installComponent('impulse', '...');
    },

    velocity: function() {
      if (!selected('velocity')) return;
      aid.installComponent('velocity', '...');

    },
    // installs cli addon
    liquidFire: function() {
      if (!selected('liquid fire')) return;
      aid.install('liquid fire', 'liquid-fire');
    }    
  },
  end: function () {
    aid.displayLinks(links, this.selected);
  }
});

module.exports = EmberConfigAnimationsGenerator;


