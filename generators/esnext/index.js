'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require('../../lib/aid');
var aid;
var selected;

var EmberConfigEsNextGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'confirm',
      name: 'esnext',
      message: 'Install ESnext to enable ES6 harmony features?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.esnext   = props.esnext;

      done();
    }.bind(this));
  },

  writing: {
  },
  install: {
    esNext: function () {
      aid.install('esnext');
    }
  },

  end: function() {
    aid.success('ESnext successfully installed :)');    
  }
});

module.exports = EmberConfigEsNextGenerator;



