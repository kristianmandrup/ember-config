'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;
var selected, libSelected;

var EmberConfigComponentsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    libSelected = aid.containsSelector(this, 'componentLibs');
    selected = aid.containsSelector(this, 'components');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'componentLibs',
      message: 'Choose your components framework',
      choices: ['bootstrap for ember', 'ember components', 'forms'],
      default: ['ember components']
    }, {
      type: 'checkbox',
      name: 'components',
      message: 'Choose individual components',
      choices: ['date picker', 'list view', 'radio buttons', 'table', 'pagination'],
      default: ['date picker']
    }];

    this.prompt(prompts, function (props) {
      this.componentLibs = props.componentLibs;
      this.components = props.components;

      done();
    }.bind(this));
  },

  install: {
    componentsLibs: function () {
      if (libSelected('bootstrap for ember'))
        aid.install('bootstrap');
      if (libSelected('ember components'))
        aid.install('components');  

    if (selected('forms'))
      aid.installBow('forms', 'ember-forms');
    },
    components: function() {
      // TODO: For some reason these are not yet published on npm ;()
      if (selected('list view'))
        aid.install('list view', 'git://github.com/emberjs/list-view.git');

      if (selected('table'))    
        aid.install('table', 'git://github.com/Addepar/ember-table.git');
    
      if (selected('radio buttons')) 
        aid.install('radio buttons', 'ember-radio-buttons');

      if (selected('date picker')) 
        aid.install('date picker', 'ember-cli-datepicker');  

      if (selected('pagination'))        
        aid.install('pagination');              
    }       
  },
  end: {
    bootstrap: function() {
      if (!libSelected('bootstrap for ember')) return;
      this.composeWith('ember-config:bsember');
    },
    components: function() {
      if (!libSelected('ember components')) return;      

      // assumess install (see above)
      aid.success('You successfully installed Ember Components');
      aid.info('For docs, see: http://indexiatech.github.io/ember-components');
      aid.info('For more info on Ember Components, be sure to check: http://ember-components.com');    
    },
  }
});

module.exports = EmberConfigComponentsGenerator;
