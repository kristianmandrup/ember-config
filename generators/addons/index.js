// http://nytimes.github.io/pourover/

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;
var selected;

// download build!
// ember-easyForm
// http://builds.dockyard.com.s3.amazonaws.com/ember-easyForm/latest/ember-easyForm.js
// ember-validations
// http://builds.dockyard.com.s3.amazonaws.com/ember-validations/latest/ember-validations.js

// npm install ember-cli-pagination --save-dev

// ember-table
// bower install ember-table --save

// ember-i18n
// bower install ember-i18n --save

// ember-auto
// ember-forms
// ember-data-factory

var EmberConfigAddonsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'addons');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'addons',
      message: 'Which addons would you like to add?',

      // TODO: split up into categoreis: Model, View, Util
      choices: [
        'i18n', 
        'auto properties', 
        'notify', 
        'pre-render',
        'ic ajax'
      ],
      default: ['i18n']
    }];

    this.prompt(prompts, function (props) {
      this.addons    = props.addons;

      done();
    }.bind(this));
  },

  writing: {
  },

  install: function() {
    if (selected('i18n'))    
      aid.install('i18n', 'chrmod/ember-i18n'); // chrmod/ember-i18n

    if (selected('auto properties'))    
      aid.install('auto properties', 'ember-auto');
        
    // https://www.npmjs.org/package/ember-notify
    if (selected('notify'))          
      aid.install('notify', 'ember-notify');

    if (selected('ic ajax'))          
      aid.install('ic-ajax');

    if (selected('pre-render'))          
      aid.install('prerender', 'ember-prerender');
  },
  end: function() {
  }
});

module.exports = EmberConfigAddonsGenerator;
