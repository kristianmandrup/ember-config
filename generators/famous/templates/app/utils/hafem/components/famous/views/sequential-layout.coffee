`import Hafem from '../../../directives/famous'`


Component = Hafem.LayoutComponent.extend

  classNames: ['famous-context', 'famous-views-sequential-layout']

  famous:
    _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-sequentialLayout'])

  'fa-direction': 0

  direction: ->
    @get 'fa-direction'

  properties: ->
    direction: @direction()

  clazz: 'SequentialLayout'

`export default Component`