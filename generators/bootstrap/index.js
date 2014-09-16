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

var usingSass = function (ctx) {
  return (ctx.css).has('sass');
}

var EmberConfigBootstrapGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.brocfileContent = readFile('Brocfile.js');
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
      name: 'parts',
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
    // TODO: Find example of correct full installation of bootstrap
    // better as a separate ember-cli or similar

    configureBootstrapCss: function () {          
      if (usingSass(this)) {
        sass_file.app(function() {
          this.prependTxt("@import 'vendor/bootstrap-sass-official/assets/stylesheets/bootstrap';");
        })
      } else {     
        var js_import = "app.import('vendor/bootstrap/dist/js/bootstrap.js');";   
        var css_import = "app.import('bower_components/bootstrap/dist/css/bootstrap.css');\n";
        broc_file(function() {
          this.before('module.exports').prepend(app_import);  
      }            
    },
    configureBootstrapJs: function () {    
      var appFile = findFile('app/app.*');
      if (!appFile) return;

      prependScript(appFile, '/bower_components/bootstrap/js/bootstrap.js')
    },
    // http://www.octolabs.com/blogs/octoblog/2014/05/25/bootstrap-glyphicons-with-ember-cli/
    configureBootstrapFonts: function () {    
      first('module.exports = mergeTrees(app.toTree());').remove();
      var replaceStr = fileContent('/templates/Brocfile_compileBootstrapFonts.js');
      first().append('Brocfile.js', replaceStr, {force: true});
    },
  },

  install: {
    installBootstrap: function () {
      // if bootstrap
      if (this.layout.indexOf('bootstrap') == -1) return;
      var bowerSass = usingSass(this) ? 'bootstrap-sass-official' : 'bootstrap';
      var done = this.async();
      this.bowerInstall(['bootstrap-sass-official'], { 'saveDev': true }, done);
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = EmberConfigBootstrapGenerator;
