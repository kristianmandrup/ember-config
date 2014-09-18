'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require('../../lib/aid');
var sassFile = require('../../lib/sass_file');
var broc_file = require ('../../lib/broc_file');
require('sugar');

var aid, selected;

var EmberConfigRatchetGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    this.brocFileContent = aid.fileContent('Brocfile.js');
    this.bowerDir = aid.bowerDir();
    selected = aid.containsSelector(this, 'features');
  },

  prompting: function () {
    var done = this.async();

    // TODO: determine if app uses SASS
    var prompts = [{
      type: 'confirm',
      name: 'sass',
      message: 'Install Ratchet for SASS?',
      default: true
    }, {
      type: 'list',
      name: 'features',
      message: 'Which extra Ratchet features would you like?',
      choices: ['javascript', 'fonts'],
      default: ['javascript', 'fonts']
    }];

    this.prompt(prompts, function (props) {
      this.sass   	= props.sass;
      this.features = props.features;

      done();
    }.bind(this));
  },

  writing: {
  	sassImport: function() {
		if (!this.sass) return;

		// http://www.octolabs.com/blogs/octoblog/2014/05/10/ember-cli-broccoli-bootstrap-sass-part-2/
		var sassFileContent = aid.fileContent('app/styles/app.scss');

		var sassImport = "@import '" + this.bowerDir + "ratchet/sass/ratchet'";
		if (sassFileContent.has(sassImport)) return;

		sassFile.app(function() {
			this.prependTxt(sassImport);
		});
		aid.green('Ratchet with SASS configured');  		
  	},
  	cssImport: function()  {
		if (this.sass) return;

		var cssImport = "app.import('" + this.bowerDir + "/bootstrap/dist/css/bootstrap.css')";

		if (this.brocFileContent.has(css_import)) return;

		broc_file(function() {
		return this.last('module.exports').prepend(css_import + '\n');
		}).write();

		aid.info('Bootstrap for CSS configured');
  	},
  	configureJs: function() {
  		if (!selected('javascript')) return;

    	var ratchetJsImport = "require('./brocs/ratchet-imports')(app);";   
	 	
		if (this.brocFileContent.has(ratchetJsImport)) return;
		
		this.copy('brocs/ratchet-imports.js');

		broc_file(function() {
			return this.last('module.exports').prepend(ratchetJsImport);  
		}).write();
		aid.info('Ratchet javascript configured');  		
  	},

  	configureFonts: function() {
		if (!selected('fonts')) return;

  		var ratchetFontsTree = "var ratchetFontsTree = require('./brocs/ratchet-fonts')(app);";   

		if (this.brocFileContent.has(ratchetFonts)) return;		

		broc_file(function() {
			return this.last('module.exports').prepend(ratchetBrocCode);  
		}).write();

		if (this.brocFileContent.has(exportTrees)) return;
		var exportTrees = "module.exports = mergeTrees(app.toTree(), ratchetFontsTree);"

		broc_file(function() {
		if (this.result.match('exports = mergeTrees')) {
		  return this.last(/module\.exports = mergeTrees\(.*\);/).replaceWith(exportTrees + '\n');  
		} else if (this.result.match('exports = app')) {          
		  return this.last(/module\.exports = app.toTree\(.*\);/).replaceWith(exportTrees + '\n');
		} else {
		  throw new Error("No 'valid' module.exports found!");
		}
		}).write();

		// referenced from main Brocfile :)
		this.copy('brocs/ratchet-fonts.js');
		aid.info('Ratchet Fonts configured');
  	}
  	
  },
  install: {
    ratchet: function () {
      aid.installBow('ratchet');
    }
  },

  end: function() {
    aid.success('Rachet successfully installed :)');    
  }
});

module.exports = EmberConfigRatchetGenerator;





