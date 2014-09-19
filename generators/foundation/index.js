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
// var broc_file = require ('../../lib/broc_file');
require('sugar');

var helper    = require('../../lib/aid');
// var sass_file = require('../../lib/sass_file');

var aid, selected;

// https://github.com/JDillon522/ember-foundation-fun
var EmberConfigFoundationGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    this.brocFileContent = aid.fileContent('Brocfile.js');
    selected = aid.eqSelector(this, 'cssType');

    // ember-cli convention ;)
    this.appName = 'App';
  },

  prompting: {
    stylesheeter: function () {
      var done = this.async();

      // TODO: should detect app is using sass and change default!
      var prompts = [{
        type: 'list',
        name: 'cssType',
        message: 'Which styling language for foundation would you like?',
        choices: ['css', 'sass'],
        default: 'css'
      }]

      this.prompt(prompts, function (props) {
        this.cssType = props.cssType;

        done();
      }.bind(this));
    },
    addViews: function () {
      var done = this.async();

      // TODO: should detect app is using sass and change default!
      var prompts = [{
        type: 'confirm',
        name: 'addViews',
        message: 'Do you wish to add Ember views for Foundation?',
        default: false
      }];

      this.prompt(prompts, function (props) {
        this.addView = props.addView;

        done();
      }.bind(this));
    }
  },

  writing: {
    // https://coderwall.com/p/azjwaq
    // see mfeckie
    configureAppView: function () {
      if (!this.addView) return;

      var appView = 'app/views/application.js';

      // TODO: allow overwrite option
      if (!aid.fileExists(appView)) {
        aid.info(appView + ' already exists (skipped)');
        return;
      }
      this.copy('views/application.js', appView);
    },
    configureIndexView: function () {
      if (!this.addViews) return;

      var indexView = 'app/views/index.js';
      if (!aid.fileExists(indexView)) {
        aid.info(indexView + ' already exists (skipped)');
        return;
      }
      this.copy('views/index.js', indexView);
    }
  },

  install: {
    // ember-cli-foundation-sass --save-dev
    // ember g foundation-sass
    css: function () {
      if (selected('css'))
        aid.install('foundation', 'ember-foundation');
    },
    sass: function () {
      if (!selected('sass')) return;
      aid.install('foundation');
      
      aid.info('Now run: ember g foundation-sass');
    },
  },
  end: function() {
    aid.success('Zurb Foundation successfully installed :)');
    aid.thickline();

    this.log('https://github.com/joshforisha/ember-foundation');
    this.log('See: https://github.com/JDillon522/ember-foundation-fun');

    if (selected('sass'))
      aid.generate('ember', ['foundation-sass']);

    if (selected('css')) {
      aid.info('Running ember-foundation blueprint...');
      aid.blueprint('ember-foundation');      
    }
  }
});

module.exports = EmberConfigFoundationGenerator;

