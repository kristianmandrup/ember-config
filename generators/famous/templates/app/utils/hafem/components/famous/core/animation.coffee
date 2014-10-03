`import Hafem from '../../../directives/famous'`

Component = Hafem.Component.extend

  classNames: ['famous', 'famous-animation']

  tagName: ''

  famous:
    _type: Ember.A(['famous', 'famous-animation'])

  willInsertFamous: ->
    self = @
    @hafem.isolate.get(@).get('transform').setTransform Hafem.Famous.Core.Transform.translate(@get('fa-translate-x'), @get('fa-translate-y'), @get('fa-translate-z')),
      duration: @get('fa-duration')
      curve: eval(@get('fa-curve'))

`export default Component`