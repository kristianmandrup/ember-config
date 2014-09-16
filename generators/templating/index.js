'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var sync    = require('sync');
var helper = require ('../../lib/aid');
var aid;
require('sugar');

var EmberConfigTemplatingGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
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
      this.fileExt = (this.templating == 'emblem') ? 'emblem' : 'hbs';

      done();
    }.bind(this));
  },

  writing: {
    removeOldFiles: function () {
      aid.bold('Remove old application template(s)');
      aid.removeFiles('app/templates/application.*', aid.excludeOpt('app/templates/application', this.fileExt));
    },

    // TODO: only if not present
    copyFiles: function () {
      aid.bold('Add new application template');      

      var fileName = 'application.' + this.fileExt;
      this.template(this.fileExt + '/' + fileName, 'app/templates/' + fileName);
    },
  },

  install: {
    installEmblem: function () {
      if (this.templating !== 'emblem') return
      
      aid.install('emblem', 'broccoli-emblem-compiler');

      // TODO: https://www.npmjs.org/package/ember-cli-emblem
      // aid.install('emblem');

      // uninstall handlebars?
      if (this.uninstall)
        aid.uninstall('handlebars', 'broccoli-ember-hbs-template-compiler');
    },

    installHandlebars: function () {
      if (this.templating !== 'handlebars') return
      
      aid.install('handlebars', 'broccoli-ember-hbs-template-compiler');

      // uninstall handlebars?
      if (this.uninstall)
        aid.uninstall('emblem', 'broccoli-emblem-compiler');
    },

  }
});

module.exports = EmberConfigTemplatingGenerator;
