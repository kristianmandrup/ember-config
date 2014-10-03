'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigFamousGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'famous');
  },

  prompting: function () {
  }

  // prompting: function () {
  //   var done = this.async();

  //   var prompts = [{
  //     type: 'checkbox',
  //     name: 'time',
  //     message: 'Select your famous components (coming)',
  //     choices: [
  //       'all'
  //     ],
  //     default: ['all']
  //   }];

  //   this.prompt(prompts, function (props) {
  //     this.famous = props.famous;

  //     done();
  //   }.bind(this));
  // },

  writing: {
    app: function() {
      aid.info('Installing Hafem famous library for Ember...')

      this.bulkDirectory('vendor/famous');
      this.bulkDirectory('app/utils');

      this.directory('app/mixins');      
      this.directory('app/templates');      
      this.directory('app/views');      
    },

    brocFile: function () {  
      if (!selected('javascript')) return;
      
      // app.import('vendor/famous/polyfills.js');
      // app.import('vendor/famous/famous.js');
      // app.import('vendor/famous/famous.css');
      var self = this;

      ['famous.js', 'polyfills.js', 'famous.css'].forEach(function (file) {
        var jsImport= "app.import('" + self.bowerDir + "/vendor/famous/" + file + ".js');";   

        if (self.brocFileContent.has(jsImport)) return;

        brocFile(function() {
          return self.last('module.exports').prepend(jsImport + '\n');  
        }).write();        
      })

      aid.info('Brocfile configured to load famous vendor assets ;)');
    },
  },    

  install: {
    famous: function () {      
      //if (selected('all')) {
        //aid.installBower('famous', 'famous')
        //aid.installBower('famous-polyfills', 'famous-polyfills')
      }
    }
  },

  end: function () {    
    aid.success("Congratulations! You have now Installed the Hafem library for Famo.us integration with Ember :)");

    aid.log("Please see the generated Readme file: 'Hafem-Famous.md' for more info and setup instructions");

    aid.log('See https://github.com/kristianmandrup/hafem for sample app and instructions...');
    aid.info("Time to play...");    
  }
});

module.exports = EmberConfigFamousGenerator;

