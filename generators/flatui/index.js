// https://github.com/designmodo/Flat-UI/blob/master/bower.json
// css
// "less/flat-ui.less",
// "dist/css/flat-ui.css",

// js
// "dist/js/flat-ui.js",
// fonts
// "dist/fonts/flat-ui-icons-regular.eot",
// "dist/fonts/flat-ui-icons-regular.svg",
// "dist/fonts/flat-ui-icons-regular.ttf",
// "dist/fonts/flat-ui-icons-regular.woff"

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var broc_file = require ('../../lib/broc_file');
var less_file = require('../../lib/less_file');
require('sugar');

var helper    = require('../../lib/aid');
var aid;
var selected;

var EmberConfigFlatUIGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    this.brocFileContent = aid.fileContent('Brocfile.js');

    // selected = aid.eqSelector(this, 'features');
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    // TODO: should detect is less is already installed in project!
    var prompts = [{
      type: 'confirm',
      name: 'less',
      message: 'Do you want install the Less (CSS) version?',
      default: false
    }];

    // TODO: add features prompt?

    this.prompt(prompts, function (props) {
      this.less = props.less;

      done();
    }.bind(this));
  },


  writing: {
    configureWithLess: function () {          
      if (!this.less) return;

      var lessFileContent = aid.fileContent('app/styles/app.less');

      var import_less = "@import 'bower_components/flat-ui/dist/css/flat-ui.less';";
      if (lessFileContent.has(import_less)) return;

      less_file.app(function() {
        this.prependTxt(import_less);
      });
      aid.info('Flat UI for LESS configured');
    },    
    configureCss: function () {          
      if (this.less) return;

      var css_import = "app.import('bower_components/flat-ui/dist/css/flat-ui.css');";

      if (this.brocFileContent.has(css_import)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(css_import + '\n');
      }).write();

      aid.info('Flat UI for CSS configured');
    },

    configureJs: function () {  
      // if (!selected('javascript')) return;
      
      var js_import = "app.import('bower_components/flat-ui/dist/js/flat-ui.js');";   

      if (this.brocFileContent.has(js_import)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(js_import + '\n');  
      }).write();
      aid.info('Flat UI javascript configured');
    },

    // dist/fonts/flat-ui-icons-regular    
    configureFonts: function () {    
      // if (!selected('fonts')) return;  

      var replaceStr = this.read('merge-flat-uiFonts.js');

      if (this.brocFileContent.has(replaceStr)) return;

      broc_file(function() {
        if (this.result.match('exports = mergeTrees')) {
          return this.last(/module\.exports = mergeTrees\(.*\);/).replaceWith(replaceStr + '\n');  
        } else if (this.result.match('exports = app')) {          
          return this.last(/module\.exports = app.toTree\(.*\);/).replaceWith(replaceStr + '\n');
        } else {
          throw new Error("No 'valid' module.exports found!");
        }
      }).write();

      // referenced from main Brocfile :)
      this.copy('brocs/flat-ui_fonts.js');
      aid.info('Flat UI font glyphs configured');
    }    
  },
  install: {
    installFlat: function () {
      aid.installBower('flat-ui');
      aid.info('https://github.com/designmodo/Flat-UI');
      aid.success('Flat-UI successfully installed :)');
    },
    installCompass: function () {      
      if (this.less) {
        aid.bold('Please install Less via the CSS generator...');
        this.composeWith('ember-config:css');
      }       
    }    
  },
});

module.exports = EmberConfigFlatUIGenerator;