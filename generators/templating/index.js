'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var S = require('string');

var EmberConfigTemplatingGenerator = yeoman.generators.Base.extend({
  initializing: function () {
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'templating',
      message: 'Choose your templating language',
      choices: ['handlebars', 'emblem'],
      default: 'handlebars'
    }];

    this.prompt(prompts, function (props) {
      this.templating = props.templating;
      this.fileExt = (this.templating == 'emblem') ? 'emblem' : 'hbs';

      done();
    }.bind(this));
  },

  writing: {
    removeOldFiles: function () {
      this.spawnCommand('rm', ['app/templates/application.*']);      
    },

    copyFiles: function () {
      generator.sourceRoot('../templates/' + this.fileExt);
      var fileName = 'application.' + this.fileExt;

      this.src.template(this.fileExt + '/' + this.fileName, 'app/templates/' + this.fileName);
    },
  },

  install: {
    installEmblem: function () {
      if (this.templating !== 'emblem') return
      
      var done = this.async();

      // https://github.com/jakecraige/ember-cli-qunit
      this.npmInstall(['ember-cli-emblem'], { 'saveDev': true }, done);      
      
      // uninstall handlebars?
      // this.spawnCommand('ember', ['generate', 'ember-cli-qunit']);
    }
  }
});

module.exports = EmberConfigTemplatingGenerator;
