`import Hafem from '../../../directives/famous'`

Component = Hafem.Component.extend

  classNames: ['famous', 'famous-dom-consumer', 'famous-engine']

  famous:
    _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-engine'])

  didInsertElement: ->
    fa = Hafem.Famous.Core.Engine.createContext(@$()[0])
    @set('fa', fa)


`export default Component`