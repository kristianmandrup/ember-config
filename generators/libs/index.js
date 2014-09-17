// http://nytimes.github.io/pourover/

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;
var selected;

var EmberConfigLibsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'libs');
  },

  prompting: function () {
    var done = this.async();

    // TODO: add list of test frameworks to choose from when available...
    var prompts = [{
      type: 'checkbox',
      name: 'libs',
      message: 'Which libraries would you like to include?',
      // Waiting for npm/bower : https://github.com/NYTimes/pourover/pull/38
      choices: ['pour over'],
      default: []
    }];

    this.prompt(prompts, function (props) {
      this.libs    = props.libs;

      done();
    }.bind(this));
  },

  writing: {
  },

  install: function() {
    if (selected('pour over'))
      aid.install('pour over', 'git://github.com/NYTimes/pourover.git');
  },
  end: function() {
    aid.info('Please add more useful libs to the mix ;)')
  }
});

module.exports = EmberConfigLibsGenerator;
