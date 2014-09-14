``import Ember from 'ember';``
``import Resolver from 'ember/resolver';``
``import loadInitializers from 'ember/load-initializers';``

Ember.MODEL_FACTORY_INJECTIONS = true

App = Ember.Application.extend do
  modulePrefix: '<%= appname %>'
  Resolver: Resolver

loadInitializers App, '<%= appname %>'

``export default App;``