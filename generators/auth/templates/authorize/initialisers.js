// https://gist.github.com/ivanvanderbyl/4560416

Ember.Application.initializer({
  name: "currentUser",
  after: 'store',
 
  initialize: function(container, application) {
    var store = container.lookup('store:main');
    var obj = store.load(CrashLog.User, currentUser);
 
    container.optionsForType('user', { instantiate: false, singleton: true });
    container.register('user', 'current', CrashLog.User.find(obj.id));
  }
});
 
Ember.Application.initializer({
  name: "injectCurrentUser",
  after: 'currentUser',
 
  initialize: function(container) {
    container.injection('controller:application', 'currentUser', 'user:current');
    container.typeInjection('route', 'currentUser', 'user:current');
  }
});