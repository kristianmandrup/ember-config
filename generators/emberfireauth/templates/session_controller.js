// https://gist.github.com/raytiley/8976037

var dbRef = new Firebase("https://<%= account %>.firebaseio.com/");

export default Ember.Controller.extend({
  
  /**
  @property currentUser
  @type {User}
  @default null
  */
  currentUser: null,

  /**
  Logs a user in with an email in password.
  If no arguments are given attempts to login a currently active session.
  If user does not exist or no user is logged in promise will resolve with null.

  @method login
  @param {String} email The users email
  @param {String} password The users password
  @return {Promise} Returns a promise that resolves with the logged in User
  */
  login: function(email, password) {
    if (email === undefined)
      return this._loginActiveSession();
    else
      return this._loginWithCredentials(email, password);
  },

  /**
  
  @method logout
  @return {Promise} Returns a promise that resolves when the user is logged out.
  */
  logout: function() {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var authClient = new FirebaseSimpleLogin(dbRef, function(error, user) {
        Ember.run(function() {
          if (error) {
            reject(error);
          }

          if (!user) {
            self.set('currentUser', null);
            resolve(null);
          }
        });
      });
      authClient.logout();
    });
  },

  /**

  @method createNewUser
  @param {String} email
  @param {String} password
  @return {Promise} Returns a promsie that resolves with newly created user
  */
  createNewUser: function(email, password) {
    var self = this;
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
        var authClient = new FirebaseSimpleLogin(dbRef, function(error, user) {
          Ember.run(function() {
            if (error)
              reject(error);

            if (user) {
              var newUser = self.store.createRecord('user', {
                id: user.id,
                email: user.email
              });

              var appUser = newUser.save().then(function(value) {
                self.set('currentUser', value);
                return value;
              });

              resolve(appUser);
            }
          });
        });

        authClient.createUser(email, password, function(error, user) {
          Ember.run(function() {
            if (error)
              reject(error);

            if (user) {
              authClient.login('password', {email: email, password: password});
            }
          });
        });
    });

    return promise;
  },

  _loginWithCredentials: function(email, password) {
    var self = this;
    // Setup a promise that creates the FirebaseSimpleLogin and resolves
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      var authClient = new FirebaseSimpleLogin(dbRef, function(error, user) {
        //First Time this fires error and user should be null. If connection successful
        //Second Time will be due to login. In that case we should have user or error
        Ember.run(function() {
          
          // Handle posible errors.
          if (error && error.code === 'INVALID_USER') {
            resolve(null);
          } else if (error) {
            reject(error)
          }

          // Handle user
          if (user) {
            var appUser = self.store.find('user', user.id).then(function(appUser) {
              self.set('currentUser', appUser);
              return appUser;
            });

            resolve(appUser);
          }
        });
      });
      authClient.login('password', {
            email: email,
            password: password
      });
    });

    return promise;
  },

  _loginActiveSession: function() {
    var self = this;
    // Setup a promise that creates the FirebaseSimpleLogin and resolves
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      var authClient = new FirebaseSimpleLogin(dbRef, function(error, user) {
        // This callback should fire just once if no error or user than not logged in
        Ember.run(function() {
          if (!error && !user) {
            resolve(null);
          }

          if (error) {
            reject(error);
          }

          if (user) {
            var appUser = self.store.find('user', user.id).then(function(value) {
              self.set('currentUser', value);
              return value;
            });

            resolve(appUser);
          }
        });
      });
    });

    return promise;
  }
});