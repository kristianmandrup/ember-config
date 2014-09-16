'use strict';
var util    = require('util');
var path    = require('path');
var yeoman  = require('yeoman-generator');
var sync    = require('sync');
var fs      = require('fs-extra');
var helper = require ('../../lib/aid');
var aid;
require('sugar');

var pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// TODO: Should use some other way, like reading it via Yeoman User settings
// or some other project config file
var appNamer = function(ctx) {
  return function(name) {
    if (!name) {
      name = pjson.name;
      if (!name)
          throw new Error("Missing name in package.json");
    } 
    ctx.appname = name;
    ctx.appName = ctx._.classify(name);      
  }
}

var setAppName;
var selected;

var EmberConfigScriptGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);    

    selected = aid.eqSelector(this, 'script');
    setAppName = appNamer(this);
    setAppName();
  },
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'appname',
      message: 'Choose your Application namespace',
      choices: ['App', this.appName],
      default: 'App'
    },{
      type: 'list',
      name: 'script',
      message: 'Choose your scripting language:',
      choices: ['javascript', 'coffeescript', 'livescript', 'emberscript'],
      default: 'javascript'
    }];

    this.prompt(prompts, function (props) {
      var calcFileExt = function(scriptName) {
        switch (scriptName) {
          case 'coffeescript': 
            return 'coffee';
          case 'livescript': 
            return 'ls';
          case 'emberscript': 
            return 'em';
          default: 
            return 'js';
        };
      };      

      setAppName(props.appname);
      this.script   = props.script;
      this.fileExt  = calcFileExt(props.script);

      this.appFile    = 'app/app.' + this.fileExt;
      this.routerFile = 'app/router.' + this.fileExt;
      this.scriptFiles = [this.appFile, this.routerFile];

      done();
    }.bind(this));
  },

  writing: {
    removeOldFiles: function() {
      if (aid.allFilesExist(this.scriptFiles)) return;
      aid.thinline();

      aid.bold('Removing old script files');

      aid.removeFiles('app/app.*', aid.excludeOpt(this.appFile));
      aid.removeFiles('app/router.*', aid.excludeOpt(this.routerFile));
    },

    copyFiles: function () {
      if (selected('emberscript')) return;
      if (aid.allFilesExist(this.scriptFiles)) return;

      aid.thinline();
      aid.bold('Adding new script files (' + this.script + ')');

      var app     = aid.fileExists(this.appFile);
      var router  = aid.fileExists(this.routerFile);

      if (!app)
        aid.templateFile('app');
      if (!router) 
        aid.templateFile('router');
    }
  },

  default: {
    uninstallOld: function() {
      this.log('\nAt the moment Ember CLI (0.0.44) does not support multiple js preprocessors (i.e. you will not be able to use coffeescript and livescript addons at the same time). The patch that adds this functionality is to be added into one of the future versions.');
      aid.thinline();
      if (!aid.hasAnyNpm(['ember-cli-coffeescript', 'ember-cli-livescript', 'broccoli-ember-script'])) {
        aid.info("no other script compilers present :)\n");
        return;
      }
        
      aid.bold("Uninstalling other script precompilers");

      var uninstallScript = function(name, compiler) {
        if (self.script !== name)
          aid.uninstall(name, compiler);
      };

      sync(function(){
        uninstallScript('coffeescript');        
        uninstallScript('livescript');      
        uninstallScript('emberscript', 'broccoli-ember-script');
      });
    }
  },
  install: {
    installNew: function () {
      var self = this;

      var installScript = function(name, compiler) {
        if (self.script == name)
          aid.install(name, compiler);
      };

      aid.bold("Installing chosen precompiler");
      sync(function(){
        installScript('coffeescript');
        installScript('livescript');
        installScript('emberscript', 'broccoli-ember-script');
      });
    }
  },
  end: {
    scriptInfoMessage: function() {
      aid.thinline();
      switch (this.script) {
        case 'emberscript':
          this.log('See: https://github.com/ghempton/ember-script/');
          this.log('Emberscript editor support:');
          this.log('https://github.com/asux/sublime-ember-script');
          this.log('* Please donate to or help with EmberScript to advance the project *');
          break;
        case 'livescript':
          this.log('See: livescript.net');
          break;
        case 'coffeescript':
          this.log('See: coffescript.org and coffeescriptlove.com');
      }
    },
    writeSuccess: function() {
      aid.success('Successfully installed ' + this.script + ' precompiler :)')
    }
  }
});

module.exports = EmberConfigScriptGenerator;
