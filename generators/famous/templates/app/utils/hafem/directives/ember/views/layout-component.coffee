`import BaseComponent from './component'`
`import Hafem from '../../famous'`

Component = BaseComponent.extend
  surfaces: []

  init: ->
    @_super()
    @set('surfaces', [])

  pushSurface: (source) ->
    @get('surfaces').push source

  addTo: (source) ->
    console.log 'addTo', source
    @pushSurface source

  properties: ->
    {}

  viewClass: (name) ->
    Hafem.Famous.Views[name]

  layoutClass: ->
    @_layoutClassByName() or @_layoutClassByRef() or @_noClazz()

  _noClazz: ->
    throw Error "Missing clazz: to indicate layout/view class to be used"

  _layoutClassByName: ->
    return viewClass(@clazz) if typeof @clazz is 'string'

  _layoutClassByRef: ->
    return @clazz if typeof @clazz is 'object'

  create: ->
    new @layoutClass() @properties()

  insertIt: ->
    console.log 'insert'
    @register @create()

  willInsertFamous: ->
    console.log 'willInsertFamous'
    @insert()

  register: (fa) ->
    console.log 'register', fa

    fa.sequenceFrom @get('surfaces')

    @set 'fa', fa

    @hafem.isolate.get(@).addTo fa

`export default Component`