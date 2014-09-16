var chalk   = require('chalk');
var fs      = require('fs-extra');
require('sugar')

module.exports = function(ctx) {
  return {
    contains: function (list,  needle ) {
       for (var i in list) {
           if (list[i] == needle) return true;
       }
       return false;
    },
    containsSelector: function(ctx, optName) {
      var self = this;
      return function(choice) {
        self.contains(ctx[optName], choice);    
      }
    },
    matchSelector: function(ctx, optName) {
      return function(choice) {
        ctx[optName].match(choice);    
      }
    },
    eqSelector: function(ctx, optName) {
      return function(choice) {
        ctx[optName] === choice;    
      }
    },

    fileContent: function(path) {
      return String(fs.readFileSync(path));
    },
    hasNpm: function(name) {
      var pkgPath = 'node_modules/' + name;
      // console.log('npm exist: ' + pkgPath)
      return fs.existsSync(pkgPath);
    },
    hasAnyNpm: function(names) {
      var self = this;
      return names.any(function (name) { 
        return self.hasNpm(name) 
      });
    },
    thinline: function() {
      ctx.log('------------------------------------------------------');      
    },
    thickline: function() {
      ctx.log('======================================================');      
    },
    bold: function(txt) {
      ctx.log(chalk.bold(txt));
    },
    green: function(txt) {
      ctx.log(chalk.green(txt));
    },
    info: function(txt) {
      ctx.log(chalk.cyan(txt));
    },
    warning: function(txt) {
      ctx.log(chalk.yellow(txt));
    },
    error: function(txt) {
      ctx.log(chalk.red(txt));
    },
    success: function(txt) {
      this.thickline();
      ctx.log(chalk.bold.green("\n" + txt));
    },
    action: function(name, desc) {
      ctx.log(chalk.green('   ' + name) + ' ' + desc);
    },
    actionInfo: function(name, desc) {
      ctx.log(chalk.cyan('   ' + name) + ' ' + desc);
    },
    removeFiles: function(pattern) {
      var files = ctx.expand(pattern);
      var self = this;
      files.slice(0).forEach(function(file) {
        self.action('remove', file);
      })
        
      files.forEach(function(file) {
        fs.remove(file, function(err){
          if (err) return console.error(err);
        });
      });
    },

    install: function(scriptName, compilerName) {
      compilerName = compilerName || 'ember-cli-'.concat(scriptName);

      if (this.hasNpm(compilerName)) {
        this.actionInfo('identical', compilerName);
        return;
      }

      this.bold('Installing ' + scriptName);
      ctx.npmInstall([compilerName], { 'saveDev': true }, ctx.async());        
    },
    uninstall: function(scriptName, compilerName) {
      compilerName = compilerName || 'ember-cli-'.concat(scriptName);
      if (!this.hasNpm(compilerName)) return;
      ctx.spawnCommand('npm', ['uninstall', compilerName]);        
    },
    templateFile: function(name) {
      var fileName = name + '.' + ctx.fileExt;
      var templateFile = ctx.script + '/' + fileName;
      var targetFile = 'app/' + fileName;
      ctx.template(templateFile, targetFile);
    }
  }
}