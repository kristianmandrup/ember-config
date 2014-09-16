// https://www.npmjs.org/package/generator-bedrock

// Also see: https://www.npmjs.org/package/generator-frontcow

// https://github.com/tubbo/ember-foundation
// http://foundation.zurb.com/forum/posts/7477-foundation-5-with-emberjs
// http://dhartweg.roon.io/foundation-5-sliders-in-dropdowns-using-emberjs
// https://coderwall.com/p/azjwaq


'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var sm = require('string-mutator');
var broc_file = require ('../../lib/broc_file');
require('sugar');

var helper    = require('../../lib/aid');
var sass_file = require('../../lib/sass_file');
var aid;
var selected, cssSelected;

// https://github.com/JDillon522/ember-foundation-fun

var EmberConfigFoundationGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected    = aid.containsSelector(this, 'features');
    cssSelected = aid.containsSelector(this, 'cssType'); 
    this.brocFileContent = aid.fileContent('Brocfile.js');
  },

  prompting: function () {
    var done = this.async();

    // TODO: should detect app is using sass and change default!
    var prompts = [{
      type: 'list',
      name: 'cssType',
      message: 'Which styling language for bootstrap would you like?',
      choices: ['less', 'sass'],
      default: ['css']
    }];

    this.prompt(prompts, function (props) {
      this.cssType = props.cssType;
      this.features = props.bootstrapFeatures;

      // TODO: replace with real app name!
      this.appName = 'App';

      done();
    }.bind(this));
  },

  writing: {
    // https://coderwall.com/p/azjwaq
    // see mfeckie
    configureAppView: function () {
      var appView = 'app/views/application_view.js';
      if (!aid.fileExists(appView)) {
        aid.info(appView + ' already exists (skipped)');
        return;
      }
      this.copy('app_view.js', appView);
    },
    configureIndexView: function () {
      var appView = 'app/views/index_view.js';
      if (!aid.fileExists(indexView)) {
        aid.info(appView + ' already exists (skipped)');
        return;
      }
      this.copy('index_view.js', indexView);
    }

  },

  install: function () {
    aid.install('ember-foundation');
    aid.success('Zurb Foundation 5 successfully installed :)');
  },
  end: function() {
    // TODO: Use foundation blueprint!
  }
});

module.exports = EmberConfigBootstrapGenerator;

