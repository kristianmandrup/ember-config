'use strict';
var util    = require('util');
var fs      = require('fs-extra');
var yeoman  = require('yeoman-generator');
require('sugar');

var helper = require ('../../lib/aid');
var aid;

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
    this.appName = this._.classify(appname); // .camelize(true);
    aid = helper(this);
  },

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

      done();
    }.bind(this));
  },

  writing: {
    removeOldFiles: function() {
      aid.removeFiles('app/styles/app.*');
    },

    copyFiles: function () {
      var fileName = 'app.' + this.fileExt;
      this.copy(fileName, 'app/styles/' + fileName);
    }
  },

  install: {
    installLessCompiler: function () {
      if (this.fileExt !== 'less') return;
      aid.install('less', 'broccoli-less-single');
    },

    installSassCompiler: function () {
      if ((this.css).has('compass')) return;
      if (!['scss', 'sass'].contains(this.fileExt)) return;

      aid.install('sass', 'broccoli-sass');
    },

    installStylusCompiler: function () {
      if (this.fileExt !== 'styl') return;
      aid.install('stylus', 'broccoli-stylus-single');
    },

    installCompass: function () {
      if (!(this.css).has('compass')) return;
      aid.install('compass', 'ember-cli-compass-compiler');
    }
  }
});

module.exports = EmberConfigCssGenerator
