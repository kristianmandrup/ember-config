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
        'moment', 
        'auto-properties', 
        'data-factory', 
        'validations', 
        'validatable', 
        'date helpers', 
        'notify', 
        'pre-render'
      ],
      default: ['i18n', 'moment']
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
      aid.install('i18n', 'ember-i18n');

    if (selected('moment'))
      aid.install('moment');    

    if (selected('auto-properties'))    
      aid.install('auto-properties', 'ember-auto');

    if (selected('data-factory'))    
      aid.install('data-factory', 'ember-data-factory');

    if (selected('validations'))    
      aid.install('ember-validations');

    if (selected('validatable'))    
      aid.install('validatable', 'ember-validatable');
        
    if (selected('date helpers'))          
      aid.install('dates');

    // https://www.npmjs.org/package/ember-notify
    if (selected('notify'))          
      aid.install('notify', 'ember-notify');

    if (selected('pre-render'))          
      aid.install('prerender', 'ember-prerender');



  },
  end: function() {
    aid.info('Please also add support for ember-easyForms ;)')
  }
});

module.exports = EmberConfigAddonsGenerator;
