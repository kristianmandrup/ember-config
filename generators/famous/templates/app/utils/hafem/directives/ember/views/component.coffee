Component = Ember.Component.extend

  famous:
    _type: ''

  'fa-width': `undefined`
  'fa-height': `undefined`
  'fa-color': `undefined`
  'fa-curve': 'HafemTransitionsEasing.inOutBack'
  'fa-duration': 1000
  'fa-translate-x': null
  'fa-translate-y': null
  'fa-translate-z': null

  addTo: (source) ->
    @get('fa').add(source)

  init: ->
    @_super()

  _afterRender: ->
    @willInsertFamous()

  willInsertElement: ->
    Ember.run.scheduleOnce('afterRender', @, @_afterRender)
    @_super()

  didInsertElement: ->
    @_super()

  willInsertFamous: ->

  didInsertFamous: ->

`export default Component`