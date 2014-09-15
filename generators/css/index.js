'use strict';
var util    = require('util');
var fs      = require('fs-extra');
var yeoman  = require('yeoman-generator');
require('sugar');

var removeFiles = function(pattern) {
  var glob = require("glob")

  // options is optional
  glob(pattern, function (er, files) {
    if (er) return;
    // console.log('pattern', pattern)
    files.forEach(function(file) {
      // console.log('remove file', file);
      fs.removeSync(file);
      console.log("removed", file);
    })
  })        
}

Array.prototype.contains = function ( needle ) {
   for (var i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}

var EmberConfigCssGenerator = yeoman.generators.Base.extend({
  // Choose test framework
  prompting: function () {
    var done = this.async();

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

      if ((this.css).has('sass'))
        this.fileExt = 'scss';

      if ((this.css).has('styl'))
        this.fileExt = 'styl';

      console.log('css', this.css, props);
      console.log('fileExt', this.fileExt);

      done();
    }.bind(this));
  },

  writing: {
    removeOldFiles: function() {
      removeFiles('app/styles/app.*');
      // this.spawnCommand('rm', ['app/styles/app.*']);      
    },

    copyFiles: function () {
      var fileName = 'app.' + this.fileExt;
      // this.log('fileName', fileName);

      this.template(fileName, 'app/styles/' + fileName);
    }
  },

  install: {
    installLessCompiler: function () {
      // is less selected
      if (this.fileExt !== 'less') return;
      console.log('installing less', this.fileExt);

      this.npmInstall(['broccoli-less-single'], { 'saveDev': true }, this.async());
    },

    installSassCompiler: function () {
      console.log('do sass');
      console.log('css', this.css);
      console.log('fileExt', this.fileExt);

      // is sass selected
      if ((this.css).has('compass')) return;
      if (['scss', 'sass'].indexOf(this.fileExt) == -1) return;

      console.log('installing sass', this.fileExt);
      this.npmInstall(['broccoli-sass'], { 'saveDev': true }, this.async());      
    },

    installStylusCompiler: function () {
      // is stylus selected
      if (this.fileExt !== 'styl') return;

      console.log('installing stylus', this.fileExt);
      this.npmInstall(['broccoli-stylus-single'], { 'saveDev': true }, this.async());      
    },

    installCompass: function () {
      // is compass selected
      if (!(this.css).has('compass')) return;

      console.log('installing compass', this.css);
      this.npmInstall(['ember-cli-compass-compiler'], { 'saveDev': true }, this.async());      
    }
  }
});

module.exports = EmberConfigCssGenerator;module.exports = EmberConfigCssGenerator;
