'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;

var broc_file = require ('../../lib/broc_file');
require('sugar')

var componentList = function(components) {
  if (aid.contains(components, 'all')) {
    components = allComponents;
  } 
  return components.map(function(c) { return "'bs-" + c + "'"; }).join(',');
}

var allComponents = ['alert', 'badge', 'bind-tooltip', 
  'breadcrumbs', 'button', 'btn-group', 'flip-switch',
  'label', 'list-group', 'modal', 'notifications', 'page-header',         
  'panel', 'pills', 'progress', 'tabs', 'tabs-panes', 
  'well', 'wizard'
]

var EmberConfigComponentsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
  },

  prompting: function () {
    var done = this.async();

    var choices = allComponents.slice(0);
    choices.unshift('all');

    var prompts = [{
      type: 'checkbox',
      name: 'bsComponents',
      message: 'Choose your bootstrap components to include',
      choices: choices,
      default: ['all']
    }];

    this.prompt(prompts, function (props) {
      this.bsComponents = props.bsComponents;

      done();
    }.bind(this));
  },

  writing: {
    // cofigure which bootstrap components to include
    // see: https://www.npmjs.org/package/ember-cli-bootstrap
    configureBrocfileForBootstrap: function () {
      var bsComponents = this.bsComponents
      if (bsComponents) {
        var components = componentList(bsComponents);
        var ctx = {components: components};
        var template = this.read('Brocfile_bs_components.js');
        var replaceJs = this.engine(template, ctx);

        // TODO: warn if 'new EmberApp()' is not empty!
        broc_file(function() {
          return this.first(/new EmberApp\(.*\);/).replaceWith(replaceJs);
        }).write();        
      }
    },
  },

  install: {
    bootstrapComponents: function () {
      aid.install('bootstrap');
    }
  }
});

module.exports = EmberConfigComponentsGenerator;

