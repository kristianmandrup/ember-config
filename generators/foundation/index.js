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

var EmberConfigBootstrapGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected    = aid.containsSelector(this, 'features');
    cssSelected = aid.containsSelector(this, 'cssType'); 
    this.brocFileContent = aid.fileContent('Brocfile.js');
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    // TODO: should detect app is using sass and change default!
    var prompts = [{
      type: 'list',
      name: 'cssType',
      message: 'Which styling language for bootstrap would you like?',
      choices: ['less', 'sass'],
      default: ['css']
    }, {
      type: 'checkbox',
      name: 'features',
      message: 'Which features of Twitter bootstrap would you like?',
      choices: ['css', 'javascript', 'fonts'],
      default: ['css', 'javascript']
    }];

    this.prompt(prompts, function (props) {
      this.cssType = props.cssType;
      this.bootstrapFeatures = props.bootstrapFeatures;

      done();
    }.bind(this));
  },

  writing: {
    // https://coderwall.com/p/azjwaq
    // see mfeckie
    configureView: function () {   
      this.copy('app_view.js', 'app/views/application_view.js');
    }
  },

  install: function () {
    aid.install('ember-foundation');
    aid.success('Zurb Foundation 5 successfully installed :)');
  }
});

module.exports = EmberConfigBootstrapGenerator;

