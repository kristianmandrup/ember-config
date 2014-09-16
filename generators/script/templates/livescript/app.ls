``import Ember from 'ember';``
``import Resolver from 'ember/resolver';``
``import loadInitializers from 'ember/load-initializers';``

Ember.MODEL_FACTORY_INJECTIONS = true

<%= appName %> = Ember.Application.extend do
  modulePrefix: '<%= appname %>'
  Resolver: Resolver

loadInitializers <%= appName %>, '<%= appname %>'

``export default <%= appName %>;``