`import Ember from 'ember'`

Router = Ember.Router.extend
  location: <%= appname %>ENV.locationType

Router.map ->

`export default Router`