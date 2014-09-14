'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var S = require('string');
var sm = require('string-mutator');

var readFile = function(fileName) {
  return fs.readSync(fileName, 'utf8');
}

var writeFile = function(fileName) {
  return fs.writeSync(fileName, 'utf8');
}

var prependFile = function(fileName, prependTxt) {
  var content = readFile(fileName);
  writeFile(fileName, prependTxt.concat(prependTxt));
}

var usingSass = function (ctx) {
  return S(ctx.css).include('sass');
}

var EmberConfigBootstrapGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.brocfileContent = readFile('Brocfile.js');
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    var prompts = [{
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
      // add to app.scss
      var appSassFile = 'app/styles/app.scss';

      if (usingSass(this)) {
        var prependLine = "@import '/bower_components/bootstrap/css/bootstrap.css'\n";
        prependFile(appSassFile, prependLine);  
      } else {        
        var importLine = "app.import('bower_components/bootstrap/dist/css/bootstrap.css');\n";
        sm.first(/module\.exports/).prepend(importLine, this.brocfileContent);  
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


