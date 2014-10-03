`import Hafem from '../../../directives/famous'`

Component = Hafem.Component.extend

  classNames: ['famous', 'famous-dom-consumer', 'famous-view']

  famous:
    _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-view'])

  willInsertFamous: ->
    self = @
    fa = new Hafem.Famous.Core.View()
    @set('fa', fa)
    @hafem.isolate.get(@).addTo fa

`export default Component`