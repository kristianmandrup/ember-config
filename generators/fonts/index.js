'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var EmberConfigFontsGenerator = yeoman.generators.Base.extend({
  // Choose test framework
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'fonts',
      message: 'Choose your font frameworks',
      choices: ['fontawesome', 'iconfont'],
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
      // this.template('bootstrap_for_ember/Brocfile.js.tmp', 'Brocfile_boostrap_ember.js.tmp');
    },

    // iconFont
    // http://css-tricks.com/examples/IconFont/
  },

  install: {
    installFontAwesome: function () {
      if (this.fonts !== 'fontawesome') return;      

      var done = this.async();

      this.npmInstall(['ember-cli-font-awesome'], { 'saveDev': true }, done);      
    },

    installIconFont: function () {
      
    }
  }
});

module.exports = EmberConfigFontsGenerator;


