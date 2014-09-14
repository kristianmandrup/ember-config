'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var EmberConfigGenerator = yeoman.generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly setup
    yeoman.generators.Base.apply(this, arguments);


    // For example, the user would run yo generator --test-framework=jasmine to compose with the generator-jasmine

    this.composeWith('ember-config:font', { options: {
      fontawesome: true
    }});
  

  },

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
      choices:['layout', 'script', 'css', 'templating'], 
      default: ['layout', 'script', 'css']
    }];

    this.prompt(prompts, function (props) {
      this.boostrap = props.boostrap;

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

  end: function () {
    this.installDependencies();
  }
});

module.exports = EmberConfigGenerator;
