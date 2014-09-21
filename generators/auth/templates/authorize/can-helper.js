// http://livsey.org/blog/2012/10/16/writing-a-helper-to-check-permissions-in-ember-dot-js/

import Ember from 'ember';

var get = Ember.get; 
var normalizePath = Ember.Handlebars.normalizePath;

// Ability should be exposed by permit-authorizer as ES6 module
// import Ability from 'permit-authorizer-es6';

var ability = (user) ->
  new Ability(user)

var currentAbility = ability(currentUser);

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