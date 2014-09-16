'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var sm = require('string-mutator');
require('sugar');

var helper    = require('../../lib/aid');
var sass_file = require('../../lib/sass_file');
var aid;

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
      default: 'css'
    }, {
      type: 'checkbox',
      name: 'bootstrapFeatures',
      message: 'Which features of Twitter bootstrap would you like?',
      choices: ['css', 'javascript', 'fonts'],
      default: ['css', 'javascript']
    }];

    this.prompt(prompts, function (props) {
      this.parts = props.parts;

      done();
    }.bind(this));
  },

  writing: {

    configureBootstrapCss: function () {          
      if (!contains(this.bootstrapFeatures, 'css')) return;

      if (usingSass()) {
        // http://www.octolabs.com/blogs/octoblog/2014/05/10/ember-cli-broccoli-bootstrap-sass-part-2/
        sass_file.app(function() {
          this.prependTxt("@import 'vendor/bootstrap-sass-official/assets/stylesheets/bootstrap';");
        })
      } else {     
        var css_import = "app.import('bower_components/bootstrap/dist/css/bootstrap.css');\n";
        broc_file(function() {
          this.before('module.exports').prepend(css_import);  
        }
      }            
    },

    configureBootstrapJs: function () {  
      if (!contains(this.bootstrapFeatures, 'javascript')) return;
      
      var js_import = "app.import('vendor/bootstrap/dist/js/bootstrap.js');";   
      broc_file(function() {
        this.before('module.exports').prepend(js_import);  
      }
    },

    // TODO: Move to fonts generator as an option 
    // if bootstrap is detected?

    // http://www.octolabs.com/blogs/octoblog/2014/05/25/bootstrap-glyphicons-with-ember-cli/
    configureBootstrapFonts: function () {    
      if (!contains(this.bootstrapFeatures, 'fonts')) return;  

      var replaceStr = aid.fileContent('/templates/merge-bootstrapFonts.js');

      broc_file(function() {
        this.last(/module\.exports = mergeTrees\(.*\);/).replaceWith(replaceStr);  
      }

      // referenced from main Brocfile :)
      this.copy('brocs/bootstrap_fonts.js');
    }
  },

  install: {
    installBootstrap: function () {
      if (!contains(this.layout, 'bootstrap')) return;

      var bootstrapNpm = usingSass() ? 'bootstrap-sass-official' : 'bootstrap';
      aid.install(bootstrapNpm);
    }
  },

  end: function () {
  }
});

module.exports = EmberConfigBootstrapGenerator;
