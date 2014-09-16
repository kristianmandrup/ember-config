'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var componentList = function(components) {
  var allIndex = components.indexOf('all');
  if (allIndex > -1) {
    components.splice(allIndex, 1);
  }
  return components.join(',');
}

var EmberConfigComponentsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.all_components = ['alert', 'badge', 'bind-tooltip', 
      'breadcrumbs', 'button', 'btn-group', 'flip-switch',
      'label', 'list-group', 'modal', 'notifications', 'page-header',         
      'panel', 'pills', 'progress', 'tabs', 'tabs-panes', 
      'well', 'wizard'
    ]
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'bsComponents',
      message: 'Choose your bootstrap components to include',
      choices: ['all', 'alert', 'badge', 'bind-tooltip', 
        'breadcrumbs', 'button', 'btn-group', 'flip-switch',
        'label', 'list-group', 'modal', 'notifications', 'page-header',         
        'panel', 'pills', 'progress', 'tabs', 'tabs-panes', 
        'well', 'wizard'
      ],
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
        var replaceJs = this.engine('Brocfile_bs_components.js', ctx);

        // TODO: warn if 'new EmberApp()' is not empty!
        broc_file(function() {
          this.first(/new EmberApp\(.*\);/).replaceWith(replaceJs);
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

