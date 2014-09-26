'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigTestGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = containsSelector(this, 'libs');
  },

  // Choose test framework
  prompting: { 
    qunit: function () {
      var done = this.async();

      // TODO: add list of test frameworks to choose from when available...
      var prompts = [{
        type: 'confirm',
        name: 'qunit',
        message: 'Would you like to use Qunit?',
        default: true
      }, 
      {
        type: 'confirm',
        name: 'generate',
        message: 'Would you like to run the Qunit generator?',
        default: true
      }];

      this.prompt(prompts, function (props) {
        this.qunit    = props.qunit;
        this.generate = props.generate;

        done();
      }.bind(this));
    },
    libs: function() {
      var done = this.async();

      // TODO: add list of test frameworks to choose from when available...
      var prompts = [{
        type: 'checkbox',
        name: 'libs',
        choices: [
          'data factory'
        ],
        message: 'Choose any other testing libs',
        default: []
      }];

      this.prompt(prompts, function (props) {
        this.libs    = props.libs;

        done();
      }.bind(this));      
    }
  },

  writing: {
  },

  install: {
    qunit: function () {
      if (!this.qunit) return;

      // https://github.com/jakecraige/ember-cli-qunit
      aid.install('qunit');  

      if (this.generate) {
        if (aid.hasBower('ember-qunit')) {
          aid.info('skip generate: already has qunit browser packages installed');
          return;
        }
        this.spawnCommand('ember', ['generate', 'ember-cli-qunit']);
      }        
    },

    libs: function () {
      if (selected('data factory'))    
        aid.install('data factory', 'ember-data-factory');
    }
  }
});

module.exports = EmberConfigTestGenerator;
