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
      choices: [
        'date picker',         
        'list view', 
        'radio buttons', 
        'table', 
        'pagination',
        'gravatar',
        'color picker',
        'tooltip',
        'split view',
        "drag'n drop",
        'spinner',
        'weather icons'
      ],
      default: ['date picker', 'list view']
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

      if (selected('tooltip'))        
        aid.install('tooltip');       

      if (selected('spinner'))        
        aid.install('spinjs'); 

      if (selected('split view')) {
        aid.install('split view', 'ember-split-view'); 

        aid.info(' - info @ https://www.npmjs.org/package/ember-split-view');
        aid.bold(' - demo @ http://bryanhunt.github.io/ember-split-view/vertical');        
      }        

      if (selected("drag'n drop"))        
        aid.install("drag'n drop", 'ember-cli-dnd');       

      if (selected('weather icons'))        
        aid.install('weather-icons');

      if (selected('code snippet'))        
        aid.install('code snippet', 'ember-code-snippet');
      
      if (selected('gravatar')) {
        aid.installBow('md5', 'JavaScript-MD5'); 
        aid.install('gravatar');
        aid.info('https://www.npmjs.org/package/ember-cli-gravatar');      
      }

      if (selected('color picker')) {
        aid.install('color picker', 'ember-colpick');
        aid.info('https://www.npmjs.org/package/ember-colpick');
      }               
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
