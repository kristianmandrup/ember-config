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
      type: 'checkbox',
      name: 'frameworks',
      message: 'Which animation frameworks would you like?',
      choices: ['liquid fire', 'velocity', 'impulse'],
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
    impulse: function() {
      if (!selected('impulse')) return;   

      aid.installBower('impulse');
      aid.bold('See https://github.com/luster-io/impulse');
    },

    velocity: function() {
      if (!selected('velocity')) return; 

      aid.installBower('velocity');
      aid.bold('See https://github.com/julianshapiro/velocity');
    },
    liquidFire: function() {
      if (!selected('liquid fire')) return; 

      aid.install('liquid fire', 'liquid-fire');
      aid.bold('See http://ef4.github.io/liquid-fire');
    }    
  },
  end: function () {    
  }
});

module.exports = EmberConfigAnimationsGenerator;


