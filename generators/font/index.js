'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var S = require('string');

var EmberConfigFontsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'fonts',
      message: 'Choose your font frameworks',
      choices: ['fontawesome', 'other (todo)'],
      default: ['fontawesome']
    }];

    this.prompt(prompts, function (props) {
      this.fonts = props.fonts;

      done();
    }.bind(this));
  },

  writing: {
    brocFontAwesome: function () {
      if (this.fonts !== 'fontawesome') return;
      // if fontAwesome 
      // this.src.template('bootstrap_for_ember/Brocfile.js.tmp', 'Brocfile_boostrap_ember.js.tmp');
    },
  },

  install: {
    installFontAwesome: function () {
      if (this.fonts !== 'fontawesome') return;      

      var done = this.async();

      this.npmInstall(['ember-cli-font-awesome'], { 'saveDev': true }, done);      
    }
  }
});

module.exports = EmberConfigFontsGenerator;


