'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid;
var selected;

var EmberConfigMobileGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.eqSelector(this, 'mobileFw');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'mobileFw',
      message: 'Which mobile framework would you like?',
      choices: ['cordova', 'ratchet'],
      default: 'cordova'
    },{
      type: 'input',
      name: 'revDomain',
      message: 'Enter identifier/reverse style domain name',
      default: 'com.reverse.domain'
    },{
      type: 'confirm',
      name: 'android',
      message: 'Install android platform',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.mobileFw    = props.mobileFw;
      this.revDomain   = props.revDomain;
      this.android     = props.android;
      done();
    }.bind(this));
  },

  writing: {
  },

  install: {
    cordova: function () {
      if (!selected('cordova')) return;

      // TODO: only install if none (or old) version present
      aid.install('cordova');  
      // TODO: ensure only executed when install is complete
      aid.info('Please use generator: ember generate cordova-init ' + this.revDomain);
      // aid.generate('cordova-init', [domain]);
      if (this.android) {
        aid.bold('You must have cordova installed globally for this command to work.');
        aid.info('https://www.npmjs.org/package/cordova');

        aid.installGlobalNpm('cordova');
        // TODO: only after cordova installed or present!
        // *nix $ which cordova
        if (aid.hasGlobalBinary('cordova')) {
          // TODO: aid.spawn
          this.spawnCommand('ember', ['cordova', 'platform', 'add', 'android']);              
        }          
      }, ratchet: {
        if (!selected('cordova')) return;        

        this.composeWith('ember-config:ratchet');
      }
    }
  }
});

module.exports = EmberConfigMobileGenerator;


