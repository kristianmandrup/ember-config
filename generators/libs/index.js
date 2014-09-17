// http://nytimes.github.io/pourover/

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;

var EmberConfigLibsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
  },

  prompting: function () {
    var done = this.async();

    // TODO: add list of test frameworks to choose from when available...
    var prompts = [{
      type: 'list',
      name: 'libs',
      message: 'Which libraries would you like to include?',
      // Waiting for npm/bower : https://github.com/NYTimes/pourover/pull/38
      // 'pour-over'
      choices: [],
      default: []
    }];

    this.prompt(prompts, function (props) {
      this.libs    = props.libs;

      done();
    }.bind(this));
  },

  writing: {
  },

  install: {
  },
  end: function() {
    aid.info('Sorry! No libs supported yet ;)')
  }
});

module.exports = EmberConfigLibsGenerator;
