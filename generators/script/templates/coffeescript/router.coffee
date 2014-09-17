`import Ember from 'ember'`

Router = Ember.Router.extend
  location: <%= appName %>ENV.locationType

Router.map ->

`export default Router`