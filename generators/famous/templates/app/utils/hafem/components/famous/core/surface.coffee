`import Hafem from '../../../directives/famous'`

Component = Hafem.Component.extend Ember.ViewTargetActionSupport,

  classNames: ['famous', 'famous-dom-consumer', 'famous-surface']

  famous:
    _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-surface'])

  changeSize: (->
    @get('fa').setSize([@get('fa-width'), @get('fa-height')])
  ).observes('fa-width', 'fa-height')

  willInsertFamous: ->
    self = @

    fa = new Hafem.Famous.Core.Surface(
      size: [@get('fa-width'), @get('fa-height')]
      target: self.$()[0]
      content: self.$().html()
      properties:
        background: self.get('fa-color')
    )

    @set('fa', fa)

    @hafem.isolate.get(@).addTo(fa)

  click: ->
    @triggerAction(@)


`export default Component`