'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helper = require('../../lib/aid');
var broc_file = require ('../../lib/broc_file');
var aid;
var selected, provider;
var index_file = require('../../lib/index_file');

var EmberConfigAuthGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);   
    selected      = aid.matchSelector(this, 'auth'); 
    provider      = aid.containsSelector(this, 'provider');
    authorization = aid.eqSelector(this, 'authorization');
  },

  // Choose Auth framework
  prompting: {
    lib: function () {
      var done = this.async();

      // https://github.com/jpadilla/ember-cli-simple-auth-token

      var prompts = [{
        type: 'list',
        name: 'auth',
        message: 'Choose your auth framework:',
        choices: ['simple-auth', 'torii'],
        default: 'simple-auth'
      }];

      this.prompt(prompts, function (props) {
        this.auth = props.auth;

        done();
      }.bind(this));
    },

    providers: function() {
      if (!selected('simple-auth')) return;
      var done = this.async();

      // https://github.com/jpadilla/ember-cli-simple-auth-token

      var prompts = [{
        type: 'checkbox',
        name: 'provider',
        message: "Choose your auth providers for simple auth:",
        choices: ['oauth2', 'token', 'torii'],
        default: ['oauth2']
      }];

      this.prompt(prompts, function (props) {
        this.auth = props.auth;
        this.provider = props.provider;

        done();
      }.bind(this));
    },

    authorization: function() {
      var done = this.async();

      // https://github.com/jpadilla/ember-cli-simple-auth-token

      var prompts = [{
        type: 'list',
        name: 'authorization',
        message: "Choose your authorization library",
        choices: ['none', 'permit-authorize'],
        default: 'none'
      }];

      this.prompt(prompts, function (props) {
        this.authorization = props.authorization;

        done();
      }.bind(this));
    }    
  },

  writing: {
    configureSimpleAuth: function () {
      // TODO: ...

      // aid.addRoute('login');
    },
    configureSimpleAuthToken: function () {
      if (!selected('simple-auth-token')) return;

      aid.addRoute('login');
      aid.template('login_template.hbs', 'app/templates/login.hbs')
      aid.template('login_controller.js', 'app/controllers/login.js')

      var authorizeJs = this.read('authorizer.js');
      var envMatchExpr = /window\..* = .*ENV;/
      index_file(function() {
        return this.last(envMatchExpr).append(authorizeJs);
      }).write();      
    },

    authorization: function() {
      if (!authorization('permit-authorize')) return;
      
      var jsImport = "app.import('" + this.bowerDir + "/permit-authorize/permit-authorize.js');";   

      if (this.brocFileContent.has(jsImport)) return;

      broc_file(function() {
        return this.last('module.exports').prepend(jsImport + '\n');  
      }).write();
      aid.info('Permit Authorize javascript configured');

  },

  install: {
    simpleAuth: function () {
      if (!selected('simple-auth')) return;

      aid.install('simple-auth');
    },
    providers: function () {
      if (!selected('simple-auth')) return;

      if (provider('token'))
        aid.install('simple-auth-token');

      if (provider('oauth2'))
        aid.install('simple-auth-oauth2');                  

      if (provider('torii'))
        aid.install('simple-auth-torii')
    },

    toriiAuth: function () {
      if (!selected('torii')) return;
      aid.installBower('torii');
      aid.install('torii');
    },
    authorization: function() {
      if (!authorization('permit-authorize')) return;
      aid.installBower('permit-authorize');
      aid.info('See: https://www.npmjs.org/package/permit-authorize');      
    }
  },
  end: {
    generators: function() {
      if (provider('torii')) return;
        aid.generate('ember', ['ember-cli-simple-auth-torii']); 
      // more to follow...
    },
    authorization: function() {
      aid.bold('Authorization:');
      this.log(' - helpers: http://livsey.org/blog/2012/10/16/writing-a-helper-to-check-permissions-in-ember-dot-js/');
    }
  }
});

module.exports = EmberConfigAuthGenerator;
