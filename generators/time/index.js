'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
require('sugar');

var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigTimeGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'time');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'time',
      message: 'Select your time libraries',
      choices: [
        'moment', 
        'moment timezone',
        'date helpers', 
      ],
      default: ['moment']
    }];

    this.prompt(prompts, function (props) {
      this.maps = props.maps;

      done();
    }.bind(this));
  },

  install: {
    time: function () {      
      if (selected('moment'))
        aid.install('moment');  

      if (selected('moment timezone'))
        aid.install('moment-timezone');  
    },
    date: function () {      
      if (selected('date helpers'))          
        aid.install('dates');
    }    
  },

  end: function () {    
  }
});

module.exports = EmberConfigTimeGenerator;

