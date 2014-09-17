'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var broc_file = require ('../../lib/broc_file');
// var sass_file = require('../../lib/sass_file');
require('sugar');

var helper = require('../../lib/aid');
var aid;
var selected;

var EmberConfigSemanticUIGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    this.brocFileContent = aid.fileContent('Brocfile.js');
    // selected = aid.eqSelector(this, 'features');
  },

  prompting: function () {
    console.log('semantic ui - fully automatic!')
  },

  // https://github.com/Semantic-Org/Semantic-UI/blob/master/bower.json
  writing: {
    configureCss: function () {          
      var css_import = "app.import('bower_components/semantic/build/packaged/css/semantic.css');";

      if (this.brocFileContent.has(css_import)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(css_import + '\n');
      }).write();

      aid.info('semantic-ui css configured');
    },

    configureJs: function () {  
      // if (!selected('javascript')) return;
      
      var js_import = "app.import('bower_components/semantic/build/packaged/javascript/semantic.js');";   

      if (this.brocFileContent.has(js_import)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(js_import + '\n');  
      }).write();
      aid.info('semantic-ui js configured');
    }
  },
  default: function() {
    aid.info('For some Ember tips, see:');
    this.log('Sample Ember app with semantic-ui: https://github.com/apsure/semantic-ui-for-ember');
    this.log('Also see: http://stackoverflow.com/questions/22263886/is-anyone-using-semantic-ui-with-emberjs');
  },

  install: {
    installBootstrap: function () {
      aid.installBower('semantic');
    }
  },

  end: function() {
    aid.success('Semantic-ui successfully installed :)');    
  }
});

module.exports = EmberConfigSemanticUIGenerator;



