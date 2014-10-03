`import Hafem from '../../../directives/famous'`

Component = Hafem.LayoutComponent.extend

  classNames: ['famous-context', 'famous-views-scrollview']

  addTo: (source) ->
    source.pipe @get('fa')
    @get('surfaces').push(source)

  properties: ->
    target: @$()[0]

  clazz: 'ScrollView'

  willInsertFamous: ->

  didInsertElement: ->
    @insert()

`export default Component`
