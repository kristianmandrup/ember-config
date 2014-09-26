// http://nytimes.github.io/pourover/

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var brocFile = require ('../../lib/broc_file');
var aid;
var selected;

var EmberConfigLibsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'libs');
    this.brocFileContent = aid.fileContent('Brocfile.js');
    this.bowerDir = aid.bowerDir();    
  },

  prompting: function () {
    var done = this.async();

    // TODO: add list of test frameworks to choose from when available...
    var prompts = [{
      type: 'checkbox',
      name: 'libs',
      message: 'Which libraries would you like to include?',
      // Waiting for npm/bower : https://github.com/NYTimes/pourover/pull/38
      choices: ['pour over', 'sugar'],
      default: ['sugar']
    }];

    this.prompt(prompts, function (props) {
      this.libs    = props.libs;

      done();
    }.bind(this));
  },

  writing: {
  },

  install: {
    pourover: function() {
      if (!selected('pour over')) return;
        aid.install('pour over', 'git://github.com/NYTimes/pourover.git');
    },
    sugar: function() {
      if (!selected('sugar')) return;

      aid.installBow('sugar', 'sugar');

      var jsImport = "app.import('" + this.bowerDir + "/sugar/release/sugar.min.js');";   

      if (this.brocFileContent.has(jsImport)) return;

      brocFile(function() {
        return this.last('module.exports').prepend(jsImport + '\n');  
      }).write();

      aid.info('Sugar.js configured');
    }
  }
  end: function() {
    aid.info('Please add more useful libs to the mix ;)')
  }
});

module.exports = EmberConfigLibsGenerator;
