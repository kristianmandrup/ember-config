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
    hammer: {
      if (!selected('hammer')) return;        
      // this.composeWith('ember-config:hammer');
    },
    liquidFire: {
      if (!selected('kik app')) return;        
      // this.composeWith('ember-config:liquidfire');
    }    
  },
  end: function () {
    aid.info('TODO: liquidfire, hammer, velocity...');
  }
});

module.exports = EmberConfigAnimationsGenerator;


