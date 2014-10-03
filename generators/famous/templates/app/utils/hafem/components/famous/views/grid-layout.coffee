`import Hafem from '../../../directives/famous'`

Component = Hafem.LayoutComponent.extend

  classNames: ['famous', 'famous-dom-consumer', 'famous-gridLayout', 'famous-group', 'famous-container-group']

  famous:
    _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-gridLayout'])

  'fa-cols': 6
  'fa-rows': 2

  cols: ->
    @get('fa-cols')

  rows: ->
    @get('fa-rows')

  dimensions: ->
    [@cols(), @rows()]

  properties: ->
    dimensions: @dimensions()

  clazz: 'GridLayout'

`export default Component`