'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
require('sugar');

var helper    = require('../../lib/aid');
var aid;
var selected, cssSelected;

var EmberConfigBootstrapGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected    = aid.containsSelector(this, 'features');
    cssSelected = aid.eqSelector(this, 'cssType'); 
    this.brocFileContent = aid.fileContent('Brocfile.js');
    this.bowerDir = aid.bowerDir();
  },

  // Choose test framework
  prompting: {
    features: function () {
      var done = this.async();

      // TODO: should detect app is using sass and change default!
      var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'Which features of Twitter bootstrap would you like?',
        choices: ['stylesheets', 'javascript', 'fonts'],
        default: ['stylesheets', 'javascript']
      }];

      this.prompt(prompts, function (props) {
        this.features = props.features;

        done();
      }.bind(this));
    },

    stylesheets: function () {
      if (!selected('stylesheets')) return;

      var done = this.async();

      // TODO: should detect app is using sass and change default!
      var prompts = [{
        type: 'list',
        name: 'cssType',
        message: 'Which styling language for bootstrap would you like?',
        choices: ['css', 'sass'],
        default: 'css'
      }];

      this.prompt(prompts, function (props) {
        this.cssType = props.cssType;

        done();
      }.bind(this));
    }    
  },

  writing: {
    configureWithSass: function () {          
      if (!cssSelected('sass')) return;

      this.sassImport('bootstrap', 'bootstrap');
    },
    configureCss: function () {                
      if (cssSelected('sass')) return;

      aid.installComponent('bootstrap', 'bootstrap/dist/css/bootstrap.css', 'css');
    },

    configureJs: function () {  
      if (!selected('javascript')) return;
      
      aid.installComponent('bootstrap', 'bootstrap/dist/js/bootstrap.js');
    },

    // TODO: Move to fonts generator as an option 
    // if bootstrap is detected?

    // http://www.octolabs.com/blogs/octoblog/2014/05/25/bootstrap-glyphicons-with-ember-cli/
    configureFonts: function () {    
      if (!selected('fonts')) return;  

      var replaceStr = this.read('merge-bootstrapFonts.js');

      if (this.brocFileContent.has(replaceStr)) return;

      aid.brocFile(function() {
        if (this.result.match('exports = mergeTrees')) {
          return this.last(/module\.exports = mergeTrees\(.*\);/).replaceWith(replaceStr + '\n');  
        } else if (this.result.match('exports = app')) {          
          return this.last(/module\.exports = app.toTree\(.*\);/).replaceWith(replaceStr + '\n');
        } else {
          throw new Error("No 'valid' module.exports found!");
        }
      }).write();

      // referenced from main Brocfile :)
      this.template('brocs/bootstrap_fonts.js');
      aid.info('Bootstrap Font glyphs configured');
    }
  },

  install: {
    installBootstrap: function () {
      if (this.features.length == 0) return;

      var bootstrapNpm = cssSelected('sass') ? 'bootstrap-sass-official' : 'bootstrap';

      aid.install(bootstrapNpm);
      aid.success('Bootstrap (' + this.cssType + ') successfully installed with: ' + this.features.join(', '))
    }
  },
});

module.exports = EmberConfigBootstrapGenerator;
