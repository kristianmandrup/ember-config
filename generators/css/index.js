'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var S = require('string');

var EmberConfigCssGenerator = yeoman.generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly setup
    yeoman.generators.Base.apply(this, arguments);    

    if (!this.appName)
      throw new Error("script: appname not defined!!");

    this.appName = S(this.appname).camelize();
  },

  initializing: function () {
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Choose your css compiler'
    ));

    var prompts = [{
      type: 'list',
      name: 'css',
      message: 'Choose your css compiler:',
      choices: ['css', 'less', 'sass', 'stylus', 'compass (sass)'],
      default: 'css'
    }];

    this.prompt(prompts, function (props) {
      this.css = props.css;
      this.fileExt = this.css;

      if (S(this.css).include('sass'))
        this.fileExt = 'scss';

      if (S(this.css).include('styl'))
        this.fileExt = 'styl';

      done();
    }.bind(this));
  },

  writing: {
    removeOldFiles: function() {
      this.spawnCommand('rm', ['app/styles/app.*']);      
    },

    copyFiles: function () {
      var fileName = 'app.' + this.fileExt;

      this.src.template(fileName, 'app/styles/' + fileName);
    }
  },

  install: {
    installLessCompiler: function () {
      // is stylus selected
      if (!this.fileExt == 'less') return;
      this.npmInstall(['broccoli-less-single'], { 'saveDev': true }, this.async());
    },

    installSassCompiler: function () {
      // is stylus selected
      if (!this.fileExt == 'sass') return;

      this.npmInstall(['broccoli-sass'], { 'saveDev': true }, this.async());      
    },

    installStylusCompiler: function () {
      // is stylus selected
      if (!this.fileExt == 'styl') return;

      this.npmInstall(['broccoli-stylus-single'], { 'saveDev': true }, this.async());      
    },

    installCompass: function () {
      // is stylus selected
      if (!S(this.css).include('compass')) return;

      this.npmInstall(['ember-cli-compass-compiler'], { 'saveDev': true }, this.async());      
    }
  }

  end: function () {
    this.installDependencies();
  }
});

module.exports = EmberConfigCssGenerator;
