'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var broc_file = require ('../../lib/broc_file');
var aid;
require('sugar');
var selected;

var EmberConfigLayoutGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    this.brocFileContent = aid.fileContent('Brocfile.js');
    selected = aid.eqSelector(this, 'layout');
  },

  prompting: {
    popular: function () {
      var done = this.async();

      var prompts = [{
        type: 'list',
        name: 'layout',
        message: 'Choose a popular layout framework',
        choices: ['bootstrap', 'foundation', 'semantic-ui', 'gumby', 'ink', 'pure',  '*alternative*'],
        default: 'bootstrap'
      }];

      this.prompt(prompts, function (props) {
        this.layout = props.layout;
        // TODO: normalize to name of sub-generator ;)

        done();
      }.bind(this));
    },
  },

  // TODO: Refactor to make DRY
  writing: {
    ink: function () {
      if (!selected('ink')) return;

      var css_import = "app.import('bower_components/ink/css/ink.css');";

      if (this.brocFileContent.has(css_import)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(css_import + '\n');
      }).write();

      aid.info('Ink configured');      
    },
    pure: function () {
      if (!selected('pure')) return;

      var css_import = "app.import('bower_components/ink/build/pure.css');";

      if (this.brocFileContent.has(css_import)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(css_import + '\n');
      }).write();

      aid.info('Pure configured');      
    }
  },

  install: {
    ink: function () {
      if (!selected('ink')) return;
      aid.installBower('ink');
    },
    pure: function () {
      if (!selected('pure')) return;
      aid.installBower('pure');
    }
  },
  end: function () {
    console.log('end', this.layout);
    switch (this.layout) {
      case 'bootstrap':
        this.composeWith('ember-config:bootstrap');
        break;  
      case 'foundation':
        this.composeWith('ember-config:foundation');
        break;        
      case 'semantic-ui':
        this.composeWith('ember-config:semanticui');
        break;      
      case 'gumby':
        this.composeWith('ember-config:gumby');
        break;               
      case '*alternative*':
        this.composeWith('ember-config:altlayout');
        break;
      default:        
        aid.info("Sorry! Generator for " + this.layout + ' has yet to be implemented...');
    }    
  }
});

module.exports = EmberConfigLayoutGenerator;
