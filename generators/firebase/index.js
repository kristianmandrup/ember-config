'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper    = require('../../lib/aid');
var aid;
var selected;

var EmberConfigFirebaseGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'adapter');
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    // TODO: Someone please create fireplace model generator!!!
    // https://github.com/rlivsey/fireplace

    var prompts = [{
      type: 'list',
      name: 'adapter',
      message: 'Choose firebase adapter:',
      choices: ['emberfire', 'fireplace'],
      default: 'emberfire'
    }, {
      type: 'input',
      name: 'account',
      message: 'What is the name of your firebase account?',
      default: 'unknown'     
    }, {
      type: 'confirm',
      name: 'rewriteModels',
      message: 'Do you want to automatically rewrite models if required?',
      default: true
    }    
    ];

    this.prompt(prompts, function (props) {
      this.adapter = props.adapter;
      this.account = props.account;

      done();
    }.bind(this));
  },

  writing: {
    configEmberfire: function() {
      if (!selected('emberfire')) return;
    },

    configFireplace: function () {
      if (!selected('fireplace')) return;      
    },
  },

  install: {    
    emberFire: {
      if (!selected('emberfire')) return;

      // https://www.npmjs.org/package/ember-cli-emberfire
      aid.install('emberfire');
      // run generator
      aid.generate('emberfire');
    },

    fireplace: {
      if (!selected('fireplace')) return;

      // http://jaketrent.com/post/convert-app-from-emberfire-to-fireplace/
      aid.install('fireplace');

      // add ember-inflector
      // https://github.com/stefanpenner/ember-inflector
      aid.info('add ember-inflector');
      aid.install('ember-inflector', 'ember-inflector');

      // Remove ember-data
      aid.uninstall('ember-data', 'ember-data');
    }
  }

  end: {
    rewriteModelsFireplace: function () {
      if (!selected('fireplace')) return;

      aid.info('Remember to rewrite your models...');
      aid.info('DS.Model becomes FP.Model. DS.attr becomes FP.attr');
    }    
  }
});

module.exports = EmberConfigFirebaseGenerator;
