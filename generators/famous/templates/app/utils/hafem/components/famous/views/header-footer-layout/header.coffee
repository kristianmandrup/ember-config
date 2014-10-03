`import Hafem from '../../../../directives/famous'`

Component = Hafem.Component.extend

  classNames: ['famous-context', 'famous-views-header-footer-layout-header']

  famous:
    _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-header-footer-layout-header'])

  addTo: (source) ->
    @getFa().header.add(source)

  targetName: 'footer'

  properties: ->
    headerSize: @height()

`export default Component`