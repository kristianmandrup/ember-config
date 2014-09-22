// http://livsey.org/blog/2012/10/16/writing-a-helper-to-check-permissions-in-ember-dot-js/

import Ember from 'ember';

var get = Ember.get; 
var normalizePath = Ember.Handlebars.normalizePath;

// Ability should be exposed by permit-authorizer as ES6 module
// import Ability from 'permit-authorizer-es6';

// SimpleAuth example here
// http://ember-simple-auth.simplabs.com/ember-simple-auth-api-docs.html#SimpleAuth-Session    
// http://stackoverflow.com/questions/24319186/custom-authenticator-with-ember-simple-auth-ember-cli
// http://log.simplabs.com/post/53016599611/authentication-in-ember-js

// https://gist.github.com/ivanvanderbyl/4560416

App.Permission = Ember.Object.extend({
  content: null,
  // one-way bind to changes in App.currentUser (see authorize/initializers.js)
  currentUserBinding: Ember.Binding.oneWay("App.currentUser");
});


var ability = (user) ->
  new Ability(user)

// define currentUser
var currentAbility = ability(App.Permission.currentUser);

userCan = (accessRequest) ->
  currentAbility.can accessRequest

// if userCan action: 'read', subject: book

// In template
// {{#can edit post}}
//   <button {{action editPost post}}>Edit</button>
// {{/can}}

Handlebars.registerHelper('can', function(action, subject, options){
  options = options || {}
  var accessRequest = Ember.merge({
    action: action, 
    subject: subject
  }, options);

  // find & create the permission with the supplied attributes
  permission = userCan(accessRequest)

  // bind it all together and kickoff the observers
  return Ember.Handlebars.helpers.boundIf.call(permission, "can", options);
});