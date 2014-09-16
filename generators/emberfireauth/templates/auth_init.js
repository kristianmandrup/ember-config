//app/initializer/auth.js
import Ember from 'ember';

var Ref = new window.Firebase("https://<%= account %>.firebaseio.com/");  

var auth = Ember.Object.extend({  
  authed: false,
  init: function() {
    this.authClient = new window.FirebaseSimpleLogin(Ref, function(error, user) {
      if (error) {
        alert('Authentication failed: ' + error);
      } else if (user) {
        this.set('authed', true);
      } else {
        this.set('authed', false);
      }
    }.bind(this));
  },

  login: function(authProvider) {
    this.authClient.login(authProvider);
  },

  logout: function() {
    this.authClient.logout();
  }
});

export default {  
  name: 'Auth',
  initialize: function( container, app ) {
    app.register('auth:main', auth, {singleton: true});
    app.inject('controller', 'auth', 'auth:main');
    app.inject('route', 'auth', 'auth:main');
  }
};