'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var S = require('string');

var EmberConfigFontGenerator = yeoman.generators.Base.extend({
  initializing: function () {
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'script',
      message: 'Choose your scripting language:',
      choices: ['javascript', 'coffeescript', 'livescript', 'emberscript'],
      default: 'javascript'
    }];

    this.prompt(prompts, function (props) {
      console.log('props', props);
      this.log('collecting prompts');

      this.script = props.script;
      this.fileExt = switch (props.script) {
        case 'coffeescript': 
          'coffee'; break;
        case 'livescript': 
          'ls'; break;
        case 'emberscript': 
          'em'; break;
        default: 
          'js';
      };

      done();
    }.bind(this));
  },

  writing: {
    removeOldFiles: function() {
      this.log('removeOldFiles');
      this.spawnCommand('rm', ['app/app.*', 'app/router.*']);      
    },

    copyFiles: function () {
      this.log('copyFiles');

      this.sourceRoot('../templates/' + this.script)      
      var fileName = 'app.' + self.fileExt;

      var self = this;
      var templateFile = function(name) {
        self.src.template(self.script + '/' + self.fileName, 'app/' + self.fileName);
      }
    
      if (this.script === 'emberscript') return;

      templateFile('app');
      templateFile('router');
    }
  },

  install: {
    installCoffeescript: function () {
      this.log('installCoffeescript');

      if (this.script !== 'coffeescript') return;

      this.npmInstall(['ember-cli-coffeescript'], { 'saveDev': true }, this.async());      

      // uninstall livescript
      this.spawnCommand('npm', ['uninstall', 'ember-cli-livescript']);
      this.spawnCommand('npm', ['uninstall', 'broccoli-ember-script']);
    },
    installLivescript: function () {
      this.log('installLivescript');

      if (this.script !== 'livescript') return;

      this.npmInstall(['ember-cli-livescript'], { 'saveDev': true }, this.async());      

      // uninstall coffee
      this.spawnCommand('npm', ['uninstall', 'ember-cli-coffeescript']);
      this.spawnCommand('npm', ['uninstall', 'broccoli-ember-script']);
    },

    installEmberscript: function () {
      this.log('installEmberscript');

      if (this.script !== 'emberscript') return;

      this.npmInstall(['broccoli-ember-script'], { 'saveDev': true }, this.async());      

      // uninstall coffee
      this.spawnCommand('npm', ['uninstall', 'ember-cli-coffeescript']);
      this.spawnCommand('npm', ['uninstall', 'ember-cli-livescript']);
    },
    end: function() {
      switch (this.script) {
        case 'emberscript':
          this.log('See: https://github.com/ghempton/ember-script/');
          this.log('Emberscript editor support:');
          this.log('https://github.com/asux/sublime-ember-script');
          this.log('* Please donate to emberscript to advance the project *');
          break;
        case 'livescript':
          this.log('See: livescript.net');
        case 'coffeescript':
          this.log('See: coffescript.org and coffeescriptlove.com');
      }
    }

  }
});

module.exports = EmberConfigFontGenerator;
