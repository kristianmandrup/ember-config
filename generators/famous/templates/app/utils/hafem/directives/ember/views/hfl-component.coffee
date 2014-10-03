`import BaseComponent from './component'`
`import Hafem from '../../famous'`

Component = Hafem.Component.extend

  addTo: (source) ->
    @getFa().header.add(source)

  'fa-height': 100

  init: ->
    @_super()

  getFa: ->
    @hafem.isolate.get(@).get('fa')

  height: ->
    @get('fa-height')

  addTo: (source) ->
    @getFa()[@targetName()].add(source)

  willInsertFamous: ->
    @getFa().setOptions @properties()
