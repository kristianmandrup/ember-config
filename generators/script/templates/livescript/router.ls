``import Ember from 'ember';``

Router = Ember.Router.extend do
  location: <%= appName %>ENV.locationType

Router.map ->

``export default Router;``