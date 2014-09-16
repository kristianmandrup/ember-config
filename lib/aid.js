var chalk   = require('chalk');
var fs      = require('fs-extra');
// var path    = require('path');
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
        return self.contains(ctx[optName], choice);    
      }
    },
    matchSelector: function(ctx, optName) {
      return function(choice) {
        return ctx[optName].match(choice);    
      }
    },
    eqSelector: function(ctx, optName) {
      return function(choice) {
        return ctx[optName] === choice;    
      }
    },
    anySelector: function(ctx, optName, fun) {
      return function(choices) {
        return choices.any(function(choice) {
          return fun(choice);
        });
      }
    },
    // also used for folderExists check
    fileExists: function(path) {
      try {
        fs.realpathSync(path);
        return true;
      } catch (e) {
        return false;
      }      
    },
    allFilesExist: function(paths) {
      var self = this;
      return paths.all(function(path) {
        return self.fileExists(path);
      });
    },

    fileContent: function(path) {
      return String(fs.readFileSync(path));
    },

    hasNpm: function(name) {
      var pkgPath = 'node_modules/' + name;
      return fs.existsSync(pkgPath);
    },
    hasAnyNpm: function(names) {
      var self = this;
      return names.any(function (name) { 
        return self.hasNpm(name) 
      });
    },

    hasBower: function(name) {
      var pkgPath = 'bower_components/' + name;
      return fs.existsSync(pkgPath);
    },
    hasAnyBower: function(names) {
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
    excludeOpt: function(path) {
      return {exclude: [path]};
    },
    removeFiles: function(pattern, options) {
      options = options || {};
      var excludeList = options.exclude;
      var files = ctx.expand(pattern);
      var self = this;
      files.slice(0).forEach(function(file) {
        if (!self.contains(excludeList, file))
          self.action('remove', file);
      })
        
      files.forEach(function(file) {
        if (!self.contains(excludeList, file))        
          fs.remove(file, function(err){
            if (err) return console.error(err);
          });
      });
    },

    generate: function(name, args) {
      ctx.spawnCommand(name, ['generate'].push(args));
    },

    installBow: function(scriptName, compilerName) {
      compilerName = compilerName || 'ember-cli-'.concat(scriptName);

      if (this.hasBower(compilerName)) {
        this.actionInfo('identical', compilerName);
        return;
      }

      this.bold('Installing bower ' + scriptName);
      ctx.bowerInstall([compilerName], { 'saveDev': true }, ctx.async());        
    },

    install: function(scriptName, compilerName) {
      compilerName = compilerName || 'ember-cli-'.concat(scriptName);

      if (this.hasNpm(compilerName)) {
        this.actionInfo('identical', compilerName);
        return;
      }

      this.bold('Installing npm ' + scriptName);
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