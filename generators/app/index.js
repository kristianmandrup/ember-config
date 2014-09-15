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
      choices:['script', 'css', 'templating', 'layout', 'test', 'adapter', 'fonts', 'components', 'auth'], 
      default: ['script', 'css', 'templating']
    }];

    this.prompt(prompts, function (props) {
      console.log('props', props);

      this.opts  = props.poisons;

      done();
    }.bind(this));
  },

  writing: {
  },

  end: {
    script: function () {
      this.log('script');
      if (!this.opts.contains('script')) return;
      
      this.composeWith('ember-config:script');
    },
    css: function () {
      this.log('css');
      if (!this.opts.contains('css')) return;
      
      this.composeWith('ember-config:css');
    },
    layout: function () {
      this.log('layout');
      if (!this.opts.contains('layout')) return;
      
      this.composeWith('ember-config:layout');
    },
    templating: function () {
      this.log('templating');
      if (!this.opts.contains('templating')) return;
      
      this.composeWith('ember-config:templating');
    },
    test: function () {
      this.log('test');
      if (!this.opts.contains('test')) return;
      
      this.composeWith('ember-config:test');
    },
    adapter: function () {
      this.log('adapter');
      if (!this.opts.contains('adapter')) return;
      
      this.composeWith('ember-config:adapter');
    },
    fonts: function () {
      this.log('fonts');
      if (!this.opts.contains('fonts')) return;
      
      this.composeWith('ember-config:fonts');
    },
    components: function () {
      this.log('components');
      if (!this.opts.contains('components')) return;
      
      this.composeWith('ember-config:components');
    }        
  }
});

module.exports = EmberConfigGenerator;
