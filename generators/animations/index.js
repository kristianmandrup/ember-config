'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigAnimationsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'frameworks');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [
    {
      type: 'list',
      name: 'framworks',
      message: 'Which animation frameworks would you like?',
      choices: ['liquidfire', 'velocity'],
      default: ['liquidfire']
    }];

    this.prompt(prompts, function (props) {
      this.framworks    = props.framworks;

      done();
    }.bind(this));
  },

  writing: {
  },

  install: {
    velocity: {
      if (!selected('velocity')) return;        
      aid.install('velocity');
    },
    liquidFire: {
      if (!selected('kik app')) return;        
      // this.composeWith('ember-config:liquidfire');
      aid.install('liquid-fire', 'liquid-fire');
      aid.bold('See http://ef4.github.io/liquid-fire');
    }    
  },
  end: function () {    
  }
});

module.exports = EmberConfigAnimationsGenerator;


