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
      choices: ['forms', 'list view', 'i18n', 'pagination', 'table', 'auto-properties', 'data-factory'],
      default: ['forms']
    }];

    this.prompt(prompts, function (props) {
      this.addons    = props.addons;

      done();
    }.bind(this));
  },

  writing: {
  },

  install: function() {
    if (selected('forms'))
      aid.installBow('forms', 'ember-forms');
    
    if (selected('list view'))
      aid.installBower('list-view');

    if (selected('i18n'))    
      aid.installBow('i18n', 'ember-i18n');

    if (selected('table'))    
      aid.installBow('table', 'ember-table');

    if (selected('auto-properties'))    
      aid.installBow('auto-properties', 'ember-auto');

    if (selected('data-factory'))    
      aid.installBow('data-factory', 'ember-data-factory');

    // npm
    if (selected('pagination'))        
      aid.install('pagination');    
  },
  end: function() {
  }
});

module.exports = EmberConfigAddonsGenerator;
