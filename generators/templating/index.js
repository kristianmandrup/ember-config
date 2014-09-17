'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var sync    = require('sync');
var helper = require ('../../lib/aid');
var aid;
require('sugar');
var selected;

var EmberConfigTemplatingGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.eqSelector(this, 'templating');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'templating',
      message: 'Choose your templating language',
      choices: ['handlebars', 'emblem'],
      default: 'handlebars'
    }, {
      type: 'confirm',
      name: 'uninstall',
      message: 'Uninstall other templating languages?',
      default: false      
    }];

    this.prompt(prompts, function (props) {
      this.templating = props.templating;
      this.uninstall  = props.uninstall;
      this.fileExt    = (this.templating == 'emblem') ? 'emblem' : 'hbs';
      this.fileName = 'application.' + this.fileExt;
      this.filePath   = 'app/templates/' + this.fileName;

      done();
    }.bind(this));
  },

  writing: {
    removeOldFiles: function () {
      aid.bold('Remove old application template(s)');

      if (aid.fileExists(this.filePath)) return;
      aid.removeFiles('app/templates/application.*', aid.excludeOpt(this.fileName));
    },

    // TODO: only if not present
    copyFiles: function () {
      aid.bold('Add new application template');      
      
      if (aid.fileExists(this.filePath)) return;
      this.template(this.fileExt + '/' + this.fileName, this.filePath);
    },
  },

  install: {
    installEmblem: function () {
      if (!selected('emblem')) return
      
      // aid.install('emblem', 'broccoli-emblem-compiler');

      // TODO: https://www.npmjs.org/package/ember-cli-emblem
      aid.install('emblem');

      // uninstall handlebars?
      if (this.uninstall)
        aid.uninstall('handlebars', 'broccoli-ember-hbs-template-compiler');
    },

    installHandlebars: function () {
      if (!selected('handlebars')) return
      
      aid.install('handlebars', 'broccoli-ember-hbs-template-compiler');

      // uninstall handlebars?
      if (this.uninstall)
        aid.uninstall('emblem', 'broccoli-emblem-compiler');
    },

  }
});

module.exports = EmberConfigTemplatingGenerator;
