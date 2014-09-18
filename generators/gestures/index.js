'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require ('../../lib/aid');
var aid, selected;

var EmberConfigGesturesGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.containsSelector(this, 'frameworks');
    this.bowerDir = aid.bowerDir();
  },

  prompting: function () {
    var done = this.async();

    var prompts = [
    {
      type: 'list',
      name: 'framworks',
      message: 'Which gesture frameworks would you like?',
      choices: ['Quo', 'Hammer', 'touchy', 'touch swipe', 'jester', 'thumbs'],
      default: ['Hammer']
    }];

    this.prompt(prompts, function (props) {
      this.framworks    = props.framworks;

      done();
    }.bind(this));
  },

  writing: {
  },

  install: {
  	hammer:  function() {
  		if (!selected('Hammer')) return;          	
  		// this.install('hammer', 'hammerjs');
  		this.installBower('hammer', 'hammerjs');  		

  		this.copy('templates/hammer/hammer-link.js', 'app/views/reopen/hammer-view'); // view  		
  		this.copy('templates/hammer/hammer-swipe.js', 'app/views/reopen/hammer-swipe');
  		this.copy('templates/hammer/hammer-link.js', 'app/views/reopen/hammer-link'); // view
  		this.copy('templates/hammer/hammer-event-dispatcher.js', 'app/events/reopen/hammer-event-dispatcher');

  		aid.info('See http://hammerjs.github.io/');
  	},
  	: 
  	
	quo:  function() {
  		if (!selected('Quo')) return;          	
  		this.install('QuoJS', 'QuoJS');
  		aid.info('See http://quojs.tapquo.com/');
  	},

  	thumbs:  function() {
  		if (!selected('thumbs')) return;          	
  		this.copy('vendor/touchy.js', this.bowerDir + '/thumbs/thumbs.js');
  		aid.info('See http://mwbrooks.github.io/thumbs.js');
  	},
  	touchy: function() {
  		if (!selected('touchy')) return;        
  		this.copy('vendor/touchy.js', this.bowerDir + '/touchy/touchy.js');
  		aid.info('See http://touchyjs.org');
  	},
  	touchSwipe: function() {
		if (!selected('touch swipe')) return;        
  		aid.installBower('Touch Swipe', 'jquery-touchswipe');
  		aid.info('See http://labs.rampinteractive.co.uk/touchSwipe/demos');
  	},  	
    jester: function() {
      	if (!selected('jester')) return;        
		this.copy('vendor/jester.js', this.bowerDir + '/jester/jester.js');
		aid.info('See https://github.com/plainview/Jester');
    },
  },
  end: function () {
  }
});

module.exports = EmberConfigGesturesGenerator;


