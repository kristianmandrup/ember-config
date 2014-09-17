// http://gumbyframework.com/docs/#!/
// http://gumbyframework.com/docs/claymate/

// https://github.com/GumbyFramework/Gumby/blob/master/bower.json

// http://stackoverflow.com/questions/23351792/dynamic-navigation-bar-in-ember

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var broc_file = require ('../../lib/broc_file');
// var sass_file = require('../../lib/sass_file');
require('sugar');

var helper    = require('../../lib/aid');
var aid;

var EmberConfigGumbyGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    this.brocFileContent = aid.fileContent('Brocfile.js');
    this.bowerDir = aid.bowerDir();
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    // TODO: should detect is compass is already installed in project!
    var prompts = [{
      type: 'confirm',
      name: 'compass',
      message: 'Gumby requires Compass (SASS). Do you want to install Compass?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.compass = props.compass;

      done();
    }.bind(this));
  },

  // https://github.com/Semantic-Org/Semantic-UI/blob/master/bower.json
  writing: {
    configureCss: function () {          
      var css_import = "app.import('" + this.bowerDir + "/gumby/css/gumby.css');";

      if (this.brocFileContent.has(css_import)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(css_import + '\n');
      }).write();

      aid.info('Gumby css configured');
    },

    configureJs: function () {  
      // if (!selected('javascript')) return;
      
      var js_import = "app.import('" + this.bowerDir + "/gumby/js/libs/gumby.min.js');";   

      if (this.brocFileContent.has(js_import)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(js_import + '\n');  
      }).write();
      aid.info('Gumby js configured');
    }
  },
  default: function() {
  },

  install: {
    installGumpy: function () {
      aid.installBower('gumby');

    },
    installCompass: function () {      
      if (this.compass) {
        aid.bold('Please install compass via the CSS generator...');
        this.composeWith('ember-config:css');
      }       
    }    
  },
  end: function() {
    aid.success('Gumby successfully installed :)');    
    aid.thickline();
    aid.info('http://gumbyframework.com/docs/#!/');
    // aid.thinline();
    // aid.info('For some Ember Gumby tips, see:');
    // this.log('http://stackoverflow.com/questions/23351792/dynamic-navigation-bar-in-ember');
  }
});

module.exports = EmberConfigGumbyGenerator;



