'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

Array.prototype.contains = function ( needle ) {
   for (var i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}

var EmberConfigGenerator = yeoman.generators.Base.extend({
  initializing: function () {
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to Ember Configurator'
    ));

    var prompts = [{
      type: 'checkbox',
      name: 'poisons',
      message: 'Select configurations',
      choices:['layout', 'script', 'css', 'templating', 'test', 'fonts', 'components', 'adapter', 'auth'], 
      default: ['layout', 'script', 'css']
    }];

    this.prompt(prompts, function (props) {
      console.log('props', props);

      this.opts  = props.poisons;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      // this.dest.mkdir('app');
      // this.dest.mkdir('app/templates');

      // this.src.copy('_package.json', 'package.json');
      // this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      // this.src.copy('editorconfig', '.editorconfig');
      // this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: {
    fonts: function () {
      this.log('fonts');
      if (!this.opts.contains('fonts')) return;
      
      this.composeWith('ember-config:fonts');
    },
    layout: function () {
      this.log('layout');
      if (!this.opts.contains('layout')) return;
      
      this.composeWith('ember-config:layout');
    },
    css: function () {
      this.log('css');
      if (!this.opts.contains('css')) return;
      
      this.composeWith('ember-config:css');
    },
    adapter: function () {
      this.log('adapter');
      if (!this.opts.contains('adapter')) return;
      
      this.composeWith('ember-config:adapter');
    },
    templating: function () {
      this.log('templating');
      if (!this.opts.contains('templating')) return;
      
      this.composeWith('ember-config:templating');
    },
    script: function () {
      this.log('script');
      if (!this.opts.contains('script')) return;
      
      this.composeWith('ember-config:script');
    }
  }
});

module.exports = EmberConfigGenerator;
