// http://livsey.org/blog/2012/10/16/writing-a-helper-to-check-permissions-in-ember-dot-js/

import Ember from 'ember';

// Ability should be exposed by permit-authorizer as ES6 module
// import Ability from 'permit-authorizer-es6';

// SimpleAuth example here
// http://ember-simple-auth.simplabs.com/ember-simple-auth-api-docs.html#SimpleAuth-Session    
// http://stackoverflow.com/questions/24319186/custom-authenticator-with-ember-simple-auth-ember-cli
// http://log.simplabs.com/post/53016599611/authentication-in-ember-js

// https://gist.github.com/ivanvanderbyl/4560416

// ember-cli: Non-AMD assets cannot be accessed as an ES6 module, you simply access them through the global variable that they export.

// permitAuthorize should 
import { Ability  } from 'permit-authorize';

var Ability   = permitAuthorize.Ability;
var permitFor = permitAuthorize.permitFor

App.Permission = Ember.Object.extend({
  // one-way bind to changes in App.currentUser (see authorize/initializers.js)
  currentUserBinding: Ember.Binding.oneWay("App.currentUser"),

  _ability: null,  
  ability: function (user) {
    return new Ability(user)
  },
  currentAbility: function() {
    this._ability = this._ability || this.ability(this.currentUser)
    return this._ability
  },
  userCan: function (accessRequest) {
    return currentAbility().can(accessRequest);
  }
});



// if userCan action: 'read', subject: book

// In template
// {{#can edit post}}
//   <button {{action editPost post}}>Edit</button>
// {{/can}}

Handlebars.registerHelper('can', function(action, subject, options){
  options = options || {}

  // use routing info as context
  // contains information about the current Ember route including its context (read: model), 
  // it also contains similar information for all parent routes
  var ctx = Ember.merge(App.Router.router.currentHandlerInfos, options);
  var accessRequest = Ember.merge({
    action: action, 
    subject: subject,
    ctx: ctx
  });

  // find & create the permission with the supplied attributes
  permission = App.Permission.userCan(accessRequest)

  // bind it all together and kickoff the observers
  return Ember.Handlebars.helpers.boundIf.call(permission, "can", options);
});