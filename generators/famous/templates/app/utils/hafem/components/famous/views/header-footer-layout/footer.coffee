`import Hafem from '../../../../directives/famous'`

Component = Hafem.HflComponent.extend

  classNames: ['famous-context', 'famous-views-header-footer-layout-footer']

  famous:
    _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-header-footer-layout-footer'])

  addTarget: 'footer'

  properties: ->
    footerSize: @height()

`export default Component`