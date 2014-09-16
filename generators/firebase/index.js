'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper    = require('../../lib/aid');
var aid;
var selected, isAuthSelected;

var EmberConfigFirebaseGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected        = aid.eqSelector(this, 'adapter');
    isAuthSelected  = aid.yesSelector(this, 'auth'); 
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
    emberFire: function() {
      if (!selected('emberfire')) return;

      // https://www.npmjs.org/package/ember-cli-emberfire
      aid.install('emberfire');
    },

    fireplace: function() {
      if (!selected('fireplace')) return;

      // http://jaketrent.com/post/convert-app-from-emberfire-to-fireplace/
      // aid.installNpm('fireplace');
      aid.info('Sorry! not yet sure how to auto-install "fireplace"')

      aid.bold('Please read: http://jaketrent.com/post/convert-app-from-emberfire-to-fireplace');
      aid.thinline();
      // add ember-inflector
      // https://github.com/stefanpenner/ember-inflector
      aid.info('Sorry! not yet sure how to auto-install "ember-inflector"')
      aid.bold('You may get a recent (Mar 2014) build here: https://gist.github.com/jaketrent/9621891');
      // aid.installNpm('ember-inflector');

      // Remove ember-data
      // aid.uninstallNpm('ember-data');
      aid.bold('Also remember to remove ember-data if you use decide to use the fireplace adapter');
    }
  },

  end: {
    rewriteModelsFireplace: function () {
      if (!selected('fireplace')) return;

      aid.info('Ember-data comes bundled with ember-inflector. But, now that ember-data is gone, we need to fetch this library separately.');
      aid.info('This is the library responsible for inferring types in your models based on property names.');
      aid.info('To get it, you’ll need the ember-inflector source.');
      aid.info('You’ll notice that there isn’t a nice package built for you.'); 
      aid.info('Instead, you’ll have to build it with Ruby tools.')
      aid.bold('git clone git@github.com:stefanpenner/ember-inflector.git');
      aid.thinline();

      aid.bold('Also remember to rewrite your models...');
      aid.info('DS.Model becomes FP.Model. DS.attr becomes FP.attr');
    },
    emberFireAuth: function() {
      if (!selected('emberfire')) return;
      if (isAuthSelected())
        this.composeWith('ember-config:emberfireauth');
    }     
  }
});

module.exports = EmberConfigFirebaseGenerator;
