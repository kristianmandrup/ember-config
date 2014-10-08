var chalk   = require('chalk');
var fs      = require('fs-extra');
// var path    = require('path');
require('sugar');
var bowerDir = require('bower-directory').sync;

// TODO: Clean up!!!
module.exports = function(ctx) {
  return {
    displayInfo: function(choices, info, links) {
      var self = this;
      choices.forEach(function (choice) {
        self.info(choice + ':' + info[choice] + ', see ' + links[choice]);
      });
    },
    displayLinks: function(links, selected) {
      var self = this;
      Object.keys(links).forEach(function (key) {
        if (selected(key))
          self.info(key + ':' + links[key]);
      });
    },
    bowerDir: function(opts) {
      return bowerDir(opts).substring(process.cwd().length + 1);
    },
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
    yesSelector: function(ctx, optName) {
      return function() {
        return ctx[optName] === true;    
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

    brocFileContent: function() {
      return this.fileContent('Brocfile.js');
    },
    sassFileContent: function() {
      return this.fileContent('app/styles/app.scss')
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
    log: function(txt) {
      ctx.log(txt);
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
    blueprint: function(name, options) {
      options = options || [];
      var opts = [name].concat(options);
      this.generate('ember', opts);
    },
    generate: function(name, options) {
      var cmArgs = ['generate'];
      options = options || []
      cmArgs = cmArgs.concat(options);
      this.bold('Generate: ' + name + ' ' + cmArgs.join(' '));
      ctx.spawnCommand(name, cmArgs);
    },
    // TODO: implement!
    hasGlobalBinary: function(bin) {
      return false;
    },

    brocFile: require ('../../lib/broc_file'),
    sassFile: require('../../lib/sass_file'),

    bowerImport: function (name, path) {
      var jsImport= "app.import('" + this.bowerDir + '/' + path + ");";

      if (this.brocFileContent().has(jsImport)) return;

      this.brocFile(function() {
          return this.last('module.exports').prepend(jsImport + '\n');
      }).write();
      this.info('Brocfile.js now imports ' + name + ' into app');
    },

    sassImport: function(name, path) {
      var importSass = "@import '" + this.bowerDir + '/' + path + "'";
      if (this.sassFileContent().has(importSass)) return;

      this.sassFile().app(function() {
        this.prependTxt(importSass);
      });
      this.info('Application SASS stylesheet configured to import ' + name);
    },

    // always installs it into Brocfile as well
    // TODO: In the future, install into libraries registry
    installComponent: function(name, path, options) {
      options = options || {};
      var alias = options.alias || name;
      var noImport =  options.noImport;

      if (this.hasBower(name)) {
        this.actionInfo('identical', name);
        return;
      }

      this.bold('Installing bower ' + alias);
      ctx.bowerInstall([name], { 'saveDev': true }, ctx.async());
      if (!noImport)
        this.bowerImport(name, path)
    },

    installNpm: function(name) {
      this.install(name, name);  
    },
    installGlobalNpmBin: function(bin) {
      var options = { 'g': true };

      if (this.hasGlobalBinary(bin)) {
        this.actionInfo('identical', bin);
        return;
      }

      this.bold('Installing global npm ' + bin);
      ctx.npmInstall([bin], options, ctx.async());        
    },

    installGlobal: function(alias, name, options) {
      var defOpts = { 'g': true };
      options = options || defOpts

      this.bold('Installing global npm: ' + alias);
      ctx.npmInstall([name], options, ctx.async());
    },

    install: function(alias, name, options) {
      var defOpts = { 'saveDev': true };
      options = options || defOpts
      name = name || 'ember-cli-'.concat(alias);

      if (this.hasNpm(name)) {
        this.actionInfo('identical', name);
        return;
      }

      this.bold('Installing npm: ' + alias);
      ctx.npmInstall([name], options, ctx.async());        
    },

    uninstallNpm: function(name) {
      this.uninstall(name, name);  
    },
    uninstall: function(alias, name) {
      name = name || 'ember-cli-'.concat(alias);
      if (!this.hasNpm(name)) return;
      ctx.spawnCommand('npm', ['uninstall', name]);        
    },
    // TODO: uninstall bower?

    templateFile: function(name) {
      var fileName = name + '.' + ctx.fileExt;
      var templateFile = ctx.script + '/' + fileName;
      var targetFile = 'app/' + fileName;
      ctx.template(templateFile, targetFile);
    }
  }
}