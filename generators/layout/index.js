'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var S = require('string');

var EmberConfigLayoutGenerator = yeoman.generators.Base.extend({
  initializing: function () {
  },

  // Choose test framework
  prompting: {
    first: function () {
      var done = this.async();

      var prompts = [{
        type: 'list',
        name: 'layout',
        message: 'Choose your layout framework(s)',
        choices: ['bootstrap', 'foundation', 'ink', 'pure', 'brick', 'gumby', 'other'],
        default: 'bootstrap'
      }];

      this.prompt(prompts, function (props) {
        this.layout = props.layout;

        done();
      }.bind(this));
    },

    second: function () {
      if (!this.layout == 'other') return;

      var prompts = [{
        type: 'list',
        name: 'layout',
        message: 'Choose your layout framework:',
        choices: ['semantic-ui', 'flat-ui', 'ui-kit', 'bootflat' , 'cascade', 'skeleton'],
        default: 'semantic-ui'
      }];  

      this.prompt(prompts, function (props) {
        this.layout = props.layout;

        done();
      }.bind(this));
    }  
    // yo generator:subgenerator section
    // 'use strict';
    // var util = require('util');
    // var yeoman = require('yeoman-generator');
     
    // var SectionGenerator = yeoman.generators.NamedBase.extend({
     
    // });
     
    // module.exports = SectionGenerator;


    // var files = this.expand("app/sections/*.html") 
    // this._.classify
    // this._.chain(files[i]).strRight("_").strLeftBack(".html").humanize().value();

    // this.engine takes a template string as the first parameter and a context object as the second and it will run it through the templating engine and returns the results.

    // this.invoke("onepage:section", {args: ["Demo Section"]}, function(){
    //     done();
    // });

    // semantic-ui
    // <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.12.0/css/semantic.min.css ">   
  }
});

module.exports = EmberConfigLayoutGenerator;
