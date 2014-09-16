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
    selected        = aid.containsSelector(this, 'adapter');
    isAuthSelected  = aid.isSelector(this, 'auth'); 
  },

  // TODO: fireplace - rewrite models (auto search/replace!)
  // {
  //   type: 'confirm',
  //   name: 'rewriteModels',
  //   message: 'Do you want to automatically rewrite models if required (fireplace)?',
  //   default: true
  // },

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
      name: 'auth',
      message: 'Configure firebase authentication?',
      default: true
    }
    ];

    this.prompt(prompts, function (props) {
      this.adapter = props.adapter;
      this.account = props.account;
      this.auth    = props.auth;

      done();
    }.bind(this));
  },

  writing: {
    // TODO:
    configEmberfire: function() {
      if (!selected('emberfire')) return;

      aid.info('Example ember-cli app using emberfire');
      aid.info('See https://github.com/stefanpenner/ember-cli-ember-fire')
      aid.thinline()
      aid.info('See https://www.firebase.com/blog/2013-12-16-emberfire-guest-blog.html')
    },

    // TODO:
    configFireplace: function () {
      if (!selected('fireplace')) return;   
      aid.info('No fireplace config implemented yet...');   
    }
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
      aid.installNpm('ember-inflector');

      // Remove ember-data
      aid.uninstallNpm('ember-data');
    }
  }

  end: {
    rewriteModelsFireplace: function () {
      if (!selected('fireplace')) return;

      aid.info('Remember to rewrite your models...');
      aid.info('DS.Model becomes FP.Model. DS.attr becomes FP.attr');
    },
    emberFire: {
      if (!selected('emberfire')) return;
      if (isAuthSelected())
        this.composeWith('ember-config:emberfireauth');
    }     
  }
});

module.exports = EmberConfigFirebaseGenerator;
