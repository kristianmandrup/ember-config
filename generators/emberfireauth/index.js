// http://www.programwitherik.com/ember-cli-with-firebase-simple-login/

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper    = require('../../lib/aid');
var aid;
var selected;

var EmberConfigEmberFireAuthGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);
    selected = aid.eqSelector(this, 'authScheme');
  },

  // Choose test framework
  prompting: function () {
    var done = this.async();

    // TODO: Someone please create fireplace model generator!!!
    // https://github.com/rlivsey/fireplace

    // TODO: "inherit" account if coming from adapter generator ;)
    var prompts = [{
      type: 'input',
      name: 'account',
      message: 'What is the name of your firebase account?',
      default: 'unknown'     
    }, {
      type: 'list',
      name: 'authScheme',
      message: 'Choose your authentication scheme',
      choices: ['simple-login'],
      default: 'simple-login'
    }];

    this.prompt(prompts, function (props) {
      this.account    = props.account;
      this.authScheme = props.authScheme;

      done();
    }.bind(this));
  },

  // TODO: create ember-config:emberfire generator ;)
  // TODO: run emberfire generator??
  // aid.generate('emberfire');

  writing: {
    configSimpleLogin: function() {
      if (!selected('simple-login')) return;

      this.template('app_adapter.js', 'app/adapters/application.js');

      this.mkdir('app/initializers');
      this.template('auth_init.js', 'app/initializers/auth.js');

      this.template('session_controller.js', 'app/controllers/session.js');

      var indexRoute = 'app/routes/index.js';
      if(!aid.fileExists(indexRoute))
        this.template('index_route.js', indexRoute);      

      // this.mkdir('app/templates/auth');
      var loginFormTemplate = 'app/templates/login.hbs';
      if(!aid.fileExists(loginFormTemplate))
        this.template('login_form.hbs', loginFormTemplate);      
    }
  },

  install: {    
    simpleLogin: function() {
      if (!selected('simple-login')) return;

      // http://www.programwitherik.com/ember-cli-with-firebase-simple-login/
      aid.installBower('firebase-simple-login');
    },
  },

  end: {
    success: function () {
      aid.success('Successfully installed EmberFire Authentication :)');
    }    
  }
});

module.exports = EmberConfigEmberFireAuthGenerator;
