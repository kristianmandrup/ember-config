`import Hafem from '../../../directives/famous'`

Component = Hafem.Component.extend Ember.ViewTargetActionSupport,

  classNames: ['famous', 'famous-dom-consumer', 'famous-modifier']

  tagName: ''

  famous:
    _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-modifier'])

  'fa-translate-x': null
  'fa-translate-y': null
  'fa-translate-z': null
  'fa-rotate-z': null



  addTransform: (transform) ->
    self = @


    transform = new Hafem.Famous.Core.Modifier({
      transform: transform
    });

    @set('fa', @get('fa').add(transform))

    @set('transform', transform)

  willInsertFamous: ->

    @set('fa', @hafem.isolate.get(@).get('fa'))

    @addTransform(Hafem.Famous.Core.Transform.translate(@get('fa-translate-x'), @get('fa-translate-y'), @get('fa-translate-z')))

    if @get('fa-rotate-z')
      @addTransform(Hafem.Famous.Core.Transform.rotateZ(@get('fa-rotate-z')))

`export default Component`