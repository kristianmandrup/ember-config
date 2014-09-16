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

var prependFile = function(fileName, prependTxt) {
  var content = readFile(fileName);
  writeFile(fileName, prependTxt.concat(prependTxt));
}

// TODO: Somehow check if app is using SASS
var usingSass = function (ctx) {
  true;
}

var EmberConfigBootstrapGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected    = aid.containsSelector(this, 'bootstrapFeatures');
    cssSelected = aid.containsSelector(this, 'cssType'); 
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
        sass_file.app(function() {
          this.prependTxt("@import 'vendor/bootstrap-sass-official/assets/stylesheets/bootstrap';");
        });
        aid.info('bootstrap for sass configured');
      } else {     
        var css_import = "app.import('bower_components/bootstrap/dist/css/bootstrap.css');\n";

        broc_file(function() {
          return this.before('module.exports').prependTxt(css_import);
        }).write();

        aid.info('bootstrap for css configured');
      }            
    },

    configureBootstrapJs: function () {  
      if (!selected('javascript')) return;
      
      var js_import = "app.import('vendor/bootstrap/dist/js/bootstrap.js');";   
      broc_file(function() {
        return this.before('module.exports').prependTxt(js_import);  
      }).write();
      aid.info('bootstrap js configured');
    },

    // TODO: Move to fonts generator as an option 
    // if bootstrap is detected?

    // http://www.octolabs.com/blogs/octoblog/2014/05/25/bootstrap-glyphicons-with-ember-cli/
    configureBootstrapFonts: function () {    
      if (!selected('fonts')) return;  

      var replaceStr = aid.fileContent('/templates/merge-bootstrapFonts.js');

      broc_file(function() {
        return this.last(/module\.exports = mergeTrees\(.*\);/).replaceWith(replaceStr);  
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
