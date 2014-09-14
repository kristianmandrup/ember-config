'use strict';
var util    = require('util');
var path    = require('path');
var fs      = require('fs-extra');
var yeoman  = require('yeoman-generator');
var yosay   = require('yosay');
var S       = require('string');
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
  initializing: function () {
    var pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    this.appname = pjson.name;
    this.appName = this.appname.camelize(true);
  },

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

      if (S(this.css).contains('sass'))
        this.fileExt = 'scss';

      if (S(this.css).contains('styl'))
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
      console.log('do less');
      console.log('css', this.css);
      console.log('fileExt', this.fileExt);

      // is sass selected
      if (S(this.css).contains('compass')) return;
      if (!S(['scss', 'sass']).contains(this.fileExt)) return;

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
      if (!S(this.css).contains('compass')) return;

      console.log('installing compass', this.css);
      this.npmInstall(['ember-cli-compass-compiler'], { 'saveDev': true }, this.async());      
    }
  }
});

module.exports = EmberConfigCssGenerator;
