`import Hafem from '../../../directives/famous'`

Component = Hafem.LayoutComponent.extend

  classNames: ['famous-context', 'famous-views-flexible-layout']

  famous:
    _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-flexibleLayout'])

  'fa-ratio': '[1]'

  ratios: ->
    eval @get('fa-ratio')

  properties: ->
    ratios: @ratios()
    direction: 0

  clazz: 'FlexibleLayout'

`export default Component`