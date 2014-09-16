'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var sm = require('string-mutator');
var broc_file = require ('../../lib/broc_file');
require('sugar');

var helper    = require('../../lib/aid');
var sass_file = require('../../lib/sass_file');
var aid;
var selected, cssSelected;

var EmberConfigBootstrapGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected    = aid.containsSelector(this, 'bootstrapFeatures');
    cssSelected = aid.containsSelector(this, 'cssType'); 
    this.brocFileContent = aid.fileContent('Brocfile.js');
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    // TODO: should detect app is using sass and change default!
    var prompts = [{
      type: 'list',
      name: 'cssType',
      message: 'Which styling language for bootstrap would you like?',
      choices: ['less', 'sass'],
      default: ['css']
    }, {
      type: 'checkbox',
      name: 'bootstrapFeatures',
      message: 'Which features of Twitter bootstrap would you like?',
      choices: ['css', 'javascript', 'fonts'],
      default: ['css', 'javascript']
    }];

    this.prompt(prompts, function (props) {
      this.cssType = props.cssType;
      this.bootstrapFeatures = props.bootstrapFeatures;

      done();
    }.bind(this));
  },

  writing: {

    configureBootstrapCss: function () {          
      if (cssSelected('sass')) {
        // http://www.octolabs.com/blogs/octoblog/2014/05/10/ember-cli-broccoli-bootstrap-sass-part-2/
        var sassFileContent = aid.fileContent('app/styles/app.scss');

        var import_sass_bootstrap = "@import 'vendor/bootstrap-sass-official/assets/stylesheets/bootstrap';";
        if (sassFileContent.has(import_sass_bootstrap)) return;

        sass_file.app(function() {
          this.prependTxt(import_sass_bootstrap);
        });
        aid.info('bootstrap for sass configured');
      } else {     
        var css_import = "app.import('bower_components/bootstrap/dist/css/bootstrap.css');";

        if (this.brocFileContent.has(css_import)) return;

        broc_file(function() {
          return this.last('module.exports').prependLine(css_import + '\n');
        }).write();

        aid.info('bootstrap for css configured');
      }            
    },

    configureBootstrapJs: function () {  
      if (!selected('javascript')) return;
      
      var js_import = "app.import('vendor/bootstrap/dist/js/bootstrap.js');";   

      if (this.brocFileContent.has(js_import)) return;

      broc_file(function() {
        return this.last('module.exports').prependLine(js_import + '\n');  
      }).write();
      aid.info('bootstrap js configured');
    },

    // TODO: Move to fonts generator as an option 
    // if bootstrap is detected?

    // http://www.octolabs.com/blogs/octoblog/2014/05/25/bootstrap-glyphicons-with-ember-cli/
    configureBootstrapFonts: function () {    
      if (!selected('fonts')) return;  

      var replaceStr = this.read('merge-bootstrapFonts.js');

      if (this.brocFileContent.has(replaceStr)) return;

      broc_file(function() {
        if (this.result.match('exports = mergeTrees')) {
          return this.last(/module\.exports = mergeTrees\(.*\);/).replaceWithLine(replaceStr + '\n');  
        } else if (this.result.match('exports = app')) {          
          return this.last(/module\.exports = app.toTree\(.*\);/).replaceWithLine(replaceStr + '\n');
        } else {
          throw new Error("No 'valid' module.exports found!");
        }
      }).write();

      // referenced from main Brocfile :)
      this.copy('brocs/bootstrap_fonts.js');
      aid.info('bootstrap font glyphs configured');
    }
  },

  install: {
    installBootstrap: function () {
      if (this.bootstrapFeatures.length == 0) return;

      var bootstrapNpm = cssSelected('sass') ? 'bootstrap-sass-official' : 'bootstrap';

      aid.install(bootstrapNpm);
      aid.success('Bootstrap (' + this.cssType + ') successfully installed with: ' + this.bootstrapFeatures.join(', '))
    }
  },
});

module.exports = EmberConfigBootstrapGenerator;
