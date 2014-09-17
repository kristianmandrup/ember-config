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
var selected;

// https://github.com/JDillon522/ember-foundation-fun
var EmberConfigFoundationGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    this.brocFileContent = aid.fileContent('Brocfile.js');

    // ember-cli convention ;)
    this.appName = 'App'; // for use in templates
  },

  writing: {
    // https://coderwall.com/p/azjwaq
    // see mfeckie
    configureAppView: function () {
      var appView = 'app/views/application.js';

      // TODO: allow overwrite option
      if (!aid.fileExists(appView)) {
        aid.info(appView + ' already exists (skipped)');
        return;
      }
      this.copy('views/application.js', appView);
    },
    configureIndexView: function () {
      var indexView = 'app/views/index.js';
      if (!aid.fileExists(indexView)) {
        aid.info(indexView + ' already exists (skipped)');
        return;
      }
      this.copy('views/index.js', indexView);
    }
  },

  install: function () {
    aid.install('foundation', 'ember-foundation');
    aid.blueprint('ember-foundation');
  },
  end: function() {
    aid.success('Zurb Foundation successfully installed :)');
    aid.thickline();
    this.log('https://github.com/joshforisha/ember-foundation');
    this.log('See: https://github.com/JDillon522/ember-foundation-fun')


  }
});

module.exports = EmberConfigFoundationGenerator;

